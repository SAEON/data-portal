import { db as mongoDb, collections, getDataFinders, getDataInserters } from '../mongo/index.js'
import postgisQuery from '../postgis/query.js'
import Catalogue from '../lib/catalogue.js'
import { CATALOGUE_PROXY_ADDRESS, CATALOGUE_API_ELASTICSEARCH_INDEX_NAME } from '../config.js'

const catalogue = new Catalogue({
  dslAddress: `${CATALOGUE_PROXY_ADDRESS}/proxy/elasticsearch`,
  index: CATALOGUE_API_ELASTICSEARCH_INDEX_NAME,
})

/**
 * Application level batching
 * Used for logging to Mongo
 */
const dataInserters = getDataInserters()

export default app => async (_, next) => {
  app.context.catalogue = catalogue
  app.context.mongo = {
    db: mongoDb,
    collections,
    dataFinders: getDataFinders(), // Request level batching
    dataInserters,
  }
  app.context.postgis = {
    query: postgisQuery,
  }
  await next()
}
