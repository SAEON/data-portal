import parseQueryString from './lib/parse-query-string'
import buildAuthenticationUrl from './lib/build-authentication-url'
import { setToken } from './token-manager'
import { parse } from 'url'
import { setState, getState, clearState, CACHE_KEYS } from './state-manager'

export default ({
  AUTHENTICATION_ENDPOINT,
  CLIENT_ID,
  STATE,
  REQUESTED_SCOPES,
  REDIRECT_URL,
  VERIFICATION_KEY,
  TOKEN_ENDPOINT,
}) => async ({ forceLogin = true, redirectToCurrentPath = false } = {}) => {
  var _redirectToCurrentPath
  const authenticationUrl = await buildAuthenticationUrl({
    AUTHENTICATION_ENDPOINT,
    CLIENT_ID,
    STATE,
    REQUESTED_SCOPES,
    REDIRECT_URL,
    VERIFICATION_KEY,
  })

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
   *
   * In this case save the current path (if configured to do so),
   * then login
   *
   * Otherwise see if redirection should be overwritten, and
   * save to local variable. Then clear the state
   */

  // Checking existence of parseQueryString(authCallback.query).state could also work
  if (authCallback.host === parse(AUTHENTICATION_ENDPOINT).host) {
    if (forceLogin) {
      if (redirectToCurrentPath) {
        setState(CACHE_KEYS.OVERWRITE_REDIRECT, window.location.pathname)
      }
      window.location = authenticationUrl
    } else {
      return {
        loggedIn: false,
      }
    }
  } else {
    _redirectToCurrentPath = getState(CACHE_KEYS.OVERWRITE_REDIRECT)
    clearState()
  }

  const { error, code, state } = parseQueryString(authCallback.query)

  if (error) {
    throw new Error('Authentication unsuccessful: ' + error.message)
  }

  if (STATE !== state) {
    throw new Error('Authentication unsuccessful due to state param mismatch')
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

  /**
   * If user specifies a redirect,
   * and if a new login was required
   * then _redirectToCurrentPath has a value
   *
   * if _redirectToCurrentPath exists,
   * Then redirect to that path and start
   * again.
   */
  if (_redirectToCurrentPath) {
    window.location.pathname = _redirectToCurrentPath
  } else {
    return {
      loggedIn: true,
    }
  }
}
