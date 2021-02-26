import '@saeon/logger'
import './lib/native-extensions.js'
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
import blacklistRoute from './middleware/blacklist-route.js'
import homeRoute from './http/home.js'
import clientInfoRoute from './http/client-info.js'
import downloadProxyRoute from './http/download-proxy.js'
import executeSql from './http/execute-sql.js'
import authenticateRoute from './http/authenticate.js'
import signupRoute from './http/login-signup.js'
import logoutRoute from './http/logout.js'
import pgDumpRoute from './http/pg-dump/index.js'
import loginSuccessRoute from './http/login-success.js'
import metadataRecordsRoute from './http/metadata-records/index.js'
import apolloServers from './graphql/index.js'
import configureGoogleAuth from './passport/google-auth/index.js'
import configureTwitterAuth from './passport/twitter-auth/index.js'
import configureSaeonAuth from './passport/saeon-identity-server/index.js'
import configureLocalAuth from './passport/local-auth/index.js'
import passportCookieConfig from './passport/cookie-config.js'
import { applyIndices, setupUserRoles, setupDefaultAdmins } from './mongo/index.js'
import configurePostGIS from './postgis/setup.js'
import {
  CATALOGUE_API_ADDRESS_PORT,
  CATALOGUE_API_INTERNAL_ADDRESS_PORT,
  CATALOGUE_PROXY_ADDRESS,
  CATALOGUE_API_KEY,
} from './config.js'

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

/**
 * Install PostGIS extension if necessary
 */
await configurePostGIS()
  .then(() => console.info('PostGIS extensions installed'))
  .catch(error => console.error('Error installing PostGIS extensions', error.message))

// Configure passport authentication
const { login: googleLogin, authenticate: googleAuthenticate } = configureGoogleAuth()
const { login: twitterLogin, authenticate: twitterAuthenticate } = configureTwitterAuth()
const { login: saeonLogin, authenticate: saeonAuthenticate } = configureSaeonAuth()
const { authenticate: localAuthenticate } = configureLocalAuth()

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
publicApp.proxy = true
publicApp
  .use(
    koaCompress({
      threshold: 2048,
      flush: zlib.constants.Z_SYNC_FLUSH,
    })
  )
  .use(koaBody())
  .use(blacklistRoute(koaSession(passportCookieConfig, publicApp), '/proxy'))
  .use(cors)
  .use(clientSession)
  .use(koaPassport.initialize())
  .use(koaPassport.session())
  .use(createRequestContext(publicApp))
  .use(
    proxy('/proxy', {
      target: CATALOGUE_PROXY_ADDRESS,
      changeOrigin: true,
      logs: true,
      events: {},
    })
  )
  .use(
    new KoaRouter()
      .get('/', homeRoute)
      .post('/', homeRoute)
      .get('/client-info', clientInfoRoute)
      .post('/execute-sql', executeSql)
      .get('/pg-dump/:schema', pgDumpRoute)
      .get('/download-proxy', downloadProxyRoute)
      .get('/metadata-records', metadataRecordsRoute)
      .get('/authenticate/redirect/google', googleAuthenticate, loginSuccessRoute) // passport
      .get('/login/google', googleLogin) // passport
      .get('/authenticate/redirect/twitter', twitterAuthenticate, loginSuccessRoute) // passport
      .get('/login/twitter', twitterLogin) // passport
      .get('/authenticate/redirect/saeon-identity-server', saeonAuthenticate, loginSuccessRoute) // passport
      .get('/login/saeon-identity-server', saeonLogin) // passport
      .post('/login/local', localAuthenticate) // passport
      .post('/login/signup', signupRoute)
      .get('/authenticate', authenticateRoute)
      .get('/logout', logoutRoute)
      .routes()
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
publicHttpServer.listen(CATALOGUE_API_ADDRESS_PORT, () => {
  console.log(`@saeon/catalogue API server ready`)
  console.log(`@saeon/catalogue GraphQL server ready`)
  console.log(`@saeon/catalogue GraphQL subscriptions server ready`)
})

// Start internal HTTP server
privateHttpServer.listen(CATALOGUE_API_INTERNAL_ADDRESS_PORT, () => {
  console.log(`@saeon/catalogue API server ready (internal)`)
  console.log(`@saeon/catalogue GraphQL server ready (internal)`)
  console.log(`@saeon/catalogue GraphQL subscriptions server ready (internal)`)
})
