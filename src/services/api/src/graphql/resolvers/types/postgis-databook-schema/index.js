import hash from 'object-hash'
const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  id: async self => hash(self),
  updateSchemaName: await _import('./_update-schema-name.js'),
  tables: await _import('./_tables.js'),
}
