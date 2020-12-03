import { join, normalize } from 'path'
import { mkdirSync, existsSync } from 'fs'
import getCurrentDirectory from './lib/get-current-directory.js'
import { tmpdir } from 'os'
import { config } from 'dotenv'
config()

const __dirname = getCurrentDirectory(import.meta)

export const CATALOGUE_API_ODP_CLIENT_ID =
  process.env.CATALOGUE_API_ODP_CLIENT_ID || 'catalogue-api-odp-client-id'

export const CATALOGUE_API_ODP_AUTH_ADDRESS =
  process.env.CATALOGUE_API_ODP_AUTH_ADDRESS || 'https://odp.saeon.dvn/auth/oauth2/token'

export const CATALOGUE_API_ODP_CLIENT_SECRET = process.env.CATALOGUE_API_ODP_CLIENT_SECRET || ''

export const CATALOGUE_API_ODP_AUTH_SCOPE =
  process.env.CATALOGUE_API_ODP_AUTH_SCOPE || 'ODP.Catalogue'

export const CATALOGUE_DOCKER_NETWORK = process.env.CATALOGUE_DOCKER_NETWORK || 'catalogue'

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

export const POSTGIS_DB = process.env.POSTGIS_DB || 'databooks'

export const CATALOGUE_API_SEED_POSTGIS_LAYERS =
  process.env.CATALOGUE_API_SEED_POSTGIS_LAYERS || 'disabled'

/**
 * Local development the API doesn't run dockerized,
 * so PostGIS is on local. However the ogr2ogr
 * commands still require addressing PostGIS via the
 * Docker network
 */
export const POSTGIS_HOST_DEV = process.env.POSTGIS_HOST_DEV || 'localhost'
export const POSTGIS_HOST = process.env.POSTGIS_HOST || 'postgis'

export const POSTGIS_PORT = process.env.POSTGIS_PORT || 5432

export const POSTGIS_USERNAME = process.env.POSTGIS_USERNAME || 'admin'

export const POSTGIS_PASSWORD = process.env.POSTGIS_PASSWORD || 'password'

export const CATALOGUE_API_PORT = process.env.CATALOGUE_API_PORT || 3000

export const CATALOGUE_API_GQL_ADDRESS =
  process.env.CATALOGUE_API_GQL_ADDRESS || 'http://localhost:3000/graphql'

export const CATALOGUE_PROXY_ADDRESS =
  process.env.CATALOGUE_PROXY_ADDRESS || 'http://localhost:8001'

export const CATALOGUE_API_ALLOWED_ORIGINS =
  process.env.CATALOGUE_API_ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:3001'

export const ODP_ADDRESS = process.env.ODP_ADDRESS || 'https://odp.saeon.dvn/api/catalogue'

export const CATALOGUE_API_ODP_FILTER = process.env.CATALOGUE_API_ODP_FILTER_PATH
  ? await import(normalize(join(__dirname, '../', process.env.CATALOGUE_API_ODP_FILTER_PATH))).then(
      ({ default: fn }) => fn
    )
  : undefined

export const CATALOGUE_API_ODP_INTEGRATION_BATCH_SIZE =
  process.env.CATALOGUE_API_ODP_INTEGRATION_BATCH_SIZE || 100

export const CATALOGUE_API_ODP_DEBUG_IDS = process.env.CATALOGUE_API_ODP_DEBUG_IDS || ''

export const ELASTICSEARCH_ADDRESS = process.env.ELASTICSEARCH_ADDRESS || `http://localhost:9200`

export const CATALOGUE_API_ELASTICSEARCH_TEMPLATE_NAME =
  process.env.CATALOGUE_API_ELASTICSEARCH_TEMPLATE_NAME || 'saeon-odp'

export const CATALOGUE_API_ELASTICSEARCH_INDEX_NAME = `${CATALOGUE_API_ELASTICSEARCH_TEMPLATE_NAME}-${
  process.env.CATALOGUE_API_ELASTICSEARCH_INDEX_NAME || 'catalogue-search'
}`

export const CATALOGUE_API_RESET_ELASTICSEARCH_TEMPLATE =
  process.env.CATALOGUE_API_RESET_ELASTICSEARCH_TEMPLATE || 'disabled'

export const CATALOGUE_API_RESET_ELASTICSEARCH_INDEX =
  process.env.CATALOGUE_API_RESET_ELASTICSEARCH_INDEX || 'disabled'

export const CATALOGUE_API_TEMP_DIRECTORY =
  process.env.CATALOGUE_API_TEMP_DIRECTORY || normalize(join(tmpdir(), 'catalogue-api'))

if (!existsSync(CATALOGUE_API_TEMP_DIRECTORY)) {
  mkdirSync(CATALOGUE_API_TEMP_DIRECTORY)
}

const mask = str => str?.replace(/./g, '*')

console.log('Configuration', {
  CATALOGUE_API_ODP_CLIENT_ID,
  CATALOGUE_API_ODP_AUTH_ADDRESS,
  CATALOGUE_API_ODP_CLIENT_SECRET: mask(CATALOGUE_API_ODP_CLIENT_SECRET),
  CATALOGUE_API_ODP_AUTH_SCOPE,
  ODP_ADDRESS,
  CATALOGUE_API_ODP_INTEGRATION_BATCH_SIZE,
  CATALOGUE_API_ODP_DEBUG_IDS,
  CATALOGUE_API_NODE_ENV,
  CATALOGUE_DEPLOYMENT_ENV,
  CATALOGUE_DOCKER_NETWORK,
  CATALOGUE_API_SEED_POSTGIS_LAYERS,
  MONGO_DB,
  MONGO_DB_USERNAME: mask(MONGO_DB_USERNAME),
  MONGO_DB_PASSWORD: mask(MONGO_DB_PASSWORD),
  MONGO_DB_ADDRESS,
  POSTGIS_DB,
  POSTGIS_HOST,
  POSTGIS_USERNAME: mask(POSTGIS_USERNAME),
  POSTGIS_PASSWORD: mask(POSTGIS_PASSWORD),
  POSTGIS_PORT,
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
