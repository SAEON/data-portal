import { ES_HOST_ADDRESS, ES_INDEX } from '../config.js'
import fetch from 'node-fetch'
import mappings from './mappings.json'
import settings from './settings.json'

const TEMPLATE_URI = `${ES_HOST_ADDRESS}/_index_template/${ES_INDEX}`

export const configure = async () => {
  const response = await fetch(TEMPLATE_URI, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      index_patterns: [ES_INDEX],
      template: {
        settings,
        mappings,
      },
    }),
  })
    .then(res => res.json())
    .catch(error => error)

  console.log('Configured Elasticsearch index templates', response)
}
