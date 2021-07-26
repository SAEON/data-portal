import { spawn } from 'child_process'
import {
  CATALOGUE_DOCKER_NETWORK,
  POSTGIS_DB,
  POSTGIS_HOST,
  CATALOGUE_API_TEMP_DIRECTORY,
  CATALOGUE_DOCKER_TMP_VOLUME,
  GDAL_DOCKER_IMAGE,
} from '../config.js'

export default ({
  tableName,
  username,
  password,
  pathToShapefile,
  schema,
  translate = false,
  s_srs = 'EPSG:4326',
}) => {
  const ogr2ogrProcess = spawn('docker', [
    'run',
    `--net=${CATALOGUE_DOCKER_NETWORK}`,
    '-v',
    `${CATALOGUE_DOCKER_TMP_VOLUME}:${CATALOGUE_API_TEMP_DIRECTORY}`,
    '--rm',
    GDAL_DOCKER_IMAGE,
    'ogr2ogr',
    '--config',
    'PG_USE_COPY YES',
    '-skipfailures',
    '-overwrite',
    '-gt',
    100000,
    '-f',
    'PostgreSQL',
    '-lco',
    'LAUNDER=NO',
    ...(translate ? ['-s_srs', s_srs, '-t_srs', 'EPSG:4326'] : []),
    '-lco',
    'PRECISION=NO',
    '-nlt',
    'PROMOTE_TO_MULTI',
    '-nln',
    tableName,
    `PG:host=${POSTGIS_HOST} port=5432 user=${username} password=${password} dbname=${POSTGIS_DB} active_schema=${schema}`,
    pathToShapefile,
  ])

  return new Promise((resolve, reject) => {
    ogr2ogrProcess.stdout.on('data', data => console.log(`stdout: ${data}`))
    ogr2ogrProcess.stderr.on('data', data => console.error(tableName, `stderr: ${data}`))
    ogr2ogrProcess.on('close', code => resolve(code))
    ogr2ogrProcess.on('error', error => reject(error))
  })
}
