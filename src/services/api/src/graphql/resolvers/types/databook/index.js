const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  schema: await _import('./schema/index.js'),
  dashboards: await _import('./_dashboards.js'),
  charts: await _import('./_charts.js'),
  filters: await _import('./_filters.js'),
}
