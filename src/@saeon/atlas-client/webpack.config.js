const Dotenv = require('dotenv-webpack')
require('dotenv').config()
module.exports = require('../../../webpack.config')({plugins: [new Dotenv()]})