const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  records: await _import('./_records.js'), // eslint-disable-line
  summary: await _import('./_summary.js'), // eslint-disable-line
  refreshIndex: await _import('./refresh-index/index.js'), // eslint-disable-line
}
