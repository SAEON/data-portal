import fetch from 'node-fetch'
import {
  ELASTICSEARCH_INDEX,
  ELASTICSEARCH_ADDRESS,
  ODP_FILTER,
} from '../../../../../config/index.js'
import {
  makeIterator as makeOdpIterator,
  testConnection as testOdpConnection,
} from './iterator/index.js'
import { performance } from 'perf_hooks'

const filter = async items => {
  const fn = await ODP_FILTER
  if (fn) {
    return items.filter(fn)
  } else {
    return items
  }
}

export default async () => {
  const t0 = performance.now()

  const result = {
    updated: 0,
    created: 0,
    errors: false,
  }

  /**
   * First test that the ODP is accessible,
   * If not, abort the integration.
   */
  try {
    await testOdpConnection()
  } catch (error) {
    const msg = 'Unable to integrate with the ODP - are you on the VPN?'
    console.error(msg, error)
    return {
      runtime: `${Math.round((performance.now() - t0) / 1000, 2)} seconds`,
      ...result,
      msg,
    }
  }

  try {
    /**
     * For now, just delete and recreate the index on app start
     * Updating documents doesn't seem to update the mapping
     */
    const elasticsearchTemplateResponse = await fetch(
      `${ELASTICSEARCH_ADDRESS}/${ELASTICSEARCH_INDEX}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const odpJson = await elasticsearchTemplateResponse.json()
    console.info(`${ELASTICSEARCH_INDEX} deleted on refresh`, odpJson)

    /**
     * Fetch from the source, and push to the destination in batches
     */
    let iterator = await makeOdpIterator()
    while (!iterator.done) {
      const esResponse = await fetch(`${ELASTICSEARCH_ADDRESS}/${ELASTICSEARCH_INDEX}/_bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-ndjson',
        },
        body: (await filter(iterator.data))
          .map(doc => `{ "index": {"_id": "${doc.id}"} }\n${JSON.stringify(doc)}\n`)
          .join(''),
      })

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
                  [doc._id]: JSON.stringify(doc.error),
                })),
              null,
              2
            )
          )
        }

        console.info(
          `Processed ${
            esResponseJson.items?.length || 0
          } docs into the ${ELASTICSEARCH_INDEX} index`
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
  } catch (error) {
    result.errors = error.message
    console.error(error)
    console.error('ERROR', result)
    process.exit(1)
  }

  const t1 = performance.now()
  const runtime = `${Math.round((t1 - t0) / 1000, 2)} seconds`
  console.info('Index integration complete', runtime)
  return { runtime, ...result }
}
