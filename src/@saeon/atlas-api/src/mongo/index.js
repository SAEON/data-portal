import { MongoClient } from 'mongodb'
import { MONGO_DB as DB, MONGO_URL, MONGO_USER, MONGO_PSWD } from '../config'
import getCollections from './_collections'
import configureDataLoaders from './_data-loaders'

const CONNECTION_STRING = `${MONGO_URL}`

export const _collections = {
  Maps: 'maps',
  BrowserEvents: 'browserEvents',
}

export const db = MongoClient.connect(CONNECTION_STRING, {
  autoReconnect: true,
  auth: {
    user: MONGO_USER,
    password: MONGO_PSWD,
  },
  authMechanism: 'SCRAM-SHA-256',
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => client.db(DB))

export const collections = getCollections({ db, _collections })
export const getDataLoaders = configureDataLoaders({ db, _collections })
