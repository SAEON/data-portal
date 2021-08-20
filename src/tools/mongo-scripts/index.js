import { db as _db } from './db.js'
import DataLoader from 'dataloader'
import fetch from 'node-fetch'

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
        lang: 'en',
      }))
    ),
    headers: {
      'Content-type': 'application/json',
    },
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
  maxBatchSize: 100,
})



const db = await _db
const logs = db.collection('logs')

const ipAddresses = await logs.distinct("clientInfo.ipAddress")

/**
 * 
 */

const resolved = ipAddresses.map(ipAddress => locationFinder.load(ipAddress))