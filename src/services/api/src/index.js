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
import downloadProxyRoute from './http/download-proxy.js'
import executeSql from './http/execute-sql.js'
import authenticateRoute from './http/authenticate.js'
import logoutRoute from './http/logout.js'
import loginSuccessRoute from './http/login-success.js'
import metadataRecordsRoute from './http/metadata-records/index.js'
import apolloServers from './graphql/index.js'
import configurePassport, { passportCookieConfig } from './passport/index.js'
import { applyIndices, setupUserRoles, setupDefaultAdmins } from './mongo/index.js'
import {
  CATALOGUE_API_ADDRESS,
  CATALOGUE_API_INTERNAL_ADDRESS,
  CATALOGUE_PROXY_ADDRESS,
  CATALOGUE_API_KEY,
} from './config.js'
import { parse } from 'url'

const CATALOGUE_API_PUBLIC_PORT = parse(CATALOGUE_API_ADDRESS).port
const CATALOGUE_API_INTERNAL_PORT = parse(CATALOGUE_API_INTERNAL_ADDRESS).port

// Configure MongoDB indices
applyIndices()
  .then(() => console.info('Mongo indices configured'))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

// Configure MongoDB userRoles
setupUserRoles()
  .then(() => console.info('Mongo user roles configured'))
  .then(() => setupDefaultAdmins())
  .then(() => console.info('Default users configured'))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

// Configure passport authentication
const { login, authenticate } = configurePassport()

// Configure internal app
const internalApp = new Koa()
internalApp.keys = [CATALOGUE_API_KEY]
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
publicApp.keys = [CATALOGUE_API_KEY]
publicApp.proxy = true // X-Forwarded-* headers can be trusted
publicApp
  .use(
    koaCompress({
      threshold: 2048,
      flush: zlib.constants.Z_SYNC_FLUSH,
    })
  )
  .use(koaBody())
  .use(koaSession(passportCookieConfig, publicApp))
  .use(cors)
  .use(clientSession)
  .use(koaPassport.initialize())
  .use(koaPassport.session())
  .use(createRequestContext(publicApp))
  .use(
    new KoaRouter()
      .get('/', homeRoute)
      .post('/', homeRoute)
      .post('/execute-sql', executeSql)
      .get('/download-proxy', downloadProxyRoute)
      .get('/metadata-records', metadataRecordsRoute)
      .get('/authenticate/redirect', authenticate, loginSuccessRoute) // passport
      .get('/login', login) // passport
      .get('/authenticate', authenticateRoute)
      .get('/logout', logoutRoute)
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

// Configure HTTP servers
const publicHttpServer = createServer(publicApp.callback())
const privateHttpServer = createServer(internalApp.callback())

// Configure Apollo public server
const { publicServer, internalServer } = apolloServers
publicServer.applyMiddleware({ app: publicApp })
publicServer.installSubscriptionHandlers(publicHttpServer)
internalServer.applyMiddleware({ app: internalApp })
internalServer.installSubscriptionHandlers(privateHttpServer)

// Start public HTTP server
publicHttpServer.listen(CATALOGUE_API_PUBLIC_PORT, () => {
  console.log(`@saeon/catalogue API server ready`)
  console.log(`@saeon/catalogue GraphQL server ready`)
  console.log(`@saeon/catalogue GraphQL subscriptions server ready`)
})

// Start internal HTTP server
privateHttpServer.listen(CATALOGUE_API_INTERNAL_PORT, () => {
  console.log(`@saeon/catalogue API server ready (internal)`)
  console.log(`@saeon/catalogue GraphQL server ready (internal)`)
  console.log(`@saeon/catalogue GraphQL subscriptions server ready (internal)`)
})
