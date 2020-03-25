const path = require('path')

module.exports = require('../../../webpack.config')({
  pluginsCb: (plugins, mode) => (mode === 'production' ? [] : plugins),
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
