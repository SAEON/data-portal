import fetch from 'node-fetch'
import btoa from 'btoa'
import { FormData } from 'formdata-node'
import { ODP_CLIENT_ID, ODP_CLIENT_SECRET, ODP_AUTH, ODP_AUTH_SCOPES } from '../config/index.js'
import { addSeconds, differenceInSeconds } from 'date-fns'

const TOKEN = btoa(`${ODP_CLIENT_ID}:${ODP_CLIENT_SECRET}`)

var access_token_
var expires_at
var expires_in_
var scope_
var token_type_

/**
 * This authenticates the Node.js API with the ODP.
 * It does NOT authenticate users with the ODP
 */
export default async ({ useCachedToken = true } = {}) => {
  try {
    /**
     * See if a valid access token
     * is already cached
     */
    if (useCachedToken && differenceInSeconds(expires_at, new Date()) > 3600) {
      return {
        access_token: access_token_,
        expires_in: expires_in_,
        scope: scope_,
        token_type: token_type_,
      }
    }

    const form = new FormData()
    form.append('grant_type', 'client_credentials')
    form.append('scope', ODP_AUTH_SCOPES)

    const { access_token, expires_in, scope, token_type } = await fetch(
      `${ODP_AUTH}/oauth2/token`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${TOKEN}`,
        },
        body: form,
      }
    ).then(res => {
      if (res.status !== 200) {
        throw new Error(res.statusText)
      }
      return res.json()
    })

    expires_at = addSeconds(new Date(), expires_in)
    access_token_ = access_token
    expires_in_ = expires_in
    scope_ = scope
    token_type_ = token_type

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
