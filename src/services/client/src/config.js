// Application configuration
export const DEFAULT_ERROR = process.env.DEFAULT_ERROR || null
export const DEFAULT_WARNING = process.env.DEFAULT_WARNING || null
export const DEFAULT_INFO = process.env.DEFAULT_INFO || null
export const DEFAULT_SUCCESS = process.env.DEFAULT_SUCCESS || null
export const SOURCE_CODE_URI =
  process.env.SOURCE_CODE_URI ||
  'https://github.com/SAEONData/saeon-atlas/tree/master/src/services/client'

// API Configuration
export const ATLAS_API_ADDRESS = process.env.ATLAS_API_ADDRESS || 'http://localhost:3000'
export const GQL_PROVIDER = process.env.GQL_PROVIDER || 'http://localhost:3000/graphql'
export const GQL_SUBSCRIPTIONS_PROVIDER =
  process.env.GQL_SUBSCRIPTIONS_PROVIDER || 'ws://localhost:3000/graphql'

// Client authentication / authorization
export const CLIENT_ID = process.env.CLIENT_ID || 'saeonatlasclienttest'
export const REDIRECT_URL = process.env.REDIRECT_URL || 'http://localhost:3001/authenticated'
export const AUTHENTICATION_ENDPOINT =
  process.env.AUTHENTICATION_ENDPOINT || 'https://odp.saeon.dvn/auth/oauth2/auth'
export const LOGOUT_ENDPOINT =
  process.env.LOGOUT_ENDPOINT || 'https://odp.saeon.dvn/auth/oauth2/sessions/logout'
export const TOKEN_ENDPOINT =
  process.env.TOKEN_ENDPOINT || 'https://odp.saeon.dvn/auth/oauth2/token'
export const REQUESTED_SCOPES = process.env.REQUESTED_SCOPES || ''

// TEMPORARY
export const ENABLE_LOGIN = process.env.ENABLE_LOGIN
  ? process.env.ENABLE_LOGIN.toLowerCase() === 'true'
  : false
