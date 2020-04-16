import { config } from 'dotenv'
config()

export const PORT = process.env.PORT || 3000
export const NODE_ENV = process.env.NODE_ENV || 'development'

export const CACHING_PROXY = process.env.CACHING_PROXY || 'http://localhost:8001'

export const ALLOWED_ORIGINS =
  process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:3001'
