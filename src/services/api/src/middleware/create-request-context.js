import { db, collections, getDataLoaders } from '../mongo/index.js'
import Catalogue from '../lib/catalogue.js'
import { HTTP_PROXY, ES_INDEX } from '../config.js'

const catalogue = new Catalogue({
  dslAddress: `${HTTP_PROXY}/proxy/elasticsearch`,
  index: ES_INDEX,
})

export default app => async (_, next) => {
  app.context.catalogue = catalogue
  app.context.mongo = {
    db,
    collections,
    dataLoaders: getDataLoaders(),
  }
  await next()
}
