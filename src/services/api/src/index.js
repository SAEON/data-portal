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

import { NODE_ENV, PORT, GQL_PROVIDER, HTTP_PROXY } from './config.js'

if (!NODE_ENV || !['production', 'development'].includes(NODE_ENV)) {
  console.error(
    new Error(
      'The server MUST be started with a NODE_ENV environment variable, with a value of either "production" or "development"'
    )
  )
  process.exit(1)
}

// Register native extensions

// Setup App
const app = new Koa()

// Setup routes
const router = new KoaRouter()
router.get('/', home)
router.post('/', home)

// Koa HTTP handler callback
app
  .use(cors)
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

// HTTP Server
const httpServer = createServer(app.callback())

// GraphQL
const apolloServer = configureApolloServer()
apolloServer.applyMiddleware({ app })
apolloServer.installSubscriptionHandlers(httpServer)

// Start the application
httpServer.listen(PORT, () => {
  console.log(`Auth server ready at ${PORT}`)
  console.log(`GraphQL ready at ${GQL_PROVIDER}${apolloServer.graphqlPath}`)
  console.log(`GraphQL subscriptions ready at ${GQL_PROVIDER}${apolloServer.subscriptionsPath}`)
})
