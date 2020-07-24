import apolloServerKoa from 'apollo-server-koa'
import graphqlTools from 'graphql-tools'
import { join } from 'path'
import { readFileSync } from 'fs'
import resolvers from './resolvers/index.js'
import { GQL_PROVIDER } from '../config.js'
import getCurrentDirectory from '../lib/get-current-directory.js'
import { getCitationStyles, getCitationLocales } from './schema/citation.js'

const { ApolloServer } = apolloServerKoa
const { makeExecutableSchema } = graphqlTools

const typeDefsPath = join(getCurrentDirectory(import.meta), './schema.graphql')
var typeDefs =
  readFileSync(typeDefsPath, { encoding: 'utf8' }) +
  `
enum CitationStyle {
  ${(await getCitationStyles()).map(str => str.replace(/-/g, '_')).join('\n')}
}` +
  `
enum CitationLocale {
  ${(await getCitationLocales()).map(str => str.replace(/-/g, '_')).join('\n')}
}`

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
