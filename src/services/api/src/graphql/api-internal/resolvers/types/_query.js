const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  downloadsReport: await _import('../queries/downloads-report/index.js'),
}
