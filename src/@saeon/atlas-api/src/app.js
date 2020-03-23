// Express
import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import compression from 'compression'
import router from './routes'
import { createProxyMiddleware } from 'http-proxy-middleware'

// GraphQL
import resolvers from './resolvers'
import graphqlHTTP from 'express-graphql'
import { makeExecutableSchema } from 'graphql-tools'

// Standard Library
import { normalize, join } from 'path'
import { readFileSync } from 'fs'

// Configuration / other
import { config } from 'dotenv'

config()
if (!process.env.NODE_ENV || !['PRODUCTION', 'DEVELOPMENT'].includes(process.env.NODE_ENV)) {
  throw new Error(
    'The server MUST be started with a NODE_ENV environment variable, with a value of either "production" or "development"'
  )
}

// Helper for allowing async / await with middleware
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.error('Top level application error', error)
    return next()
  })

const corsMiddleware = ((ALLOWED_ORIGINS) => {
  console.log('Allowed origins registered', ALLOWED_ORIGINS)
  return (req, res, next) => {
    const { method, headers } = req
    const { origin } = headers
    console.log(`Checking CORS policy`, `${origin}`, `${ALLOWED_ORIGINS.includes(origin)}`)
    if (ALLOWED_ORIGINS.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    }
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.header('Access-Control-Allow-Credentials', true)
    if (method === 'OPTIONS') {
      res.sendStatus(200)
    } else {
      next()
    }
  }
})(
  process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:4000',
        'http://localhost:4001',
      ]
)

const compressionFilter = (req, res) =>
  req.headers['x-no-compression'] ? false : compression.filter(req, res)

// GraphQL
const typeDefsPath = normalize(join(__dirname, './schema.graphql'))
const typeDefs = readFileSync(typeDefsPath, { encoding: 'utf8' })
const schema = makeExecutableSchema({ typeDefs, resolvers })

// Middleware
const app = express()
app.use(
  asyncHandler(async (req, res, next) => {
    req.ctx = {
      db: {},
      schema,
    }
    next()
  })
)
app.use(compression({ filter: compressionFilter }))
app.use(morgan('short'))
app.use(corsMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(join(__dirname, '../public')))
app.use('/', asyncHandler(router))
app.use(
  '/graphiql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: false,
  })
)

// Simple search
// TODO - https://github.com/chimurai/http-proxy-middleware#context-matching
// The path matching needs to be a little better
app.use(
  '/saeon-metadata',
  createProxyMiddleware({
    target: 'http://192.168.116.66:9210',
    changeOrigin: true,
    pathRewrite: {
      '/saeon-metadata/search': '/search',
      '/saeon-metadata/faceted_search': '/faceted_search',
      '/saeon-metadata': '/search',
    },
  })
)

app.use(
  '/saeon-elastic-search',
  createProxyMiddleware({
    target: 'http://192.168.116.66:9200',
    changeOrigin: true,
    pathRewrite: {
      '/saeon-metadata-search': '/',
    },
  })
)

app.use(
  '/csir',
  createProxyMiddleware({
    target: 'https://pta-gis-2-web1.csir.co.za/server2/rest/services',
    changeOrigin: true,
    pathRewrite: {
      '/csir': '/',
    },
  })
)

export default app
