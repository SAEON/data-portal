import {
  POSTGIS_DB,
  POSTGIS_HOST,
  POSTGIS_USERNAME,
  POSTGIS_PASSWORD,
  POSTGIS_PORT,
} from '../config.js'
import createPool from './_pool.js'
const pool = createPool(POSTGIS_HOST, POSTGIS_USERNAME, POSTGIS_DB, POSTGIS_PASSWORD, POSTGIS_PORT)

export default ({ text, values, name }) =>
  new Promise((resolve, reject) =>
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
