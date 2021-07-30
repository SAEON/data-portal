const path = require('path')
const ROOT = path.normalize(path.join(__dirname, '../'))

module.exports = mode => ({
  /**
   * Webpack doesn't seem to respect the package.json
   * exports field. That is why saeon packages are
   * referenced by dist folder, and not just the
   * package
   */

  // OpenLayers
  'ol/control': path.resolve(ROOT, './node_modules/ol/control'),
  'ol/format': path.resolve(ROOT, './node_modules/ol/format'),
  'ol/layer/Group': path.resolve(ROOT, './node_modules/ol/layer/Group'),
  'ol/View': path.resolve(ROOT, './node_modules/ol/View'),
  'ol/Map': path.resolve(ROOT, './node_modules/ol/Map'),

  // clsx
  clsx: path.resolve(ROOT, './node_modules/clsx'),

  // Apollo
  '@apollo/client': path.resolve(ROOT, './node_modules/@apollo/client'),

  // Material UI
  '@material-ui/core': path.resolve(ROOT, './node_modules/@material-ui/core'),
  '@material-ui/icons': path.resolve(ROOT, './node_modules/@material-ui/icons'),

  // React
  react: path.resolve(ROOT, './node_modules/react'),
  'react-dom': path.resolve(ROOT, './node_modules/react-dom'),

  // @saeon/quick-form
  '@saeon/quick-form': path.resolve(
    ROOT,
    mode === 'production'
      ? './node_modules/@saeon/quick-form/dist/esm'
      : '../packages/quick-form/dist/esm'
  ),

  // @saeon/snap-menus
  '@saeon/snap-menus': path.resolve(
    ROOT,
    mode === 'production'
      ? './node_modules/@saeon/snap-menus/dist/esm'
      : '../packages/snap-menus/src'
  ),

  // @saeon/ol-react
  '@saeon/ol-react': path.resolve(
    ROOT,
    mode === 'production'
      ? './node_modules/@saeon/ol-react/dist/esm'
      : '../packages/ol-react/dist/esm'
  ),

  // @saeon/logger
  '@saeon/logger': path.resolve(
    ROOT,
    mode === 'production' ? './node_modules/@saeon/logger' : '../packages/logger'
  ),
})
