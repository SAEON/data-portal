/**
 * STEVEN TODO
 *  => Please do the SQL to update the
 *  => name of the schema in the database
 *  => Update the return type so that useful
 *  => errors (for example fails due to name
 *  => already existing) are passed back to
 *  => the client
 */
export default async (self, args) => {
  const currentSchemaName = self[0].table_schema
  const { name: newSchemaName } = args
  return false
}
