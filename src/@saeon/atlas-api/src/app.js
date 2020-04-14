import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import compression from 'compression'
import { handleAsync } from './lib'
import resolvers from './resolvers'
import graphqlHTTP from 'express-graphql'
import { makeExecutableSchema } from 'graphql-tools'
import { normalize, join } from 'path'
import { readFileSync } from 'fs'
import { createRequestContext, cors, proxy } from './middleware'
import { homeRoute } from './routes'
import { NODE_ENV } from './config'

const router = express.Router()

if (!['production', 'development'].includes(NODE_ENV)) {
  console.error(
    new Error(
      'The server MUST be started with a NODE_ENV environment variable, with a value of either "production" or "development"'
    )
  )
  process.exit(1)
}

// GraphQL
const typeDefsPath = normalize(join(__dirname, './schema.graphql'))
const typeDefs = readFileSync(typeDefsPath, { encoding: 'utf8' })
const schema = makeExecutableSchema({ typeDefs, resolvers })

const app = express()
app.use(morgan('short'))
app.use(cors)
app.use('/proxy', proxy)
app.use(
  compression({
    filter: (req, res) => (req.headers['x-no-compression'] ? false : compression.filter(req, res)),
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(handleAsync(createRequestContext({ schema })))
app.use(express.static(join(__dirname, '../public')))

// GraphQL
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

// Router
app.use('/', handleAsync(router.get('/', homeRoute)))

export default app
