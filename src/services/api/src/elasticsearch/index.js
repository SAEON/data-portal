import { CronJob } from 'cron'
import {
  CATALOGUE_API_RESET_ELASTICSEARCH_TEMPLATE,
  CATALOGUE_API_RESET_ELASTICSEARCH_INDEX,
  CATALOGUE_API_NODE_ENV,
  CATALOGUE_API_INDEX_REBUILD_SCHEDULE,
  CATALOGUE_API_INDEX_REBUILD,
} from '../config.js'
import configTemplate from './template/index.js'
import configureIndex from './index/index.js'

export const configure = async () => {
  /**
   * Delete and recreate index template
   */
  if (CATALOGUE_API_RESET_ELASTICSEARCH_TEMPLATE === 'enabled') {
    const result = await configTemplate()
    console.log('Elasticsearch template configured', result)
  }

  /**
   * Delete and recreate index on startup
   */
  if (CATALOGUE_API_RESET_ELASTICSEARCH_INDEX === 'enabled') {
    const result = await configureIndex()
    console.log(result)
  }

  /**
   * Scheduled index refreshes
   * 00:00 every day (UTC)
   */
  if (CATALOGUE_API_NODE_ENV === 'production' && CATALOGUE_API_INDEX_REBUILD === 'enabled') {
    console.log('Scheduled index integration enabled', CATALOGUE_API_INDEX_REBUILD_SCHEDULE)
    new CronJob(
      CATALOGUE_API_INDEX_REBUILD_SCHEDULE,
      async function () {
        const result = await configureIndex()
        console.log(result)
      },
      null,
      true
    )
  }
}
