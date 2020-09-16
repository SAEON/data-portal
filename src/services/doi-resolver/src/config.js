import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 3002
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const REDIRECT_TARGET = process.env.REDIRECT_TARGET || 'http://localhost:3001/records/'

console.log('Configuration', {
  PORT,
  NODE_ENV,
})
