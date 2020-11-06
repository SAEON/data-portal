const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  id: async self => self._id,
  metadata: async self => self,
  dataId: await _import('./data-id/index.js'),
  citation: await _import('./_citation.js'),
}
