import mongodb from 'mongodb'
import createDataName from '../../_create-data-name.js'
import { createWriteStream, mkdtemp as createUniqueDirectory } from 'fs'
import { join, basename, sep } from 'path'
import fetch from 'node-fetch'
import { CATALOGUE_API_DATA_DIRECTORY } from '../../../../../../../config.js'
const { ObjectID } = mongodb
import raster2pgsql from '../raster2pgsql/index.js'

const DATA_DIRECTORY = `${CATALOGUE_API_DATA_DIRECTORY}${sep}`

export default async (ctx, databook, { immutableResource, id }) => {
  const { Databooks } = await ctx.mongo.collections
  const tableName = createDataName(id)
  console.log(databook._id, 'Creating table', tableName)

  // Create a new unique directory
  const dir = await new Promise((resolve, reject) =>
    createUniqueDirectory(DATA_DIRECTORY, (error, directory) =>
      error ? reject(error) : resolve(directory)
    )
  )

  try {
    // Stream the download to the unique directory
    const { downloadURL } = immutableResource.resourceDownload
    const writePath = join(dir, basename(downloadURL))
    const res = await fetch(downloadURL)
    await new Promise((resolve, reject) => {
      const writeStream = createWriteStream(writePath)
      res.body.pipe(writeStream)
      res.body.on('end', resolve)
      res.body.on('error', error => reject(error))
    })

    // Process the NetCDF into PostGIS
    console.info('Writing raster file to', writePath)
    await raster2pgsql(ctx, databook, tableName, writePath)

    /**
     * Register the ODP ID in the PostGIS odp_map table
     * This is so that if a user renames the table, the
     * association between the ODP and the data is kept
     */
    const { _id: databookId, _id: schema } = databook
    const { query } = ctx.postgis
    await query({
      text: `
          insert into "${schema}".odp_map (odp_record_id, table_name)
          select
            '${id}' odp_id,
            '${tableName}' table_name;
        `,
    })

    /**
     * Update the databook (Mongo doc) to
     * indicate that this table is ready
     */
    await Databooks.findOneAndUpdate(
      { _id: ObjectID(databookId) },
      {
        $set: {
          [`tables.${tableName}`]: {
            ready: true,
          },
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
      { _id: ObjectID(databook._id) },
      {
        $set: {
          [`tables.${tableName}`]: {
            ready: false,
            error: error.message,
          },
        },
      }
    )
  } finally {
    /**
     * Update the databook to indicate
     * that no more work is to be done on it
     */
    await Databooks.findOneAndUpdate(
      { _id: ObjectID(databook._id) },
      {
        $set: {
          complete: true,
        },
      }
    )
  }
}
