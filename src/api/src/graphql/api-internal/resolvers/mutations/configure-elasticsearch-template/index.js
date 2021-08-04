import fetch from 'node-fetch'
import mappings from './mappings.json'
import settings from './settings.json'
import { ELASTICSEARCH_ADDRESS, ELASTICSEARCH_TEMPLATE } from '../../../../../config.js'

export default async () => {
  return fetch(`${ELASTICSEARCH_ADDRESS}/_index_template/${ELASTICSEARCH_TEMPLATE}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      index_patterns: [`${ELASTICSEARCH_TEMPLATE}-*`],
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
}
