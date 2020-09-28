import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 3002
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const REDIRECT_TARGET = process.env.REDIRECT_TARGET || 'http://localhost:3001/records/'
export const REPOSITORY_ID = 'NRF.SAEON'
export const LOAD_BATCH_SIZE = 2

console.log('Configuration', {
  PORT,
  NODE_ENV,
  REPOSITORY_ID,
  LOAD_BATCH_SIZE,
})
