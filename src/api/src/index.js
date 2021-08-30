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
import cors from './middleware/cors.js'
import clientSession from './middleware/client-session.js'
import blacklistRoute from './middleware/blacklist-route.js'
import homeRoute from './http/home.js'
import clientInfoRoute from './http/client-info.js'
import downloadProxyRoute from './http/download-proxy.js'
import executeSql from './http/execute-sql.js'
import authenticateRoute from './http/authenticate.js'
import logoutRoute from './http/logout.js'
import pgDumpRoute from './http/pg-dump/index.js'
import loginSuccessRoute from './http/login-success.js'
import metadataRecordsRoute from './http/metadata-records/index.js'
import apolloServers from './graphql/index.js'
import configureAuth from './passport/index.js'
import passportCookieConfig from './passport/cookie-config.js'
import './postgis/setup.js'
import { PUBLIC_PORT, INTERNAL_PORT, APP_KEY } from './config.js'

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
  .use(blacklistRoute(koaSession(passportCookieConfig, publicApp), '/proxy')) // TODO - is this needed now that proxy is proxy.saeon.ac.za?
  .use(cors)
  .use(clientSession)
  .use(koaPassport.initialize())
  .use(koaPassport.session())
  .use(createRequestContext(publicApp))
  .use(
    new KoaRouter()
      .get('/', homeRoute)
      .post('/', homeRoute)
      .get('/client-info', clientInfoRoute)
      .post('/execute-sql', executeSql)
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
publicHttpServer.listen(PUBLIC_PORT, () => {
  console.log(`@saeon/catalogue API server ready`)
  console.log(`@saeon/catalogue GraphQL server ready`)
})

// Start internal HTTP server
privateHttpServer.listen(INTERNAL_PORT, () => {
  console.log(`@saeon/catalogue API server ready (internal)`)
  console.log(`@saeon/catalogue GraphQL server ready (internal)`)
})
