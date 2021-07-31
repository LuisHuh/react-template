/**
 * Webpack
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description Archivo de configuración de desarrollo para webpack.
 */
const { ROOT_FOLDER, ROOT_API, SERVER_PORT, CLIENT_PORT } = require("./global");

const API = `${ROOT_FOLDER}${ROOT_API}`;

// Development Config Mode
const webpackConfig = {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		port: CLIENT_PORT,
		/* open: 'Google Chrome', */
		host: "0.0.0.0",
		disableHostCheck: true,
		proxy: {
			[API]: `http://localhost:${SERVER_PORT}`,
		},
		historyApiFallback: true,
		stats: 'minimal'
	},
};

// Export module
module.exports = webpackConfig;
