const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  databook: async self => self.databook,
  tables: await _import('./_tables.js'),
}
