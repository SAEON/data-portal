import { ApolloServer } from 'apollo-server-koa'
import { CATALOGUE_API_GQL_ADDRESS } from '../config.js'
import schema from './schema/index.js'

export default () =>
  new ApolloServer({
    schema,
    introspection: true,
    playground: {
      subscriptionEndpoint: `${CATALOGUE_API_GQL_ADDRESS}`,
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
