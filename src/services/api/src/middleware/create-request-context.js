import fetch from 'node-fetch'
import { db, collections, getDataLoaders } from '../mongo/index.js'
import { Catalogue } from '../../../../packages/catalogue-search/src/catalogue-search/index.js'
import { HTTP_PROXY } from '../config.js'

const DSL_INDEX = `saeon-odp-4-2`
const DSL_PROXY = `${HTTP_PROXY}/proxy/saeon-elk`
const catalogue = new Catalogue({
  dslAddress: DSL_PROXY,
  index: DSL_INDEX,
  httpClient: fetch,
})

const getFirstRecordId = async () => {
  const data = await catalogue.query({
    size: 1,
    query: {
      bool: {
        must: [],
      },
    },
    sort: [
      {
        _id: 'asc',
      },
    ],
    _source: {
      excludes: ['metadata_json.*'],
    },
  })
  return data.hits.hits[0]._id
}

export default app => async (ctx, next) => {
  app.context.catalogue = catalogue
  app.context.catalogueStart = await getFirstRecordId()
  app.context.mongo = {
    db,
    collections,
    dataLoaders: getDataLoaders(),
  }
  await next()
}
