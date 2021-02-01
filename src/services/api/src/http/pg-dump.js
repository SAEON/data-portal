import { spawn } from 'child_process'
import { POSTGIS_DB, POSTGIS_PORT, POSTGIS_HOST } from '../config.js'
import mongo from 'mongodb'

const { ObjectID } = mongo

export default async ctx => {
  await ctx.user.ensureDataScientist(ctx)
  const { schema } = ctx.params
  const databookId = schema
  const { findDatabooks } = ctx.mongo.dataFinders
  const databook = (await findDatabooks({ _id: ObjectID(databookId) }))[0]
  const { username, password: encryptedPassword } = databook.authentication
  const password = ctx.crypto.decrypt(encryptedPassword)

  const childProcess = spawn(
    'docker',
    [
      'container',
      'exec',
      'postgis',
      'pg_dump',
      '--dbname',
      `postgresql://${username}:${password}@${POSTGIS_HOST}:${POSTGIS_PORT}/${POSTGIS_DB}`,
      '--schema',
      'public',
      '--schema',
      schema,
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
  ctx.body = childProcess.stderr
}
