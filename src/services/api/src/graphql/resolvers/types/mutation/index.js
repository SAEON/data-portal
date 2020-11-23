const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  logBrowserEvents: await _import('./_log-browser-events.js'),
  submitFeedback: await _import('./_submit-feedback.js'),
  createDatabook: await _import('./create-databook/index.js'),
  createAtlas: await _import('./_create-atlas.js'),
  persistSearchState: await _import('./_persist-search-state.js'),
  createDashboard: await _import('./_create-dashboard.js'),
  createChart: await _import('./_create-chart.js'),
}
