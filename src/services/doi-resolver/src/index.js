import '@saeon/logger'
import { createServer } from 'http'
import Koa from 'koa'
import KoaRouter from '@koa/router'
import { NODE_ENV, PORT } from './config.js'
import home from './http/home.js'
import resolve from './http/resolve.js'

if (!NODE_ENV || !['production', 'development'].includes(NODE_ENV)) {
  console.error(
    new Error(
      'The server MUST be started with a NODE_ENV environment variable, with a value of either "production" or "development"'
    )
  )
  process.exit(1)
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
 * Setup HTTP routes
 */
const router = new KoaRouter()
router.all('/', home).get('/resolve/:id', resolve)

/**
 * Create the Node.js HTTP server callback
 * This is the function passed to http.createServer()
 */
app.use(router.routes())

/**
 * Configure the HTTP server with the callback
 * that is the Koa app function object
 */
const httpServer = createServer(app.callback())

/**
 * Start the HTTP server
 */
httpServer.listen(PORT, () => {
  console.log(`@saeon/doi-resolver ready at ${PORT}`)
})
