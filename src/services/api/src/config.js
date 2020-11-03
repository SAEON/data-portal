import getCurrentDirectory from './lib/get-current-directory.js'
import { join, normalize } from 'path'
import { mkdirSync, existsSync } from 'fs'
import { tmpdir } from 'os'
import { config } from 'dotenv'
config()

const __dirname = getCurrentDirectory(import.meta)

export const CATALOGUE_LATEST_COMMIT = process.env.CATALOGUE_LATEST_COMMIT || ''

export const CATALOGUE_DEPLOYMENT_ENV = process.env.CATALOGUE_DEPLOYMENT_ENV || 'development'

export const CATALOGUE_API_NODE_ENV = process.env.CATALOGUE_API_NODE_ENV || 'development'

export const CATALOGUE_API_INDEX_REBUILD_SCHEDULE =
  process.env.CATALOGUE_API_INDEX_REBUILD_SCHEDULE || '0 0 0 * * *'

export const CATALOGUE_API_INDEX_REBUILD = process.env.CATALOGUE_API_INDEX_REBUILD || 'disabled'

export const MONGO_DB = process.env.MONGO_DB || 'catalogue'

export const MONGO_DB_ADDRESS = process.env.MONGO_DB_ADDRESS || 'mongodb://localhost:27017'

export const MONGO_DB_USERNAME = process.env.MONGO_DB_USERNAME || 'admin'

export const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || 'password'

export const CATALOGUE_API_RESET_POSTGIS = process.env.CATALOGUE_API_RESET_POSTGIS || 'disabled'

export const POSTGIS_DB = process.env.POSTGIS_DB || 'catalogue'

export const POSTGIS_HOST = process.env.POSTGIS_HOST || 'localhost'

export const POSTGIS_PORT = process.env.POSTGIS_PORT || 5432

export const POSTGIS_USERNAME = process.env.POSTGIS_USERNAME || 'admin'

export const POSTGIS_PASSWORD = process.env.POSTGIS_PASSWORD || 'password'

export const POSTGIS_FOREIGN_HOST = process.env.POSTGIS_FOREIGN_HOST || 'localhost'

export const POSTGIS_FOREIGN_DB = process.env.POSTGIS_FOREIGN_DB || 'public'

export const POSTGIS_FOREIGN_USERNAME = process.env.POSTGIS_FOREIGN_USERNAME || 'postgres'

export const POSTGIS_FOREIGN_PASSWORD = process.env.POSTGIS_FOREIGN_PASSWORD || 'password'

export const CATALOGUE_API_PORT = process.env.CATALOGUE_API_PORT || 3000

export const CATALOGUE_API_GQL_ADDRESS =
  process.env.CATALOGUE_API_GQL_ADDRESS || 'http://localhost:3000/graphql'

export const CATALOGUE_PROXY_ADDRESS =
  process.env.CATALOGUE_PROXY_ADDRESS || 'http://localhost:8001'

export const CATALOGUE_API_ALLOWED_ORIGINS =
  process.env.CATALOGUE_API_ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:3001'

export const ODP_ADDRESS = process.env.ODP_ADDRESS || 'https://odp.saeon.dvn/api/catalogue'

export const ELASTICSEARCH_ADDRESS = process.env.ELASTICSEARCH_ADDRESS || `http://localhost:9200`

export const CATALOGUE_API_ELASTICSEARCH_TEMPLATE_NAME =
  process.env.CATALOGUE_API_ELASTICSEARCH_TEMPLATE_NAME || 'saeon-odp'

export const CATALOGUE_API_ELASTICSEARCH_INDEX_NAME = `${CATALOGUE_API_ELASTICSEARCH_TEMPLATE_NAME}-${
  process.env.CATALOGUE_API_ELASTICSEARCH_INDEX_NAME || 'catalogue-search'
}`

export const CATALOGUE_API_RESET_ELASTICSEARCH_TEMPLATE =
  process.env.CATALOGUE_API_RESET_ELASTICSEARCH_TEMPLATE || 'enabled'

export const CATALOGUE_API_RESET_ELASTICSEARCH_INDEX =
  process.env.CATALOGUE_API_RESET_ELASTICSEARCH_INDEX || 'enabled'

export const CATALOGUE_API_TEMP_DIRECTORY =
  process.env.CATALOGUE_API_TEMP_DIRECTORY || normalize(join(tmpdir(), 'catalogue-api'))

if (!existsSync(CATALOGUE_API_TEMP_DIRECTORY)) {
  mkdirSync(CATALOGUE_API_TEMP_DIRECTORY)
}

const mask = str => str?.replace(/./g, '*')

console.log('Configuration', {
  CATALOGUE_API_NODE_ENV,
  CATALOGUE_DEPLOYMENT_ENV,
  MONGO_DB,
  MONGO_DB_USERNAME: mask(MONGO_DB_USERNAME),
  MONGO_DB_PASSWORD: mask(MONGO_DB_PASSWORD),
  MONGO_DB_ADDRESS,
  POSTGIS_DB,
  POSTGIS_HOST,
  POSTGIS_USERNAME: mask(POSTGIS_USERNAME),
  POSTGIS_PASSWORD: mask(POSTGIS_PASSWORD),
  POSTGIS_PORT,
  POSTGIS_FOREIGN_HOST,
  POSTGIS_FOREIGN_DB,
  POSTGIS_FOREIGN_USERNAME: mask(POSTGIS_FOREIGN_USERNAME),
  POSTGIS_FOREIGN_PASSWORD: mask(POSTGIS_FOREIGN_PASSWORD),
  CATALOGUE_API_PORT,
  CATALOGUE_PROXY_ADDRESS,
  CATALOGUE_API_ALLOWED_ORIGINS,
  CATALOGUE_API_GQL_ADDRESS,
  ELASTICSEARCH_ADDRESS,
  CATALOGUE_API_ELASTICSEARCH_INDEX_NAME,
  CATALOGUE_API_RESET_ELASTICSEARCH_TEMPLATE,
  CATALOGUE_API_RESET_ELASTICSEARCH_INDEX,
  CATALOGUE_API_INDEX_REBUILD,
  CATALOGUE_API_TEMP_DIRECTORY,
})
