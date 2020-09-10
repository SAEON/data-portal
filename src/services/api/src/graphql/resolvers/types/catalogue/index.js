const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  records: await _import('./_records.js'),
  summary: await _import('./_summary.js'),
  refreshIndex: await _import('./_refresh-index.js'),
}
