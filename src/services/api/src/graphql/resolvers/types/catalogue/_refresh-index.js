import fetch from 'node-fetch'
import hash from 'object-hash'
import { ES_INDEX, ES_INTEGRATION_BATCH_SIZE, ES_HOST_ADDRESS } from '../../../../config.js'

const makeIterator = async (cursor = null) => {
  const dsl = {
    size: ES_INTEGRATION_BATCH_SIZE,
    query: {
      match_all: {},
    },
    sort: [{ _id: 'asc' }],
  }

  if (cursor) {
    dsl.search_after = [cursor]
  }

  const response = await fetch('http://192.168.116.66:9200/saeon-odp-4-2/_search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dsl),
  }).then(res => res.json())

  const { hits } = response.hits

  return {
    next: () => makeIterator(hits[hits.length - 1]._id),
    values: hits,
    done: Boolean(!hits.length),
  }
}

/**
 * Even with only 2 000 docs, the default content-length
 * allowed for ES POST requests is exceeded. So it's best
 * to batch bulk inserts into ES
 *
 * Source docs don't have ID fields, so these are created
 * by hashing the doc.identifier object. If there are
 * duplicates of this... file a ticket with the curators
 */
export default async () => {
  const result = {
    updated: 0,
    created: 0,
    error: false,
  }

  try {
    let iterator = await makeIterator()
    while (!iterator.done) {
      const response = await fetch(`${ES_HOST_ADDRESS}/${ES_INDEX}/_bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-ndjson',
        },
        body: iterator.values
          .map(({ _source }) =>
            Object.assign(
              Object.fromEntries(
                Object.entries(_source.metadata_json).filter(([k]) => k !== 'originalMetadata')
              ),
              { id: hash(_source.metadata_json.identifier) }
            )
          )
          .map(doc => `{ "index": {"_id": "${doc.id}"} }\n${JSON.stringify(doc)}\n`)
          .join(''),
      })
        .then(res => res.json())
        .catch(error => {
          throw new Error(`Unable to refresh ES index :: ${error}`)
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
