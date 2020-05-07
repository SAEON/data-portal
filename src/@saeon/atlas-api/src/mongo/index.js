import { MongoClient } from 'mongodb'
import { MONGO_DB as DB, MONGO_URL } from '../config'
import getCollections from './_collections'
import configureDataLoaders from './_data-loaders'

const CONNECTION_STRING = `${MONGO_URL}/${DB}`

export const _collections = {
  Maps: 'maps',
  BrowserEvents: 'BrowserEvents',
}

export const db = MongoClient.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => client.db())

export const collections = getCollections({ db, _collections })
export const getDataLoaders = configureDataLoaders({ db, _collections })
