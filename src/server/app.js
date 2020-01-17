import express from 'express'
import graphqlHTTP from 'express-graphql'
import { normalize, join } from 'path'
import { readFileSync } from 'fs'
import resolvers from './resolvers'
import { makeExecutableSchema } from 'graphql-tools'

const typeDefsPath = normalize(join(__dirname, './schema.graphql'))
const typeDefs = readFileSync(typeDefsPath, { encoding: 'utf8' })
const schema = makeExecutableSchema({ typeDefs, resolvers })
console.log('schema', schema)
const app = express()

app.get('/', (req, res) => res.send('hello world'))

//Make Graphiql available
app.use('/graphiql', graphqlHTTP({ schema, graphiql: true }))

export default app

//basic graphql requires a query and a resolver for the query using graphql-tools
