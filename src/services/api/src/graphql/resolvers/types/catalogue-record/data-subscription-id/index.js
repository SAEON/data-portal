import fetch from 'node-fetch'
import { join, basename, sep, extname } from 'path'
import { createWriteStream, mkdtemp } from 'fs'
import { CATALOGUE_API_TEMP_DIRECTORY } from '../../../../../config.js'
import unzipper from 'unzipper'
import gisExtensions from './_gis-extensions.js'
import ogr2ogr from './_ogr2ogr.js'
import checkPostgisTable from '../../../../../lib/table-exists.js'
import rimraf from 'rimraf'
import pubSub, { DATA_READY } from '../../../../pubsub.js'
import {
  get as isLayerCaching,
  set as setLayerCaching,
  rm as rmLayerCaching,
} from '../../../../../lib/operation-status-cache.js'

const _temp = `${CATALOGUE_API_TEMP_DIRECTORY}${sep}`

export default async ({ _source }) => {
  const { immutableResource, id } = _source
  const { downloadURL } = immutableResource.resourceDownload
  const layerId = `layer_${id.replace(/\W/g, '')}`

  /**
   * Checking PostGIS directly can be expensive if there is a read lock
   * on the table.
   *
   * Instead, first check if this layer is currently being cached. If it's
   * not, then check if it's in PostGIS. If it's not in PostGIS and it's not
   * currently being cached, then the layer needs to be cached
   */
  const dataCache = await checkPostgisTable(layerId)

  if (isLayerCaching(layerId)) {
    console.log(layerId, 'PostGIS caching...')
    return layerId
  }

  if (await checkPostgisTable(layerId)) {
    console.log(layerId, 'PostGIS cache hit')
    return layerId
  }

  console.log(layerId, 'PostGIS cache miss')
  setLayerCaching(layerId)

  /**
   * Stream the contents of the zip archive to a caching directory
   * to ensure that a dataset is a shapefile at the top level. This
   * normalizes the format of the directory so that it's easy to push
   * to PostGIS using GDAL
   *
   * Once the shapefile is cached to the server, push the shapefile to
   * PostGIS. On completing of the import emit an event called <tblname>
   * so that clients can subscribe to the data and get notified when it
   * exists
   */
  var shpFilePath
  const res = await fetch(downloadURL)
  const zip = res.body.pipe(unzipper.Parse({ forceStream: true }))
  const cacheDir = await new Promise((resolve, reject) =>
    mkdtemp(_temp, (error, directory) => (error ? reject(error) : resolve(directory)))
  )

  /**
   * Process the archive into the cache
   */
  for await (const entry of zip) {
    const { path: filename } = entry
    const ext = extname(filename)
    if (filename.includes('MACOSX')) continue
    if (gisExtensions.includes(ext)) {
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
   * Process the cache into PostGIS, then clean
   * up the temp directory, then clean up the
   * process cache object and publish that the
   * table is created
   */
  ogr2ogr({
    layerId,
    shpFilePath,
  }).then(code => {
    rimraf(cacheDir, () => console.log(layerId, 'Caching complete', code))
    pubSub.publish(DATA_READY, { layerId, dataReady: true })
    rmLayerCaching(layerId)
  })

  return layerId
}
