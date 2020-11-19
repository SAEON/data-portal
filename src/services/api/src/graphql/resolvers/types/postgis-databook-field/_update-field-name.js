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
  const { query } = ctx.postgis
  const { column_name, /*data_type,*/ table_name, databook } = self //commenting out data_type till the duplicate column issue is confirmed
  const { _id: schemaId } = self.databook
  const { username, password } = self.databook.authentication
  const { name: newColumnName } = args
  const sql = `ALTER TABLE "${schemaId.toString()}"."${table_name}" RENAME COLUMN "${column_name}" TO "${newColumnName}"`
  try {
    await query({ text: sql, client: { username, password } }) //client parameter can be set, see query def in .../databook/execute/index.js
  } catch (error) {
    console.log(error)
    console.error(error)
    return false
  }

  return true
}
