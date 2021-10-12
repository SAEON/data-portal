import { join } from 'path'
import { API_PUBLIC_ADDRESS } from './_app.js'
import getCurrentDirectory from '../lib/get-current-directory.js'
import { config } from 'dotenv'
config()

const __dirname = getCurrentDirectory(import.meta)
const __apiRootDirectory = join(__dirname, '../../')

/**
 * ODP
 */
export const ODP_ADDRESS = process.env.ODP_ADDRESS || 'https://odp.saeon.dvn'

/**
 * ODP API
 */
export const ODP_API = `${ODP_ADDRESS}/api`
export const ODP_API_CATALOGUE_ENDPOINT = `${ODP_API}/catalogue`

/**
 * ODP authentication
 */
export const ODP_AUTH = `${ODP_ADDRESS}/auth`
export const ODP_AUTH_WELL_KNOWN = `${ODP_AUTH}/.well-known/openid-configuration`
export const ODP_AUTH_ODP_LOGOUT_REDIRECT = `${ODP_AUTH}/oauth2/sessions/logout`

/**
 * ODP catalogue integration
 */
export const ODP_CLIENT_ID = process.env.ODP_CLIENT_ID || 'catalogue-api-odp-client-id'
export const ODP_CLIENT_SECRET = process.env.ODP_CLIENT_SECRET || ''
export const ODP_AUTH_SCOPE = process.env.ODP_AUTH_SCOPE || 'ODP.Catalogue ODP.Metadata'
export const ODP_FILTER_PATH = process.env.ODP_FILTER_PATH
  ? join(__apiRootDirectory, process.env.ODP_FILTER_PATH)
  : join(__dirname, '../../../../deployment-configs/next/odp-filter.js')
export const ODP_FILTER = import(ODP_FILTER_PATH).then(({ default: fn }) => fn)
export const ODP_DEBUG_IDS = process.env.ODP_DEBUG_IDS || ''
export const ODP_INTEGRATION_BATCH_SIZE = process.env.ODP_INTEGRATION_BATCH_SIZE || 100

/**
 * SSO via ODP
 */
export const ODP_SSO_CLIENT_ID = process.env.ODP_SSO_CLIENT_ID || 'SAEON.DataPortal'
export const ODP_SSO_CLIENT_SECRET = process.env.ODP_SSO_CLIENT_SECRET || ''
export const ODP_SSO_CLIENT_SCOPES =
  process.env.ODP_SSO_CLIENT_SCOPES || 'openid ODP.Metadata SAEON.DataPortal'
export const ODP_SSO_CLIENT_REDIRECT =
  process.env.ODP_SSO_CLIENT_REDIRECT || `${API_PUBLIC_ADDRESS}/authenticate/redirect`
export const PASSPORT_SSO_SESSION_ID = process.env.PASSPORT_SSO_SESSION_ID || 'client.sess'