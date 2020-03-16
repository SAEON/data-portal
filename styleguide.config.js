const {version} = require('./package.json');

module.exports = {
	title: 'some sample title',
	version,
	webpackConfig: require('./webpack.config.js'),
	components: './src/@saeon/atlas-client/src/components/*.jsx',
//   components: 'src/components/[A-Z]**/*.js',
  	ignore:["**/src/test.js","**/*.css"],
  	require:['./src/styles/index.scss'],
	  
	webpackConfig:{
		module:{
			rules: [
				{
				  test: /\.(js|jsx)$/,
				  exclude: /node_modules/,
				  use: {
					loader: 'babel-loader',
					options: {
					  rootMode: 'upward'
					}
				  }
				},
				{
				  test: /\.*css$/,
				  use: ['style-loader', 'css-loader', 'sass-loader']
				},
				{
				  test: /\.(woff|woff2|eot|ttf)$/,
				  use: [
					{
					  loader: 'file-loader'
					}
				  ]
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
						publicPath: '/assets/'
					  }
					}
				  ]
				}
			]
		}
  	}	
};