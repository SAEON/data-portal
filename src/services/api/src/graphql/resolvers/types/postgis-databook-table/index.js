const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  table_schema: async self => self.fields[0].table_schema,
  databook: async self => self.databook,
  fields: await _import('./_fields.js'),
  updateTableName: await _import('./_update-table-name.js'),
}
