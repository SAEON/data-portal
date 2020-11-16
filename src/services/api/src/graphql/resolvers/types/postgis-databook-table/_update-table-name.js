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
  console.log('update-table self', self)
  const { id: currentTableName, schema_name } = self
  const { name: newTableName } = args
  const { query } = ctx.postgis
  const sql = `ALTER TABLE "${schema_name}"."${currentTableName}" RENAME TO "${newTableName}"`

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
