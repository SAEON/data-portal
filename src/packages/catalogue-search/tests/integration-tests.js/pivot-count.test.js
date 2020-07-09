import { Catalogue } from '../../src/catalogue-search/index.js'
import { API_ADDRESS } from '../config/constants.js'

const dslAddress = `${API_ADDRESS}`
const index = 'saeon-odp-4-2'
let catalog

describe('COUNT PIVOT', () => {
  beforeEach(() => (catalog = new Catalogue({ dslAddress, index })))

  test('Valid fields', async () => {
    const results = await catalog.countPivotOn({
      fields: ['metadata_json.subjects.subject.raw', 'metadata_json.publisher.raw'],
    })
    expect(typeof results).toBe('object')
  })

  test('Works with subjects query', async () => {
    const results = await catalog.countPivotOn({
      fields: ['metadata_json.subjects.subject.raw', 'metadata_json.publisher.raw'],
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
