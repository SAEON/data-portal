import { spawn } from 'child_process'
import { POSTGIS_DB, POSTGIS_PORT, POSTGIS_HOST } from '../config.js'
import mongo from 'mongodb'
import CombinedStream from 'combined-stream'
const { ObjectID } = mongo

export default async ctx => {
  await ctx.user.ensureDataScientist(ctx)
  const { schema } = ctx.params
  const databookId = schema
  const { findDatabooks } = ctx.mongo.dataFinders
  const databook = (await findDatabooks({ _id: ObjectID(databookId) }))[0]
  const { username, password: encryptedPassword } = databook.authentication
  const password = ctx.crypto.decrypt(encryptedPassword)

  // Set response headers
  ctx.set('Content-type', 'application/octet-stream')
  ctx.set(
    'Content-disposition',
    `attachment; filename=databook.dump.${new Date().toISOString().replace(/:/g, '-')}.backup`
  )

  // Start the pg_dump process in a separate thread
  const pgDumpProcess = spawn('docker', [
    'container',
    'exec',
    'postgis',
    'pg_dump',
    '--dbname',
    `postgresql://${username}:${password}@${POSTGIS_HOST}:${POSTGIS_PORT}/${POSTGIS_DB}`,
    '-Fc',
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
  ])
    .on('close', code => console.info('SQL Backup complete. Code: ', code))
    .on('error', error => console.error(new Error(error.message)))

  //  Combine the stdout and stderr streams
  const pg_dumpOutput = CombinedStream.create()
  pg_dumpOutput.append(pgDumpProcess.stdout)
  pg_dumpOutput.append(pgDumpProcess.stderr)

  // Set the request result to the stream
  ctx.body = pgDumpProcess.pg_dumpOutput
}
