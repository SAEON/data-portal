import authenticate from './authenticate.js'
import { getToken } from './token-manager.js'
import logout from './logout.js'

export default ({
  clientId: CLIENT_ID,
  redirectUrl: CLIENT_AUTH_REDIRECT_URL,
  authenticationEndpoint: AUTHENTICATION_ENDPOINT,
  tokenEndpoint: TOKEN_ENDPOINT,
  requestedScopes: REQUESTED_SCOPES,
  logoutEndpoint: LOGOUT_ENDPOINT,
}) => ({
  authenticate: authenticate({
    AUTHENTICATION_ENDPOINT,
    CLIENT_ID,
    REQUESTED_SCOPES,
    CLIENT_AUTH_REDIRECT_URL,
    TOKEN_ENDPOINT,
  }),
  logout: logout({ LOGOUT_ENDPOINT }),
  getBearerToken: () => `Bearer ${getToken()}`,
})
