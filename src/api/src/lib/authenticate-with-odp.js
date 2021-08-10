import fetch from 'node-fetch'
import btoa from 'btoa'
import FormData from 'form-data'
import { ODP_CLIENT_ID, ODP_CLIENT_SECRET, ODP_AUTH_ADDRESS, ODP_AUTH_SCOPE } from '../config.js'

const TOKEN = btoa(`${ODP_CLIENT_ID}:${ODP_CLIENT_SECRET}`)

export default async () => {
  try {
    const form = new FormData()
    form.append('grant_type', 'client_credentials')
    form.append('scope', ODP_AUTH_SCOPE)

    const { access_token, expires_in, scope, token_type } = await fetch(
      `${ODP_AUTH_ADDRESS}/oauth2/token`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${TOKEN}`,
        },
        body: form,
      }
    ).then(res => res.json())

    return {
      access_token,
      expires_in,
      scope,
      token_type,
    }
  } catch (error) {
    console.error('Error authenticating with the ODP', error)
    throw new Error(`Authentication error. ${error}`)
  }
}
