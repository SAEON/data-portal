import hash from 'object-hash'
const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  databook: async self => self.databook,
  id: async self => {
    return self.column_name
  },
  updateFieldName: await _import('./_update-field-name.js'),
}
