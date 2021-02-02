import mongodb from 'mongodb'
import createDataName from '../../../../_create-data-name.js'
import { createWriteStream, mkdtemp } from 'fs'
import { join, basename, sep, extname } from 'path'
import fetch from 'node-fetch'
import { CATALOGUE_API_TEMP_DIRECTORY } from '../../../../../../../../../../config.js'
import rimraf from 'rimraf'
const { ObjectID } = mongodb
import raster2pgsql from '../raster2pgsql/index.js'

const _temp = `${CATALOGUE_API_TEMP_DIRECTORY}${sep}`

export default async (ctx, databook, { immutableResource, id }) => {
  const { Databooks } = await ctx.mongo.collections
  const tableName = createDataName(id)
  const { downloadURL } = immutableResource.resourceDownload

  console.log(databook._id, 'Creating table', tableName)

  const cacheDir = await new Promise((resolve, reject) =>
    mkdtemp(_temp, (error, directory) => (error ? reject(error) : resolve(directory)))
  )

  try {
    const writePath = join(cacheDir, basename(downloadURL))
    const res = await fetch(downloadURL)
    const dest = createWriteStream(writePath)
    res.body.pipe(dest)

    await new Promise((resolve, reject) => {
      res.body.on('end', resolve)
      res.body.on('error', error => reject(error))
    })

    /**
     * Process the NetCDF into PostGIS
     */
    await raster2pgsql(ctx, databook, tableName, writePath).then(() => {
      console.log('hi there!')
    })

    throw new Error('hi there')
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
     * Clean up the tmp directory
     */
    rimraf(cacheDir, () => console.log(tableName, 'Removing temporary directory', cacheDir))

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
