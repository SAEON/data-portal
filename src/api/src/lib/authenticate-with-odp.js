import fetch from 'request-promise'
import btoa from 'btoa'
import { ODP_CLIENT_ID, ODP_CLIENT_SECRET, ODP_AUTH_ADDRESS, ODP_AUTH_SCOPE } from '../config.js'

const TOKEN = btoa(`${ODP_CLIENT_ID}:${ODP_CLIENT_SECRET}`)

export default async () =>
  fetch({
    uri: `${ODP_AUTH_ADDRESS}/oauth2/token`,
    json: true,
    method: 'POST',
    headers: {
      Authorization: `Basic ${TOKEN}`,
    },
    form: {
      grant_type: 'client_credentials',
      scope: ODP_AUTH_SCOPE,
    },
  })
    .then(({ access_token, expires_in, scope, token_type }) => ({
      access_token,
      expires_in,
      scope,
      token_type,
    }))
    .catch(error => {
      throw new Error(`Authentication error. ${error}`)
    })
