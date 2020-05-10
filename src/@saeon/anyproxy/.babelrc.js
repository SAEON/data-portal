const path = require('path')

const { NODE_ENV } = process.env

module.exports = {
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['.'],
        alias: {
          '@saeon/logger': path.join(
            __dirname,
            NODE_ENV === 'development' ? '../logger' : './node_modules/@saeon/logger'
          ),
        },
      },
    ],
  ],
}
