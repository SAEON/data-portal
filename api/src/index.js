import '@saeon/logger'
import './lib/native-extensions.js'
import './lib/log-config.js'
import { createServer } from 'http'
import zlib from 'zlib'
import Koa from 'koa'
import KoaRouter from '@koa/router'
import koaCompress from 'koa-compress'
import koaBody from 'koa-bodyparser'
import koaSession from 'koa-session'
import koaPassport from 'koa-passport'
import mount from 'koa-mount'
import {
  API_BIND_PORT,
  SERVER_TASKS,
  SAEON_ODP_INTEGRATION_SCHEDULE,
  SITEMAP_INTEGRATION_SCHEDULE,
  APP_KEY,
} from './config/index.js'
import { Task } from './lib/task-manager/index.js'
import hoursToMilliseconds from './lib/hours-to-ms.js'
import restrictCors from './middleware/restrict-cors.js'
import openCors from './middleware/open-cors.js'
import blacklistRoutes from './middleware/blacklist-routes.js'
import whitelistRoutes from './middleware/whitelist-routes.js'
import reactClient, { templateServer, robotsTxt } from './middleware/file-server/index.js'
import clientSession from './middleware/client-session.js'
import fourOFour from './middleware/404.js'
import createRequestContext from './middleware/create-request-context.js'
import saeonOdpIntegration from './integrations/saeon-odp/index.js'
import sitemapGenerator from './integrations/sitemap/index.js'
import gqlServer from './graphql/index.js'
import {
  authenticate as authenticateRoute,
  loginSuccess as loginSuccessRoute,
  clientInfo as clientInfoRoute,
  downloadProxy as downloadProxyRoute,
  login as loginRoute,
  logout as logoutRoute,
  home as homeRoute,
  oauthAuthenticationCallback as oauthAuthenticationCallbackRoute,
} from './http/index.js'
import './passport/index.js'

// Schedule integration with SAEON ODP
if (SAEON_ODP_INTEGRATION_SCHEDULE) {
  SERVER_TASKS.addTask(
    new Task(
      { schedule: SAEON_ODP_INTEGRATION_SCHEDULE, id: 'SAEON ODP Metadata integration' },
      saeonOdpIntegration
    )
  )
}

// Schedule the sitemap build
if (SITEMAP_INTEGRATION_SCHEDULE) {
  SERVER_TASKS.addTask(
    new Task(
      { schedule: SITEMAP_INTEGRATION_SCHEDULE, id: 'SAEON Data Portal sitemap.xml builder' },
      sitemapGenerator
    )
  )
}

// Configure public API
const api = new Koa()
api.keys = [APP_KEY]
api.proxy = true

api
  .use(
    koaCompress({
      threshold: 2048,
      flush: zlib.constants.Z_SYNC_FLUSH,
      gzip: {
        level: 3,
      },
      br: false,
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
      .get('/robots.txt', robotsTxt)
      .get('/http', homeRoute)
      .get('/http/client-info', clientInfoRoute)
      .get('/http/download-proxy', downloadProxyRoute)
      .get('/http/authenticate/redirect', oauthAuthenticationCallbackRoute, loginSuccessRoute) // passport
      .get('/http/login', loginRoute) // passport
      .get('/http/authenticate', authenticateRoute)
      .get('/http/logout', logoutRoute)
      .routes()
  )
  .use(mount('/', reactClient))
  .use(blacklistRoutes(templateServer, '/http', '/graphql')) // Resolve all paths to the React.js entry (SPA)
  .use(fourOFour)

// Configure HTTP servers
const httpServer = createServer(api.callback())

// Configure Apollo servers
gqlServer.start().then(() => gqlServer.applyMiddleware({ app: api, cors: false }))

// Start public HTTP server
httpServer.listen(API_BIND_PORT, () => {
  console.log(`@saeon/catalogue API server ready`)
  console.log(`@saeon/catalogue GraphQL server ready`)
})
