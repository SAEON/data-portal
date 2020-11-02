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
    await fetch(`${ELASTICSEARCH_ADDRESS}/${CATALOGUE_API_ELASTICSEARCH_INDEX_NAME}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json =>
        console.log(`${CATALOGUE_API_ELASTICSEARCH_INDEX_NAME} deleted on refresh`, json)
      )
      .catch(error => {
        throw error
      })

    /**
     * Fetch from the source, and push to the destination in batches
     */
    let iterator = await makeOdpIterator()
    while (!iterator.done) {
      const response = await fetch(
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
        .then(res => res.json())
        .then(json => {
          if (json.errors) {
            throw new Error(JSON.stringify(json.items))
          } else {
            return json
          }
        })
        .catch(error => {
          throw new Error(`Unable to refresh ES index :: ${error.message}`)
        })

      console.log(
        `Processed ${response.items.length} docs into the ${CATALOGUE_API_ELASTICSEARCH_INDEX_NAME} index`
      )
      response.items.forEach(({ index }) => (result[index.result] += 1))

      iterator = await iterator.next()
    }
  } catch (error) {
    result.error = error.message
  }

  return result
}
