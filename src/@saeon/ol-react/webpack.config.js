const path = require('path')

module.exports = require(path.resolve(__dirname, '../../../webpack.config'))({
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
          alias: {
            react: path.resolve(__dirname, '../../../node_modules/react'),
          },
        }
      : {},
  externalsCb: (mode) =>
    mode === 'production'
      ? {
          react: 'react'
        }
      : {},
})
