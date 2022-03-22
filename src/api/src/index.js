import '@saeon/logger'
import './lib/native-extensions.js'
import './lib/log-config.js'
import { createServer } from 'http'
import path from 'path'
import zlib from 'zlib'
import Koa from 'koa'
import KoaRouter from '@koa/router'
import koaCompress from 'koa-compress'
import koaBody from 'koa-bodyparser'
import serve from 'koa-static'
import koaSession from 'koa-session'
import koaPassport from 'koa-passport'
import mount from 'koa-mount'
import {
  API_BIND_PORT,
  SERVER_TASKS,
  METADATA_INTEGRATION_SCHEDULE,
  APP_KEY,
} from './config/index.js'
import { Task } from './lib/task-manager/index.js'
import hoursToMilliseconds from './lib/hours-to-ms.js'
import getCurrentDirectory from './lib/get-current-directory.js'
import restrictCors from './middleware/restrict-cors.js'
import openCors from './middleware/open-cors.js'
import blacklistRoutes from './middleware/blacklist-routes.js'
import whitelistRoutes from './middleware/whitelist-routes.js'
import clientSession from './middleware/client-session.js'
import fourOFour from './middleware/404.js'
import createRequestContext from './middleware/create-request-context.js'
import clientInfoRoute from './http/client-info.js'
import downloadProxyRoute from './http/download-proxy/index.js'
import sqlPrivate from './http/sql-private.js'
import sqlPublic from './http/sql-public.js'
import authenticateRoute from './http/authenticate.js'
import logoutRoute from './http/logout.js'
import homeRoute from './http/home.js'
import pgDumpRoute from './http/pg-dump/index.js'
import loginSuccessRoute from './http/login-success.js'
import oauthAuthenticationCallbackRoute from './http/oauth-authentication-callback.js'
import loginRoute from './http/login.js'
import loadMetadataRecords from './integrations/metadata/index.js'
import gqlServer from './graphql/index.js'
import './postgis/setup.js'
import './passport/index.js'

const __dirname = getCurrentDirectory(import.meta)

/**
 * Metadata integration
 * Pull metadata into Elasticsearch
 */

SERVER_TASKS.addTask(
  new Task(
    { schedule: METADATA_INTEGRATION_SCHEDULE, id: 'SAEON ODP Metadata integration' },
    loadMetadataRecords
  )
)

// Configure public API
const api = new Koa()
api.keys = [APP_KEY]
api.proxy = true

// Configure static files server
const SPA_PATH = path.join(__dirname, './__clients')
const reactClient = new Koa()
reactClient.use(serve(SPA_PATH))

const staticSpaMiddleware = async (ctx, next) => {
  try {
    return await serve(SPA_PATH)(Object.assign(ctx, { path: 'index.html' }), next)
  } catch (error) {
    console.error('Error setting up static SPA middleware', error)
  }
}

api
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
      api
    )(ctx, next)
  })
  .use(blacklistRoutes(restrictCors, '/http/query')) // Strict CORS for all routes except /query
  .use(whitelistRoutes(openCors, '/http/query')) // Open CORS policy for /query
  .use(clientSession)
  .use(koaPassport.initialize())
  .use(koaPassport.session())
  .use(createRequestContext(api))
  .use(
    new KoaRouter()
      .get('/http', homeRoute)
      .post('/http', homeRoute)
      .get('/http/client-info', clientInfoRoute)
      .post('/http/sql/:schema', sqlPublic)
      .post('/http/sql', sqlPrivate)
      .get('/http/pg-dump/:schema', pgDumpRoute)
      .get('/http/download-proxy', downloadProxyRoute)
      .get('/http/authenticate/redirect', oauthAuthenticationCallbackRoute, loginSuccessRoute) // passport
      .get('/http/login', loginRoute) // passport
      .get('/http/authenticate', authenticateRoute)
      .get('/http/logout', logoutRoute)
      .routes()
  )
  .use(fourOFour)
  .use(mount('/', reactClient))
  .use(blacklistRoutes(staticSpaMiddleware, '/http', '/graphql')) // Resolve all paths to the React.js entry (SPA)

// Configure HTTP servers
const httpServer = createServer(api.callback())

// Configure Apollo servers
gqlServer.start().then(() => gqlServer.applyMiddleware({ app: api, cors: false }))

// Start public HTTP server
httpServer.listen(API_BIND_PORT, () => {
  console.log(`@saeon/catalogue API server ready`)
  console.log(`@saeon/catalogue GraphQL server ready`)
})
