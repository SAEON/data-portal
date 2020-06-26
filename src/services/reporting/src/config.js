import { config } from 'dotenv'
import subDays from 'date-fns/subDays'
import format from 'date-fns/format'
config()

// App configuration
export const GQL_ENDPOINT = process.env.GQL_ENDPOINT || 'https://api.github.com/graphql'

// Repository configuration
export const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN || null
export const OUTPUT_FILEPATH = process.env.OUTPUT_FILEPATH || './output.csv'
export const REPOSITORY_OWNER = process.env.REPOSITORY_OWNER || 'SAEONData'
export const REPOSITORY_NAME = process.env.REPOSITORY_NAME || 'saeon-atlas'
export const SINCE = process.env.SINCE || format(subDays(new Date(), 14), 'yyyy/MM/dd')

console.log('Configuration', {
  GQL_ENDPOINT,
  GITHUB_ACCESS_TOKEN,
  OUTPUT_FILEPATH,
  REPOSITORY_NAME,
  REPOSITORY_OWNER,
  SINCE,
})
