import fetch from 'node-fetch'
import authenticate from '../../lib/authenticate-with-odp.js'
import { ODP_API_CATALOGUE_ENDPOINT } from '../../config/index.js'

export default async () => {
  const { token_type, access_token } = await authenticate({ useCachedToken: false })

  const result = await fetch(`${ODP_API_CATALOGUE_ENDPOINT}?limit=1`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: [token_type, access_token].join(' '),
    },
  })

  return result
}
