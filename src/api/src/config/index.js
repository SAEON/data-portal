import { readFileSync } from 'fs'
import { join, normalize } from 'path'
import getCurrentDirectory from '../lib/get-current-directory.js'

const __dirname = getCurrentDirectory()

export const packageJson = JSON.parse(
  readFileSync(normalize(join(__dirname, '../../package.json')))
)

export * from './_deployment.js'
export * from './_app.js'
export * from './_mongo.js'
export * from './_postgis.js'
export * from './_elasticsearch.js'
export * from './_odp.js'
