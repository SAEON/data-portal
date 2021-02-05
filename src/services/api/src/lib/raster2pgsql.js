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

  return new Promise((resolve, reject) => {
    raster2pgsql.on('exit', code => {
      if (code !== 0) {
        reject(new Error(`raster2pgsql error loading table ${schema}.${tableName}`))
      }
    })

    psql.on('exit', code => {
      if (code !== 0) {
        reject(new Error(`psql error ${schema}.${tableName}`))
      }
    })

    raster2pgsql.stdout.pipe(psql.stdin).on('finish', resolve).on('error', reject)
  })
}
