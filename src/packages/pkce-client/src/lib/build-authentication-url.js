import createVerificationCode from './create-verification-code'

export default async ({
  AUTHENTICATION_ENDPOINT,
  CLIENT_ID,
  STATE,
  REQUESTED_SCOPES,
  CLIENT_AUTH_REDIRECT_URL,
  VERIFICATION_KEY,
}) =>
  AUTHENTICATION_ENDPOINT +
  '?response_type=code' +
  '&client_id=' +
  encodeURIComponent(CLIENT_ID) +
  '&state=' +
  encodeURIComponent(STATE) +
  '&scope=' +
  encodeURIComponent(REQUESTED_SCOPES) +
  '&redirect_uri=' +
  encodeURIComponent(CLIENT_AUTH_REDIRECT_URL) +
  '&code_challenge=' +
  encodeURIComponent(await createVerificationCode(VERIFICATION_KEY)) +
  '&code_challenge_method=S256'
