import fetch from 'node-fetch'
import { ES_INDEX, ES_HOST_ADDRESS } from '../../config.js'
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
    await fetch(`${ES_HOST_ADDRESS}/${ES_INDEX}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => console.log(`${ES_INDEX} deleted on refresh`, json))
      .catch(error => {
        throw error
      })

    /**
     * Fetch from the source, and push to the destination in batches
     */
    let iterator = await makeOdpIterator()
    while (!iterator.done) {
      const response = await fetch(`${ES_HOST_ADDRESS}/${ES_INDEX}/_bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-ndjson',
        },
        body: iterator.data
          .map(doc => `{ "index": {"_id": "${doc.id}"} }\n${JSON.stringify(doc)}\n`)
          .join(''),
      })
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

      console.log(`Processed ${response.items.length} docs into the ${ES_INDEX} index`)
      response.items.forEach(({ index }) => (result[index.result] += 1))

      iterator = await iterator.next()
    }
  } catch (error) {
    result.error = error.message
  }

  return result
}
