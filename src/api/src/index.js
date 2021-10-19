import '@saeon/logger'
import './lib/native-extensions.js'
import './lib/log-config.js'
import { createServer } from 'http'
import Koa from 'koa'
import KoaRouter from '@koa/router'
import koaCompress from 'koa-compress'
import koaBody from 'koa-bodyparser'
import koaSession from 'koa-session'
import koaPassport from 'koa-passport'
import zlib from 'zlib'
import createRequestContext from './middleware/create-request-context.js'
import restrictCors from './middleware/restrict-cors.js'
import openCors from './middleware/open-cors.js'
import blacklistRoutes from './middleware/blacklist-routes.js'
import whitelistRoutes from './middleware/whitelist-routes.js'
import clientSession from './middleware/client-session.js'
import homeRoute from './http/home.js'
import clientInfoRoute from './http/client-info.js'
import downloadProxyRoute from './http/download-proxy.js'
import sqlPrivate from './http/sql-private.js'
import sqlPublic from './http/sql-public.js'
import authenticateRoute from './http/authenticate.js'
import logoutRoute from './http/logout.js'
import pgDumpRoute from './http/pg-dump/index.js'
import loginSuccessRoute from './http/login-success.js'
import metadataRecordsRoute from './http/metadata-records/index.js'
import apolloServers from './graphql/index.js'
import configureAuth from './passport/index.js'
import './postgis/setup.js'
import {
  API_BIND_PORT_PUBLIC,
  API_BIND_PORT_INTERNAL,
  APP_KEY,
  SERVER_TASKS,
  ENABLE_METADATA,
  METADATA_INTEGRATION_SCHEDULE,
} from './config/index.js'
import { Task } from './lib/task-manager/index.js'
import loadMetadataRecords from './integrations/metadata/index.js'
import hoursToMilliseconds from './lib/hours-to-ms.js'

/**
 * Metadata integration
 * Pull metadata into Elasticsearch
 */
if (ENABLE_METADATA) {
  console.info('Metadata enabled!')
  SERVER_TASKS.addTask(
    new Task(
      { schedule: METADATA_INTEGRATION_SCHEDULE, id: 'Metadata integration' },
      loadMetadataRecords
    )
  )
} else {
  console.info('Metadata disabled')
}

// Configure passport authentication
const { login, authenticate } = configureAuth()

// Configure internal app
const internalApp = new Koa()
internalApp.keys = [APP_KEY]
internalApp.proxy = false
internalApp
  .use(
    koaCompress({
      threshold: 2048,
      flush: zlib.constants.Z_SYNC_FLUSH,
    })
  )
  .use(koaBody())
  .use(createRequestContext(internalApp))
  .use(new KoaRouter().get('/', homeRoute).post('/', homeRoute).routes())

// Configure public app
const publicApp = new Koa()
publicApp.keys = [APP_KEY]
publicApp.proxy = true
publicApp
  .use(
    koaCompress({
      threshold: 2048,
      flush: zlib.constants.Z_SYNC_FLUSH,
    })
  )
  .use(koaBody())
  .use(async (ctx, next) => {
    const protocol = ctx.protocol
    const isHttp = protocol === 'http'
    return koaSession(
      {
        key: 'koa.sess',
        maxAge: hoursToMilliseconds(12),
        autoCommit: true,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: true,
        renew: true,
        secure: isHttp ? false : true,
        sameSite: isHttp ? 'lax' : 'none',
      },
      publicApp
    )(ctx, next)
  })
  .use(blacklistRoutes(restrictCors, '/query')) // Strict CORS for all routes except /query
  .use(whitelistRoutes(openCors, '/query')) // Open CORS policy for /query
  .use(clientSession)
  .use(koaPassport.initialize())
  .use(koaPassport.session())
  .use(createRequestContext(publicApp))
  .use(
    new KoaRouter()
      .get('/', homeRoute)
      .post('/', homeRoute)
      .get('/client-info', clientInfoRoute)
      .post('/sql', sqlPrivate)
      .post('/query/:databookId', sqlPublic)
      .get('/pg-dump/:schema', pgDumpRoute)
      .get('/download-proxy', downloadProxyRoute)
      .get('/metadata-records', metadataRecordsRoute)
      .get('/authenticate/redirect', authenticate, loginSuccessRoute) // passport
      .get('/login', login) // passport
      .get('/authenticate', authenticateRoute)
      .get('/logout', logoutRoute)
      .routes()
  )

// Configure HTTP servers
const publicHttpServer = createServer(publicApp.callback())
const privateHttpServer = createServer(internalApp.callback())

// Configure Apollo servers
const { publicServer: publicGqlServer, internalServer: internalGqlServer } = apolloServers
publicGqlServer.start().then(() => publicGqlServer.applyMiddleware({ app: publicApp, cors: false }))
internalGqlServer
  .start()
  .then(() => internalGqlServer.applyMiddleware({ app: internalApp, cors: false }))

// Start public HTTP server
publicHttpServer.listen(API_BIND_PORT_PUBLIC, () => {
  console.log(`@saeon/catalogue API server ready`)
  console.log(`@saeon/catalogue GraphQL server ready`)
})

// Start internal HTTP server
privateHttpServer.listen(API_BIND_PORT_INTERNAL, () => {
  console.log(`@saeon/catalogue API server ready (internal)`)
  console.log(`@saeon/catalogue GraphQL server ready (internal)`)
})
