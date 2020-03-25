import { ElasticCatalogue } from '../src'
const dslAddress = 'https://api.atlas.saeon.ac.za/saeon-elk'

describe("SAEON's DSL API", () => {
  const catalog = new ElasticCatalogue({ dslAddress })
  describe('Leaf queries', () => {
    test('match', async () => {
      const result = await catalog.query({
        query: {
          multi_match: {
            fields: ['metadata_json.subjects.subject'],
            query: 'SASDI',
          },
        },
      })
      console.log(result)
      expect(result).toEqual([])
    })
  })
})
