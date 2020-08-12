import dotenv from 'dotenv'
dotenv.config()

export const API_ADDRESS = process.env.API_ADDRESS || 'http://localhost:9200'
export const INDEX = process.env.INDEX || 'odp'
