import fetch from 'node-fetch'
import { IP_RESOLVER_API_ADDRESS, LOG_FIELDS } from '../../_logger.js'

export default async ips => {
  const res = await fetch(IP_RESOLVER_API_ADDRESS, {
    method: 'POST',
    body: JSON.stringify(
      ips.map(query => ({
        query,
        fields: LOG_FIELDS,
        lang: 'en',
      }))
    ),
    headers: {
      'Content-type': 'application/json',
    },
  })

  const xTtl = res.headers.get('X-Ttl')
  const xRl = res.headers.get('X-Rl')
  console.info('IP API usage:', `${xRl} / 15 remaining`)

  if (xRl < 1) {
    throw new Error(
      `Usage limit of the ${IP_RESOLVER_API_ADDRESS} endpoint (15 requests per minute). Please wait ${xTtl} seconds before requesting IP location Information again. Try a longer delay between ip location requests`
    )
  }

  const json = await res.json()
  return json
}
