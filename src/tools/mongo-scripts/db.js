import { MongoClient } from 'mongodb'
import { MONGO_DB_ADDRESS, MONGO_DB_USERNAME, MONGO_DB_PASSWORD, MONGO_DB } from './config.js'

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
  .then(client => client.db(MONGO_DB))
  .catch(error => {
    console.error('Unable to connect to MongoDB', error)
    process.exit(1)
  })