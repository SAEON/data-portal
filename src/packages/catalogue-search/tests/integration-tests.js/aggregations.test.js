import { Catalogue } from '../../src/catalogue-search'
import { API_ADDRESS } from '../config/constants'

const dslAddress = `${API_ADDRESS}`
const index = 'saeon-odp-4-2'
let catalog

describe('AGGREAGATIONS', () => {
  beforeEach(() => (catalog = new Catalogue({ dslAddress, index })))

  test('There are results', async () => {
    const record = await catalog.getDataThemes()
    expect(typeof record).toBe('object')
  })
})
