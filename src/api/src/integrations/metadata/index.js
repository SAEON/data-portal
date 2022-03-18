import { ELASTICSEARCH_METADATA_INDEX } from '../../config/index.js'
import makeOdpIterator from './iterator/index.js'
import processRecords from './process-records/index.js'
import institutions from './institutions.js'
import { client } from '../../elasticsearch/index.js'

export default async function () {
  console.log('running scheduled job. this will be the ODP integration')

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

    // Flush the index
    await client.indices.flush({
      index: ELASTICSEARCH_METADATA_INDEX,
      wait_if_ongoing: false,
    })

    // Done!
    console.info('Metadata integration summary', summary)
  } catch (error) {
    console.error('Error running Metadata integration', error)
    throw error
  } finally {
    lock = false
  }
}
