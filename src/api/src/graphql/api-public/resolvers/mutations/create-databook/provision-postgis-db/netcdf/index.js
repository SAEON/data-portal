import { ObjectId } from 'mongodb'
import { createWriteStream, mkdir } from 'fs'
import { join, basename, sep } from 'path'
import fetch from 'node-fetch'
import { DATA_DIRECTORY as _D } from '../../../../../../../config.js'
import raster2pgsql from '../raster2pgsql/index.js'
import { nanoid } from 'nanoid'
import normalizeDownloadUrl from '../../../../../../../lib/normalize-data-download-uri.js'

const DATA_DIRECTORY = `${_D}${sep}`
const createUniqueDirectory = async () => {
  const p = join(DATA_DIRECTORY, nanoid())
  return await new Promise((resolve, reject) =>
    mkdir(p, { mode: '777' }, error => (error ? reject(error) : resolve(p)))
  )
}

export default async (ctx, databook, tableName, { immutableResource, id }) => {
  const { Databooks } = await ctx.mongo.collections
  console.log(databook._id, 'Creating table', tableName)

  const dir = await createUniqueDirectory()

  try {
    // Stream the download to the unique directory
    const downloadURL = await normalizeDownloadUrl(immutableResource?.resourceDownload.downloadURL)
    const rasterFilePath = join(dir, basename(downloadURL))
    const res = await fetch(downloadURL)
    await new Promise((resolve, reject) => {
      const writeStream = createWriteStream(rasterFilePath)
      res.body.pipe(writeStream)
      res.body.on('end', resolve)
      res.body.on('error', error => reject(error))
    })

    // Process the NetCDF into PostGIS
    console.info('Writing raster file to', rasterFilePath)
    await raster2pgsql(ctx, databook, tableName, rasterFilePath)

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
            '${rasterFilePath}' file_location;
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
