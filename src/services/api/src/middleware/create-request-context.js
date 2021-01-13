import { db as mongoDb, collections, getDataFinders, getDataInserters } from '../mongo/index.js'
import postgisQuery from '../postgis/query.js'
import Catalogue from '../lib/catalogue.js'
import {
  CATALOGUE_PROXY_ADDRESS,
  CATALOGUE_API_ELASTICSEARCH_INDEX_NAME,
  CATALOGUE_API_KEY,
} from '../config.js'
import { schema } from '../graphql/index.js'
import userModel from '../user-model/index.js'
import { encrypt, decrypt } from '../lib/crypto.js'

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

  app.context.userModel = userModel

  app.context.crypto = {
    encrypt: plainTxt =>
      encrypt(plainTxt, Buffer.from(CATALOGUE_API_KEY, 'base64')).toString('base64'),
    decrypt: encryptedTxt =>
      decrypt(
        Buffer.from(encryptedTxt, 'base64'),
        Buffer.from(CATALOGUE_API_KEY, 'base64')
      ).toString('utf8'),
  }

  await next()
}
