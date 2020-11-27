import parseQueryString from './lib/parse-query-string'
import buildAuthenticationUrl from './lib/build-authentication-url'
import { setToken } from './token-manager'
import { parse } from 'url'
import createKey from './lib/create-key'
import { setState, getState, clearState, CACHE_KEYS } from './state-manager'

/**
 * TODO
 *
 * The problem is that I'm trying to consume the /auth endpoint
 * from the client. This should be redirected to, rather than via
 * a programmatic CORS request. The solution is to cache token to
 * local storage. If that token ever fails (on the API), errors
 * should bubble up to the user who is then redirected to the /auth
 * endpoint, and the token is removed from local storage
 *
 * (1) Change token cache to be permanent browser storage
 * (2) Instead of GET /auth, try validate the token
 * (3) Change the /auth request to be a redirect
 */

export default ({
  AUTHENTICATION_ENDPOINT,
  CLIENT_ID,
  REQUESTED_SCOPES,
  CLIENT_AUTH_REDIRECT_URL,
  TOKEN_ENDPOINT,
}) => async ({ forceLogin = true, redirectToCurrentPath = false } = {}) => {
  var _redirectToCurrentPath

  const STATE = createKey()
  const VERIFICATION_KEY = createKey()

  const authenticationUrl = await buildAuthenticationUrl({
    AUTHENTICATION_ENDPOINT,
    CLIENT_ID,
    STATE,
    REQUESTED_SCOPES,
    CLIENT_AUTH_REDIRECT_URL,
    VERIFICATION_KEY,
  })

  /**
   * Authenticate user
   *
   * GET request to the authentication endpoint
   *   => Failed authentication returns the URL of the login page
   *   => Successful authentication returns the configured redirect
   *      URL with params { code, scope, state }
   */
  const { url } = await fetch(authenticationUrl, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
    },
  }).catch(error => {
    throw new Error('Unable to authenticate user', error)
  })

  const authCallback = parse(url)

  /**
   *
   * If the callback URI includes a 'state'
   * param, that is indicative of successful
   * login. (I think...)
   *
   * In this case save the current path (if configured to do so),
   * then login
   *
   * Otherwise see if redirection should be overwritten, and
   * save to local variable. Then clear the state
   */

  const { error, code, state } = parseQueryString(authCallback.query)

  if (!state) {
    if (forceLogin) {
      if (redirectToCurrentPath) {
        setState(CACHE_KEYS.OVERWRITE_REDIRECT, window.location.pathname)
      }
      window.location = authenticationUrl
    }
    return {
      loggedIn: false,
    }
  } else {
    _redirectToCurrentPath = getState(CACHE_KEYS.OVERWRITE_REDIRECT)
    clearState()
  }

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
      redirect_uri: CLIENT_AUTH_REDIRECT_URL,
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
