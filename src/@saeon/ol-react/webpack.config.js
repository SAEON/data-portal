const path = require('path')

module.exports = require('../../../webpack.config')({
    pluginsCb: (plugins, mode) => mode === 'production' ? [] : plugins,
  outputCb: ({ mode, output }) =>
    mode === 'production'
      ? {
          filename: 'index.js',
          libraryTarget: 'commonjs',
          path: path.join(__dirname, output)
        }
      : {
          filename: 'index.js'
        },
  resolveCb: mode =>
    mode === 'production'
      ? {
          alias: {
            react: path.resolve('./node_modules/react'),
            'react-dom': path.resolve('./node_modules/react-dom')
          }
        }
      : {},
  externalsCb: mode =>
    mode === 'production'
      ? {
          react: 'react',
          'react-dom': 'react-dom',
          'react-md': 'react-md'
        }
      : {}
})
