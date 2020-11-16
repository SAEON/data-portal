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
//column names by rule of postgres must be unique within their table, how are column names duplicating?  http://etutorials.org/SQL/Postgresql/Part+I+General+PostgreSQL+Use/Chapter+3.+PostgreSQL+SQL+Syntax+and+Use/PostgreSQL+Naming+Rules/
export default async (self, args, ctx) => {
  console.log('self', self)
  console.log('args', args)
  const { query } = ctx.postgis // use query({client: {...}}), get username / password from mongo
  const { column_name, data_type, table_name, schema_name } = self
  const { name: newColumnName } = args
  const sql = `ALTER TABLE "5fae7017811a701352474d93"."${table_name}" RENAME COLUMN "${column_name}" TO "${newColumnName}"`
  console.log('update-field self', self)

  var result
  try {
    result = await query({ text: sql }) //client parameter can be set, see query def in .../databook/execute/index.js
    console.log('result', result)
  } catch (error) {
    console.log(error)
    console.error(error)
    return false
  }

  return true
}
