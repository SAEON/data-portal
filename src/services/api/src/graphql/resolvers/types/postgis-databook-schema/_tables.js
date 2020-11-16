// STEVEN TODO
// Is there a better way of doing this?
export default async (self, args) => {
  const { id } = args

  const tableMap = self.tables.reduce((a, c) => {
    const id = c.table_name

    a[id] = a[id] || {
      id,
      schema_name: self.id,
      fields: [],
    }
    a[id].fields = [...a[id].fields, { ...c, schema_name: self.id }]
    return a
  }, {})
  // console.log('_tables self', self)
  console.log('tableMap[0].fields', tableMap['anothertesttable2'].fields)
  return Object.entries(tableMap)
    .map(([tblName, table]) => (id ? tblName === id && table : table))
    .filter(_ => _)
}
