import '@saeon/logger'
import { createServer } from 'http'
import Koa from 'koa'
import KoaRouter from '@koa/router'
import koaCompress from 'koa-compress'
import createRequestContext from './middleware/create-request-context.js'
import cors from './middleware/cors.js'
import home from './http/home.js'
import zlib from 'zlib'
import configureApolloServer from './graphql/index.js'
import proxy from 'koa-proxies'
import { configure as configureElasticsearch } from './elasticsearch/index.js'
import { NODE_ENV, PORT, GQL_PROVIDER, HTTP_PROXY } from './config.js'
import clientSession from './middleware/client-session.js'

if (!NODE_ENV || !['production', 'development'].includes(NODE_ENV)) {
  console.error(
    new Error(
      'The server MUST be started with a NODE_ENV environment variable, with a value of either "production" or "development"'
    )
  )
  process.exit(1)
}

// Configure Elasticsearch
configureElasticsearch().then(() => console.log('Elasticsearch configured'))

/**
 * Setup HTTP server (Koa)
 *
 * This server is deployed behind an Nginx proxy, accessible only via HTTPS
 * X-Forwarded-* headers can be trusted
 */
const app = new Koa()
app.proxy = true

/**
 * Setup HTTP routes
 */
const router = new KoaRouter()
router.get('/', home)
router.post('/', home)

/**
 * Create the Node.js HTTP server callback
 * This is the function passed to http.createServer()
 */
app
  .use(cors)
  .use(clientSession)
  .use(createRequestContext(app))
  .use(router.routes())
  .use(
    proxy('/proxy', {
      target: HTTP_PROXY,
      changeOrigin: true,
      logs: true,
      events: {},
    })
  )
  .use(
    koaCompress({
      threshold: 2048,
      flush: zlib.constants.Z_SYNC_FLUSH,
    })
  )

/**
 * Configure the HTTP server with the callback
 * that is the Koa app function object
 */
const httpServer = createServer(app.callback())

/**
 * Add Apollo server to the Koa app as middleware
 */
const apolloServer = configureApolloServer()
apolloServer.applyMiddleware({ app })
apolloServer.installSubscriptionHandlers(httpServer)

/**
 * Start the HTTP server
 */
httpServer.listen(PORT, () => {
  console.log(`@saeon/catalogue API server ready at ${PORT}`)
  console.log(`@saeon/catalogue GraphQL server ready at ${GQL_PROVIDER}${apolloServer.graphqlPath}`)
  console.log(
    `@saeon/catalogue GraphQL subscriptions server ready at ${GQL_PROVIDER}${apolloServer.subscriptionsPath}`
  )
})
