import MongoClient from 'mongodb'
import {
  MONGO_DB as DB,
  MONGO_DB_ADDRESS,
  MONGO_DB_USERNAME,
  MONGO_DB_PASSWORD,
  CATALOGUE_API_NODE_ENV,
} from '../config.js'
import getCollections from './_collections.js'
import configureDataFinders from './_data-finders.js'
import configureDataInserters from './_data-inserters.js'

const CONNECTION_STRING = `${MONGO_DB_ADDRESS}`

export const _collections = {
  UserInfo: 'userInfo',
  Users: 'users',
  Atlases: 'atlases',
  Logs: 'logs',
  Feedback: 'feedback',
  SavedSearches: 'savedSearches',
  Databooks: 'databooks',
  Dashboards: 'dashboards',
  Charts: 'charts',
}

export const db = MongoClient.connect(CONNECTION_STRING, {
  auth: {
    user: MONGO_DB_USERNAME,
    password: MONGO_DB_PASSWORD,
  },
  authMechanism: 'SCRAM-SHA-256',
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(client => client.db(DB))
  .catch(error => {
    console.error('Unable to connect to MongoDB', error)
    if (CATALOGUE_API_NODE_ENV === 'production') process.exit(1) // Allow local development without Mongo
  })

const indices = [
  {
    collection: _collections.SavedSearches,
    index: 'hashedState',
    options: {
      unique: true,
    },
  },
]

export const applyIndices = () =>
  db.then(db =>
    Promise.all(
      indices.map(({ collection, index, options }) =>
        db.collection(collection).createIndex(index, options)
      )
    )
  )

export const collections = getCollections({ db, _collections })
export const getDataFinders = configureDataFinders({ db, _collections })
export const getDataInserters = configureDataInserters({ db, _collections })
