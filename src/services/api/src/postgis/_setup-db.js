// import query from './_query'
import pool from './_pool'

/**
 * Used to load the SQL files used to set up the database
 * @param {String} filepath Path to a SQL file (note that there are placeholders for variables)
 * @param  {...any} args Variables that get inserted into the placeholders in order. This seems unclear...
 */
// const loadSqlFile = (filepath, ...args) => {
//   let sql = readFileSync(normalize(join(__dirname, `./sql/${filepath}`))).toString('utf8')
//   args.forEach((arg, i) => {
//     const regex = new RegExp(`:${i + 1}`, 'g')
//     sql = sql.replace(regex, `${arg}`)
//   })
//   return sql
// }

export default () =>
  Promise.resolve(
    (async () => {
      console.log(
        '\n\n',
        '================================\n',
        'Performing Postgis DB Setup\n',
        '================================\n\n'
      )
      const configDbPool = pool()
      console.log('starting testQuery')
      const testQuery = 'SELECT * FROM users WHERE id = 1'
      await configDbPool.query(testQuery)
      await configDbPool.end()
      console.log('testQuery complete 1')
      // Create the seacrifog schema, and populate database
      //   await query({ text: loadSqlFile('migration/schema.sql') })
      //   console.log('testQuery complete2')
    })()
  ).catch(err => {
    console.logError('Error initializing DEV database', err)
    process.exit(1)
  })
