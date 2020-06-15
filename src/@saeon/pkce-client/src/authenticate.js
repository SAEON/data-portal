import parseQueryString from './lib/parse-query-string'
import buildAuthenticationUrl from './lib/build-authentication-url'
import { setToken } from './token-manager'
import { parse } from 'url'
import { setState, getState, clearState, CACHE_KEYS } from './state-manager'

export default ({
  AUTHENTICATION_ENDPOINT,
  CLIENT_ID,
  STATE_KEY,
  REQUESTED_SCOPES,
  REDIRECT_URL,
  VERIFICATION_KEY,
  TOKEN_ENDPOINT,
}) => async ({ autoLogin = true } = {}) => {
  const authenticationUrl = await buildAuthenticationUrl({
    AUTHENTICATION_ENDPOINT,
    CLIENT_ID,
    STATE_KEY,
    REQUESTED_SCOPES,
    REDIRECT_URL,
    VERIFICATION_KEY,
  })

  /**
   * Set some persistent state
   */
  setState(CACHE_KEYS.PKCE_STATE, STATE_KEY)

  /**
   * Authenticate user
   *
   * GET request to the authentication endpoint
   *   => Failed authentication returns the URL of the login page
   *   => Successful authentication returns a URL with params { code, scope, state }
   */
  const { url } = await fetch(authenticationUrl, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  })

  const authCallback = parse(url)

  /**
   * If the callback host is the same as
   * the authentication server host then
   * the user is not authenticated
   */

  if (authCallback.host === parse(AUTHENTICATION_ENDPOINT).host) {
    if (autoLogin) {
      window.location = authenticationUrl
    } else {
      return {
        loggedIn: false,
      }
    }
  }

  const { error, code, state } = parseQueryString(authCallback.query)

  if (error) {
    throw new Error('Authentication unsuccessful: ' + error.message)
  }

  if (getState(CACHE_KEYS.PKCE_STATE) !== state) {
    console.warn('PKCE flow state mismatch', 'User may have logged out')
  }

  /**
   * Request an access token
   */
  const accessToken = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Accept: 'application/json',
    },
    body: Object.entries({
      grant_type: 'authorization_code',
      code,
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URL,
      code_verifier: VERIFICATION_KEY,
    })
      .map(([key, val]) => `${key}=${val}`)
      .join('&'),
  })
    .then(res => res.json())
    .catch(error => {
      throw new Error('Error requesting access token', error)
    })

  /**
   * Cache the local token to runtime memory
   */
  setToken(accessToken)

  // Clean up state and return application state
  const applicationState = getState(CACHE_KEYS.APPLICATION_STATE)
  clearState()
  return {
    loggedIn: true,
    applicationState,
  }
}
