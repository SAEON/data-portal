import { spawn } from 'child_process'
import rimraf from 'rimraf'
import pubSub, { POSTGIS_TABLE_EXISTS } from '../../../../pubsub.js'

// TODO postgis write-locks

export default ({ layerId, shpFilePath, cacheDir }) => {
  const ogr2ogrProcess = spawn('docker', [
    'run',
    '--net=catalogue',
    '-v',
    '/tmp:/tmp',
    '--rm',
    'osgeo/gdal:alpine-small-latest',
    'ogr2ogr',
    '-overwrite',
    '-f',
    'PostgreSQL',
    '-lco',
    'PRECISION=NO',
    '-nln',
    layerId,
    'PG:host=postgis port=5432 user=admin password=password dbname=catalogue',
    shpFilePath,
  ])

  ogr2ogrProcess.stdout.on('data', data => {
    console.log(`stdout: ${data}`)
  })

  ogr2ogrProcess.stderr.on('data', data => {
    console.error(`stderr: ${data}`)
  })

  ogr2ogrProcess.on('close', code => {
    if (code === 0) {
      pubSub.publish(POSTGIS_TABLE_EXISTS, { postgisTableReady: layerId })
      rimraf(cacheDir, () => {
        console.log(layerId, 'PostGIS import successful', 'Temp directory removed')
      })
    } else {
      console.log('GDAL ogr2ogr existed with non-0 code', code)
    }
  })
}
