import fetch from 'node-fetch'
import { join, basename, sep } from 'path'
import { createWriteStream, mkdtemp } from 'fs'
import { CATALOGUE_API_TEMP_DIRECTORY } from '../../../../config.js'
import unzipper from 'unzipper' // https://github.com/ZJONSSON/node-unzipper#readme

const _temp = `${CATALOGUE_API_TEMP_DIRECTORY}${sep}`
const spatialFileExtensions = ['.dbf', '.shp', '.shx', '.qpj', '.prj', '.cpg']

// https://www.gispo.fi/en/open-software/importing-spatial-data-to-postgis/
// https://www.npmjs.com/package/ogr2ogr
// https://hub.docker.com/r/osgeo/gdal/tags

export default async ({ _source }, args, ctx) => {
  const { immutableResource, id } = _source
  const { downloadURL } = immutableResource.resourceDownload

  // Get a temp directory for caching
  const cacheDir = await new Promise((resolve, reject) =>
    mkdtemp(_temp, (error, directory) => (error ? reject(error) : resolve(directory)))
  )

  /**
   * Stream the contents of the zip archive to the folder
   * Shapefile contents must be top-level
   * This normalizes the format of the directory
   * (the archive structure is not controlled)
   */
  const res = await fetch(downloadURL)
  const zip = res.body.pipe(unzipper.Parse({ forceStream: true }))
  for await (const entry of zip) {
    const { path } = entry
    if (path.includes('MACOSX')) continue

    let includeFile = false
    for (const ext of spatialFileExtensions) {
      if (path.includes(ext)) {
        includeFile = true
        break
      }
    }

    if (includeFile) {
      await new Promise(resolve => {
        const dest = createWriteStream(join(cacheDir, basename(path)))
        entry.pipe(dest)
        dest.on('finish', resolve)
      })
    } else {
      entry.autodrain()
    }
  }

  /**
   * Read the Shapefile into PostGIS
   */

  return 'hi'
}
