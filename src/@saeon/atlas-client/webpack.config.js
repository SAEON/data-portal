const Dotenv = require('dotenv-webpack')
require('dotenv').config()
module.exports = require('../../../webpack.config')({
    pluginsCb: (plugins, mode) => [...plugins, new Dotenv()]
})