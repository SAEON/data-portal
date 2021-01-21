const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  catalogue: await _import('./_catalogue.js'),
  dashboard: await _import('./_dashboard.js'),
  dashboards: await _import('./_dashboards.js'),
  charts: await _import('./_charts.js'),
  filters: await _import('./_filters.js'),
  databook: await _import('./_databook.js'),
  searchState: await _import('./_search-state.js'),
  atlas: await _import('./_atlas.js'),
}
