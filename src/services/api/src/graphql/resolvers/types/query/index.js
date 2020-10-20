const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  catalogue: await _import('./_catalogue.js'),
  browserClient: await _import('./_browser-client.js'),
}
