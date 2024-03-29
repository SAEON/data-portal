import { ELASTICSEARCH_ADDRESS, ELASTICSEARCH_CATALOGUE_INDEX } from '../config/index.js'
import { Client as ElasticClient } from 'es8.x'
import setupTemplates from './setup-templates/index.js'

export const client = new ElasticClient({ node: ELASTICSEARCH_ADDRESS })

export const query = async ({ index = ELASTICSEARCH_CATALOGUE_INDEX, body }) => {
  if (!body) {
    throw new Error(`DSL object is required to query the Elasticsearch instance`)
  } else {
    body = typeof body === 'string' ? JSON.parse(body) : body
  }

  try {
    return await client.search({
      index,
      ...body,
    })
  } catch (error) {
    console.error(`Elasticsearch query failed with DSL body ${JSON.stringify(body)}. ${error}`)
    return undefined
  }
}

export default () =>
  setupTemplates(client)
    .then(res => console.info('Elasticsearch templates configured', res))
    .catch(error => {
      console.error('Unable to setup Elasticsearch templates', error.message)
      process.exit(1)
    })
