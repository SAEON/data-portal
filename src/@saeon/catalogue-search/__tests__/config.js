import { config } from 'dotenv'
config()

export const API_ADDRESS = process.env.API_ADDRESS ?? 'http://localhost:3000'
