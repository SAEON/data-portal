import { makeExecutableSchema } from 'graphql-tools'
import { join } from 'path'
import { readFileSync } from 'fs'
import getCurrentDirectory from '../../lib/get-current-directory.js'
import datacite from './datacite.graphql/index.js'
import resolvers from '../resolvers/index.js'

const _import = p =>
  readFileSync(join(getCurrentDirectory(import.meta), p), {
    encoding: 'utf-8',
  })

const typeDefs = `
  ${_import('./_schema.graphql')}
  ${_import('./_catalogue.graphql')}
  ${_import('./_browser.graphql')}
  ${datacite}`

export default makeExecutableSchema({
  typeDefs,
  resolvers,
  inheritResolversFromInterfaces: true,
})
