import MongoClient from 'mongodb'
import { CONNECTION_STRING, MONGO_DB_USERNAME, MONGO_DB_PASSWORD, DB } from './config.js'

const db = MongoClient.connect(CONNECTION_STRING, {
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
  })

export const insertList = (
  collectionName,
  url,
  version,
  description,
  createdDate,
  createdBy,
  DOIs
) => {
  const hashedSearch = `${collectionName}-v${version}`

  return db
    .then(db => db.collection('lists'))
    .then(Lists =>
      Lists.findOneAndUpdate(
        { collectionName, hashedSearch, createdDate },
        {
          $setOnInsert: {
            collectionName,
            hashedSearch,
            createdDate,
          },
          $set: {
            url,
            version,
            description,
            updatedAt: new Date(),
            createdBy,
            search: {
              dois: DOIs.split(',').map(doi => doi.trim()),
            },
          },
        },
        {
          upsert: true,
          returnNewDocument: true,
        }
      )
    )
}
