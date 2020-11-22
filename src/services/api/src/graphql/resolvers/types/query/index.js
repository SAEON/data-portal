const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  catalogue: await _import('./_catalogue.js'),
  browserClient: await _import('./_browser-client.js'),
  dashboard: await _import('./_dashboard.js'),
  charts: await _import('./_charts.js'),
}
