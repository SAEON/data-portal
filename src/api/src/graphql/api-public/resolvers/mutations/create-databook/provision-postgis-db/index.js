import provisionSchema from './provision-schema/index.js'
import loadShapefileArchive from './shapefile-archive/index.js'
import loadAscArchive from './asc-archive/index.js'
import loadNetCdfFile from './netcdf/index.js'
import { ObjectId } from 'mongodb'

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
    const { _source } = record
    const { id } = _source
    const { tables } = databook

    const table = Object.entries(tables).find(([, { recordId }]) => recordId === id)
    const tableName = table[0]
    const dataType = table[1].type

    /**
     * Depending on the type of data that immutableResource is,
     * process the data defined by immutableResource with the
     * appropriate function according to data type
     */
    try {
      switch (dataType) {
        case 'netcdf':
          console.log(databook._id, 'Importing NetCDF file to PostGIS')
          await loadNetCdfFile(ctx, databook, tableName, _source)
          break

        case 'shapefile-archive':
          console.log(databook._id, 'Importing shapefile archive to PostGIS')
          await loadShapefileArchive(ctx, databook, tableName, _source)
          break

        case 'asc-archive':
          console.log(databook._id, 'Importing ASC archive to PostGIS as raster')
          await loadAscArchive(ctx, databook, tableName, _source)
          break

        default:
          throw new Error('Unknown immutable resource format')
      }
    } catch (error) {
      await Databooks.findOneAndUpdate(
        { _id: ObjectId(databook._id) },
        {
          $set: {
            [`tables.${tableName}`]: {
              ready: false,
              error: {
                message: error.message,
                immutableResource: _source.immutableResource,
              },
            },
          },
        }
      )
    }
  }

  /**
   * Revoke write access to PostGIS extension
   * (GDAL ogr2ogr requires this when importing shapefiles)
   */
  await cleanupAfterOgr2Ogr()
}
