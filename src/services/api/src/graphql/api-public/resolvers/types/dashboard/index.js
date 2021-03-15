const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  id: async self => self._id,
  addChart: await _import('./_add-chart.js'),
  charts: await _import('./_charts.js'),
  filters: async self => self.filters,
}
