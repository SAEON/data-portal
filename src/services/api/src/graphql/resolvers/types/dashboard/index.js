const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  id: async self => self._id,
  createChart: await _import('./_create-chart.js'),
  charts: await _import('./_charts.js'),
}
