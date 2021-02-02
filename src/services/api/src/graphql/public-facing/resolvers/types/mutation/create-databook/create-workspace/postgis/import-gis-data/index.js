import loadShapefileArchive from './shapefile-archive/index.js'
import loadNetCdfFile from './netcdf/index.js'
import mongodb from 'mongodb'
const { ObjectID } = mongodb
import { collections } from '../../../../../../../../../mongo/index.js'
import createDataName from '../../../_create-data-name.js'

export default async (ctx, databook, { immutableResource, id }) => {
  const { Databooks } = await collections
  const { resourceDownload, resourceName } = immutableResource
  const { archive, archivedFormats, fileFormat } = resourceDownload
  const tableName = createDataName(id)

  try {
    /**
     * .nc (NetCDF) resources
     */
    if (fileFormat?.includes('nc')) {
      console.log(databook._id, 'Importing NetCDF file to PostGIS')
      return await loadNetCdfFile(ctx, databook, { immutableResource, id })
    }

    /**
     * Accession resources
     */
    if (resourceName === 'Accession') {
      throw new Error('Cannot open accessioned resources')
    }

    /**
     * Resource is an archived shapefile
     */
    if (archive && archivedFormats?.includes('shp')) {
      console.log(databook._id, 'Importing shapefile archive to PostGIS')
      return await loadShapefileArchive(ctx, databook, { immutableResource, id })
    }

    /**
     * Resource is an archived ESRI .asc
     */
    if (archive && archivedFormats?.includes('asc')) {
      throw new Error('ASC files are not supported yet')
    }

    /**
     * Otherwise throw a general error
     */
    throw new Error('Unknown immutable resource format')
  } catch (error) {
    await Databooks.findOneAndUpdate(
      { _id: ObjectID(databook._id) },
      {
        $set: {
          [`tables.${tableName}`]: {
            ready: false,
            error: {
              message: error.message,
              immutableResource,
            },
          },
        },
      }
    )
  }
}
