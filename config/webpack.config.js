/**
 * Webpack
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description Archivo de configuración principal para webpack.
 */

// Import Statements
const merge = require('webpack-merge');
const baseConfigGenerator = require('./webpack.config.base.js');
const prodConfig = require('./webpack.config.prod.js');
const devConfig = require('./webpack.config.dev.js');

// Environment Selector
function webpackEnvironmentSelector(env) {
   let config;

   if (env.mode === "dev") {
      config = devConfig;
   }else{
      config = prodConfig;
   }

   const baseConfig = baseConfigGenerator(env);
   
   return merge(baseConfig, config);
}

// Export module
module.exports = webpackEnvironmentSelector;