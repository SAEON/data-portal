import DataLoader from 'dataloader'
import fetch from 'node-fetch'
import { PASSPORT_SSO_SESSION_ID } from '../../../../config/index.js'

const IP_RESOLVER_API_ADDRESS = 'http://ip-api.com/batch'

/**
 * Application level batching of requests for
 * ip -> location resolution using the API at
 * https://ip-api.com/docs/api:batch
 *
 * keys: [ip1, ip2, etc]
 */
const resolveIpBatch = async keys => {
  const res = await fetch(IP_RESOLVER_API_ADDRESS, {
    method: 'POST',
    body: JSON.stringify(
      [...new Set(keys)].map(query => ({
        query,
        fields: 'city,countryCode,district,query',
        lang: 'en'
      }))
    ),
    headers: {
      'Content-type': 'application/json'
    }
  })

  const xTtl = res.headers.get('X-Ttl')
  const xRl = res.headers.get('X-Rl')

  if (xRl < 2) {
    throw new Error(
      `Usage limit of the ${IP_RESOLVER_API_ADDRESS} endpoint (15 requests per minute). Please wait ${xTtl} seconds before requesting IP location Information again`
    )
  }

  const json = await res.json()
  return keys.map(ipAddress => json.find(({ query }) => query === ipAddress))
}

const locationFinder = new DataLoader(ipAddresses => resolveIpBatch(ipAddresses), {
  maxBatchSize: 100
})

export default async (self, args, ctx) => {
  const { input: logs, referrer = undefined } = args
  const { logToMongo } = ctx.mongo

  const ipAddress = ctx.request.headers['X-Real-IP'] || ctx.request.ip

  const { countryCode, city, district } = await locationFinder.load(ipAddress).catch(error => {
    console.error('Error resolving log IP address to location', error.message)
    return {}
  })

  const ipLocation =
    countryCode && city ? `${countryCode}/${city}${district ? `/${district}` : ''}` : 'UNKNOWN'

  logToMongo(
    ...logs.map(log =>
      Object.assign(
        {
          referrer,
          clientSession: ctx.cookies.get(PASSPORT_SSO_SESSION_ID) || 'no-session', // This can happen if the user blocks cookies
          clientInfo: {
            ipAddress,
            ipLocation,
            userAgent: ctx.request.headers['user-agent']
          }
        },
        log
      )
    )
  )
}
