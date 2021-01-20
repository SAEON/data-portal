import { collections } from '../../../../../../../../mongo/index.js'
import provisionSchema from './provision-schema/index.js'
import importGisData from './import-gis-data/index.js'

export default async (ctx, { records, databookId }) => {
  const { Databooks } = await collections
  const databook = await Databooks.findOne({ _id: databookId })

  /**
   * Create a new PostGIS user
   * Create a schema for new user
   * Provision other necessary tables
   * Adjust roles and search path for user
   */
  await provisionSchema(ctx, databook)

  /**
   * Download the GIS data (immutableResource)
   * Then import that GIS data into PostGIS using GDAL
   */
  for (const record of records) {
    await importGisData(ctx, databook, { ...record._source })
  }
}
