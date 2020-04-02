const path = require('path')

module.exports = require(path.resolve(__dirname, '../../../webpack.config'))({
  pluginsCb: (plugins, mode) => (mode === 'production' ? [] : plugins),
  targetCb: ({mode}) => 'web',
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
