// https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html
import { ElasticCatalogue } from '../src'
const dslAddress = 'http://localhost:4000/proxy/saeon-elk'
const index = 'saeon-odp-4-2'

const catalog = new ElasticCatalogue({ dslAddress, index })
describe('Query DSL', () => {
  // Leaf queries
  describe('Leaf queries', () => {
    describe('Match queries', () => {
      test('Confirm no results for non-existent term', async () => {
        const response = await catalog.query({
          query: {
            match: {
              'metadata_json.subjects.subject': {
                query: 'noterm',
              },
            },
          },
        })
        expect(response.hits.total).toBe(0)
      })

      test('Query single field', async () => {
        const query = 'terrestrial'
        const response = await catalog.query({
          _source: {
            includes: ['metadata_json.subjects.*'],
          },
          query: {
            match: {
              'metadata_json.subjects.subject': {
                query,
              },
            },
          },
        })
        response.hits.hits.forEach(({ _source }) => {
          const { metadata_json } = _source
          let exists = false
          metadata_json.subjects.forEach(({ subject }) => {
            if (subject.toLowerCase().includes(query.toLowerCase())) exists = true
          })
          expect(exists).toBe(true)
        })
      })

      test('Query term with whitespace (fuzzy search)', async () => {
        const query = 'landcover'
        const response = await catalog.query({
          _source: {
            includes: ['metadata_json.subjects.subject'],
          },
          query: {
            fuzzy: {
              'metadata_json.subjects.subject': {
                value: query,
                fuzziness: 'AUTO',
                fuzziness: 6,
              },
            },
          },
        })
        console.log(JSON.stringify(response, null, 2))
        expect(1).toBe(1)
      })
    })

    describe('Multi-match query', () => {
      test('Query multiple fields', async () => {
        const query = 'water'
        const response = await catalog.query({
          _source: {
            includes: ['metadata_json.subjects.subject', 'metadata_json.descriptions.description'],
          },
          query: {
            multi_match: {
              query,
              fields: ['metadata_json.subjects.subject', 'metadata_json.descriptions.desciption'],
            },
          },
        })
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

    describe('Term queries', () => {
      test('todo', async () => {
        expect(1).toBe(1)
      })
    })

    describe('Range queries', () => {
      test('todo', async () => {
        expect(1).toBe(1)
      })
    })
  })

  describe('Compound queries', () => {
    describe('bool', () => {
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

    describe('dis_max', () => {
      test('todo', () => expect(1).toBe(1))
    })

    describe('constant_query', () => {
      test('todo', () => expect(1).toBe(1))
    })
  })
})
