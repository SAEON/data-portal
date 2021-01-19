import ogr2ogr from '../../../../../lib/ogr2ogr.js'
import { POSTGIS_PASSWORD, POSTGIS_USERNAME } from '../../../../../config.js'
import defaultLayers from '../../../../../lib/default-postgis-layers.js'

export default async (self, args, ctx) => {
  await ctx.userModel.checkRole(ctx, 'admin')

  for (const [tableName, { uri }] of Object.entries(defaultLayers)) {
    console.log('Configuring PostGIS', tableName, uri)
    await ogr2ogr({
      tableName,
      username: POSTGIS_USERNAME,
      password: POSTGIS_PASSWORD,
      schema: 'public',
      pathToShapefile: `/vsizip//vsicurl/${uri}`,
    })
  }

  return {}
}
