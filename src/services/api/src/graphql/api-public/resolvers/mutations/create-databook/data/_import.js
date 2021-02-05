import loadShapefileArchive from './shapefile-archive/index.js'
import loadNetCdfFile from './netcdf/index.js'
import mongodb from 'mongodb'
const { ObjectID } = mongodb
import createDataName from '../_create-data-name.js'

export default async (ctx, databook, dataType, _source) => {
  const { Databooks } = await ctx.mongo.collections
  const tableName = createDataName(_source.id)

  try {
    switch (dataType) {
      case 'netcdf':
        console.log(databook._id, 'Importing NetCDF file to PostGIS')
        return await loadNetCdfFile(ctx, databook, _source)

      case 'shapefile-archive':
        console.log(databook._id, 'Importing shapefile archive to PostGIS')
        return await loadShapefileArchive(ctx, databook, _source)

      case 'asc-archive':
        throw new Error('ASC files are not supported yet')

      default:
        throw new Error('Unknown immutable resource format')
    }
  } catch (error) {
    await Databooks.findOneAndUpdate(
      { _id: ObjectID(databook._id) },
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
