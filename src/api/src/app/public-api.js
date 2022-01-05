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
import pgDumpRoute from '../http/pg-dump/index.js'
import loginSuccessRoute from '../http/login-success.js'
import metadataRecordsRoute from '../http/metadata-records/index.js'
import oauthAuthenticationCallbackRoute from '../http/oauth-authentication-callback.js'
import loginRoute from '../http/login.js'
import Koa from 'koa'
import KoaRouter from '@koa/router'
import koaCompress from 'koa-compress'
import koaBody from 'koa-bodyparser'
import zlib from 'zlib'
import createRequestContext from '../middleware/create-request-context.js'
import hoursToMilliseconds from '../lib/hours-to-ms.js'
import '../passport/index.js'
import { APP_KEY } from '../config/index.js'

export default () => {
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
        .get('/authenticate/redirect', oauthAuthenticationCallbackRoute, loginSuccessRoute) // passport
        .get('/login', loginRoute) // passport
        .get('/authenticate', authenticateRoute)
        .get('/logout', logoutRoute)
        .routes()
    )

  return publicApp
}
