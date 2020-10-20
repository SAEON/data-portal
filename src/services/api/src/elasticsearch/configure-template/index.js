import fetch from 'node-fetch'
import mappings from './mappings.json'
import settings from './settings.json'
import { ES_HOST_ADDRESS, ES_TEMPLATE } from '../../config.js'

export default async () =>
  fetch(`${ES_HOST_ADDRESS}/_index_template/${ES_TEMPLATE}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      index_patterns: [`${ES_TEMPLATE}-*`],
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
