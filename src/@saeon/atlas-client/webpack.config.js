const Dotenv = require('dotenv-webpack')
const path = require('path')
require('dotenv').config()

module.exports = require('../../../webpack.config')({
  pluginsCb: (plugins) => [...plugins, new Dotenv()],
  resolveCb: () => ({
    alias: {
      '@saeon/ol-react': path.resolve(__dirname, '../ol-react/src/index'),
      '@saeon/catalogue-search': path.resolve(__dirname, '../catalogue-search/src/index'),
    },
  }),
})
