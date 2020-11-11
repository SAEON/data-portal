const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  fields: await _import('./_fields.js'),
  updateTableName: await _import('./_update-table-name.js'),
}
