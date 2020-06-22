'use strict'
const path = require('path')

module.exports = {
  verbose: true,
  setupFiles: [path.resolve(__dirname, 'tests/config/jest/jest-fetch-config.js')],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': path.resolve(__dirname, 'tests/config/jest/jest-babel-config.js'),
  },
  testMatch: ['**/tests/**/*test.js?(x)'],
}
