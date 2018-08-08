const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './public/index.html',
	filename: 'index.html',
	inject: 'body'
});

const config = {
	mode: 'development',
	entry: './src/index.jsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [{
				test: /.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				use: [{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					}
				]
			},
			{
				test: /\.(png|svg|jpg|gif|ico)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			}
		]
	},
	devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      historyApiFallback: true
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.json', '.svg', '.css']
	},
	plugins: [HtmlWebpackPluginConfig]
};

module.exports = config;