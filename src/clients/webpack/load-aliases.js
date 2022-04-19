const path = require('path')

module.exports = (ROOT, mode) => ({
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
  '@mui/material': path.resolve(ROOT, './node_modules/@mui/material'),
  '@mui/icons-material': path.resolve(ROOT, './node_modules/@mui/icons-material'),

  // React
  react: path.resolve(ROOT, './node_modules/react'),
  'react-dom': path.resolve(ROOT, './node_modules/react-dom'),

  // @saeon/logger
  '@saeon/logger': path.resolve(
    ROOT,
    mode === 'production' ? './node_modules/@saeon/logger' : '../packages/logger'
  )
})
