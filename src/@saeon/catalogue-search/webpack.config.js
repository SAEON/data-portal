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
          alias: {
            react: path.resolve('./node_modules/react'),
            'react-dom': path.resolve('./node_modules/react-dom'),
          },
        }
      : {},
  externalsCb: (mode) =>
    mode === 'production'
      ? {
          react: 'react',
          'react-dom': 'react-dom',
        }
      : {},
})
