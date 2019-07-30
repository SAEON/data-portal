const path = require('path')

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.*css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            fallback: "file-loader",
            name: "[name][md5:hash].[ext]",
            outputPath: 'assets/',
            publicPath: '/assets/'
          }
        }]
      }            
    ]
  }
}