import koaSession from 'koa-session'
import koaPassport from 'koa-passport'
import restrictCors from '../middleware/restrict-cors.js'
import openCors from '../middleware/open-cors.js'
import blacklistRoutes from '../middleware/blacklist-routes.js'
import whitelistRoutes from '../middleware/whitelist-routes.js'
import clientSession from '../middleware/client-session.js'
import clientInfoRoute from '../http/client-info.js'
import downloadProxyRoute from '../http/download-proxy.js'
import sqlPrivate from '../http/sql-private.js'
import sqlPublic from '../http/sql-public.js'
import authenticateRoute from '../http/authenticate.js'
import logoutRoute from '../http/logout.js'
import homeRoute from '../http/home.js'
import fourOFour from '../middleware/404.js'
import mount from 'koa-mount'
import pgDumpRoute from '../http/pg-dump/index.js'
import loginSuccessRoute from '../http/login-success.js'
import metadataRecordsRoute from '../http/metadata-records/index.js'
import oauthAuthenticationCallbackRoute from '../http/oauth-authentication-callback.js'
import loginRoute from '../http/login.js'
import Koa from 'koa'
import KoaRouter from '@koa/router'
import koaCompress from 'koa-compress'
import koaBody from 'koa-bodyparser'
import serve from 'koa-static'
import zlib from 'zlib'
import path from 'path'
import createRequestContext from '../middleware/create-request-context.js'
import hoursToMilliseconds from '../lib/hours-to-ms.js'
import '../passport/index.js'
import { APP_KEY } from '../config/index.js'
import getCurrentDirectory from '../lib/get-current-directory.js'

const __dirname = getCurrentDirectory(import.meta)

export default () => {
  // Configure static files server
const SPA_PATH = path.join(__dirname, '../../__clients')
const reactClient = new Koa()
reactClient.use(serve(SPA_PATH))

const staticSpaMiddleware = async (ctx, next) => {
  try {
    return await serve(SPA_PATH)(Object.assign(ctx, { path: 'index.html' }), next)
  } catch (error) {
    console.error('Error setting up static SPA middleware', error)
  }
}

// Configure public API
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
        .get('/http', homeRoute)
        .post('/http', homeRoute)
        .get('/http/client-info', clientInfoRoute)
        .post('/http/sql', sqlPrivate)
        .post('/http/query/:databookId', sqlPublic)
        .get('/http/pg-dump/:schema', pgDumpRoute)
        .get('/http/download-proxy', downloadProxyRoute)
        .get('/http/metadata-records', metadataRecordsRoute)
        .get('/http/authenticate/redirect', oauthAuthenticationCallbackRoute, loginSuccessRoute) // passport
        .get('/http/login', loginRoute) // passport
        .get('/http/authenticate', authenticateRoute)
        .get('/http/logout', logoutRoute)
        .routes()
    )
    .use(mount('/', reactClient))
    .use(blacklistRoutes(staticSpaMiddleware, '/http', '/graphql')) // Resolve all paths to the React.js entry (SPA)

  return publicApp
}
