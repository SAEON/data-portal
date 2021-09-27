import { ObjectId } from 'mongodb'
import fetch from 'node-fetch'
import { join, basename, sep, extname } from 'path'
import { createWriteStream, mkdtemp, readdir, writeFile } from 'fs'
import { TEMP_DIRECTORY } from '../../../../../../../config.js'
import unzipper from 'unzipper'
import rimraf from 'rimraf'
import ogr2ogr from '../ogr2ogr/index.js'
import normalizeDownloadUrl from '../../../../../../../lib/normalize-data-download-uri.js'

const INCLUDE_EXTENSIONS = ['.dbf', '.shp', '.shx', '.qpj', '.prj', '.cpg']

const _temp = `${TEMP_DIRECTORY}${sep}`

export default async (ctx, databook, tableName, { immutableResource, id }) => {
  const { Databooks } = await ctx.mongo.collections
  const downloadURL = await normalizeDownloadUrl(immutableResource?.resourceDownload.downloadURL)

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
     * The shapefile folder should include a .cpg file
     * so that gdal ogr2ogr knows what encoding it is in
     */
    const hasCpg = await new Promise((resolve, reject) =>
      readdir(cacheDir, (err, files) => {
        if (err) {
          reject(err)
        } else {
          resolve(files.map(filename => extname(filename)).includes('.cpg'))
        }
      })
    )

    if (!hasCpg) {
      console.info(id, 'No .cpg file found. Defaulting to ISO 88591')
      const filename = basename(shpFilePath)
      const contents = 'ISO 88591' // Default encoding if not provided by download. This is a subset of UTF 8 chars
      await new Promise((resolve, reject) => {
        writeFile(
          join(cacheDir, filename.replace('.shp', '.cpg')),
          contents,
          { encoding: 'utf8' },
          err => {
            if (err) {
              reject(err)
            } else {
              resolve()
            }
          }
        )
      })
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
        { _id: ObjectId(databookId) },
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
      { _id: ObjectId(databook._id) },
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
    rimraf(cacheDir, () => console.log(tableName, 'Removing temporary directory', cacheDir))

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
