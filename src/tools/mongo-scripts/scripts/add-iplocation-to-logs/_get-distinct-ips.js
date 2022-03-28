import { db as _db } from '../../db/index.js'

export default async () => {
  const db = await _db
  const logs = db.collection('logs')
  const ipAddresses = await logs.distinct('clientInfo.ipAddress', {
    'clientInfo.ipLocation': { $exists: false },
    'clientInfo.ipAddress': { $ne: 'unknown' }
  })
  console.log(`Found ${ipAddresses.length} unprocessed IP addresses`)
  return ipAddresses
}
