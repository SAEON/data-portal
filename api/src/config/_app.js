import { join } from 'path'
import ensureDirectory from '../lib/ensure-directory.js'
import TaskManager from '../lib/task-manager/index.js'
import getCurrentDirectory from '../lib/get-current-directory.js'

const __dirname = getCurrentDirectory(import.meta)
const __apiRootDirectory = join(__dirname, '../../')

/**
 * Application config
 */
export const HOSTNAME = process.env.HOSTNAME || 'http://localhost:3001'
export const APP_KEY = process.env.APP_KEY || '7cwANClfrqqNFmpOmcP0OzWDzdcras0EdIqD3RAUUCU='
export const DEFAULT_ADMIN_EMAIL_ADDRESSES = process.env.DEFAULT_ADMIN_EMAIL_ADDRESSES || ''
export const DEFAULT_SYSADMIN_EMAIL_ADDRESSES = process.env.DEFAULT_SYSADMIN_EMAIL_ADDRESSES || ''
export const CURATOR_CONTACT =
  process.env.CURATOR_CONTACT || 'configure-curator-contact@saeon.nrf.ac.za'
export const TECHNICAL_CONTACT =
  process.env.TECHNICAL_CONTACT || 'configure-technical-contact@saeon.nrf.ac.za'
export const API_BIND_PROTOCOL = 'http'
export const API_BIND_HOSTNAME = process.env.API_BIND_HOSTNAME || 'localhost'
export const API_BIND_PORT = process.env.API_BIND_PORT || 3000
export const API_ADDRESS = process.env.API_ADDRESS || 'http://localhost:3000' // Required in API for authentication
export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || 'http://localhost:3001'
export const TEMP_DIRECTORY = '/tmp/sdp-data'
export const DATA_DIRECTORY = '/var/lib/sdp-data'
export const LOG_QUERY_DETAILS = (process.env.LOG_QUERY_DETAILS || 'false').toBoolean()
export const SAEON_ODP_INTEGRATION_SCHEDULE = process.env.SAEON_ODP_INTEGRATION_SCHEDULE || false
export const SITEMAP_INTEGRATION_SCHEDULE = process.env.SITEMAP_INTEGRATION_SCHEDULE || false
export const GIS_MAX_RESOLUTION_DECIMALS = 5 // About 1.1M accuracy. higher values result in Elasticsearch parsing errors
export const SERVER_TASKS = TaskManager()
export const EMAIL_REGEX = new RegExp(
  `^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$`
)

export const CLIENT_FILTER_CONFIG_PATH =
  process.env.CLIENT_FILTER_CONFIG_PATH ||
  join(__apiRootDirectory, '../clients/client-filters.json')

export const CLIENT_FILTER_CONFIG = await import(CLIENT_FILTER_CONFIG_PATH, {
  assert: { type: 'json' },
}).then(({ default: json }) => json)

/**
 * Ensure required directories exists
 */
;(async () => {
  await ensureDirectory(TEMP_DIRECTORY)
  await ensureDirectory(DATA_DIRECTORY)
})().catch(error => {
  console.error('Cannot create required directory', error)
  process.exit(1)
})
