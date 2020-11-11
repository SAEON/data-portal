/**
 * STEVEN TODO
 *  => Please do the SQL to update the
 *  => name of the column in the database
 *  => Update the return type so that useful
 *  => errors (for example fails due to name
 *  => already existing) are passed back to
 *  => the client
 *
 * Note. for some reason columns are duplicated
 * but with different data types. I think this
 * is due to the GIS stuff of postgis... At least
 * we can't change this as the tables are imported
 * as is from shapefiles. Please use
 * {column_name, data_type} as a compound identifier
 */
export default async (self, args, ctx) => {
  const { query } = ctx.postgis // use query({client: {...}}), get username / password from mongo
  const { column_name, data_type } = self
  const { name: newColumnName } = args
  return false
}
