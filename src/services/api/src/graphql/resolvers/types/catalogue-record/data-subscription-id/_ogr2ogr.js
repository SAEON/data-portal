import { spawn } from 'child_process'

export default ({ layerId, shpFilePath }) =>
  new Promise((resolve, reject) => {
    const ogr2ogrProcess = spawn('docker', [
      'run',
      '--net=catalogue',
      '-v',
      '/tmp:/tmp',
      '--rm',
      'osgeo/gdal:alpine-small-latest',
      'ogr2ogr',
      '-update',
      '-gt',
      100000,
      '-f',
      'PostgreSQL',
      '-lco',
      'PRECISION=NO',
      '-nln',
      layerId,
      'PG:host=postgis port=5432 user=admin password=password dbname=catalogue',
      shpFilePath,
    ])

    ogr2ogrProcess.stdout.on('data', data => console.log(`stdout: ${data}`))
    ogr2ogrProcess.stderr.on('data', data => console.error(layerId, `stderr: ${data}`))
    ogr2ogrProcess.on('close', code => resolve(code))
    ogr2ogrProcess.on('error', error => reject(error))
  })
