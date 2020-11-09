import createDb from './create-db.js'
import createTable from './create-table/index.js'

export default async ({ records, databookId }) => {
  /**
   * TODO
   * Create a PostGIS DB and user with
   * relevant permissions
   */
  await createDb(databookId)

  /**
   * Cache the metadata records backing data
   * into the new PostGIS database one at a time
   */
  for (const record of records) {
    await createTable({ dbName: databookId, ...record._source })
  }
}
