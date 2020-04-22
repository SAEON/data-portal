import { Catalogue } from '../../src'
import { API_ADDRESS } from '../config/constants'

const dslAddress = `${API_ADDRESS}/proxy/saeon-elk`
const index = 'saeon-odp-4-2'

const catalog = new Catalogue({ dslAddress, index })

describe('BOOLEAN QUERIES', () => {
  test('Mutliple match queries', async () => {
    const response = await catalog.query({
      query: {
        bool: {
          must: [
            {
              multi_match: {
                query: 'landcover',
                fields: [
                  'metadata_json.subjects.subject',
                  'metadata_json.descriptions.desciption',
                  'metadata_json.titles.title',
                ],
              },
            },
            {
              multi_match: {
                query: 'water',
                fields: [
                  'metadata_json.subjects.subject',
                  'metadata_json.descriptions.desciption',
                  'metadata_json.titles.title',
                ],
              },
            },
          ],
        },
      },
    })
    expect(response.hits.total).toBe(3)
  })
})
