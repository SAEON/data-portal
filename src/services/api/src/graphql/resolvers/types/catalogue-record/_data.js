import fetch from 'node-fetch'
import ogr2ogr from 'ogr2ogr'
import { join, basename, sep, extname } from 'path'
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
  var shpFilePath
  const res = await fetch(downloadURL)
  const zip = res.body.pipe(unzipper.Parse({ forceStream: true }))
  for await (const entry of zip) {
    const { path: filename } = entry
    const ext = extname(filename)
    if (filename.includes('MACOSX')) continue
    if (spatialFileExtensions.includes(ext)) {
      const writePath = join(cacheDir, basename(filename))
      if (ext === '.shp') shpFilePath = writePath
      await new Promise(resolve => {
        const dest = createWriteStream(writePath)
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
  console.log(shpFilePath)
  var ogr2 = ogr2ogr(shpFilePath)
  ogr2.stream().pipe(createWriteStream('./test')) // TODO https://stackoverflow.com/questions/27688804/how-do-i-debug-error-spawn-enoent-on-node-js#:~:text=The%20absence%20of%20PATH%20(i.e.,Last%20case%20is%20the%20usual.

  return 'hi'
}
