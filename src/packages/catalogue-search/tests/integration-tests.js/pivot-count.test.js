import { Catalogue } from '../../src/catalogue-search/index.js'
import { API_ADDRESS, INDEX } from '../config/constants.js'

let catalog

describe('COUNT PIVOT', () => {
  beforeEach(() => (catalog = new Catalogue({ dslAddress: API_ADDRESS, index: INDEX })))

  test('Valid fields', async () => {
    const results = await catalog.countPivotOn({
      fields: ['subjects.subject.raw', 'publisher.raw'],
    })
    expect(typeof results).toBe('object')
  })

  test('Works with subjects query', async () => {
    const results = await catalog.countPivotOn({
      fields: ['subjects.subject.raw', 'publisher.raw'],
      subjects: ['noexist'],
    })
    results.forEach(result => {
      Object.entries(result).forEach(([, result]) => {
        expect(result.length).toBe(0)
      })
    })
  })

  test('Invalid fields should just return nothing', async () => {
    const results = await catalog.countPivotOn({ fields: ['a', 'b', 'a.b.c'] })
    expect(typeof results).toBe('object')
  })
})
