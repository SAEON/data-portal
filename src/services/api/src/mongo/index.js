import mongodb from 'mongodb'
import { MONGO_DB as DB, MONGO_URL, MONGO_USER, MONGO_PSWD, NODE_ENV } from '../config.js'
import getCollections from './_collections.js'
import configureDataFinders from './_data-finders.js'
import configureDataInserters from './_data-inserters.js'

const { MongoClient } = mongodb

const CONNECTION_STRING = `${MONGO_URL}`

export const _collections = {
  Maps: 'maps',
  Logs: 'logs',
  Feedback: 'feedback',
  SavedSearches: 'savedSearches',
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
    if (NODE_ENV === 'production') process.exit(1) // Allow local development without Mongo
  })

export const collections = getCollections({ db, _collections })
export const getDataFinders = configureDataFinders({ db, _collections })
export const getDataInserters = configureDataInserters({ db, _collections })
