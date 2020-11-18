import fetch from 'node-fetch'
import mappings from './mappings.json'
import settings from './settings.json'
import { ELASTICSEARCH_ADDRESS, CATALOGUE_API_ELASTICSEARCH_TEMPLATE_NAME } from '../../config.js'

export default async () =>
  fetch(`${ELASTICSEARCH_ADDRESS}/_index_template/${CATALOGUE_API_ELASTICSEARCH_TEMPLATE_NAME}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      index_patterns: [`${CATALOGUE_API_ELASTICSEARCH_TEMPLATE_NAME}-*`],
      template: {
        settings,
        mappings,
      },
    }),
  })
    .then(res => res.json())
    .catch(error => {
      throw new Error(`Unable to configure Elasticsearch template: ${error.message}`)
    })
