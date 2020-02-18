const Dotenv = require('dotenv-webpack')
require('dotenv').config()
module.exports = require('../../../webpack.config')({
  pluginsCb: plugins => [...plugins, new Dotenv()],
  resolveCb: () => ({
    alias: {
      '@saeon/ol-react': '../../../../ol-react/index'
    }
  })
})
