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
            NODE_ENV === 'development' ? '../../packages/logger' : './node_modules/@saeon/logger'
          ),
          '@saeon/catalogue-search': path.join(
            __dirname,
            NODE_ENV === 'development'
              ? '../../packages/catalogue-search'
              : './node_modules/@saeon/catalogue-search/dist/catalogue'
          ),
        },
      },
    ],
  ],
}
