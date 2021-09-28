import fetch from 'node-fetch'
import { join, basename, sep, extname } from 'path'
import { createWriteStream, mkdtemp, readdir } from 'fs'
import { TEMP_DIRECTORY } from '../../../../../config.js'
import unzipper from 'unzipper'
import rimraf from 'rimraf'
import processShapefile from './_shapefile.js'

const _temp = `${TEMP_DIRECTORY}${sep}`

export default async (id, uri) => {
  const cacheDir = await new Promise((resolve, reject) =>
    mkdtemp(_temp, (error, directory) => (error ? reject(error) : resolve(directory)))
  )

  console.log('Writing to cache', cacheDir)

  try {
    const blobStream = await fetch(uri)
    const zip = blobStream.body.pipe(unzipper.Parse({ forceStream: true }))

    /**
     * Process the archive into the HD disk cache
     * Normalize everything to a top level folder
     */
    for await (const entry of zip) {
      const { path: filename } = entry
      const writePath = join(cacheDir, basename(filename))
      await new Promise((resolve, reject) => {
        const dest = createWriteStream(writePath)
        entry.pipe(dest)
        dest.on('error', reject)
        dest.on('close', resolve)
      })
    }
  } catch (error) {
    console.error('ERROR downloading application/zip blob data while updating data format', error)
  }

  try {
    // Get the file extensions of the extracted sip
    const extensions = await new Promise((resolve, reject) =>
      readdir(cacheDir, (err, files) => {
        if (err) {
          reject(err)
        }
        resolve(files.map(filename => extname(filename)))
      })
    )

    if (extensions.includes('.shp')) {
      await processShapefile(id)
    } else {
      console.error(
        'Cannot update record data format - only shapefiles are handled at this point. These extensions were found',
        extensions
      )
    }
  } catch (error) {
    console.error(error)
  } finally {
    // Clean up cache
    rimraf(cacheDir, () => console.info('Cleaned up cache', cacheDir))
  }
}
