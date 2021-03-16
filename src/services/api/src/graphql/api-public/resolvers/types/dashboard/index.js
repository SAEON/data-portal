const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  id: async self => self._id,
  addChart: await _import('./_add-chart.js'),
  addFilter: await _import('./_add-filter.js'),
  charts: await _import('./_charts.js'),
  filters: await _import('./_filters.js'),
}
