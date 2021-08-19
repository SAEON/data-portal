import { join } from 'path'
import getCurrentDirectory from './lib/get-current-directory.js'
import ensureDirectory from './lib/ensure-directory.js'
import { config } from 'dotenv'
config()

const __dirname = getCurrentDirectory(import.meta)
const __apiRootDirectory = join(__dirname, '../')

/**
 * ODP general info
 */
export const ODP_ADDRESS = process.env.ODP_ADDRESS || 'https://odp.saeon.ac.za'
export const ODP_ADDRESS_CATALOGUE_ENDPOINT = `${ODP_ADDRESS}/api/catalogue`
export const ODP_AUTH_ADDRESS = `${ODP_ADDRESS}/auth`
export const ODP_LOGOUT_REDIRECT_ADDRESS = `${ODP_AUTH_ADDRESS}/oauth2/sessions/logout`

/**
 * ODP catalogue integration
 */
export const ODP_CLIENT_ID = process.env.ODP_CLIENT_ID || 'catalogue-api-odp-client-id'
export const ODP_CLIENT_SECRET = process.env.ODP_CLIENT_SECRET || ''
export const ODP_AUTH_SCOPE = process.env.ODP_AUTH_SCOPE || 'ODP.Catalogue'
export const ODP_FILTER_PATH = process.env.ODP_FILTER_PATH
  ? join(__apiRootDirectory, process.env.ODP_FILTER_PATH)
  : join(__dirname, '../../../deployment-configs/next/odp-filter.js')
export const ODP_FILTER = import(ODP_FILTER_PATH).then(({ default: fn }) => fn)
export const ODP_DEBUG_IDS = process.env.ODP_DEBUG_IDS || ''
export const ODP_INTEGRATION_BATCH_SIZE = process.env.ODP_INTEGRATION_BATCH_SIZE || 100

/**
 * Application config
 */
export const HOSTNAME = process.env.HOSTNAME || 'http://localhost:3001'
export const APP_KEY = process.env.APP_KEY || '7cwANClfrqqNFmpOmcP0OzWDzdcras0EdIqD3RAUUCU='
export const DEFAULT_ADMIN_EMAIL_ADDRESSES = process.env.DEFAULT_ADMIN_EMAIL_ADDRESSES || ''
export const DEFAULT_SYSADMIN_EMAIL_ADDRESSES = process.env.DEFAULT_SYSADMIN_EMAIL_ADDRESSES || ''
export const CURATOR_CONTACT = process.env.CURATOR_CONTACT || 'leo@saeon.ac.za'
export const GDAL_DOCKER_IMAGE = process.env.GDAL_DOCKER_IMAGE || 'osgeo/gdal:latest'
export const LATEST_COMMIT = process.env.LATEST_COMMIT || ''
export const API_PUBLIC_ADDRESS = process.env.API_PUBLIC_ADDRESS || 'http://localhost:3000'
export const PUBLIC_PORT = process.env.PUBLIC_PORT || 3000
export const PUBLIC_GQL_ADDRESS = `${API_PUBLIC_ADDRESS}/graphql`
export const API_INTERNAL_ADDRESS = process.env.API_INTERNAL_ADDRESS || 'http://localhost:4000'
export const INTERNAL_PORT = process.env.API_INTERNAL_ADDRESS || 4000
export const INTERNAL_GQL_ADDRESS = `${API_INTERNAL_ADDRESS}/graphql`
export const PROXY_ADDRESS = process.env.PROXY_ADDRESS || 'http://localhost:8001'
export const ALLOWED_ORIGINS =
  process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:3001'
export const TEMP_DIRECTORY = '/tmp/catalogue-api'
export const DATA_DIRECTORY = '/var/lib/catalogue-api'

/**
 * SSO via ODP
 */
export const ODP_SSO_CLIENT_ID = process.env.ODP_SSO_CLIENT_ID || 'SAEON.DataPortal'
export const ODP_SSO_CLIENT_SECRET = process.env.ODP_SSO_CLIENT_SECRET || ''
export const ODP_SSO_CLIENT_SCOPES = process.env.ODP_SSO_CLIENT_SCOPES || 'SAEON.DataPortal,openid'
export const ODP_SSO_CLIENT_REDIRECT =
  process.env.ODP_SSO_CLIENT_REDIRECT || `${API_PUBLIC_ADDRESS}/authenticate/redirect`
export const PASSPORT_SSO_SESSION_ID = process.env.PASSPORT_SSO_SESSION_ID || 'client.sess'

/**
 * Deployment config
 */
export const DOCKER_NETWORK = process.env.DOCKER_NETWORK || 'catalogue'
export const DEPLOYMENT_ENV = process.env.DEPLOYMENT_ENV || 'development'
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const DOCKER_TMP_VOLUME = process.env.DOCKER_TMP_VOLUME || '/tmp/catalogue-api'
export const DOCKER_DATA_VOLUME = process.env.DOCKER_DATA_VOLUME || '/var/lib/catalogue-api'

/**
 * MongoDB
 */
export const MONGO_DB = process.env.MONGO_DB || 'catalogue'
export const MONGO_DB_ADDRESS = process.env.MONGO_DB_ADDRESS || 'mongodb://localhost:27017'
export const MONGO_DB_USERNAME = process.env.MONGO_DB_USERNAME || 'admin'
export const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || 'password'

/**
 * PostGIS
 *
 * Local development: API isn't dockerized,
 * so PostGIS is via local. However the ogr2ogr
 * commands still require addressing PostGIS via
 * the Docker network
 */
export const POSTGIS_HOST_DEV = process.env.POSTGIS_HOST_DEV || 'localhost'
export const POSTGIS_DB = process.env.POSTGIS_DB || 'databooks'
export const POSTGIS_HOST = process.env.POSTGIS_HOST || 'postgis'
export const POSTGIS_PORT = process.env.POSTGIS_PORT || 5432
export const POSTGIS_USERNAME = process.env.POSTGIS_USERNAME || 'admin'
export const POSTGIS_PASSWORD = process.env.POSTGIS_PASSWORD || 'password'
export const POSTGIS_IMAGE_NAME = process.env.POSTGIS_IMAGE_NAME || 'postgis'
export const POSTGIS_CONTAINER_NAME = process.env.POSTGIS_CONTAINER_NAME || 'postgis'

/**
 * Elasticsearch
 */
export const ELASTICSEARCH_ADDRESS = process.env.ELASTICSEARCH_ADDRESS || `http://localhost:9200`
export const ELASTICSEARCH_TEMPLATE = process.env.ELASTICSEARCH_TEMPLATE || 'saeon-odp'
export const ELASTICSEARCH_INDEX = `${ELASTICSEARCH_TEMPLATE}-${
  process.env.ELASTICSEARCH_INDEX || 'catalogue-search'
}`

/**
 * Ensure required directories exists
 */
;(async () => {
  await ensureDirectory(TEMP_DIRECTORY)
  await ensureDirectory(DATA_DIRECTORY)
})().catch(error => {
  console.error('Cannot create required directory', error.message)
  process.exit(1)
})
