import { spawn } from 'child_process'
import { CATALOGUE_DOCKER_NETWORK, POSTGIS_DB, POSTGIS_HOST, POSTGIS_PORT } from '../config.js'

export default ({ tableName, username, password, filePath, schema, mntRoot = '/var' }) => {
  console.log(`"${schema}"."${tableName}"`, filePath)
  return new Promise((resolve, reject) => {
    spawn('docker', [
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
      .stdout.pipe(
        spawn('docker', [
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
        ]).stdin
      )
      .on('finish', resolve)
      .on('error', reject)
  })
}
