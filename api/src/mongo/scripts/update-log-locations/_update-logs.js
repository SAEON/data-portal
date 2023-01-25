import { db as _db } from '../../index.js'
import { IP_RESOLVER_API_ADDRESS } from '../../_logger.js'

export default async (ipInfo = {}) => {
  const { query: ip, city, district, countryCode } = ipInfo
  const db = await _db
  const logs = db.collection('logs')
  try {
    const result = await logs.updateMany(
      {
        'clientInfo.ipAddress': ip,
      },
      {
        $set: {
          'clientInfo.ipLocation':
            countryCode && city
              ? `${countryCode}/${city}${district ? `/${district}` : ''}`
              : 'UNKNOWN',
          'clientInfo.ipInfo': { ...ipInfo, _source: IP_RESOLVER_API_ADDRESS },
        },
      },
      {
        upsert: false,
      }
    )

    console.info('IP address: ', ip, `Updated ${result.modifiedCount} docs`)
  } catch (error) {
    console.error('Error updating Mongo locations', ipInfo, error.message)
    process.exit(1)
  }
}
