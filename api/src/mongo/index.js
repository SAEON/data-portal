import { MongoClient } from 'mongodb'
import {
  MONGO_DB as DB,
  MONGO_DB_ADDRESS,
  MONGO_DB_USERNAME,
  MONGO_DB_PASSWORD,
  NODE_ENV,
  DEFAULT_ADMIN_EMAIL_ADDRESSES,
  DEFAULT_SYSADMIN_EMAIL_ADDRESSES,
} from '../config/index.js'
import _collections from './collections/index.js'
import _Logger from './_logger.js'
export { makeLog } from './_logger.js'
import insertUsers from './_insert-users.js'
import configureRolesAndPermissions from './_configure-roles-and-permissions.js'
import makeDataFinders from './_data-finders.js'

export const db = new MongoClient(MONGO_DB_ADDRESS, {
  auth: {
    username: MONGO_DB_USERNAME,
    password: MONGO_DB_PASSWORD,
  },
  authMechanism: 'SCRAM-SHA-256',
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .connect()
  .then(client => client.db(DB))
  .catch(error => {
    console.error('Unable to connect to MongoDB', error)

    /**
     * Allow local development without Mongo
     * Useful for changes to the React clients
     */
    if (NODE_ENV === 'production') process.exit(1)
  })

export const collections = Object.entries(_collections)
  .reduce(async (accumulator, [alias, { name }]) => {
    const _accumulator = await accumulator
    _accumulator[alias] = (await db).collection(name)
    return _accumulator
  }, Promise.resolve({}))
  .catch(error => console.error('Unable to load MongoDB collections', error))

export const getDataFinders = makeDataFinders(db)

// Update collection validation rules
export const updateValidationRules = async () => {
  const _db = await db

  await Promise.all(
    Object.entries(_collections).map(([, { name, validator = {} }]) => {
      console.info('Updating validation rules for collection', name)
      return _db.command({ collMod: name, validator }).catch(error => {
        console.info('TODO - check why this errors', error)
      })
    })
  )
}

/**
 * ================================================
 * Configure MongoDB on API startup
 * ================================================
 */
;(async () => {
  const _db = await db

  // Create collections
  await Promise.all(
    Object.entries(_collections).map(([, { name, validator = {} }]) =>
      _db.createCollection(name, { validator }).catch(error => {
        // error.code === 48 just means the collection already exists
        if (error.code !== 48) {
          console.error(error)
          process.exit(1)
        }
      })
    )
  )

  // Configure roles
  await configureRolesAndPermissions(_db)

  // Setup default sysadmins
  await insertUsers(
    _db,
    DEFAULT_SYSADMIN_EMAIL_ADDRESSES.split(',').filter(_ => _),
    'sysadmin'
  )

  // Setup default admins
  await insertUsers(
    _db,
    DEFAULT_ADMIN_EMAIL_ADDRESSES.split(',').filter(_ => _),
    'admin'
  )

  /**
   * Apply indices
   *
   * Error code 85 represents an index that
   * needs to be rebuilt (the definition was
   * changed in the source code).
   *
   * NOTE - Don't change indices directly in
   * MongoDB!!
   */
  await Promise.all(
    Object.entries(_collections)
      .map(([, { name, indices = [] }]) => {
        return Promise.all(
          indices.map(async ({ _type = undefined, options, ...indexFields }) => {
            const collection = await _db.collection(name)
            try {
              if (_type === 'text') {
                console.info(
                  'Applying text index',
                  options.name,
                  'to collection',
                  name,
                  indexFields,
                  options
                )
                return collection.createIndex(indexFields, options)
              } else {
                const { index } = indexFields
                console.info('Applying index', options.name, 'to collection', name, options)
                return collection.createIndex(index, options)
              }
            } catch (error) {
              if (error.code === 85) {
                console.info('Recreating index on', name, ':: Index', indexFields)
                try {
                  await _db.collection(name).dropIndex(options.name)
                  await _db.collection(name).createIndex(index, options)
                } catch (error) {
                  throw new Error(`Unable to recreate index. ${error.message}`)
                }
              } else {
                throw error
              }
            }
          })
        )
      })
      .flat()
  )

  console.info('MongoDB configured')
})().catch(error => {
  console.error('Error seeding MongoDB', error.message)
  process.exit(1)
})

/**
 * Application-level batching for inserting UI logs
 * to MongoDB.
 */
const Logger = _Logger(collections)
export const logToMongo = new Logger()
