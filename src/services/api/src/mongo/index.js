import MongoClient from 'mongodb'
import {
  MONGO_DB as DB,
  MONGO_DB_ADDRESS,
  MONGO_DB_USERNAME,
  MONGO_DB_PASSWORD,
  CATALOGUE_API_NODE_ENV,
  CATALOGUE_DEFAULT_ADMIN_EMAIL_ADDRESSES,
} from '../config.js'
import getCollections from './_collections.js'
import configureDataFinders from './_data-finders.js'
import configureDataInserters from './_data-inserters.js'
import userRoles from './setup/user-roles.js'

const CONNECTION_STRING = `${MONGO_DB_ADDRESS}`

export const _collections = {
  UserRoles: 'userRoles',
  Users: 'users',
  Atlases: 'atlases',
  Logs: 'logs',
  Feedback: 'feedback',
  Lists: 'lists',
  Databooks: 'databooks',
  Dashboards: 'dashboards',
  Charts: 'charts',
  Filters: 'filters',
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
    collection: _collections.Lists,
    index: 'hashedSearch',
    options: {
      unique: true,
    },
  },
  {
    collection: _collections.UserRoles,
    index: 'name',
    options: {
      unique: true,
    },
  },
]

export const setupUserRoles = () =>
  db.then(db =>
    Promise.all(
      userRoles.map(userRole => {
        const { name, ...other } = userRole
        db.collection(_collections.UserRoles).findAndModify(
          { name },
          null,
          { $setOnInsert: { name }, $set: { ...other } },
          { upsert: true }
        )
      })
    )
  )

export const setupDefaultAdmins = async () => {
  const adminRoleId = (
    await db.then(db => db.collection(_collections.UserRoles).findOne({ name: 'admin' }))
  )._id

  db.then(db =>
    Promise.all(
      CATALOGUE_DEFAULT_ADMIN_EMAIL_ADDRESSES.split(',').map(email =>
        db.collection(_collections.Users).findAndModify(
          {
            email,
          },
          null,
          {
            $setOnInsert: { email },
            $addToSet: {
              userRoles: adminRoleId,
            },
          },
          { upsert: true }
        )
      )
    )
  )
}

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
