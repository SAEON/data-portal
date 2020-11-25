import {
  POSTGIS_DB,
  POSTGIS_HOST,
  POSTGIS_USERNAME,
  POSTGIS_PASSWORD,
  POSTGIS_PORT,
} from '../config.js'
import createPool from './pool.js'
import createClient from './client.js'

const pool = createPool(POSTGIS_HOST, POSTGIS_USERNAME, POSTGIS_DB, POSTGIS_PASSWORD, POSTGIS_PORT)
console.log(POSTGIS_HOST, POSTGIS_USERNAME, POSTGIS_DB, POSTGIS_PASSWORD, POSTGIS_PORT)
console.log('pool', pool)
export default async ({ text, values, name, client = undefined }) =>
  client
    ? new Promise((resolve, reject) => {
        console.log('\x1b[36m%s\x1b[0m', '1')
        const _client = createClient({
          host: client.host || POSTGIS_HOST,
          user: client.user || POSTGIS_USERNAME,
          password: client.password || POSTGIS_PASSWORD,
          database: client.database || POSTGIS_DB,
          port: client.port || POSTGIS_PORT,
        })
        console.log('\x1b[36m%s\x1b[0m', '2')
        try {
          console.log('\x1b[36m%s\x1b[0m', '3')
          _client.connect()
          console.log('\x1b[36m%s\x1b[0m', '4')
          resolve(_client)
          console.log('\x1b[36m%s\x1b[0m', '5')
        } catch (error) {
          console.log('query.js error')
          console.log('error', error)
          reject(error)
        }
      }).then(client => {
        console.log('\x1b[36m%s\x1b[0m', '6')
        return new Promise((resolve, reject) => {
          console.log('\x1b[36m%s\x1b[0m', '7')
          return client.query(text, values, (error, res) => {
            if (error) {
              console.log('query.js error 2')
              console.log('text', text)
              console.log('values', values)
              console.log('res', res)
              // STEVEN: ERROR IS BEING THROWN HERE
              console.log('error', error)
              reject(error)
            } else {
              console.log('\x1b[36m%s\x1b[0m', '8')
              resolve(res)
              console.log('\x1b[36m%s\x1b[0m', '9')
              client.end() // TODO - this might allow for ending the client connection before all data is retrieved
              console.log('\x1b[36m%s\x1b[0m', '10')
            }
          })
        })
      })
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
