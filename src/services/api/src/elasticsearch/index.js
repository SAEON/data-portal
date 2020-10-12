import graphql from 'graphql'
import fetch from 'node-fetch'
import {
  ES_HOST_ADDRESS,
  ES_INDEX,
  NODE_ENV,
  CATALOGUE_SECRET,
  ES_TEMPLATE_INTEGRATION_ENABLED,
  ES_INDEX_INTEGRATION_ENABLED,
  ES_TEMPLATE,
} from '../config.js'
import mappings from './mappings.json'
import settings from './settings.json'
import schema from '../graphql/schema/index.js'

const { graphql: execute } = graphql
const TEMPLATE_URI = `${ES_HOST_ADDRESS}/_index_template/${ES_TEMPLATE}`

export const configure = async () => {
  /**
   * First configure the template. This is not
   * allowed to fail, since it indicates that
   * elasticsearch is unavailable
   */
  if (ES_TEMPLATE_INTEGRATION_ENABLED === 'enabled') {
    const response = await fetch(TEMPLATE_URI, {
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

    console.log(`Elasticsearch ${ES_INDEX} index template configured`, response)
  }

  /**
   * Try to re-integrate the Elasticsearch documents
   *
   * This is allowed to fail in development since
   * it only needs to be run on the first start.
   *
   * This is NOT allowed to fail on production only
   * because it should never fail, and that would
   * indicate that something else is wrong.
   *
   * This is TEMPORARY integration, since ideally
   * the source data is going to be migrated to
   * a newer location (with fixes)
   *
   * This is run asynchronously so that in dev you
   * don't have to wait for it to fail before you
   * can use the API
   */
  if (ES_INDEX_INTEGRATION_ENABLED === 'enabled') {
    execute(
      schema,
      `query ($authorizationCode: String!) {
        catalogue {
          refreshIndex(authorizationCode: $authorizationCode)
        }
      }
      `,
      null,
      null,
      {
        authorizationCode: CATALOGUE_SECRET,
      }
    )
      .then(({ data, errors }) => {
        const { refreshIndex } = data.catalogue
        if (errors || refreshIndex.error) {
          throw new Error(
            `Unable to update the Elasticsearch integration on API startup. This is fine for development but NOT for production. ${
              errors ? JSON.stringify(errors) : refreshIndex.error
            }`
          )
        } else {
          console.log('Elasticsearch integration updated', refreshIndex)
        }
      })
      .catch(error => {
        if (NODE_ENV === 'production') {
          throw error
        } else {
          console.error(error)
        }
      })
  }
}
