import { join } from 'path'
import { mkdirSync, rmdirSync } from 'fs'
import getCurrentDirectory from './lib/get-current-directory.js'
import ensureDirectory from './lib/ensure-directory.js'
import { config } from 'dotenv'
config()

const __dirname = getCurrentDirectory(import.meta)
const __apiRootDirectory = join(__dirname, '../')

export const CATALOGUE_API_KEY =
  process.env.CATALOGUE_API_KEY || '7cwANClfrqqNFmpOmcP0OzWDzdcras0EdIqD3RAUUCU='

export const CATALOGUE_DEFAULT_ADMIN_EMAIL_ADDRESSES =
  process.env.CATALOGUE_DEFAULT_ADMIN_EMAIL_ADDRESSES || ''

export const CATALOGUE_API_TWITTER_CLIENT_ID = process.env.CATALOGUE_API_TWITTER_CLIENT_ID || ''
export const CATALOGUE_API_TWITTER_CLIENT_SECRET =
  process.env.CATALOGUE_API_TWITTER_CLIENT_SECRET || ''
export const CATALOGUE_API_TWITTER_OAUTH_REDIRECT_ADDRESS =
  process.env.CATALOGUE_API_TWITTER_OAUTH_REDIRECT_ADDRESS ||
  'http://localhost:3000/authenticate/redirect/twitter'

export const CATALOGUE_API_GOOGLE_CLIENT_ID = process.env.CATALOGUE_API_GOOGLE_CLIENT_ID || ''
export const CATALOGUE_API_GOOGLE_CLIENT_SECRET =
  process.env.CATALOGUE_API_GOOGLE_CLIENT_SECRET || ''
export const CATALOGUE_API_GOOGLE_OAUTH_REDIRECT_ADDRESS =
  process.env.CATALOGUE_API_GOOGLE_OAUTH_REDIRECT_ADDRESS ||
  'http://localhost:3000/authenticate/redirect/google'

export const CATALOGUE_API_ODP_USER_AUTH_CLIENT_ID =
  process.env.CATALOGUE_API_ODP_USER_AUTH_CLIENT_ID || 'saeon-data-portal'
export const CATALOGUE_API_ODP_USER_AUTH_CLIENT_SECRET =
  process.env.CATALOGUE_API_ODP_USER_AUTH_CLIENT_SECRET || ''
export const CATALOGUE_API_ODP_USER_AUTH_CLIENT_SCOPES =
  process.env.CATALOGUE_API_ODP_USER_AUTH_CLIENT_SCOPES || 'ODP.Catalogue,openid,offline'
export const CATALOGUE_API_ODP_USER_AUTH_CLIENT_REDIRECT_ADDRESS =
  process.env.CATALOGUE_API_ODP_USER_AUTH_CLIENT_REDIRECT_ADDRESS ||
  'http://localhost:3000/authenticate/redirect/saeon-identity-server'

export const CATALOGUE_API_ODP_CLIENT_ID =
  process.env.CATALOGUE_API_ODP_CLIENT_ID || 'catalogue-api-odp-client-id'

export const CATALOGUE_API_ODP_AUTH_ADDRESS =
  process.env.CATALOGUE_API_ODP_AUTH_ADDRESS || 'https://odp.saeon.dvn/auth'

export const CATALOGUE_API_ODP_CLIENT_SECRET = process.env.CATALOGUE_API_ODP_CLIENT_SECRET || ''

export const CATALOGUE_API_ODP_AUTH_SCOPE =
  process.env.CATALOGUE_API_ODP_AUTH_SCOPE || 'ODP.Catalogue'

export const CATALOGUE_CURATOR_CONTACT = process.env.CATALOGUE_CURATOR_CONTACT || 'leo@saeon.ac.za'

export const CATALOGUE_DOCKER_NETWORK = process.env.CATALOGUE_DOCKER_NETWORK || 'catalogue'

export const CATALOGUE_LATEST_COMMIT = process.env.CATALOGUE_LATEST_COMMIT || ''

export const CATALOGUE_DEPLOYMENT_ENV = process.env.CATALOGUE_DEPLOYMENT_ENV || 'development'

export const CATALOGUE_API_NODE_ENV = process.env.CATALOGUE_API_NODE_ENV || 'development'

export const MONGO_DB = process.env.MONGO_DB || 'catalogue'

export const MONGO_DB_ADDRESS = process.env.MONGO_DB_ADDRESS || 'mongodb://localhost:27017'

export const MONGO_DB_USERNAME = process.env.MONGO_DB_USERNAME || 'admin'

export const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || 'password'

export const POSTGIS_DB = process.env.POSTGIS_DB || 'databooks'

/**
 * Local development the API doesn't run dockerized,
 * so PostGIS is on local. However the ogr2ogr
 * commands still require addressing PostGIS via the
 * Docker network.
 */
export const POSTGIS_HOST_DEV = process.env.POSTGIS_HOST_DEV || 'localhost'
export const POSTGIS_HOST = process.env.POSTGIS_HOST || 'postgis'

export const POSTGIS_PORT = process.env.POSTGIS_PORT || 5432

export const POSTGIS_USERNAME = process.env.POSTGIS_USERNAME || 'admin'

export const POSTGIS_PASSWORD = process.env.POSTGIS_PASSWORD || 'password'

export const CATALOGUE_API_ADDRESS = process.env.CATALOGUE_API_ADDRESS || 'http://localhost:3000'

export const CATALOGUE_API_ADDRESS_PORT = process.env.CATALOGUE_API_ADDRESS_PORT || 3000

export const CATALOGUE_API_GQL_ADDRESS = `${CATALOGUE_API_ADDRESS}/graphql`

export const CATALOGUE_API_INTERNAL_ADDRESS =
  process.env.CATALOGUE_API_INTERNAL_ADDRESS || 'http://localhost:4000'

export const CATALOGUE_API_INTERNAL_ADDRESS_PORT =
  process.env.CATALOGUE_API_INTERNAL_ADDRESS || 4000

export const CATALOGUE_API_INTERNAL_GQL_ADDRESS = `${CATALOGUE_API_INTERNAL_ADDRESS}/graphql`

export const CATALOGUE_API_PROXY_ADDRESS =
  process.env.CATALOGUE_API_PROXY_ADDRESS || 'http://localhost:8001'

export const CATALOGUE_API_ALLOWED_ORIGINS =
  process.env.CATALOGUE_API_ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:3001'

export const ODP_ADDRESS = process.env.ODP_ADDRESS || 'https://odp.saeon.dvn/api/catalogue'

export const CATALOGUE_API_ODP_FILTER_PATH = process.env.CATALOGUE_API_ODP_FILTER_PATH
  ? join(__apiRootDirectory, process.env.CATALOGUE_API_ODP_FILTER_PATH)
  : join(__dirname, '../../../../deployment-configs/next/odp-filter.js')

export const CATALOGUE_API_ODP_FILTER = await import(CATALOGUE_API_ODP_FILTER_PATH).then(
  ({ default: fn }) => fn
)

export const CATALOGUE_API_ODP_INTEGRATION_BATCH_SIZE =
  process.env.CATALOGUE_API_ODP_INTEGRATION_BATCH_SIZE || 100

export const CATALOGUE_API_ODP_DEBUG_IDS = process.env.CATALOGUE_API_ODP_DEBUG_IDS || ''

export const ELASTICSEARCH_ADDRESS = process.env.ELASTICSEARCH_ADDRESS || `http://localhost:9200`

export const POSTGIS_IMAGE_NAME = process.env.POSTGIS_IMAGE_NAME || 'postgis'

export const CATALOGUE_API_ELASTICSEARCH_TEMPLATE_NAME =
  process.env.CATALOGUE_API_ELASTICSEARCH_TEMPLATE_NAME || 'saeon-odp'

export const CATALOGUE_API_ELASTICSEARCH_INDEX_NAME = `${CATALOGUE_API_ELASTICSEARCH_TEMPLATE_NAME}-${
  process.env.CATALOGUE_API_ELASTICSEARCH_INDEX_NAME || 'catalogue-search'
}`

export const CATALOGUE_DOCKER_TMP_VOLUME =
  process.env.CATALOGUE_DOCKER_TMP_VOLUME || '/tmp/catalogue-api'

export const CATALOGUE_API_TEMP_DIRECTORY = '/tmp/catalogue-api'

export const CATALOGUE_DOCKER_DATA_VOLUME =
  process.env.CATALOGUE_DOCKER_DATA_VOLUME || '/var/lib/catalogue-api'

export const CATALOGUE_API_DATA_DIRECTORY = '/var/lib/catalogue-api'

export const CATALOGUE_CLIENT_ID = process.env.CATALOGUE_CLIENT_ID || 'client.sess'

export const POSTGIS_CONTAINER_NAME = process.env.POSTGIS_CONTAINER_NAME || 'postgis'

const mask = str => str?.replace(/./g, '*').padEnd(60, '*')

console.log(
  'Configuration',
  Object.fromEntries(
    Object.entries({
      POSTGIS_CONTAINER_NAME,
      CATALOGUE_DOCKER_DATA_VOLUME,
      CATALOGUE_DOCKER_TMP_VOLUME,
      POSTGIS_IMAGE_NAME,
      CATALOGUE_API_DATA_DIRECTORY,
      CATALOGUE_API_INTERNAL_ADDRESS,
      CATALOGUE_API_INTERNAL_GQL_ADDRESS,
      CATALOGUE_API_ADDRESS_PORT,
      CATALOGUE_API_INTERNAL_ADDRESS_PORT,
      CATALOGUE_API_ADDRESS,
      CATALOGUE_DEFAULT_ADMIN_EMAIL_ADDRESSES,
      CATALOGUE_API_GOOGLE_OAUTH_REDIRECT_ADDRESS,
      CATALOGUE_API_KEY: mask(CATALOGUE_API_KEY),
      CATALOGUE_API_GOOGLE_CLIENT_ID,
      CATALOGUE_CLIENT_ID,
      CATALOGUE_CURATOR_CONTACT,
      CATALOGUE_API_ODP_USER_AUTH_CLIENT_ID,
      CATALOGUE_API_ODP_USER_AUTH_CLIENT_SECRET,
      CATALOGUE_API_ODP_USER_AUTH_CLIENT_SCOPES,
      CATALOGUE_API_ODP_USER_AUTH_CLIENT_REDIRECT_ADDRESS,
      CATALOGUE_API_TWITTER_CLIENT_ID: CATALOGUE_API_TWITTER_CLIENT_ID,
      CATALOGUE_API_TWITTER_CLIENT_SECRET: mask(CATALOGUE_API_TWITTER_CLIENT_SECRET),
      CATALOGUE_API_GOOGLE_CLIENT_SECRET: mask(CATALOGUE_API_GOOGLE_CLIENT_SECRET),
      CATALOGUE_API_TWITTER_OAUTH_REDIRECT_ADDRESS,
      CATALOGUE_API_ODP_CLIENT_ID,
      CATALOGUE_API_ODP_AUTH_ADDRESS,
      CATALOGUE_API_ODP_CLIENT_SECRET: mask(CATALOGUE_API_ODP_CLIENT_SECRET),
      CATALOGUE_API_ODP_AUTH_SCOPE,
      ODP_ADDRESS,
      CATALOGUE_API_ODP_FILTER_PATH,
      CATALOGUE_API_ODP_FILTER: CATALOGUE_API_ODP_FILTER.toString(),
      CATALOGUE_API_ODP_INTEGRATION_BATCH_SIZE,
      CATALOGUE_API_ODP_DEBUG_IDS,
      CATALOGUE_API_NODE_ENV,
      CATALOGUE_DEPLOYMENT_ENV,
      CATALOGUE_DOCKER_NETWORK,
      MONGO_DB,
      MONGO_DB_USERNAME: mask(MONGO_DB_USERNAME),
      MONGO_DB_PASSWORD: mask(MONGO_DB_PASSWORD),
      MONGO_DB_ADDRESS,
      POSTGIS_DB,
      POSTGIS_HOST,
      POSTGIS_USERNAME: mask(POSTGIS_USERNAME),
      POSTGIS_PASSWORD: mask(POSTGIS_PASSWORD),
      POSTGIS_PORT,
      CATALOGUE_API_PROXY_ADDRESS,
      CATALOGUE_API_ALLOWED_ORIGINS,
      CATALOGUE_API_GQL_ADDRESS,
      ELASTICSEARCH_ADDRESS,
      CATALOGUE_API_ELASTICSEARCH_INDEX_NAME,
      CATALOGUE_API_TEMP_DIRECTORY,
    }).sort(([aKey], [bKey]) => {
      if (aKey > bKey) return 1
      if (bKey > aKey) return -1
      return 0
    })
  )
)

/**
 * Ensure temporary directory exists
 */
try {
  ensureDirectory(CATALOGUE_API_TEMP_DIRECTORY)
  mkdirSync(join(CATALOGUE_API_TEMP_DIRECTORY, '.test-write-permissions'))
  rmdirSync(join(CATALOGUE_API_TEMP_DIRECTORY, '.test-write-permissions'))
} catch (error) {
  console.error(
    'Please create directory',
    CATALOGUE_API_TEMP_DIRECTORY,
    'that can be used by the current process'
  )
  process.exit(1)
}

/**
 * Ensure data directory exists
 */
try {
  ensureDirectory(CATALOGUE_API_DATA_DIRECTORY)
  mkdirSync(join(CATALOGUE_API_DATA_DIRECTORY, '.test-write-permissions'))
  rmdirSync(join(CATALOGUE_API_DATA_DIRECTORY, '.test-write-permissions'))
} catch (error) {
  console.error(
    'Please create directory',
    CATALOGUE_API_DATA_DIRECTORY,
    'that can be used by the current process'
  )
  process.exit(1)
}
