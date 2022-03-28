import { spawn } from 'child_process'
import {
  POSTGIS_DB,
  POSTGIS_PORT,
  POSTGIS_HOST,
  POSTGIS_CONTAINER_NAME
} from '../../config/index.js'
import getCurrentDirectory from '../../lib/get-current-directory.js'
import { createReadStream } from 'fs'
import { basename, join } from 'path'
import CombinedStream from 'combined-stream'
import archiver from 'archiver'

const __dirname = getCurrentDirectory(import.meta)

export default async ctx => {
  const { schema } = ctx.params
  const { username, password: encryptedPassword } = {
    TODO: 'These used to be in databook.authentication'
  }
  const password = ctx.crypto.decrypt(encryptedPassword)

  // Get a list of NetCDF files that need to be streamed along with the .backup
  const externalFiles = (
    await query({
      text: `select * from "${schema}".odp_map`
    })
  ).rows
    .map(({ file_location }) => file_location)
    .filter(_ => _)

  // Set response headers
  ctx.set('Content-type', 'application/octet-stream')
  ctx.set(
    'Content-disposition',
    `attachment; filename=pg-dump.${new Date().toISOString().replace(/:/g, '-')}.zip`
  )

  // Archive the output
  const archive = archiver('zip', {
    zlib: { level: 2 }
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
    '--no-owner'
  ])
    .on('close', code => {
      console.info('SQL export complete. Code: ', code)
      archive.finalize()
    })
    .on('error', error => console.error(new Error(error.message)))

  //  Combine the stdout and stderr streams
  const pgDumpOutput = CombinedStream.create()
  pgDumpOutput.append(pgDumpProcess.stdout)
  pgDumpOutput.append(pgDumpProcess.stderr)

  // Specify files in the archive
  archive.append(pgDumpOutput, { name: 'db.backup' })
  archive.append(createReadStream(join(__dirname, './README.txt')), { name: 'README.txt' })
  externalFiles.forEach(path => archive.append(createReadStream(path), { name: basename(path) }))

  // Set the request result to the stream
  ctx.body = archive
}
