const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  id: async self => self._id,
  charts: await _import('./_charts.js'),
}
