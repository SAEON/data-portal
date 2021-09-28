import { db as mongoDb, collections, getDataFinders, Logger } from '../mongo/index.js'
import postgisQuery, { publicQuery, createClient } from '../postgis/query.js'
import { query as elasticQuery } from '../elasticsearch/index.js'
import { APP_KEY } from '../config.js'
import { publicSchema, internalSchema } from '../graphql/index.js'
import userModel from '../user-model/index.js'
import { encrypt, decrypt } from '../lib/crypto.js'

const logToMongo = new Logger() // Application-level batching

export default app => async (ctx, next) => {
  app.context.userInfo = ctx.state.user

  app.context.elastic = {
    query: elasticQuery,
  }

  app.context.mongo = {
    db: mongoDb,
    collections,
    dataFinders: getDataFinders(), // Request level batching
    logToMongo: logToMongo.load.bind(logToMongo),
  }

  app.context.postgis = {
    query: postgisQuery,
    publicQuery,
    createClient,
  }

  app.context.gql = {
    publicSchema,
    internalSchema,
  }

  app.context.user = userModel

  app.context.crypto = {
    encrypt: plainTxt => encrypt(plainTxt, Buffer.from(APP_KEY, 'base64')).toString('base64'),
    decrypt: encryptedTxt =>
      decrypt(Buffer.from(encryptedTxt, 'base64'), Buffer.from(APP_KEY, 'base64')).toString('utf8'),
  }

  await next()
}
