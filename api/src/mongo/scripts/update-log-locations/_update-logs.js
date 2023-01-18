import { db as _db } from '../../index.js'

export default async (location = {}) => {
  const { query: ip, city, district, countryCode } = location
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
        },
      }
    )

    console.info('IP address: ', ip, `Updated ${result.modifiedCount} docs`)
  } catch (error) {
    console.error('Error updating Mongo locations', location, error.message)
    process.exit(1)
  }
}
