import { config } from 'dotenv'
config()

export const spreadsheetId = process.env.spreadsheetId
export const range = process.env.range
export const CONNECTION_STRING = process.env.CONNECTION_STRING
export const MONGO_DB_USERNAME = process.env.MONGO_DB_USERNAME
export const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD
export const DB = process.env.DB
