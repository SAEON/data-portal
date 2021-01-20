import createPostgisWorkspace from './create-workspace/postgis/index.js'
import fetchMetadataRecords from './_fetch-metadata-records.js'
import createMongoDoc from './_create-mongo-doc.js'

export default async (_, args, ctx) => {
  await ctx.userModel.ensureDataScientist(ctx)

  const { state, createdBy } = args

  /**
   * Search the catalogue with the provided state
   * for a list of record IDs that should be included
   * in the databook
   */
  const records = await fetchMetadataRecords(state, ctx)

  /**
   * Insert a databook to MongoDB that represents a databook
   * This entry contains a list of tables with a ready status
   * that is initially set to 'false'
   *
   * A databookId (i.e. thew _id of the Mongo doc) corresponds
   * to the name of a schema in PostGIS
   */
  const { insertedId: databookId } = await createMongoDoc(records, ctx, createdBy)

  /**
   * Asynchronously extract the downloads from the metadata
   * records into a PostGIS server, and return the databook
   * ID. As each dataset is successfully integrated into
   * PostGIS, the Mongo document is updated to reflect this,
   * and so a client can check progress on this method that
   * way (via polling)
   */
  createPostgisWorkspace(ctx, { records, databookId }).catch(error => console.error(error))
  return databookId
}
