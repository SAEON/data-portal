import query from './_query.js'

export default () =>
  Promise.resolve(
    (async () => {
      console.log(
        '\n\n',
        '================================\n',
        'Performing Postgis DB Setup\n',
        '================================\n\n'
      )
      await query({ text: 'SELECT 999 AS x' })
    })()
  ).catch(err => {
    console.logError('Error initializing DEV database', err)
    process.exit(1)
  })
