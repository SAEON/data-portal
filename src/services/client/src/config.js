// Application configuration
export const DEPLOYMENT_ENV = process.env.DEPLOYMENT_ENV || 'local'
export const DEFAULT_NOTICES = process.env.DEFAULT_NOTICES || ''
export const SOURCE_CODE_URI =
  process.env.SOURCE_CODE_URI ||
  'https://github.com/SAEONData/catalogue/tree/next/src/services/client'
export const DATA_CURATOR_CONTACT = process.env.DATA_CURATOR_CONTACT || 'leo@saeon.ac.za'
export const LATEST_COMMIT = process.env.LATEST_COMMIT

// API Configuration
export const CATALOGUE_API_ADDRESS = process.env.CATALOGUE_API_ADDRESS || 'http://localhost:3000'
export const GQL_PROVIDER = process.env.GQL_PROVIDER || 'http://localhost:3000/graphql'
export const GQL_SUBSCRIPTIONS_PROVIDER =
  process.env.GQL_SUBSCRIPTIONS_PROVIDER || 'ws://localhost:3000/graphql'

// Client authentication / authorization
export const CLIENT_ID = process.env.CLIENT_ID || 'saeonatlasclienttest'
export const CLIENT_HOST_ADDRESS = process.env.CLIENT_HOST_ADDRESS || 'http://localhost:3001'
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
