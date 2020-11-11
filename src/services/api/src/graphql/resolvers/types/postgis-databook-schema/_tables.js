export default async (self, args) => {
  const { id } = args

  const tableMap = self.reduce((a, c) => {
    const id = c.table_name
    a[id] = a[id] || {
      id: c.table_name,
      fields: [],
    }

    a[id].fields = [
      ...a[id].fields,
      Object.fromEntries(
        Object.entries(c).filter(([k]) => !['table_schema', 'table_name'].includes(k))
      ),
    ]

    return a
  }, {})

  return Object.entries(tableMap).map(([tblName, table]) => (id ? tblName === id && table : table))
}
