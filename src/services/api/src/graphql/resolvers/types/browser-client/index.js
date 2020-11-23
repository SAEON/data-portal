const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  persistSearchState: await _import('./_persist-search-state.js'),
  searchState: await _import('./_search-state.js'),
  createAtlas: await _import('./_create-atlas.js'),
  atlas: await _import('./_atlas.js'),
}
