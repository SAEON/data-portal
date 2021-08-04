import fetch from 'node-fetch'
import { ELASTICSEARCH_INDEX, ELASTICSEARCH_ADDRESS, ODP_FILTER } from '../../../../../config.js'
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
    console.error(msg)
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
    console.log(`${ELASTICSEARCH_INDEX} deleted on refresh`, odpJson)

    /**
     * Fetch from the source, and push to the destination in batches
     */
    let iterator = await makeOdpIterator()
    while (!iterator.done) {
      const elasticsResponse = await fetch(
        `${ELASTICSEARCH_ADDRESS}/${ELASTICSEARCH_INDEX}/_bulk`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-ndjson',
          },
          body: await filter(iterator.data)
            .map(doc => `{ "index": {"_id": "${doc.id}"} }\n${JSON.stringify(doc)}\n`)
            .join(''),
        }
      )
      const elasticsResponseJson = await elasticsResponse.json()

      if (elasticsResponseJson.errors) {
        console.log(
          'Failure integrating the following ODP records into the Elasticsearch index',
          JSON.stringify(
            elasticsResponseJson.items
              .filter(({ index: doc }) => doc.error)
              .map(({ index: doc }) => ({
                [doc._id]: JSON.stringify(doc.error),
              })),
            null,
            2
          )
        )
      }

      console.log(
        `Processed ${
          elasticsResponseJson.items?.length || 0
        } docs into the ${ELASTICSEARCH_INDEX} index`
      )

      elasticsResponseJson.items?.forEach(({ index }) => {
        if (index.result) {
          result[index.result]++
        }

        if (index.error) {
          result.errors++
        }
      })
      iterator = await iterator.next()
    }
  } catch (error) {
    result.errors = error.message
    console.log(result)
    process.exit(1)
  }

  const t1 = performance.now()
  const runtime = `${Math.round((t1 - t0) / 1000, 2)} seconds`
  console.log('Index integration complete', runtime)
  return { runtime, ...result }
}
