import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config()

// TODO
export const CATALOGUE_SECRET = bcrypt.hashSync(process.env.CATALOGUE_SECRET || 'secret-string', 10)

// Service
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const DEPLOY_ENV = process.env.DEPLOY_ENV || 'development'

// Mongo
export const MONGO_DB = process.env.MONGO_DB || 'catalogue'
export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017'
export const MONGO_USER = process.env.MONGO_USER || 'admin'
export const MONGO_PSWD = process.env.MONGO_PSWD || 'password'

// Postgis
export const POSTGIS_DB = process.env.POSTGIS_DB || 'catalogue'
export const POSTGIS_HOST = POSTGIS_HOST || 'localhost'
export const POSTGIS_USER = process.env.POSTGIS_USER || 'admin'
export const POSTGIS_PSWD = process.env.POSTGIS_PSWD || 'password'
export const POSTGIS_PORT = process.env.POSTGIS_PORT || 5432
export const FORCE_DB_RESET  = process.env.FORCE_DB_RESET  || true

// HTTP
export const PORT = process.env.PORT || 3000
export const GQL_PROVIDER = process.env.GQL_PROVIDER || 'http://localhost:3000'
export const HTTP_PROXY = process.env.HTTP_PROXY || 'http://localhost:8001'
export const ALLOWED_ORIGINS =
  process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:3001'

// Elasticsearch
export const ES_HOST_ADDRESS = process.env.ES_HOST_ADDRESS || `http://localhost:9200`
export const ES_INDEX = process.env.ES_INDEX || 'odp'
export const ES_INTEGRATION_BATCH_SIZE = process.env.ES_INTEGRATION_BATCH_SIZE || 100
export const ES_TEMPLATE_INTEGRATION_ENABLED =
  process.env.ES_TEMPLATE_INTEGRATION_ENABLED || 'enabled'
export const ES_INDEX_INTEGRATION_ENABLED = process.env.ES_INDEX_INTEGRATION_ENABLED || 'enabled'

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
  // HTTP
  PORT,
  HTTP_PROXY,
  ALLOWED_ORIGINS,
  GQL_PROVIDER,
  // Elasticsearch
  ES_HOST_ADDRESS,
  ES_INDEX,
  ES_INTEGRATION_BATCH_SIZE,
  ES_TEMPLATE_INTEGRATION_ENABLED,
  ES_INDEX_INTEGRATION_ENABLED,
})
