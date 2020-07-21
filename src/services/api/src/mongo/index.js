import mongodb from 'mongodb'
import { MONGO_DB as DB, MONGO_URL, MONGO_USER, MONGO_PSWD, NODE_ENV } from '../config.js'
import getCollections from './_collections.js'
import configureDataLoaders from './_data-loaders.js'

const { MongoClient } = mongodb

const CONNECTION_STRING = `${MONGO_URL}`

export const _collections = {
  Maps: 'maps',
  BrowserEvents: 'browserEvents',
  Feedback: 'feedback',
}

export const db = MongoClient.connect(CONNECTION_STRING, {
  auth: {
    user: MONGO_USER,
    password: MONGO_PSWD,
  },
  authMechanism: 'SCRAM-SHA-256',
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(client => client.db(DB))
  .catch(error => {
    console.error('Unable to connect to MongoDB', error)
    if (NODE_ENV === 'production') process.exit(1) // Docker can be a pain to setup and not needed to work with the client
  })

export const collections = getCollections({ db, _collections })
export const getDataLoaders = configureDataLoaders({ db, _collections })
