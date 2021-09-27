import { ObjectId } from 'mongodb'
import { createWriteStream, mkdir } from 'fs'
import { join, basename, sep, extname } from 'path'
import fetch from 'node-fetch'
import { DATA_DIRECTORY as _D } from '../../../../../../../config.js'
import raster2pgsql from '../raster2pgsql/index.js'
import { nanoid } from 'nanoid'
import unzipper from 'unzipper'
import normalizeDownloadUrl from '../../../../../../../lib/normalize-data-download-uri.js'

const INCLUDE_EXTENSIONS = ['.asc', '.aux', '.dsu']

const DATA_DIRECTORY = `${_D}${sep}`
const createUniqueDirectory = async () => {
  const p = join(DATA_DIRECTORY, nanoid())
  return await new Promise((resolve, reject) =>
    mkdir(p, { mode: '777' }, error => (error ? reject(error) : resolve(p)))
  )
}

export default async (ctx, databook, tableName, { immutableResource, id }) => {
  const { Databooks } = await ctx.mongo.collections
  const downloadURL = await normalizeDownloadUrl(immutableResource?.resourceDownload.downloadURL)

  const dir = await createUniqueDirectory()

  /**
   * Stream the contents of the zip archive to permanent directory
   * to ensure that a dataset at the top level. This
   * normalizes the format of the directory so that it's easy to push
   * to PostGIS using raster2pgsql
   *
   */
  var ascFilePath
  try {
    const responseStreamObject = await fetch(downloadURL)
    const zip = responseStreamObject.body.pipe(unzipper.Parse({ forceStream: true }))

    /**
     * Extract archive onto the file system
     */
    for await (const entry of zip) {
      const { path: filename } = entry
      const ext = extname(filename)
      if (filename.includes('MACOSX')) continue
      if (INCLUDE_EXTENSIONS.includes(ext)) {
        const writePath = join(dir, basename(filename))
        if (ext === '.asc') ascFilePath = writePath
        await new Promise((resolve, reject) => {
          const dest = createWriteStream(writePath)
          entry.pipe(dest)
          dest.on('error', reject)
          dest.on('close', resolve)
        })
      } else {
        entry.autodrain()
      }
    }

    // Process the NetCDF into PostGIS
    console.info('Writing raster file to', ascFilePath)
    await raster2pgsql(ctx, databook, tableName, ascFilePath)

    /**
     * Register the ODP ID in the PostGIS odp_map table
     * This is so that if a user renames the table, the
     * association between the ODP and the data is kept
     */
    const { _id: databookId, _id: schema } = databook
    const { query } = ctx.postgis
    await query({
      text: `
          insert into "${schema}".odp_map (odp_record_id, table_name, file_location)
          select
            '${id}' odp_id,
            '${tableName}' table_name,
            '${ascFilePath}' file_location;
        `,
    })

    /**
     * Update the databook (Mongo doc) to
     * indicate that this table is ready
     */
    await Databooks.findOneAndUpdate(
      { _id: ObjectId(databookId) },
      {
        $set: {
          [`tables.${tableName}.ready`]: true,
        },
      }
    )
  } catch (error) {
    console.error(
      tableName,
      'Error creating table for',
      databook._id,
      'Resource download failed',
      error.message
    )
    await Databooks.findOneAndUpdate(
      { _id: ObjectId(databook._id) },
      {
        $set: {
          [`tables.${tableName}.error`]: error.message,
        },
      }
    )
  } finally {
    /**
     * Update the databook to indicate
     * that no more work is to be done on it
     */
    await Databooks.findOneAndUpdate(
      { _id: ObjectId(databook._id) },
      {
        $set: {
          complete: true,
        },
      }
    )
  }
}
