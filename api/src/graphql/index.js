import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground'
import { koaMiddleware } from '@as-integrations/koa'
import _schema from './schema/index.js'

export const schema = _schema

export default async ({ httpServer, api }) => {
  const apolloServer = new ApolloServer({
    uploads: false,
    schema,
    introspection: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground({
        settings: {
          'editor.cursorShape': 'line',
          'request.credentials': 'include',
          'editor.theme': 'light',
        },
      }),
    ],
  })

  await apolloServer.start()
  api.use(
    koaMiddleware(apolloServer, {
      context: async ({ ctx }) => {
        return ctx
      },
    })
  )
}
