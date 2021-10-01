import makeOdpIterator from './iterator/index.js'
import processRecords from './process-records/index.js'
import institutions from './institutions.js'

let lock = false

export default async function () {
  // Only ever run one instance of this integration
  if (lock) {
    console.info('Metadata integration already running')
    return
  }

  lock = true
  const summary = {}

  try {
    /**
     * Loop through static list of institutions
     * For each institution, process all metadata
     * into Elasticsearch
     */
    for (const institution of institutions) {
      summary[institution] = 0
      let odpIterator = await makeOdpIterator({ institution })
      while (!odpIterator.done) {
        const { data } = odpIterator
        summary[institution] += data.length
        const res = await processRecords(data)
        console.info(
          `Processed ${data.length} records into metadata index (${institution}).`,
          `Response code`,
          res.statusCode
        )
        odpIterator = await odpIterator.next()
      }
    }
    console.info('Metadata integration summary', summary)
  } catch (error) {
    console.error('Error running Metadata integration', error)
    throw error
  } finally {
    lock = false
  }
}
