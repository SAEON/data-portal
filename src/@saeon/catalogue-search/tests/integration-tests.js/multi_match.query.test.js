import { Catalogue } from '../../src'
import { API_ADDRESS } from '../config/constants'

const dslAddress = `${API_ADDRESS}/proxy/saeon-elk`
const index = 'saeon-odp-4-2'

const catalog = new Catalogue({ dslAddress, index })

describe('MULTI_MATCH QUERIES', () => {
  test('Query multiple fields', async () => {
    const query = 'water'
    const response = await catalog.query({
      _source: {
        includes: ['metadata_json.subjects.subject', 'metadata_json.descriptions.description'],
      },
      query: {
        multi_match: {
          query,
          fields: ['metadata_json.subjects.subject', 'metadata_json.descriptions.desciption'],
        },
      },
    })
    response.hits.hits.forEach(({ _source }) => {
      const { metadata_json } = _source
      let exists = false
      metadata_json.subjects.forEach(({ subject }) => {
        if (subject.toLowerCase().includes(query.toLowerCase())) exists = true
      })
      metadata_json.descriptions.forEach(({ description }) => {
        if (description.toLowerCase().includes(query.toLowerCase())) exists = true
      })
      expect(exists).toBe(true)
    })
  })
})
