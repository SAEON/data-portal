const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  execute: await _import('./execute/index.js'),
  schema: await _import('./schema/index.js'),
  createDashboard: await _import('./_create-dashboard.js'),
  dashboards: await _import('./_dashboards.js'),
  createChart: await _import('./_create-chart.js'),
  charts: await _import('./_charts.js'),
}
