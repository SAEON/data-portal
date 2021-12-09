import mappings from './_mappings.json' assert { type: 'json' }
import settings from './_settings.json' assert { type: 'json' }
import { ELASTICSEARCH_METADATA_TEMPLATE } from '../../../config/index.js'

export default async client => [
  ELASTICSEARCH_METADATA_TEMPLATE,
  await client.indices.putIndexTemplate({
    name: ELASTICSEARCH_METADATA_TEMPLATE,
    create: false,
    body: {
      index_patterns: [`${ELASTICSEARCH_METADATA_TEMPLATE}-*`],
      template: {
        settings,
        mappings,
      },
    },
  }),
]
