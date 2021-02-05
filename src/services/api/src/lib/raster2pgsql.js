import { spawn } from 'child_process'
import { CATALOGUE_DOCKER_NETWORK, POSTGIS_DB, POSTGIS_HOST, POSTGIS_PORT } from '../config.js'

export default async ({ tableName, username, password, filePath, schema, mntRoot = '/var' }) => {
  const raster2pgsql = spawn('docker', [
    'run',
    `--net=${CATALOGUE_DOCKER_NETWORK}`,
    '-v',
    `${mntRoot}:${mntRoot}`,
    '--rm',
    'postgis',
    'raster2pgsql',
    '-d', // Drop and recreate the table
    '-F', // Add filename column
    '-q', // Wrap SQL in quotes
    '-R', // Out of DB file (filePath)
    '-I', // Create a GIST spatial index
    '-f', // change default raster data column name
    'raster_data',
    filePath,
    `${schema}.${tableName}`,
    '-c',
  ])

  const psql = spawn('docker', [
    'run',
    '-i',
    '-e',
    `PGPASSWORD=${password}`,
    `--net=${CATALOGUE_DOCKER_NETWORK}`,
    '--rm',
    'postgis',
    'psql',
    '--dbname',
    POSTGIS_DB,
    '--host',
    POSTGIS_HOST,
    '--port',
    POSTGIS_PORT,
    '--no-password',
    '--username',
    username,
  ])

  // TODO confirm that this error handling works for b19a1490-4734-4381-a4c2-cde52b4e5502 rejects properly

  await new Promise((resolve, reject) => {
    const stream = raster2pgsql.stdout.pipe(psql.stdin)

    stream.on('finish', resolve)
    stream.on('error', error => {
      reject(error)
    })

    raster2pgsql.on('exit', code => {
      if (code !== 0) {
        stream.emit('error', new Error(`raster2pgsql error loading table ${schema}.${tableName}`))
      }
    })

    psql.on('exit', code => {
      if (code !== 0) {
        stream.emit('error', new Error(`psql error ${schema}.${tableName}`))
      }
    })
  })
}
