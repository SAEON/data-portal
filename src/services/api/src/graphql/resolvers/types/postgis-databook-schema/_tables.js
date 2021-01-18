import defaultLayers from '../../../../postgis/setup/default-layers.js'

export default async (self, args) => {
  const { id } = args

  const tableMap = self.tables.reduce((a, c) => {
    const id = c.table_name
    a[id] = a[id] || {
      id,
      odpRecordId: c.odp_record_id,
      databook: self.databook,
      description: defaultLayers[id]?.description || 'NA',
      fields: [],
    }
    a[id].fields = [...a[id].fields, { ...c }]
    return a
  }, {})

  return Object.entries(tableMap)
    .map(([tblName, table]) => (id ? tblName === id && table : table))
    .filter(_ => _)
}
