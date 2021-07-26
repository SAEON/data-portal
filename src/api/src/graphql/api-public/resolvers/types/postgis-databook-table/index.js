import fields from './_fields.js'
import updateTableName from './_update-table-name.js'

export default {
  table_schema: async self => self.fields[0].table_schema,
  databook: async self => self.databook,
  fields,
  updateTableName,
}
