import { spawn } from 'child_process'
import { POSTGIS_DB, POSTGIS_PORT, POSTGIS_HOST, POSTGIS_CONTAINER_NAME } from '../config.js'
import mongo from 'mongodb'
import CombinedStream from 'combined-stream'
const { ObjectID } = mongo
import archiver from 'archiver'

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
    `attachment; filename=saeon-databook.${new Date().toISOString().replace(/:/g, '-')}.zip`
  )

  // Archive the output
  const archive = archiver('zip', {
    zlib: { level: 2 },
  })

  // Start the pg_dump process in a separate thread
  const pgDumpProcess = spawn('docker', [
    'container',
    'exec',
    POSTGIS_CONTAINER_NAME,
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
    .on('close', code => {
      console.info(databookId, 'SQL export complete. Code: ', code)
      archive.finalize()
    })
    .on('error', error => console.error(new Error(error.message)))

  //  Combine the stdout and stderr streams
  const pgDumpOutput = CombinedStream.create()
  pgDumpOutput.append(pgDumpProcess.stdout)
  pgDumpOutput.append(pgDumpProcess.stderr)

  archive.append(pgDumpOutput, { name: 'db.backup' })

  // Set the request result to the stream
  ctx.body = archive
}
