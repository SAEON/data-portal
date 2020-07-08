import { Catalogue } from '../../src/catalogue-search/index.js'
import { API_ADDRESS } from '../config/constants.js'

const dslAddress = `${API_ADDRESS}`
const index = 'saeon-odp-4-2'
let catalog

describe('SINGLE RECORD', () => {
  beforeEach(() => (catalog = new Catalogue({ dslAddress, index })))

  test('Valid ID returns record', async () => {
    const record = await catalog.getSingleRecord('c770a2bfa4108b82725ae1174bf881cd')
    expect(typeof record).toBe('object')
  })

  test('Invalid ID returns undefined', async () => {
    const record = await catalog.getSingleRecord('thisshouldntexist')
    expect(record).toBe(undefined)
  })
})
