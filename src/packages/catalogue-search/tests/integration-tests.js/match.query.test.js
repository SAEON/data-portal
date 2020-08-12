import { Catalogue } from '../../src/catalogue-search/index.js'
import { API_ADDRESS, INDEX } from '../config/constants.js'

describe('MATCH QUERIES', () => {
  let catalog
  beforeEach(() => (catalog = new Catalogue({ dslAddress: API_ADDRESS, index: INDEX })))

  test('Confirm no results for non-existent term', async () => {
    catalog.addMatchClauses({
      query: 'noterm',
      fields: ['subjects.subject'],
    })
    const response = await catalog.query()
    console.log(response)
    expect(response.hits.total.value).toBe(0)
  })

  test('Query single field', async () => {
    const query = 'landcover'
    catalog.defineSource({
      includes: ['subjects.*'],
    })
    catalog.addMatchClauses({
      query,
      fields: ['subjects.subject'],
      fuzziness: 'AUTO',
    })
    const response = await catalog.query()
    response.hits.hits.forEach(({ _source }) => {
      const { subjects } = _source
      let exists = false
      subjects.forEach(({ subject }) => {
        if (subject.toLowerCase().includes(query.toLowerCase())) exists = true
      })
      expect(exists).toBe(true)
    })
  })

  test('Query multiple matches', async () => {
    const catalog = new Catalogue({ dslAddress: API_ADDRESS, index: INDEX })
    catalog.addMatchClauses(
      {
        query: 'landcover',
        fields: ['subjects.subject', 'descriptions.desciption', 'titles.title'],
      },
      {
        query: 'water',
        fields: ['subjects.subject', 'descriptions.desciption', 'titles.title'],
      }
    )
    const response = await catalog.query()
    expect(response.hits.total.value).toBe(3)
  })

  test('Query multiple fields', async () => {
    const query = 'water'
    catalog.defineSource({
      includes: ['subjects.subject', 'descriptions.description'],
    })
    catalog.addMatchClauses({
      query,
      fields: ['subjects.subject', 'descriptions.desciption'],
    })
    const response = await catalog.query()
    response.hits.hits.forEach(({ _source }) => {
      const { subjects, descriptions } = _source
      let exists = false
      subjects.forEach(({ subject }) => {
        if (subject.toLowerCase().includes(query.toLowerCase())) exists = true
      })
      descriptions.forEach(({ description }) => {
        if (description.toLowerCase().includes(query.toLowerCase())) exists = true
      })
      expect(exists).toBe(true)
    })
  })
})
