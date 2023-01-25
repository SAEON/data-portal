import { makeExecutableSchema } from '@graphql-tools/schema'
import { join } from 'path'
import { readFileSync } from 'fs'
import getCurrentDirectory from '../../lib/get-current-directory.js'
import datacite from './datacite.graphql/index.js'
import * as resolvers from '../resolvers/index.js'
import collections from '../../mongo/collections/index.js'

const {
  Logs: {
    validator: {
      $jsonSchema: {
        properties: {
          type: { enum: _logTypes },
        },
      },
    },
  },
} = collections

const _import = p =>
  readFileSync(join(getCurrentDirectory(import.meta), p), {
    encoding: 'utf-8',
  })

const logTypes = `
  enum LogType {
    ${_logTypes.join('\n')}
  }`

const typeDefs = `
  ${_import('./_schema.graphql')}
  ${_import('./_user.graphql')}
  ${_import('./_catalogue.graphql')}
  ${datacite}
  ${logTypes}`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  inheritResolversFromInterfaces: true,
})

export default schema
