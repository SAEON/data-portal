import { ElasticCatalogue } from '../src'
const dslAddress = 'https://api.atlas.saeon.ac.za/saeon-elk'

describe("SAEON's DSL API", () => {
  const catalog = new ElasticCatalogue({ dslAddress })
  describe('Leaf queries', () => {
    test('match', async () => {
      const result = await catalog.query({
        query: { match: { 'metadata_json.subjects.subject': 'SASDI' } },
      })
      console.log(result)
      expect(result).toEqual([])
    })
  })
})
