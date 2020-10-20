import { CronJob } from 'cron'
import {
  ES_TEMPLATE_INTEGRATION_ENABLED,
  ES_INDEX_INTEGRATION_ENABLED,
  NODE_ENV,
  INDEX_BUILD_SCHEDULE,
} from '../config.js'
import configTemplate from './configure-template/index.js'
import configureIndex from './configure-index/index.js'

export const configure = async () => {
  /**
   * Delete and recreate index template
   */
  if (ES_TEMPLATE_INTEGRATION_ENABLED === 'enabled') {
    const result = await configTemplate()
    console.log('Elasticsearch template configured', result)
  }

  /**
   * Delete and recreate index on startup
   */
  if (ES_INDEX_INTEGRATION_ENABLED === 'enabled') {
    const result = await configureIndex()
    console.log(result)
  }

  /**
   * Scheduled index refreshes
   * 00:00 every day (UTC)
   */
  if (NODE_ENV === 'production') {
    console.log('Scheduled index integration enabled', INDEX_BUILD_SCHEDULE)
    new CronJob(
      INDEX_BUILD_SCHEDULE,
      async function () {
        const result = await configureIndex()
        console.log(result)
      },
      null,
      true
    )
  }
}
