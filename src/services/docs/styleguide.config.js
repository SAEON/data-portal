const { version } = require('./package.json')

module.exports = {
  title: 'SAEON Catalogue Docs',
  version,
  webpackConfig: require('./webpack.config.js'),
  components: '../@saeon/client/src/components/**/*.jsx',
  ignore: ['**/src/test.js', '**/*.css'],
  template: {
    favicon: 'src/styleguidist/styleguide/favicon.ico',
  },
}
