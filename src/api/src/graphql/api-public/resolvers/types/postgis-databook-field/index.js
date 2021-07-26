import updateFieldName from './_update-field-name.js'

export default {
  databook: async self => self.databook,
  id: async self => {
    return self.column_name
  },
  updateFieldName,
}
