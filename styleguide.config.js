const {version} = require('./package.json');
module.exports = {
	title: 'some sample title',
	version,
	components: './src/@saeon/atlas-client/src/components/*.jsx',
//   components: 'src/components/[A-Z]**/*.js',//index.js
  ignore:["**/src/test.js","**/*.css"],
  require:['./src/styles/index.scss'],
  webpackConfig:{
	module:{
		rules: 
		[
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},	
			{
				test: /\.scss$/,
				use: ['style-loader','css-loader']
			}
		]
	}
  }	
};