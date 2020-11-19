const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  execute: await _import('./execute/index.js'),
  schema: await _import('./schema/index.js'),
  dashboard: await _import('./dashboard/index.js'),
}
