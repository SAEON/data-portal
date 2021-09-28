import {
  POSTGIS_DB,
  POSTGIS_HOST,
  POSTGIS_HOST_DEV,
  POSTGIS_USERNAME,
  POSTGIS_USERNAME_PUBLIC,
  POSTGIS_PASSWORD,
  POSTGIS_PASSWORD_PUBLIC,
  POSTGIS_PORT,
  NODE_ENV,
} from '../config.js'
import createPool from './pool.js'
import _createClient from './client.js'
import QueryStream from 'pg-query-stream'

const PG_HOST = NODE_ENV === 'production' ? POSTGIS_HOST : POSTGIS_HOST_DEV

const pool = createPool(PG_HOST, POSTGIS_USERNAME, POSTGIS_DB, POSTGIS_PASSWORD, POSTGIS_PORT)

/**
 * Can't be created on startup
 * since public user is
 * configured on startup
 *
 * Also, public query only supports streams,
 */
let publicPool
const createPublicPool = () =>
  createPool(PG_HOST, POSTGIS_USERNAME_PUBLIC, POSTGIS_DB, POSTGIS_PASSWORD_PUBLIC, POSTGIS_PORT)

export const publicQuery = ({ text = '', values = [], onEnd, onError }) => {
  if (!publicPool) {
    publicPool = createPublicPool()
  }

  return new Promise(resolve =>
    publicPool.connect().then(client => {
      const query = new QueryStream(text, values, {
        batchSize: 100,
      })
      const stream = client.query(query)
      stream.on('end', onEnd)
      stream.on('error', onError)
      resolve({ stream, client })
    })
  )
}

export const createClient = cred =>
  _createClient({
    host: cred.host || PG_HOST,
    user: cred.user || POSTGIS_USERNAME,
    password: cred.password || POSTGIS_PASSWORD,
    database: cred.database || POSTGIS_DB,
    port: cred.port || POSTGIS_PORT,
  })

export default async ({ text, values, name, client = undefined }) =>
  client
    ? new Promise((resolve, reject) => {
        const _client = createClient({
          host: client.host || PG_HOST,
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
                return client.end() // TODO - this might allow for ending the client connection before all data is retrieved
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
