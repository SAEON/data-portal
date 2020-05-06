import { config } from 'dotenv'
config()

export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017'
export const MONGO_DB = process.env.MONGO_DB || 'atlas-api'
export const GQL_PROVIDER = process.env.GQL_PROVIDER || 'http://localhost:3000'
export const PORT = process.env.PORT || 3000
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const HTTP_PROXY = process.env.HTTP_PROXY || 'http://localhost:8001'
export const ALLOWED_ORIGINS =
  process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:3001'

console.log('Configuration', {
  MONGO_DB,
  MONGO_URL,
  GQL_PROVIDER,
  PORT,
  NODE_ENV,
  HTTP_PROXY,
  ALLOWED_ORIGINS,
})
