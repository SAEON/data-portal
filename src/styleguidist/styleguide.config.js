const { version } = require('../../package.json')

module.exports = {
  title: 'SAEON Atlas Docs',
  version,
  webpackConfig: require('../../webpack.config.js'),
  components: '../@saeon/atlas-client/src/components/**/*.jsx',
  ignore: ['**/src/test.js', '**/*.css'],
  template:{
    favicon: './src/styleguidist/styleguide/favicon.ico'
  },


  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward',
            },
          },
        },
        {
          test: /\.*css$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                fallback: 'file-loader',
                name: '[name][md5:hash].[ext]',
                outputPath: 'assets/',
                publicPath: '/assets/',
              },
            },
          ],
        },
      ],
    },
  },
}
