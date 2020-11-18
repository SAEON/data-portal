const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  databook: async self => {
    console.log(self)
    return {}
  },
  tables: await _import('./_tables.js'),
}
