import ogr2ogr from '../../lib/ogr2ogr.js'
import { POSTGIS_PASSWORD, POSTGIS_USERNAME } from '../../config.js'
import { defaultWebLayers } from './default-layers.js'

export default async () => {
  for (const [tableName, uri] of Object.entries(defaultWebLayers)) {
    console.log('Configuring PostGIS', tableName, uri)
    await ogr2ogr({
      tableName,
      username: POSTGIS_USERNAME,
      password: POSTGIS_PASSWORD,
      schema: 'public',
      pathToShapefile: `/vsizip//vsicurl/${uri}`,
    })
    console.log('Configured PostGIS', tableName, uri)
  }
}
