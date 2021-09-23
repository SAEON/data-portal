import fetch from 'node-fetch'
import authenticateWithOdp from '../../../../lib/authenticate-with-odp.js'
import { ODP_ADDRESS_CATALOGUE_ENDPOINT, ODP_INTEGRATION_BATCH_SIZE } from '../../../../config.js'

export default async (self, { offset = 0, limit = ODP_INTEGRATION_BATCH_SIZE }, ctx) => {
  const { token_type, access_token } = await authenticateWithOdp()

  const response = await fetch(
    `${ODP_ADDRESS_CATALOGUE_ENDPOINT}?limit=${limit}&offset=${offset}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: [token_type, access_token].join(' '),
      },
    }
  )

  return await response.json()
}
