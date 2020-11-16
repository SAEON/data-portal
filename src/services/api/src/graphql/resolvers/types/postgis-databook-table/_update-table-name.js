/**
 * STEVEN TODO
 *  => Please do the SQL to update the
 *  => name of the table in the database
 *  => Update the return type so that useful
 *  => errors (for example fails due to name
 *  => already existing) are passed back to
 *  => the client
 */
export default async (self, args, ctx) => {
  const { id: currentTableName, schema_name } = self
  const { name: newTableName } = args
  const { query } = ctx.postgis
  const sql = `ALTER TABLE "${schema_name}"."${currentTableName}" RENAME TO "${newTableName}"`

  //STEVEN TODO: try catch block to be confirmed as actually catching query errors
  try {
    await query({ text: sql }) //client parameter can be set, see query def in .../databook/execute/index.js
  } catch (error) {
    console.log(error)
    console.error(error)
    return false
  }

  return true
}
