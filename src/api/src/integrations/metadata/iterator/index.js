import fetch from 'node-fetch'
import { ODP_API, ODP_INTEGRATION_BATCH_SIZE } from '../../../config/index.js'
import authenticateWithOdp from '../../../lib/authenticate-with-odp.js'

async function iterate({ institution, offset = 0, limit = ODP_INTEGRATION_BATCH_SIZE } = {}) {
  if (!institution) {
    throw new Error('Institution must be provided for ODP metadata integration')
  }

  const { token_type, access_token } = await authenticateWithOdp()
  const Authorization = [token_type, access_token].join(' ')

  const res = await fetch(`${ODP_API}/${institution}/metadata?offset=${offset}&limit=${limit}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization,
    },
  })

  const data = await res.json()

  return {
    data,
    next: () => iterate({ institution, offset: offset + limit, limit }),
    done: !data.length,
  }
}

export default iterate
