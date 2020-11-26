import fetch from 'node-fetch'
import { CATALOGUE_API_ELASTICSEARCH_INDEX_NAME, ELASTICSEARCH_ADDRESS } from '../../config.js'
import makeOdpIterator from './iterator/index.js'

export default async () => {
  const result = {
    updated: 0,
    created: 0,
    error: false,
  }

  try {
    /**
     * For now, just delete and recreate the index on app start
     * Updating documents doesn't seem to update the mapping
     */
    const elasticsearchTemplateResponse = await fetch(
      `${ELASTICSEARCH_ADDRESS}/${CATALOGUE_API_ELASTICSEARCH_INDEX_NAME}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const odpJson = await elasticsearchTemplateResponse.json()
    console.log(`${CATALOGUE_API_ELASTICSEARCH_INDEX_NAME} deleted on refresh`, odpJson)

    /**
     * Fetch from the source, and push to the destination in batches
     */
    let iterator = await makeOdpIterator()
    while (!iterator.done) {
      const elasticsResponse = await fetch(
        `${ELASTICSEARCH_ADDRESS}/${CATALOGUE_API_ELASTICSEARCH_INDEX_NAME}/_bulk`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-ndjson',
          },
          body: iterator.data
            .map(doc => `{ "index": {"_id": "${doc.id}"} }\n${JSON.stringify(doc)}\n`)
            .join(''),
        }
      )
      const elasticsResponseJson = await elasticsResponse.json()
      if (elasticsResponseJson.errors) {
        throw new Error(JSON.stringify(elasticsResponseJson.items))
      }

      console.log(
        `Processed ${elasticsResponseJson.items.length} docs into the ${CATALOGUE_API_ELASTICSEARCH_INDEX_NAME} index`
      )

      elasticsResponseJson.items.forEach(({ index }) => (result[index.result] += 1))
      iterator = await iterator.next()
    }
  } catch (error) {
    result.error = error.message
    console.log(result)
    process.exit(1)
  }

  return result
}
