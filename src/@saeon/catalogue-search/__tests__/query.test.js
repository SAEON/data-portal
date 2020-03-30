// https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html
import { ElasticCatalogue } from '../src'
const dslAddress = 'http://localhost:4000/proxy/saeon-elk'

const catalog = new ElasticCatalogue({ dslAddress })
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
        const response = await catalog.query({
          query: {
            match: {
              'metadata_json.subjects.subject': {
                query: 'water',
              },
            },
          },
        })
        expect(response.hits.total).toBeGreaterThan(0)
      })
    })

    describe('Multi-match query', () => {
      test('Query multiple fields', async () => {
        const response = await catalog.query({
          query: {
            multi_match: {
              query: 'water',
              fields: ['metadata_json.subjects.subject', 'metadata_json.descriptions.desciption'],
            },
          },
        })
        expect(response.hits.total).toBeGreaterThan(0)
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
      test('todo', () => expect(1).toBe(1))
    })

    describe('dis_max', () => {
      test('todo', () => expect(1).toBe(1))
    })

    describe('constant_query', () => {
      test('todo', () => expect(1).toBe(1))
    })
  })
})
