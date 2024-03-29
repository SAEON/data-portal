import { join } from 'path'
import { API_ADDRESS } from './_app.js'
import getCurrentDirectory from '../lib/get-current-directory.js'

const __dirname = getCurrentDirectory(import.meta)
const __apiRootDirectory = join(__dirname, '../../')

/**
 * ODP
 */
export const ODP_HOSTNAME = process.env.ODP_HOSTNAME || 'odp.saeon.ac.za'

/**
 * ODP API
 */
export const ODP_API = `https://api.${ODP_HOSTNAME}`
export const ODP_API_CATALOGUE_ENDPOINT = `${ODP_API}/catalog/SAEON/records`

/**
 * ODP authentication
 */
export const ODP_AUTH = `https://auth.${ODP_HOSTNAME}`
export const ODP_AUTH_WELL_KNOWN = `${ODP_AUTH}/.well-known/openid-configuration`
export const ODP_AUTH_LOGOUT_REDIRECT = `${ODP_AUTH}/oauth2/sessions/logout`

/**
 * ODP catalogue integration
 */
export const ODP_CLIENT_ID = process.env.ODP_CLIENT_ID || 'SAEON.DataPortal.Indexer'
export const ODP_CLIENT_SECRET = process.env.ODP_CLIENT_SECRET || ''
export const ODP_CLIENT_AUTH_SCOPES = process.env.ODP_CLIENT_AUTH_SCOPES || 'odp.catalog:read'
export const ODP_FILTER_PATH =
  process.env.ODP_FILTER_PATH || join(__apiRootDirectory, 'odp-filter.js')
export const ODP_FILTER = import(ODP_FILTER_PATH).then(({ default: fn }) => fn)
export const ODP_INTEGRATION_BATCH_SIZE = process.env.ODP_INTEGRATION_BATCH_SIZE || 100

/**
 * SSO via ODP
 */
export const ODP_SSO_CLIENT_ID = process.env.ODP_SSO_CLIENT_ID || 'SAEON.DataPortal'
export const ODP_SSO_CLIENT_SECRET = process.env.ODP_SSO_CLIENT_SECRET || ''
export const ODP_SSO_CLIENT_SCOPES = process.env.ODP_SSO_CLIENT_SCOPES || 'openid SAEON.DataPortal'
export const ODP_SSO_CLIENT_REDIRECT =
  process.env.ODP_SSO_CLIENT_REDIRECT || `${API_ADDRESS}/http/authenticate/redirect`
export const PASSPORT_SSO_SESSION_ID = process.env.PASSPORT_SSO_SESSION_ID || 'client.sess'
export const PASSPORT_SSO_MAXAGE_HOURS = 12
