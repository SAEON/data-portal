const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  dataReady: await _import('./_data-ready.js'),
}
