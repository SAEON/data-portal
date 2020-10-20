const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  onFilterChange: await _import('./_on-filter-change.js'),
}
