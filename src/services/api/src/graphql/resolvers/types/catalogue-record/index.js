const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  id: async self => self._id,
  metadata: async self => self,
  data: await _import('./_data.js'),
  citation: await _import('./_citation.js'),
}
