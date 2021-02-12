import mongodb from 'mongodb'
const { ObjectID } = mongodb
import fetch from 'node-fetch'
import { join, basename, sep, extname } from 'path'
import { createWriteStream, mkdtemp } from 'fs'
import { CATALOGUE_API_TEMP_DIRECTORY } from '../../../../../../../config.js'
import unzipper from 'unzipper'
import rimraf from 'rimraf'
import ogr2ogr from '../ogr2ogr/index.js'

const INCLUDE_EXTENSIONS = ['.dbf', '.shp', '.shx', '.qpj', '.prj', '.cpg']

const _temp = `${CATALOGUE_API_TEMP_DIRECTORY}${sep}`

export default async (ctx, databook, tableName, { immutableResource, id }) => {
  const { Databooks } = await ctx.mongo.collections
  const { downloadURL } = immutableResource.resourceDownload

  console.log(databook._id, 'Creating table', tableName)

  const cacheDir = await new Promise((resolve, reject) =>
    mkdtemp(_temp, (error, directory) => (error ? reject(error) : resolve(directory)))
  )

  /**
   * Stream the contents of the zip archive to a caching directory
   * to ensure that a dataset is a shapefile at the top level. This
   * normalizes the format of the directory so that it's easy to push
   * to PostGIS using GDAL
   *
   * Once the shapefile is cached to the server, push the shapefile to
   * PostGIS. On completing of the import emit an event called <tableName>
   * so that clients can subscribe to the data and get notified when it
   * exists
   */
  var shpFilePath
  try {
    const responseStreamObject = await fetch(downloadURL)
    const zip = responseStreamObject.body.pipe(unzipper.Parse({ forceStream: true }))

    /**
     * Process the archive into the cache
     */
    for await (const entry of zip) {
      const { path: filename } = entry
      const ext = extname(filename)
      if (filename.includes('MACOSX')) continue
      if (INCLUDE_EXTENSIONS.includes(ext)) {
        const writePath = join(cacheDir, basename(filename))
        if (ext === '.shp') shpFilePath = writePath
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

    /**
     * Process .shp into PostGIS
     */
    await ogr2ogr(ctx, databook, tableName, shpFilePath).then(async code => {
      if (code !== 0) {
        throw new Error(`Non-zero exit code (${code}) from GDAL ogr2ogr process`)
      }

      const { _id: databookId, _id: schema } = databook

      /**
       * Register the ODP ID in the PostGIS odp_map table
       * This is so that if a user renames the table, the
       * association between the ODP and the data is kept
       */
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
            [`tables.${tableName}.ready`]: true,
          },
        }
      )
    })
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
          [`tables.${tableName}.error`]: error.message,
        },
      }
    )
  } finally {
    /**
     * Clean up the tmp directory
     */
    // rimraf(cacheDir, () => console.log(tableName, 'Removing temporary directory', cacheDir))

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
