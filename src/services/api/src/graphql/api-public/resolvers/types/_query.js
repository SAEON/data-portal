const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  catalogue: await _import('../queries/catalogue.js'),
  dashboard: await _import('../queries/dashboard.js'),
  dashboards: await _import('../queries/dashboards.js'),
  charts: await _import('../queries/charts.js'),
  filters: await _import('../queries/filters.js'),
  databook: await _import('../queries/databook.js'),
  searchState: await _import('../queries/search-state.js'),
  atlas: await _import('../queries/atlas.js'),
  userRoles: await _import('../queries/user-roles.js'),
}
