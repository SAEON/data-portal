import fetch from 'node-fetch'
const IP_RESOLVER_API_ADDRESS = 'http://ip-api.com/batch'

export default async ips => {
  const res = await fetch(IP_RESOLVER_API_ADDRESS, {
    method: 'POST',
    body: JSON.stringify(
      ips.map(query => ({
        query,
        fields: 'city,countryCode,district,query',
        lang: 'en',
      }))
    ),
    headers: {
      'Content-type': 'application/json',
    },
  })

  const xTtl = res.headers.get('X-Ttl')
  const xRl = res.headers.get('X-Rl')

  if (xRl < 1) {
    throw new Error(
      `Usage limit of the ${IP_RESOLVER_API_ADDRESS} endpoint (15 requests per minute). Please wait ${xTtl} seconds before requesting IP location Information again. Try a longer delay between ip location requests`
    )
  }

  const json = await res.json()
  return json
}
