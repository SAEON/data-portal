const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  configureElasticsearchTemplate: await _import(
    '../../mutations/configure-elasticsearch-template/index.js'
  ),
  configureElasticsearchIndex: await _import(
    '../../mutations/configure-elasticsearch-index/index.js'
  ),
  configureDefaultPostGISLayers: await _import(
    '../../mutations/configure-default-postgis-layers/index.js'
  ),
}
