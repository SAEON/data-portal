const webpack = require('webpack')

module.exports = require('../../../webpack.config')({
  pluginsCb: (plugins, mode) =>
    mode === 'production'
      ? []
      : [
          ...plugins,
          new webpack.ProvidePlugin({
            fetch: 'imports?this=>global!exports?global.fetch!node-fetch',
          }),
        ],
  outputCb: ({ mode, output }) =>
    mode === 'production'
      ? {
          filename: 'index.js',
          libraryTarget: 'commonjs',
          path: output,
        }
      : {
          filename: 'index.js',
        },
  resolveCb: (mode) =>
    mode === 'production'
      ? {
          alias: {},
        }
      : {},
  externalsCb: (mode) => (mode === 'production' ? {} : {}),
})
