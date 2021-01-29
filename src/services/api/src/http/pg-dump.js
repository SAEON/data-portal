import { spawn } from 'child_process'
import {
  POSTGIS_DB,
  POSTGIS_USERNAME,
  POSTGIS_PORT,
  POSTGIS_HOST,
  POSTGIS_PASSWORD,
} from '../config.js'

console.log(
  [
    'container',
    'exec',
    'postgis',
    'pg_dump',
    '--dbname',
    `postgresql://${POSTGIS_USERNAME}:${POSTGIS_PASSWORD}@${POSTGIS_HOST}:${POSTGIS_PORT}/${POSTGIS_DB}`,
    '--schema',
    'public',
    '--encoding',
    'utf8',
    '--create',
    '--clean',
    '--no-privileges',
    '--no-owner',
  ].join(' ')
)

export default async ctx => {
  await ctx.userModel.ensureDataScientist(ctx)

  const childProcess = spawn(
    'docker',
    [
      'container',
      'exec',
      'postgis',
      'pg_dump',
      '--dbname',
      `postgresql://${POSTGIS_USERNAME}:${POSTGIS_PASSWORD}@${POSTGIS_HOST}:${POSTGIS_PORT}/${POSTGIS_DB}`,
      '--schema',
      'public',
      '--encoding',
      'utf8',
      '--create',
      '--clean',
      '--no-privileges',
      '--no-owner',
    ],
    { stdio: ['pipe', 'pipe', 'pipe'] } // TODO redirect childProcess.stderr to childProcess.stdout
  )
    .on('close', code => console.info('SQL Backup complete. Code: ', code))
    .on('error', error => console.error(new Error(error.message)))

  ctx.set('Content-disposition', 'attachment; filename=test2.sql')
  ctx.set('Content-type', 'application/octet-stream')
  ctx.body = childProcess.stdout
}
