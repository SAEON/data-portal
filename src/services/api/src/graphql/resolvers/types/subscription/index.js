const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  postgisTableReady: await _import('./_postgis-table-ready.js'),
}
