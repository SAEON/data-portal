import fetch from 'node-fetch'
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
    await fetch(`${ELASTICSEARCH_ADDRESS}/${ELASTICSEARCH_CATALOGUE_INDEX}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.info('Existing index deleted')

    // Insert new records from the ODP
    let iterator = await makeOdpIterator()
    while (!iterator.done) {
      const esResponse = await fetch(
        `${ELASTICSEARCH_ADDRESS}/${ELASTICSEARCH_CATALOGUE_INDEX}/_bulk`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-ndjson'
          },
          body: (await filter(iterator.data))
            .map(doc => `{ "index": {"_id": "${doc.id}"} }\n${JSON.stringify(doc)}\n`)
            .join('')
        }
      )

      // Process ODP response into Elasticsearch
      try {
        const esResponseJson = await esResponse.json()

        if (esResponseJson?.errors) {
          console.info(
            'Failure integrating the following ODP records into the Elasticsearch index',
            JSON.stringify(
              esResponseJson.items
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
          `Processed ${esResponseJson.items?.length ||
            0} docs into the ${ELASTICSEARCH_CATALOGUE_INDEX} index`
        )

        esResponseJson.items?.forEach(({ index }) => {
          if (index.result) {
            result[index.result]++
          }

          if (index.error) {
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
    throw error
  } finally {
    lock = false
  }
}
