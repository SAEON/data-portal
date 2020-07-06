import apolloServerKoa from 'apollo-server-koa'
import graphqlTools from 'graphql-tools'
import { join } from 'path'
import { readFileSync } from 'fs'
import resolvers from './resolvers/index.js'
import { GQL_PROVIDER } from '../config.js'
import getCurrentDirectory from '../lib/get-current-directory.js'

const { ApolloServer } = apolloServerKoa
const { makeExecutableSchema } = graphqlTools

const typeDefsPath = join(getCurrentDirectory(import.meta), './schema.graphql')
const typeDefs = readFileSync(typeDefsPath, { encoding: 'utf8' })

export default () =>
  new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers, inheritResolversFromInterfaces: true }),
    introspection: true,
    playground: {
      subscriptionEndpoint: `${GQL_PROVIDER}/graphql`,
      settings: {
        'editor.theme': 'light',
      },
    },
    subscriptions: {
      onConnect: () => null,
      onDisconnect: () => null,
    },
    context: ({ ctx }) => ctx,
  })
