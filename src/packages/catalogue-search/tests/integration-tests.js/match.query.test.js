import { Catalogue } from '../../src/catalogue-search/index.js'
import { API_ADDRESS } from '../config/constants.js'

const dslAddress = `${API_ADDRESS}`
const index = 'saeon-odp-4-2'

describe('MATCH QUERIES', () => {
  let catalog
  beforeEach(() => (catalog = new Catalogue({ dslAddress, index })))

  test('Confirm no results for non-existent term', async () => {
    catalog.addMatchClauses({
      query: 'noterm',
      fields: ['metadata_json.subjects.subject'],
    })
    const response = await catalog.query()
    expect(response.hits.total).toBe(0)
  })

  test('Query single field', async () => {
    const query = 'landcover'
    catalog.defineSource({
      includes: ['metadata_json.subjects.*'],
    })
    catalog.addMatchClauses({
      query,
      fields: ['metadata_json.subjects.subject'],
      fuzziness: 'AUTO',
    })
    const response = await catalog.query()
    response.hits.hits.forEach(({ _source }) => {
      const { metadata_json } = _source
      let exists = false
      metadata_json.subjects.forEach(({ subject }) => {
        if (subject.toLowerCase().includes(query.toLowerCase())) exists = true
      })
      expect(exists).toBe(true)
    })
  })

  test('Query multiple matches', async () => {
    const catalog = new Catalogue({ dslAddress, index })
    catalog.addMatchClauses(
      {
        query: 'landcover',
        fields: [
          'metadata_json.subjects.subject',
          'metadata_json.descriptions.desciption',
          'metadata_json.titles.title',
        ],
      },
      {
        query: 'water',
        fields: [
          'metadata_json.subjects.subject',
          'metadata_json.descriptions.desciption',
          'metadata_json.titles.title',
        ],
      }
    )
    const response = await catalog.query()
    expect(response.hits.total).toBe(3)
  })

  test('Query multiple fields', async () => {
    const query = 'water'
    catalog.defineSource({
      includes: ['metadata_json.subjects.subject', 'metadata_json.descriptions.description'],
    })
    catalog.addMatchClauses({
      query,
      fields: ['metadata_json.subjects.subject', 'metadata_json.descriptions.desciption'],
    })
    const response = await catalog.query()
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
