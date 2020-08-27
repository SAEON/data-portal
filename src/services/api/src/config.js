import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config()

// Secret
export const MONGO_USER = process.env.MONGO_USER || 'admin'
export const MONGO_PSWD = process.env.MONGO_PSWD || 'password'
export const CATALOGUE_SECRET = bcrypt.hashSync(process.env.CATALOGUE_SECRET || 'secret-string', 10)

// public
export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017'
export const MONGO_DB = process.env.MONGO_DB || 'catalogue'
export const GQL_PROVIDER = process.env.GQL_PROVIDER || 'http://localhost:3000'
export const PORT = process.env.PORT || 3000
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const DEPLOY_ENV = process.env.DEPLOY_ENV || 'development'
export const HTTP_PROXY = process.env.HTTP_PROXY || 'http://localhost:8001'
export const ALLOWED_ORIGINS =
  process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:3001'

// Elasticsearch
export const ES_HOST_ADDRESS = process.env.ES_HOST_ADDRESS || `http://localhost:9200`
export const ES_INDEX = process.env.ES_INDEX || 'odp'
export const ES_INTEGRATION_BATCH_SIZE = process.env.ES_INTEGRATION_BATCH_SIZE || 100
export const ES_TEMPLATE_INTEGRATION_ENABLED = process.env.ES_TEMPLATE_INTEGRATION_ENABLED || 'false'
export const ES_INDEX_INTEGRATION_ENABLED = process.env.ES_INDEX_INTEGRATION_ENABLED || 'true'

console.log('Configuration', {
  MONGO_DB,
  MONGO_URL,
  GQL_PROVIDER,
  ES_INDEX,
  ES_INTEGRATION_BATCH_SIZE,
  ES_TEMPLATE_INTEGRATION_ENABLED,
  ES_INDEX_INTEGRATION_ENABLED,
  PORT,
  NODE_ENV,
  DEPLOY_ENV,
  HTTP_PROXY,
  ALLOWED_ORIGINS,
})
