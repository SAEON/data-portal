import { db as mongoDb, collections, getDataFinders, getDataInserters } from '../mongo/index.js'
import postgisQuery from '../postgis/query.js'
import Catalogue from '../lib/catalogue.js'
import { CATALOGUE_PROXY_ADDRESS, CATALOGUE_API_ELASTICSEARCH_INDEX_NAME } from '../config.js'
import { schema } from '../graphql/index.js'

const catalogue = new Catalogue({
  dslAddress: `${CATALOGUE_PROXY_ADDRESS}/proxy/elasticsearch`,
  index: CATALOGUE_API_ELASTICSEARCH_INDEX_NAME,
})

const dataInserters = getDataInserters() // App level batching

export default app => async (ctx, next) => {
  app.context.userInfo = ctx.state.user

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

  app.context.gql = {
    schema,
  }

  await next()
}
