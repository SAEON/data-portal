const path = require('path')

module.exports = {
  verbose: true,
  setupFiles: [path.resolve(__dirname, './jest-fetch-config.js')],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': path.resolve(__dirname, './jest-babel-config.js'),
  },
  testMatch: ['**/__tests__/**/*.js?(x)'],
}
