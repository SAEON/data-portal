import {
  ELASTICSEARCH_CATALOGUE_INDEX,
  ELASTICSEARCH_ADDRESS,
  ODP_FILTER
} from '../../config/index.js'
import {
  makeIterator as makeOdpIterator,
  testConnection as testOdpConnection
} from './iterator/index.js'
import { performance } from 'perf_hooks'
import { client } from '../../elasticsearch/index.js'

const filter = async items => {
  const fn = await ODP_FILTER
  if (fn) {
    return items.filter(fn)
  } else {
    return items
  }
}

let lock = false

export default async function() {
  if (lock) {
    throw new Error(
      'This integration is already running. Please wait for it to finish and try again'
    )
  }

  lock = true

  const t0 = performance.now()

  const result = {
    updated: 0,
    created: 0,
    errors: false
  }

  try {
    // Test that the ODP is up
    await testOdpConnection()

    // Delete the index
    await client.indices
      .delete({ index: ELASTICSEARCH_CATALOGUE_INDEX })
      .catch(error =>
        console.error(
          'Error deleting Elasticsearch index',
          ELASTICSEARCH_CATALOGUE_INDEX,
          "This probably means it didn't exist and you can ignore this message",
          error
        )
      )

    // Recreate the index
    await client.indices.create({ index: ELASTICSEARCH_CATALOGUE_INDEX })

    /**
     * Iterate over the ODP records
     * Insert each batch into ES
     */
    let iterator = await makeOdpIterator()
    while (!iterator.done) {
      try {
        const res = await client.bulk({
          index: ELASTICSEARCH_CATALOGUE_INDEX,
          refresh: true,
          body: (await filter(iterator.data))
            .map(doc => `{ "index": {"_id": "${doc.id}"} }\n${JSON.stringify(doc)}\n`)
            .join('')
        })

        if (res?.errors) {
          console.info(
            'Failure integrating the following ODP records into the Elasticsearch index',
            JSON.stringify(
              res.items
                .filter(({ index: doc }) => doc.error)
                .map(({ index: doc }) => ({
                  [doc._id]: JSON.stringify(doc.error)
                })),
              null,
              2
            )
          )
        }

        console.info(
          `Processed ${res.items?.length ||
            0} docs into the ${ELASTICSEARCH_CATALOGUE_INDEX} index`
        )

        res.items?.forEach(({ index }) => {
          if (index.status === 201) {
            result[index.result]++
          } else {
            result.errors++
          }
        })
      } catch (error) {
        console.warn(
          `Unexpected response received from ${ELASTICSEARCH_ADDRESS}. Some records have NOT been indexed`,
          error
        )
      }

      iterator = await iterator.next()
    }

    // Flush the index
    await client.indices.flush({
      index: ELASTICSEARCH_CATALOGUE_INDEX,
      wait_if_ongoing: false
    })

    // Done!
    const t1 = performance.now()
    const runtime = `${Math.round((t1 - t0) / 1000, 2)} seconds`
    console.info('Index integration complete', runtime, result)
  } catch (error) {
    throw new Error(`ERROR integration with SAEON ODP: ${error.message}`)
  } finally {
    lock = false
  }
}
