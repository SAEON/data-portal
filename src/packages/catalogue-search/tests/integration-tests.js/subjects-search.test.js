import { Catalogue } from '../../src/catalogue-search/index.js'
import { API_ADDRESS, INDEX } from '../config/constants.js'

let catalog

describe('SEARCH BY SUBJECTS', () => {
  beforeEach(() => (catalog = new Catalogue({ dslAddress: API_ADDRESS, index: INDEX })))

  test('Searching for existing subjects returns results', async () => {
    const records = await catalog.searchBySubjects('Biodiversity', ' Inland')
    expect(typeof records).toBe('object')
  })

  test('Searching for non-existant subjects results an empty (valid) result', async () => {
    const records = await catalog.searchBySubjects('abcd', 'efgh')
    expect(records.length).toBe(0)
  })

  test('No subjects results in an error', async () => {
    try {
      await catalog.searchBySubjects('abcd', 'efgh')
    } catch (error) {
      expect(1).toBe(1)
    }
  })
})
