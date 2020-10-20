import { POSTGIS_DB, POSTGIS_HOST, POSTGIS_USER, POSTGIS_PSWD, POSTGIS_PORT } from '../config.js'
import createPool from './_pool.js'
const pool = createPool(POSTGIS_HOST, POSTGIS_USER, POSTGIS_DB, POSTGIS_PSWD, POSTGIS_PORT)

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
