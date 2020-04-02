const path = require('path')

module.exports = require('../../../webpack.config')({
  pluginsCb: (plugins) => plugins,
  resolveCb: (mode) => mode === 'production' ? {} :{
    alias: {
      '@saeon/ol-react': path.resolve(
        __dirname, '../ol-react/src/index'
      ),
      '@saeon/catalogue-search': path.resolve(
        __dirname, '../catalogue-search/src/index'
      ),
    },
  },
})