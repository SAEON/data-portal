import createKey from './lib/create-key'
import authenticate from './authenticate'
import { getToken } from './token-manager'
import { setState, CACHE_KEYS } from './state-manager'

export default ({
  clientId: CLIENT_ID,
  redirectUrl: REDIRECT_URL,
  authenticationEndpoint: AUTHENTICATION_ENDPOINT,
  tokenEndpoint: TOKEN_ENDPOINT,
  requestedScopes: REQUESTED_SCOPES,
}) => ({
  authenticate: authenticate({
    AUTHENTICATION_ENDPOINT,
    CLIENT_ID,
    REQUESTED_SCOPES,
    REDIRECT_URL,
    STATE_KEY: createKey(),
    VERIFICATION_KEY: createKey(),
    TOKEN_ENDPOINT,
  }),
  getBearerToken: () => `Bearer ${getToken()}`,
  logout: () => alert('todo'),
  setApplicationState: state => setState(CACHE_KEYS.APPLICATION_STATE, state),
})
