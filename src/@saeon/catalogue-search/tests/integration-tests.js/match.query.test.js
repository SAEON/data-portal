import { Catalogue } from '../../src/catalogue-search'
import { API_ADDRESS } from '../config/constants'

const dslAddress = `${API_ADDRESS}`
const index = 'saeon-odp-4-2'

const catalog = new Catalogue({ dslAddress, index })

describe('MATCH QUERIES', () => {
  test('Confirm no results for non-existent term', async () => {
    const response = await catalog.query({
      query: {
        match: {
          'metadata_json.subjects.subject': {
            query: 'noterm',
          },
        },
      },
    })
    expect(response.hits.total).toBe(0)
  })

  test('Query single field', async () => {
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
    response.hits.hits.forEach(({ _source }) => {
      const { metadata_json } = _source
      let exists = false
      metadata_json.subjects.forEach(({ subject }) => {
        if (subject.toLowerCase().includes(query.toLowerCase())) exists = true
      })
      expect(exists).toBe(true)
    })
  })

  test('Query term with whitespace (fuzzy search)', async () => {
    const query = 'land-cover'
    const response = await catalog.query({
      _source: {
        includes: ['metadata_json.subjects.subject'],
      },
      query: {
        fuzzy: {
          'metadata_json.subjects.subject': {
            value: query,
            fuzziness: 'AUTO',
          },
        },
      },
    })
    response.hits.hits.forEach(({ _source }) => {
      const { metadata_json } = _source
      let exists = false
      metadata_json.subjects.forEach(({ subject }) => {
        if (subject.toLowerCase().includes(query.replace('-', '').replace(' ', '').toLowerCase()))
          exists = true
      })
      expect(exists).toBe(true)
    })
  })
})
