import provisionSchema from './provision-schema/index.js'
import importGisData from './_import.js'

/**
 * NOTE
 *
 * When I designed this workflow I didn't realize that ogr2ogr
 * would want to write to public.* tables (where the PostGIS extension
 * is installed)
 *
 * If I had... I would have used the admin username/password to create
 * the schema and then adjusted roles for a new user after the fact.
 *
 * Also, it might be a better idea to create a database per user than
 * a schema. This would allow for enabling PostGIS per user, which would
 * be helpful. However then shared tables would need to be duplicated per
 * user
 */

export default async (ctx, { records, databookId }) => {
  const { Databooks } = await ctx.mongo.collections
  const databook = await Databooks.findOne({ _id: databookId })

  /**
   * Create a new PostGIS user
   * Create a schema for new user
   * Provision other necessary tables
   * Adjust roles and search path for user
   */
  const cleanupAfterOgr2Ogr = await provisionSchema(ctx, databook)

  /**
   * Download the GIS data (immutableResource)
   * Then import that GIS data into PostGIS using GDAL
   */
  for (const record of records) {
    const { id } = record._source
    const { tables } = databook
    const dataType = Object.entries(tables).find(([_, { recordId }]) => recordId === id)[1].type

    await importGisData(ctx, databook, dataType, { ...record._source })
  }

  /**
   * Revoke write access to PostGIS extension
   * (GDAL ogr2ogr requires this when importing shapefiles)
   */
  await cleanupAfterOgr2Ogr()
}
