import { config } from 'dotenv'
config()

export const ACCESS_TOKEN = process.env.ACCESS_TOKEN || null
export const GQL_ENDPOINT = process.env.GQL_ENDPOINT || 'https://api.github.com/graphql'
export const FILEPATH = process.env.FILEPATH || './output.csv'
