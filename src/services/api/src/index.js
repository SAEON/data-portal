import '@saeon/logger'
import { createServer } from 'http'
import Koa from 'koa'
import KoaRouter from '@koa/router'
import koaCompress from 'koa-compress'
import koaBody from 'koa-bodyparser'
import koaSession from 'koa-session'
import koaPassport from 'koa-passport'
import zlib from 'zlib'
import proxy from 'koa-proxies'
import createRequestContext from './middleware/create-request-context.js'
import cors from './middleware/cors.js'
import clientSession from './middleware/client-session.js'
import homeRoute from './http/home.js'
import metadataRecordsRoute from './http/metadata-records/index.js'
import configureApolloServer from './graphql/index.js'
import configurePostgis from './postgis/setup/index.js'
import { configure as configureElasticsearch } from './elasticsearch/index.js'
import configurePassport, {
  authenticateUser,
  login,
  passportCookieConfig,
} from './passport/index.js'
import { applyIndices } from './mongo/index.js'
import {
  CATALOGUE_API_PORT,
  CATALOGUE_PROXY_ADDRESS,
  CATALOGUE_API_SEED_POSTGIS_LAYERS,
  CATALOGUE_API_KEY,
} from './config.js'

// Configure MongoDB
await applyIndices()
console.info('Mongo indices configured')

// Configure Elasticsearch
configureElasticsearch().then(() => console.info('Elasticsearch', 'configured'))

// Configure PostGIS
if (CATALOGUE_API_SEED_POSTGIS_LAYERS === 'enabled') {
  configurePostgis().then(() => console.info('PostGIS configured'))
} else {
  console.info('PostGIS', 'seeding disabled')
}

// Configure passport authentication
configurePassport()

const app = new Koa()
app.keys = [CATALOGUE_API_KEY]
app.proxy = true // X-Forwarded-* headers can be trusted

app
  .use(
    koaCompress({
      threshold: 2048,
      flush: zlib.constants.Z_SYNC_FLUSH,
    })
  )
  .use(koaBody())
  .use(koaSession(passportCookieConfig, app))
  .use(cors)
  .use(clientSession)
  .use(koaPassport.initialize())
  .use(koaPassport.session())
  .use(createRequestContext(app))
  .use(
    new KoaRouter()
      .get('/', homeRoute)
      .post('/', homeRoute)
      .get('/metadata-records', metadataRecordsRoute)
      .get('/authenticate/redirect', login, async ctx => ctx.redirect('/'))
      .get('/authenticate', authenticateUser)
      .routes()
  )
  .use(
    proxy('/proxy', {
      target: CATALOGUE_PROXY_ADDRESS,
      changeOrigin: true,
      logs: true,
      events: {},
    })
  )

const httpServer = createServer(app.callback())
const apolloServer = configureApolloServer()
apolloServer.applyMiddleware({ app })
apolloServer.installSubscriptionHandlers(httpServer)

httpServer.listen(CATALOGUE_API_PORT, () => {
  console.log(`@saeon/catalogue API server ready at ${CATALOGUE_API_PORT}`)
  console.log(`@saeon/catalogue GraphQL server ready at ${apolloServer.graphqlPath}`)
  console.log(
    `@saeon/catalogue GraphQL subscriptions server ready at ${apolloServer.subscriptionsPath}`
  )
})
