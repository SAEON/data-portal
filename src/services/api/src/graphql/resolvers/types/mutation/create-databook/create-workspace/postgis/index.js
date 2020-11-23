import { collections } from '../../../../../../../mongo/index.js'
import createSchema from './_create-schema.js'
import createTable from './create-table/index.js'

export default async ({ records, databookId }) => {
  const { Databooks } = await collections
  const databook = await Databooks.findOne({ _id: databookId })

  /**
   * Create and PostGIS user and schema
   */
  await createSchema(databook)

  /**
   * Cache the metadata records backing data
   * into the new PostGIS database one at a time
   */
  for (const record of records) {
    await createTable(databook, { ...record._source })
  }
}
