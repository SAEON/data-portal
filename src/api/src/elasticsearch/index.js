import { ELASTICSEARCH_ADDRESS, ELASTICSEARCH_INDEX } from '../config.js'
import { Client as ElasticClient } from '@elastic/elasticsearch'

const client = new ElasticClient({ node: ELASTICSEARCH_ADDRESS })

export const query = async dsl => {
  if (!dsl) {
    throw new Error(`DSL object is required to query the Elasticsearch instance`)
  } else {
    dsl = typeof dsl === 'string' ? JSON.parse(dsl) : dsl
  }

  try {
    return await client.search({
      index: ELASTICSEARCH_INDEX,
      body: dsl,
    })
  } catch (error) {
    throw new Error(`Elasticsearch query failed with DSL body ${JSON.stringify(dsl)}. ${error}`)
  }
}
