import { spawn } from 'child_process'
import {
  DOCKER_NETWORK,
  POSTGIS_DB,
  POSTGIS_HOST,
  POSTGIS_PORT,
  POSTGIS_IMAGE_NAME,
  DATA_DIRECTORY,
  DOCKER_DATA_VOLUME,
} from '../config.js'

export default async ({ tableName, username, password, filePath, schema }) => {
  const raster2pgsql = spawn('docker', [
    'run',
    `--net=${DOCKER_NETWORK}`,
    '-v',
    `${DOCKER_DATA_VOLUME}:${DATA_DIRECTORY}`,
    '--rm',
    POSTGIS_IMAGE_NAME,
    'raster2pgsql',
    '-d', // Drop and recreate the table
    '-F', // Add filename column
    '-q', // Wrap SQL in quotes
    '-R', // Out of DB file (filePath)
    '-I', // Create a GIST spatial index
    '-t',
    '128x128', // https://gis.stackexchange.com/a/281936/82513
    filePath,
    `${schema}.${tableName}`,
    '-c',
  ])

  const psql = spawn('docker', [
    'run',
    '-i',
    '-e',
    `PGPASSWORD=${password}`,
    `--net=${DOCKER_NETWORK}`,
    '--rm',
    POSTGIS_IMAGE_NAME,
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
    const stream = raster2pgsql.stdout.pipe(psql.stdin)

    stream.on('close', resolve)
    stream.on('error', reject)

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
