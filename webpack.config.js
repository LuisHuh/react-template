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
      path: path.resolve('dist'),
      filename: 'bundle.js'
   },
   module: {
      rules: [{
            test: /.jsx$/,
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
            test: /\.svg$/,
            loader: 'svg-inline-loader'
         }
      ]
   },
   resolve: {
      extensions: ['*', '.js', '.jsx', '.json', '.svg', '.css']
   },
   plugins: [HtmlWebpackPluginConfig]
};

module.exports = config;