import fetch from 'node-fetch'
import { join, basename } from 'path'
import { mkdirSync, existsSync, createWriteStream, rmdirSync } from 'fs'
import getCurrentDirectory from '../../../../lib/get-current-directory.js'
import unzipper from 'unzipper' // https://github.com/ZJONSSON/node-unzipper#readme

const __dirname = getCurrentDirectory(import.meta)

const spatialFileExtensions = ['.dbf', '.shp', '.shx', '.qpj', '.prj', '.cpg']

// https://www.gispo.fi/en/open-software/importing-spatial-data-to-postgis/
// https://www.npmjs.com/package/ogr2ogr
// https://hub.docker.com/r/osgeo/gdal/tags

export default async ({ _source }, args, ctx) => {
  const { immutableResource, id } = _source
  const { downloadURL } = immutableResource.resourceDownload

  const p = join(__dirname, id)

  if (existsSync(p))
    rmdirSync(p, {
      recursive: true,
    })
  mkdirSync(p)

  /**
   * Stream the contents of the zip archive to the folder
   * Shapefile contents must be top-level
   * This normalizes the format of the directory
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
        const dest = createWriteStream(join(p, basename(path)))
        entry.pipe(dest)
        dest.on('finish', resolve)
      })
    } else {
      entry.autodrain()
    }
  }

  return 'hi'
}
