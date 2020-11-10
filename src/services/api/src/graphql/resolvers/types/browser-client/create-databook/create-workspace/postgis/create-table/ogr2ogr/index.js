import { spawn } from 'child_process'
import { POSTGIS_DB } from '../../../../../../../../../config.js'

export default (databook, tableName, shpFilePath) => {
  const { _id: schema, authentication } = databook
  const { username, password } = authentication

  return new Promise((resolve, reject) => {
    const ogr2ogrProcess = spawn('docker', [
      'run',
      '--net=catalogue',
      '-v',
      '/tmp:/tmp',
      '--rm',
      'osgeo/gdal:alpine-small-latest',
      'ogr2ogr',
      '-skipfailures',
      '-update',
      '-gt',
      100000,
      '-f',
      'PostgreSQL',
      '-lco',
      'PRECISION=NO',
      '-lco',
      `SCHEMA=${schema}`,
      '-nlt',
      'PROMOTE_TO_MULTI',
      '-nln',
      tableName,
      `PG:host=postgis port=5432 user=${username} password=${password} dbname=${POSTGIS_DB}`,
      shpFilePath,
    ])

    ogr2ogrProcess.stdout.on('data', data => console.log(`stdout: ${data}`))
    ogr2ogrProcess.stderr.on('data', data => console.error(tableName, `stderr: ${data}`))
    ogr2ogrProcess.on('close', code => resolve(code))
    ogr2ogrProcess.on('error', error => reject(error))
  })
}
