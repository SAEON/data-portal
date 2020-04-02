const Dotenv = require('dotenv-webpack')
const path = require('path')
require('dotenv').config()

module.exports = require('../../../webpack.config')({
  pluginsCb: (plugins) => [...plugins, new Dotenv()],
  resolveCb: (mode) => ({
    alias: {
      '@saeon/ol-react': path.resolve(
        __dirname,
        mode === 'production' ? '../../../node_modules/@saeon/ol-react' : '../ol-react/src/index'
      ),
      '@saeon/catalogue-search': path.resolve(
        __dirname,
        mode === 'production'
          ?'../catalogue-search/src/index'
          : '../catalogue-search/src/index'
      ),
    },
  }),
})
