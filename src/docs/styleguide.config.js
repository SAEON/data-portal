const { version } = require('../../package.json')

module.exports = {
  title: 'SAEON Atlas Docs',
  version,
  webpackConfig: require('./webpack.config.js'),
  components: '../@saeon/atlas-client/src/components/**/*.jsx',
  ignore: ['**/src/test.js', '**/*.css'],
  template: {
    favicon: './src/styleguidist/styleguide/favicon.ico',
  },
}
