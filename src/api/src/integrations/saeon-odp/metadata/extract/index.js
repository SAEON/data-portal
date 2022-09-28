import fetch from 'make-fetch-happen'
import { ODP_API_CATALOGUE_ENDPOINT, ODP_INTEGRATION_BATCH_SIZE } from '../../../../config/index.js'
import transform from './_transform.js'
import authenticate from '../../../../lib/authenticate-with-odp.js'

const iterate = async ({ offset = 0 } = {}) => {
  const { token_type, access_token } = await authenticate({ useCachedToken: true })
  const Authorization = [token_type, access_token].join(' ')

  const res = await fetch(
    `${ODP_API_CATALOGUE_ENDPOINT}?limit=${ODP_INTEGRATION_BATCH_SIZE}&offset=${offset}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization,
      },
    }
  )

  const data = await res.json()

  if (data?.detail === 'Not authenticated') {
    throw new Error(JSON.stringify(data))
  }

  return {
    next: () => iterate({ offset: offset + data.length }),
    data: transform(data),
    done: !data?.length,
  }
}

export default iterate
