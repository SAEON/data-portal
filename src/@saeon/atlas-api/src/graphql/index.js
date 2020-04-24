import { ApolloServer } from 'apollo-server-koa'
import { normalize, join } from 'path'
import { readFileSync } from 'fs'
import resolvers from './resolvers'
import { GQL_PROVIDER } from '../config'

const typeDefsPath = normalize(join(__dirname, './schema.graphql'))
const typeDefs = readFileSync(typeDefsPath, { encoding: 'utf8' })

export default () =>
  new ApolloServer({
    introspection: true,
    typeDefs,
    resolvers,
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
