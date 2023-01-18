import { collections } from '../../index.js'

export default async () => {
  const Logs = (await collections).Logs
  const ipAddresses = await Logs.distinct('clientInfo.ipAddress', {
    'clientInfo.ipAddress': { $ne: 'unknown' },
  })
  console.log(`Found ${ipAddresses.length} unprocessed IP addresses`)
  return ipAddresses
}
