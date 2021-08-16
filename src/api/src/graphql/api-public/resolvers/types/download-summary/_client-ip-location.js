import DataLoader from 'dataloader'
import fetch from 'node-fetch'

const API_URL = 'http://ip-api.com/batch'

/**
 * Application level batching of requests for
 * ip -> location resolution using the API at
 * https://ip-api.com/docs/api:batch
 *
 * keys: [ip1, ip2, etc]
 */
const resolveIps = async keys => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(
      keys.map(query => ({
        query,
        fields: 'city,countryCode,district,query',
        lang: 'en',
      }))
    ),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(error => {
      throw new Error(error)
    })

  return keys.map(ipAddress => response.find(({ query }) => query === ipAddress))
}

const locationFinder = new DataLoader(ipAddresses => resolveIps(ipAddresses))

export default async ({ clientIpAddress = '' }) => {
  const { countryCode, city, district } = await locationFinder.load(clientIpAddress)

  if (!countryCode || !city) {
    return 'UNKNOWN'
  }

  return `${countryCode}/${city}${district ? `/${district}` : ''}`
}
