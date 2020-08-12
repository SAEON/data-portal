import fetch from 'node-fetch'
import { db, collections, getDataLoaders } from '../mongo/index.js'
import { Catalogue } from '../../../../packages/catalogue-search/src/catalogue-search/index.js'
import { ES_HOST_ADDRESS, ES_INDEX } from '../config.js'

const catalogue = new Catalogue({
  dslAddress: ES_HOST_ADDRESS,
  index: ES_INDEX,
  httpClient: fetch,
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
