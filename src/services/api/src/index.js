import '@saeon/logger'
import { createServer } from 'http'
import Koa from 'koa'
import KoaRouter from '@koa/router'
import koaCompress from 'koa-compress'
import bodyParser from 'koa-bodyparser'
import authenticate from './middleware/authenticate.js'
import createRequestContext from './middleware/create-request-context.js'
import cors from './middleware/cors.js'
import homeRoute from './http/home.js'
import authGoogleRedirect from './http/auth-google-redirect.js'
import metadataRecordsRoute from './http/metadata-records/index.js'
import zlib from 'zlib'
import configureApolloServer from './graphql/index.js'
import proxy from 'koa-proxies'
import configurePostgis from './postgis/setup/index.js'
import { configure as configureElasticsearch } from './elasticsearch/index.js'
import {
  CATALOGUE_API_NODE_ENV,
  CATALOGUE_API_PORT,
  CATALOGUE_PROXY_ADDRESS,
  CATALOGUE_API_SEED_POSTGIS_LAYERS,
  CATALOGUE_API_GOOGLE_CLIENT_SECRET,
  CATALOGUE_API_GOOGLE_CLIENT_ID,
} from './config.js'
import clientSession from './middleware/client-session.js'
import passport from 'koa-passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'

if (!CATALOGUE_API_NODE_ENV || !['production', 'development'].includes(CATALOGUE_API_NODE_ENV)) {
  console.error(
    new Error(
      'The server MUST be started with a CATALOGUE_API_NODE_ENV environment variable, with a value of either "production" or "development"'
    )
  )
  process.exit(1)
}

// Configure Elasticsearch
configureElasticsearch().then(() => console.log('Elasticsearch', 'configured'))

// Configure PostGIS
if (CATALOGUE_API_SEED_POSTGIS_LAYERS === 'enabled') {
  configurePostgis().then(() => console.log('PostGIS configured'))
} else {
  console.log('PostGIS', 'seeding disabled')
}

/**
 * Setup HTTP server (Koa)
 *
 * This server is deployed behind an Nginx proxy, accessible only via HTTPS
 * X-Forwarded-* headers can be trusted
 */
const app = new Koa()
app.proxy = true

/**
 * Setup authentication
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: CATALOGUE_API_GOOGLE_CLIENT_ID,
      clientSecret: CATALOGUE_API_GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/redirect',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('hi')
      return done(null, {})
    }
  )
)

/**
 * Setup HTTP routes
 */
const router = new KoaRouter()
router.get('/', homeRoute)
router.post('/', homeRoute)
router.get('/metadata-records', metadataRecordsRoute)
router.get('/auth/google/redirect', passport.authenticate('google'), authGoogleRedirect)
router.get('/auth/google', passport.authenticate('google', { scope: ['email'] }))

/**
 * Create the Node.js HTTP server callback
 * This is the function passed to http.createServer()
 */
app
  .use(cors)
  .use(bodyParser())
  .use(clientSession)
  .use(passport.initialize())
  .use(authenticate)
  .use(createRequestContext(app))
  .use(router.routes())
  .use(
    proxy('/proxy', {
      target: CATALOGUE_PROXY_ADDRESS,
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

/**
 * Configure the HTTP server with the callback
 * that is the Koa app function object
 */
const httpServer = createServer(app.callback())

/**
 * Add Apollo server to the Koa app as middleware
 */
const apolloServer = configureApolloServer()
apolloServer.applyMiddleware({ app })
apolloServer.installSubscriptionHandlers(httpServer)

/**
 * Start the HTTP server
 */
httpServer.listen(CATALOGUE_API_PORT, () => {
  console.log(`@saeon/catalogue API server ready at ${CATALOGUE_API_PORT}`)
  console.log(`@saeon/catalogue GraphQL server ready at ${apolloServer.graphqlPath}`)
  console.log(
    `@saeon/catalogue GraphQL subscriptions server ready at ${apolloServer.subscriptionsPath}`
  )
})
