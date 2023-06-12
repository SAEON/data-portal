import { ODP_API_CATALOGUE_ENDPOINT, ODP_INTEGRATION_BATCH_SIZE } from '../../../../config/index.js'
import transform from './_transform.js'
import authenticate from '../../../../lib/authenticate-with-odp.js'

const iterate = async (log, { page = 1 } = {}) => {
  const { token_type, access_token } = await authenticate({ useCachedToken: true })
  const Authorization = [token_type, access_token].join(' ')

  const res = await fetch(
    `${ODP_API_CATALOGUE_ENDPOINT}?include_nonsearchable=true&include_retracted=true&size=${ODP_INTEGRATION_BATCH_SIZE}&page=${page}`,
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
    next: () => iterate(log, { page: page + 1 }),
    data: transform(log, data),
    done: !data?.items.length,
  }
}

export default iterate
