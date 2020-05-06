const path = require('path')

const { NODE_ENV } = process.env

module.exports = {
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['.'],
        alias: {
          '@saeon/catalogue-search': path.join(
            __dirname,
            NODE_ENV === 'development' ? '../catalogue-search' : '../catalogue-search' // TODO - package needs to be exported for node as well
          ),
        },
      },
    ],
  ],
}
