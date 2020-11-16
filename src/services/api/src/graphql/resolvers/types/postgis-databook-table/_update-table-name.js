/**
 * STEVEN TODO
 *  => Please do the SQL to update the
 *  => name of the table in the database
 *  => Update the return type so that useful
 *  => errors (for example fails due to name
 *  => already existing) are passed back to
 *  => the client
 */
export default async (self, args) => {
  const { id: currentTableName } = self
  const { name: newTableName } = args
  const sql = `ALTER TABLE ${currentTableName} RENAME TO ${newTableName}`
  try {
    await query({
      text: sql,
    })
  } catch (error) {
    console.error(error)
    throw error
  }

  return false
}
