import pkceChallengeFromVerifier from './lib/pkce-verifier'
import parseQueryString from './lib/parse-query-string'
import post from './lib/post-request'

var AUTHENTICATION_URL

export default ({
  AUTHENTICATION_ENDPOINT,
  CLIENT_ID,
  STATE,
  REQUESTED_SCOPES,
  REDIRECT_URL,
  CODE_VERIFIER,
  TOKEN_ENDPOINT,
}) => async () => {
  AUTHENTICATION_URL =
    AUTHENTICATION_ENDPOINT +
    '?response_type=code' +
    '&client_id=' +
    encodeURIComponent(CLIENT_ID) +
    '&state=' +
    encodeURIComponent(STATE) +
    '&scope=' +
    encodeURIComponent(REQUESTED_SCOPES) +
    '&redirect_uri=' +
    encodeURIComponent(REDIRECT_URL) +
    '&code_challenge=' +
    encodeURIComponent(await pkceChallengeFromVerifier(CODE_VERIFIER)) +
    '&code_challenge_method=S256'

  const { error, code, state } = parseQueryString(window.location.search.substring(1))

  if (error) {
    console.error('Authentication error', error)
  } else if (code) {
    if (localStorage.getItem('pkce_state') != state) {
      alert('Invalid state')
    }
    const result = await post(TOKEN_ENDPOINT, {
      grant_type: 'authorization_code',
      code,
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URL,
      code_verifier: await pkceChallengeFromVerifier(CODE_VERIFIER),
    })

    console.log(result)
  } else {
    console.log('why is this running')
    window.location = AUTHENTICATION_URL
  }
}
