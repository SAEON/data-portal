/**
 * Return the base64-urlencoded sha256 hash
 * for the PKCE challenge
 */
export default async v => {
  const hashed = await sha256(v)
  return base64urlencode(hashed)
}

/**
 * Calculate the SHA256 hash of the input text
 * Returns a promise that resolves to an ArrayBuffer
 */
const sha256 = plain => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

/**
 * Base64-urlencodes the input string
 *
 * Convert the ArrayBuffer to string using Uint8 array to conver to what btoa accepts.
 * btoa accepts chars only within ascii 0-255 and base64 encodes them.
 * Then convert the base64 encoded to base64url encoded (replace + with -, replace / with _, trim trailing =)
 */
const base64urlencode = str =>
  btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
