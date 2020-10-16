import { db as mongoDb, collections, getDataLoaders } from '../mongo/index.js'
// import { db as postgisDb} from '../postgis/index.js'
import Catalogue from '../lib/catalogue.js'
import { HTTP_PROXY, ES_INDEX } from '../config.js'

const catalogue = new Catalogue({
  dslAddress: `${HTTP_PROXY}/proxy/elasticsearch`,
  index: ES_INDEX,
})

export default app => async (_, next) => {
  app.context.catalogue = catalogue
  app.context.mongo = {
    db: mongoDb,
    collections,
    dataLoaders: getDataLoaders(),
  }
  app.context.pg = {
    // db: postgisDb
  }
  await next()
}
