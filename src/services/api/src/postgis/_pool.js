import {
  POSTGIS_DB as DB,
  POSTGIS_HOST,
  POSTGIS_USER,
  POSTGIS_PSWD,
  POSTGIS_PORT,
} from '../config.js'
import pg from 'pg'
const { Pool } = pg

export default () =>
  new Pool({
    host: POSTGIS_HOST,
    user: POSTGIS_USER,
    database: DB,
    password: POSTGIS_PSWD,
    port: POSTGIS_PORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  })
