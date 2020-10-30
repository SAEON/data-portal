import { db as mongoDb, collections, getDataFinders, getDataInserters } from '../mongo/index.js'
import Catalogue from '../lib/catalogue.js'
import { HTTP_PROXY_ADDRESS, ES_INDEX } from '../config.js'

const catalogue = new Catalogue({
  dslAddress: `${HTTP_PROXY_ADDRESS}/proxy/elasticsearch`,
  index: ES_INDEX,
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
  app.context.pg = {
    // db: postgisDb
  }
  await next()
}
