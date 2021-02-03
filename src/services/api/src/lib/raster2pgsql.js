import { spawn } from 'child_process'
import { CATALOGUE_DOCKER_NETWORK, POSTGIS_DB, POSTGIS_HOST, POSTGIS_PORT } from '../config.js'

export default ({ tableName, username, password, filePath, schema, mntRoot = '/tmp' }) => {
  console.log(`"${schema}"."${tableName}"`)
  return new Promise((resolve, reject) => {
    spawn('docker', [
      'run',
      `--net=${CATALOGUE_DOCKER_NETWORK}`,
      '-v',
      `${mntRoot}:${mntRoot}`,
      '--rm',
      'postgis',
      'raster2pgsql',
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
