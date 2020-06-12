import generateRandomString from './lib/generate-random-string'
import authenticate from './authenticate'

// Private to this package
var AUTHENTICATION_ENDPOINT
var CLIENT_ID
var STATE
var REQUESTED_SCOPES
var REDIRECT_URL
var CODE_VERIFIER
var TOKEN_ENDPOINT

export default ({
  clientId,
  redirectUrl,
  authenticationEndpoint,
  tokenEndpoint,
  requestedScopes,
}) => {
  CLIENT_ID = clientId
  REDIRECT_URL = redirectUrl
  AUTHENTICATION_ENDPOINT = authenticationEndpoint
  TOKEN_ENDPOINT = tokenEndpoint
  REQUESTED_SCOPES = requestedScopes

  STATE = localStorage.getItem('pkce_state') || generateRandomString()
  CODE_VERIFIER = localStorage.getItem('pkce_code_verifier') || generateRandomString()

  localStorage.setItem('pkce_state', STATE)
  localStorage.setItem('pkce_code_verifier', CODE_VERIFIER)

  console.log('hi', STATE, CODE_VERIFIER)

  return {
    authenticate: authenticate({
      AUTHENTICATION_ENDPOINT,
      CLIENT_ID,
      REQUESTED_SCOPES,
      REDIRECT_URL,
      STATE,
      CODE_VERIFIER,
      TOKEN_ENDPOINT,
    }),
  }
}
