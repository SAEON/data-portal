import pg from 'pg'
const { Client } = pg

export default ({ host, user, database, password, port }) =>
  new Client({
    host,
    user,
    database,
    password,
    port
  })
