import ensureDirectory from '../lib/ensure-directory.js'
import TaskManager from '../lib/task-manager/index.js'
import { config } from 'dotenv'
config()

/**
 * Application config
 */
export const HOSTNAME = process.env.HOSTNAME || 'http://localhost:3001'
export const APP_KEY = process.env.APP_KEY || '7cwANClfrqqNFmpOmcP0OzWDzdcras0EdIqD3RAUUCU='
export const DEFAULT_ADMIN_EMAIL_ADDRESSES = process.env.DEFAULT_ADMIN_EMAIL_ADDRESSES || ''
export const DEFAULT_SYSADMIN_EMAIL_ADDRESSES = process.env.DEFAULT_SYSADMIN_EMAIL_ADDRESSES || ''
export const CURATOR_CONTACT = process.env.CURATOR_CONTACT || 'leo@saeon.ac.za'
export const GDAL_DOCKER_IMAGE = process.env.GDAL_DOCKER_IMAGE || 'osgeo/gdal:latest'
export const LATEST_COMMIT = process.env.LATEST_COMMIT || ''
export const API_BIND_PROTOCOL = 'http'
export const API_BIND_HOSTNAME = process.env.API_BIND_HOSTNAME || 'localhost'
export const API_BIND_PORT_PUBLIC = process.env.API_BIND_PORT_PUBLIC || 3000
export const API_BIND_PORT_INTERNAL = process.env.API_BIND_PORT_INTERNAL || 4000
export const API_BIND_ADDRESS_PUBLIC = `${API_BIND_PROTOCOL}://${API_BIND_HOSTNAME}:${API_BIND_PORT_PUBLIC}`
export const API_BIND_ADDRESS_INTERNAL = `${API_BIND_PROTOCOL}://${API_BIND_HOSTNAME}:${API_BIND_PORT_INTERNAL}`
export const API_PUBLIC_ADDRESS = process.env.API_PUBLIC_ADDRESS || 'http://localhost:3000' // Required in API for authentication
export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || 'http://localhost:3001'
export const TEMP_DIRECTORY = '/tmp/catalogue-api'
export const DATA_DIRECTORY = '/var/lib/catalogue-api'
export const LOG_QUERY_DETAILS = (process.env.LOG_QUERY_DETAILS || 'false').toBoolean()
export const ENABLE_METADATA = (process.env.ENABLE_METADATA || 'false').toBoolean()
export const METADATA_INTEGRATION_SCHEDULE =
  process.env.METADATA_INTEGRATION_SCHEDULE || '0 0 * * * *'
export const GIS_MAX_RESOLUTION_DECIMALS = 5 // About 1.1M accuracy. higher values result in Elasticsearch parsing errors
export const SERVER_TASKS = TaskManager()
export const EMAIL_REGEX = new RegExp(
  process.env.EMAIL_REGEX ||
    `^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$`
)

/**
 * Ensure required directories exists
 */
;(async () => {
  await ensureDirectory(TEMP_DIRECTORY)
  await ensureDirectory(DATA_DIRECTORY)
})().catch(error => {
  console.error('Cannot create required directory', error.message)
  process.exit(1)
})
