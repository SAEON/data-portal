import { config } from 'dotenv'
import authorize from './auth.js'
import { google } from 'googleapis'
import MongoClient from 'mongodb'
config()

const spreadsheetId = process.env.spreadsheetId
const range = process.env.range
const CONNECTION_STRING = process.env.CONNECTION_STRING
const MONGO_USER = process.env.MONGO_USER
const MONGO_PSWD = process.env.MONGO_PSWD
const DB = process.env.DB

const db = MongoClient.connect(CONNECTION_STRING, {
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
  })

authorize(function (auth) {
  const sheets = google.sheets({ version: 'v4', auth })
  sheets.spreadsheets.values.get(
    {
      spreadsheetId,
      range,
    },
    async (err, res) => {
      if (err) return console.log('The API returned an error: ' + err)
      for (const row of res.data.values.slice(1)) {
        const [collectionName, url, version, description, createdDate, createdBy, DOIs] = row
        const savedSearches = await db.then(db => db.collection('savedSearches'))
        const savedDoc = await savedSearches.findOneAndUpdate(
          { collectionName },
          {
            $setOnInsert: {
              collectionName,
            },
            $set: {
              url,
              hashedState: `${collectionName}-v${version}`,
              version,
              description,
              createdDate,
              createdBy,
              state: {
                dois: DOIs.split(',').map(doi => doi.trim()),
              },
            },
          },
          {
            upsert: true,
            returnNewDocument: true,
          }
        )

        try {
          console.log(
            collectionName,
            `https://catalogue.saeon.ac.za/render/records?disableSidebar=true&search=${savedDoc.value._id}&showSearchBar=false`
          )
        } catch (error) {
          console.log(
            collectionName,
            `https://catalogue.saeon.ac.za/render/records?disableSidebar=true&search=${savedDoc.lastErrorObject.upserted}&showSearchBar=false`
          )
        }
      }
    }
  )
})
