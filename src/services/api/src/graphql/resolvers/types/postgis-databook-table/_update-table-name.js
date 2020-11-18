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
  const { id: currentTableName } = self
  const { username, password } = self.databook.authentication
  const { name: newTableName } = args
  const { query } = ctx.postgis

  const sql = `ALTER TABLE "${username}"."${currentTableName}" RENAME TO "${newTableName}"`

  //STEVEN TODO: try catch block to be confirmed as actually catching query errors
  try {
    await query({
      text: sql,
      client: {
        user: username,
        password,
      },
    })
  } catch (error) {
    console.log(error)
    console.error(error)
    return false
  }

  return true
}
