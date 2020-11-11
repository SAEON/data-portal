const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  tables: await _import('./_tables.js'),
}
