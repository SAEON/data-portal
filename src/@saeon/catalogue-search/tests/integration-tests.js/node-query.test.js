import { Catalogue } from '../../src/catalogue-search'
import { API_ADDRESS } from '../config/constants'
import fetch from 'node-fetch'

const dslAddress = `${API_ADDRESS}`
const index = 'saeon-odp-4-2'
const httpClient = fetch

const catalog = new Catalogue({ dslAddress, index, httpClient })

describe('MATCH QUERIES', () => {
  test('Works in a node.js environment', async () => {
    const query = 'landcover'
    const response = await catalog.query({
      _source: {
        includes: ['metadata_json.subjects.*'],
      },
      query: {
        match: {
          'metadata_json.subjects.subject': {
            query,
            fuzziness: 'AUTO',
          },
        },
      },
    })
    expect(Object.keys(response).sort()).toEqual(['took', 'timed_out', '_shards', 'hits'].sort())
  })
})
