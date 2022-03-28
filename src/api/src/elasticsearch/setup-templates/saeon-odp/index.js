import mappings from './_mappings.js'
import settings from './_settings.js'
import { ELASTICSEARCH_CATALOGUE_TEMPLATE } from '../../../config/index.js'

export default async client => [
  ELASTICSEARCH_CATALOGUE_TEMPLATE,
  await client.indices.putIndexTemplate({
    name: ELASTICSEARCH_CATALOGUE_TEMPLATE,
    create: false,
    body: {
      index_patterns: [`${ELASTICSEARCH_CATALOGUE_TEMPLATE}-*`],
      template: {
        settings,
        mappings
      }
    }
  })
]
