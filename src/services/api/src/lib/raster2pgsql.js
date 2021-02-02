import { spawn } from 'child_process'
import { CATALOGUE_DOCKER_NETWORK, POSTGIS_DB, POSTGIS_HOST } from '../config.js'

export default ({ tableName, username, password, filePath, schema, mntRoot = '/tmp' }) => {
  return new Promise((resolve, reject) => {
    const raster2pgsqlProcess = spawn('docker', [
      'run',
      `--net=${CATALOGUE_DOCKER_NETWORK}`,
      '-v',
      `${mntRoot}:${mntRoot}`,
      '--rm',
      'postgis',
      'raster2pgsql',
      filePath,
      'public.test2',
    ])

    const psqlProcess = spawn('docker', [
      'run',
      `--net=${CATALOGUE_DOCKER_NETWORK}`,
      '--rm',
      'postgis',
      'psql',
      'postgresql://admin:password@postgis:5432/databooks',
    ])

    raster2pgsqlProcess.stdout.pipe(psqlProcess.stdin)
    raster2pgsqlProcess.stderr.on('data', data => console.error(tableName, `stderr: ${data}`))
    raster2pgsqlProcess.on('close', code => resolve(code))
    raster2pgsqlProcess.on('error', error => reject(error))

    psqlProcess.stdout.pipe(process.stdout)
    psqlProcess.stderr.pipe(process.stderr)
  })
}
