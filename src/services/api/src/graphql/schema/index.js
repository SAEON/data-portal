import graphqlTools from 'graphql-tools'
import { join } from 'path'
import { readFileSync } from 'fs'
import getCurrentDirectory from '../../lib/get-current-directory.js'
import { getCitationLocales, getCitationStyles } from './_dynamic-enums.js'
import resolvers from '../resolvers/index.js'

const { makeExecutableSchema } = graphqlTools

const typeDefsPath = join(getCurrentDirectory(import.meta), './schema.graphql')

const typeDefs =
  readFileSync(typeDefsPath, { encoding: 'utf-8' }) +
  `
enum CitationStyle {
  ${(await getCitationStyles()).map(str => str.replace(/-/g, '_')).join('\n')}
}` +
  `
enum CitationLocale {
  ${(await getCitationLocales()).map(str => str.replace(/-/g, '_')).join('\n')}
}`

export default makeExecutableSchema({ typeDefs, resolvers, inheritResolversFromInterfaces: true })
