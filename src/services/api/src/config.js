import { config } from 'dotenv'
config()

// Repository information
export const LATEST_COMMIT = process.env.LATEST_COMMIT || ''

// Service
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const DEPLOY_ENV = process.env.DEPLOY_ENV || 'development'
export const INDEX_BUILD_SCHEDULE = process.env.INDEX_BUILD_SCHEDULE || '0 0 0 * * *'

// Mongo
export const MONGO_DB = process.env.MONGO_DB || 'catalogue'
export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017'
export const MONGO_USER = process.env.MONGO_USER || 'admin'
export const MONGO_PSWD = process.env.MONGO_PSWD || 'password'

// Postgis
export const FORCE_PG_RESET = process.env.FORCE_PG_RESET || 'disabled'
export const POSTGIS_DB = process.env.POSTGIS_DB || 'catalogue'
export const POSTGIS_HOST = process.env.POSTGIS_HOST || 'localhost'
export const POSTGIS_PORT = process.env.POSTGIS_PORT || 5432
export const POSTGIS_USER = process.env.POSTGIS_USER || 'admin'
export const POSTGIS_PSWD = process.env.POSTGIS_PSWD || 'password'
export const POSTGIS_FOREIGN_HOST = process.env.POSTGIS_FOREIGN_HOST || 'localhost'
export const POSTGIS_FOREIGN_DBNAME = process.env.POSTGIS_FOREIGN_DBNAME || 'public'
export const POSTGIS_FOREIGN_USER = process.env.POSTGIS_FOREIGN_USER || 'postgres'
export const POSTGIS_FOREIGN_PASSWORD = process.env.POSTGIS_FOREIGN_PASSWORD || 'password'

// HTTP
export const PORT = process.env.PORT || 3000
export const GQL_PROVIDER = process.env.GQL_PROVIDER || 'http://localhost:3000/graphql'
export const HTTP_PROXY_ADDRESS = process.env.HTTP_PROXY_ADDRESS || 'http://localhost:8001'
export const ALLOWED_ORIGINS =
  process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:3001'

// Elasticsearch
export const SAEON_ODP_PROVIDER =
  process.env.SAEON_ODP_PROVIDER || 'https://odp.saeon.dvn/api/catalogue'
export const ES_HOST_ADDRESS = process.env.ES_HOST_ADDRESS || `http://localhost:9200`
export const ES_TEMPLATE = process.env.ES_TEMPLATE || 'saeon-odp'
export const ES_INDEX = `${ES_TEMPLATE}-${process.env.ES_INDEX || 'catalogue-search'}`
export const ES_TEMPLATE_INTEGRATION_ENABLED =
  process.env.ES_TEMPLATE_INTEGRATION_ENABLED || 'enabled'
export const ES_INDEX_INTEGRATION_ENABLED = process.env.ES_INDEX_INTEGRATION_ENABLED || 'enabled'
export const SCHEDULED_INDEX_INTEGRATION = process.env.SCHEDULED_INDEX_INTEGRATION || 'disabled'

const mask = str => str?.replace(/./g, '*')

console.log('Configuration', {
  // Service
  NODE_ENV,
  DEPLOY_ENV,
  // Mongo
  MONGO_DB,
  MONGO_USER: mask(MONGO_USER),
  MONGO_PSWD: mask(MONGO_PSWD),
  MONGO_URL,
  //Postgis
  POSTGIS_DB,
  POSTGIS_HOST,
  POSTGIS_USER: mask(POSTGIS_USER),
  POSTGIS_PSWD: mask(POSTGIS_PSWD),
  POSTGIS_PORT,
  POSTGIS_FOREIGN_HOST,
  POSTGIS_FOREIGN_DBNAME,
  POSTGIS_FOREIGN_USER: mask(POSTGIS_FOREIGN_USER),
  POSTGIS_FOREIGN_PASSWORD: mask(POSTGIS_FOREIGN_PASSWORD),
  // HTTP
  PORT,
  HTTP_PROXY_ADDRESS,
  ALLOWED_ORIGINS,
  GQL_PROVIDER,
  // Elasticsearch
  ES_HOST_ADDRESS,
  ES_INDEX,
  ES_TEMPLATE_INTEGRATION_ENABLED,
  ES_INDEX_INTEGRATION_ENABLED,
  SCHEDULED_INDEX_INTEGRATION,
})
