import fetch from 'node-fetch'
import mappings from './mappings.json'
import settings from './settings.json'
import {
  ELASTICSEARCH_ADDRESS,
  CATALOGUE_PROXY_ADDRESS,
  CATALOGUE_API_ELASTICSEARCH_TEMPLATE_NAME,
} from '../../config.js'
import url from 'url'

/**
 * It should only be possible to configure elasticsearch
 *   => With correct authentication TODO
 *   => If the read address (proxy) is the same as the write address
 */
export default async () => {
  if (url.parse(ELASTICSEARCH_ADDRESS).hostname !== url.parse(CATALOGUE_PROXY_ADDRESS).hostname) {
    return 'Aborting! Read / write from separate hostnames'
  }

  return fetch(
    `${ELASTICSEARCH_ADDRESS}/_index_template/${CATALOGUE_API_ELASTICSEARCH_TEMPLATE_NAME}`,
    {
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
    }
  )
    .then(res => res.json())
    .catch(error => {
      throw new Error(`Unable to configure Elasticsearch template: ${error.message}`)
    })
}
