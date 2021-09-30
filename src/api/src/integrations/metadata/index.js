import fetch from 'node-fetch'
import { ODP_API, ODP_INTEGRATION_BATCH_SIZE as limit } from '../../config/index.js'
import authenticateWithOdp from '../../lib/authenticate-with-odp.js'

export default async function () {
  const { token_type, access_token } = await authenticateWithOdp()
  const Authorization = [token_type, access_token].join(' ')

  const res = await fetch(
    `${ODP_API}/chief-directorate-oceans-and-coastal-research/metadata?offset=${0}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization,
      },
    }
  )

  const json = await res.json()

  console.log('hi', json)
}
