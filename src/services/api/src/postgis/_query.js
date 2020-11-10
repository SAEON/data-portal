import {
  POSTGIS_DB,
  POSTGIS_HOST,
  POSTGIS_USERNAME,
  POSTGIS_PASSWORD,
  POSTGIS_PORT,
} from '../config.js'
import createPool from './_pool.js'
import createClient from './_client.js'

const pool = createPool(POSTGIS_HOST, POSTGIS_USERNAME, POSTGIS_DB, POSTGIS_PASSWORD, POSTGIS_PORT)

export default async ({ text, values, name, client = undefined }) =>
  client
    ? new Promise((resolve, reject) => {
        const _client = createClient({
          host: client.host || POSTGIS_HOST,
          user: client.user || POSTGIS_USERNAME,
          password: client.password || POSTGIS_PASSWORD,
          database: client.database || POSTGIS_DB,
          port: client.port || POSTGIS_PORT,
        })
        try {
          _client.connect()
          resolve(_client)
        } catch (error) {
          reject(error)
        }
      }).then(
        client =>
          new Promise((resolve, reject) =>
            client.query(text, values, (error, res) => {
              if (error) {
                reject(error)
              } else {
                resolve(res)
                client.end() // TODO - this might allow for ending the client connection before all data is retrieved
              }
            })
          )
      )
    : new Promise((resolve, reject) =>
        pool
          .connect()
          .then(client =>
            client
              .query({ text, values, name })
              .then(res => resolve(res))
              .then(() => client)
          )
          .then(client => client.release())
          .catch(err => reject(err))
      )
