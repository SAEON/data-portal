const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  clientIpLocation: await _import('./_client-ip-location.js'),
}
