import query from './_query.js'
import {
  POSTGIS_FOREIGN_DBNAME,
  POSTGIS_FOREIGN_USER,
  POSTGIS_FOREIGN_HOST,
  POSTGIS_FOREIGN_PASSWORD,
} from '../config.js'
export default () =>
  Promise.resolve(
    (async () => {
      console.log(
        '\x1b[33m',
        '\n\n',
        '=========================================\n',
        'Performing Postgis DB Setup\n',
        '=========================================\n\n',
        '\x1b[0m'
      )

      //likely to refactor queries below to be pulled from .sql files and have sensitive variables(user details) passed on execution
      const setupQueries = [
        // FDW setup
        `CREATE EXTENSION IF NOT EXISTS postgres_fdw;`,
        `DROP SCHEMA IF EXISTS saeon_fdw CASCADE`,
        `CREATE SERVER IF NOT EXISTS saeon_server FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host '${POSTGIS_FOREIGN_HOST}', dbname '${POSTGIS_FOREIGN_DBNAME}');`,
        `CREATE USER MAPPING IF NOT EXISTS FOR CURRENT_USER SERVER saeon_server OPTIONS (user '${POSTGIS_FOREIGN_USER}', password '${POSTGIS_FOREIGN_PASSWORD}');`,
        `CREATE SCHEMA IF NOT EXISTS saeon_fdw;`,
        `IMPORT FOREIGN SCHEMA public FROM SERVER saeon_server INTO saeon_fdw;`,
        // Materialized View setup
        `CREATE MATERIALIZED VIEW IF NOT EXISTS meso_point_mv AS SELECT "MESO_ID" AS meso_id,"LAT" AS lat,"LON" AS lon FROM saeon_fdw."meso_point";`,
      ]
      for (let i = 0; i < setupQueries.length; i++) {
        await query({ text: setupQueries[i], values: [] })
        console.log("DONE: ", setupQueries[i])
      }
    })()
  ).catch(err => {
    console.log('!!!!!!!!!!!!! ERROR INITIALIZING DEV DATABASE !!!!!!!!!!!!!')
    console.log('Error:')
    console.log(err)
    process.exit(1)
  })