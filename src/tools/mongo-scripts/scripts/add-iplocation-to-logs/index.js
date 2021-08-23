import getDistinctIps from './_get-distinct-ips.js'
import iterateOverArray from './_array-iterator.js'
import resolveIpLocations from './_resolve-ip-locations.js'
import updateLogs from './_update-logs.js'

export default async () => {
  const distinctIps = await getDistinctIps()

  do {
    let ipIterator = iterateOverArray(distinctIps)
    const locations = await resolveIpLocations(ipIterator.items)
    for (const location of locations) {
      await updateLogs(location)
    }
    ipIterator = ipIterator.next()
  } while (!ipIterator.done)

  console.info('=== Script complete')
  process.exit(0)
}
