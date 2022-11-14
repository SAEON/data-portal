import { ELASTICSEARCH_CATALOGUE_INDEX } from '../../config/index.js'
import testConnection from './_test-connection.js'
import { performance } from 'perf_hooks'
import { client } from '../../elasticsearch/index.js'
import { ODP_ADDRESS } from '../../config/index.js'
import metadata from './metadata/index.js'

let lock = false

export default async function () {
  if (lock) {
    throw new Error(
      'This integration is already running. Please wait for it to finish and try again'
    )
  }

  // START
  lock = true
  const t0 = performance.now()

  try {
    // Test that the ODP is up
    await testConnection()
    console.info(`Connection to ${ODP_ADDRESS} tested and working!`)

    // Delete the index
    await client.indices
      .delete({ index: ELASTICSEARCH_CATALOGUE_INDEX })
      .catch(() =>
        console.error(
          'Error deleting Elasticsearch index',
          ELASTICSEARCH_CATALOGUE_INDEX,
          "This probably means it didn't exist and you can ignore this message"
        )
      )

    // Recreate the index
    await client.indices.create({ index: ELASTICSEARCH_CATALOGUE_INDEX })
    console.info(`Recreated ${ELASTICSEARCH_CATALOGUE_INDEX}`)

    // Load the metadata
    const result = await metadata().catch(error => {
      console.error('Error calling metadata()')
      throw error
    })

    // Flush the index (immediately persist the new index)
    await client.indices.flush({
      index: ELASTICSEARCH_CATALOGUE_INDEX,
      wait_if_ongoing: false,
    })

    // DONE
    const t1 = performance.now()
    const runtime = `${Math.round((t1 - t0) / 1000, 2)} seconds`
    console.info('Index integration complete', runtime, result)
  } catch (error) {
    throw new Error(`ERROR integrating with SAEON ODP: ${error.message}`)
  } finally {
    lock = false
  }
}