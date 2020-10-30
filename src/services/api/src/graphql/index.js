import { ApolloServer } from 'apollo-server-koa'
import { GQL_PROVIDER } from '../config.js'
import schema from './schema/index.js'

export default () =>
  new ApolloServer({
    schema,
    introspection: true,
    playground: {
      subscriptionEndpoint: `${GQL_PROVIDER}`,
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
