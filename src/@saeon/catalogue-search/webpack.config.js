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
          libraryTarget: 'commonjs2',
          path: output,
        }
      : {
          filename: 'index.js',
        },

  externalsCb: (mode) =>
    mode === 'production'
      ? {
          react: 'react',
        }
      : {},
})
