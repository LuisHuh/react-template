/**
 * Webpack
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description Archivo de configuración base para webpack.
 */

//Imports statements
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtract = require("mini-css-extract-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");
const { ROOT_FOLDER } = require("./global");

/**
 * Regresa la ruta relativa de algo
 * @param  {Array<string>} paths directorio
 */
const resolvePaths = (...paths) => path.resolve(__dirname, "..", ...paths);

/**
 * Carpetas de la aplicación
 */
const folder = {
	/**
	 * Carpeta de configuración.
	 * @param {Array<string>} args carpetas separadas por comas
	 */
	config: (...args) => resolvePaths("config", ...args),

	/**
	 * Carpeta estática de la raíz.
	 * @param {Array<string>} args carpetas separadas por comas
	 */
	staticRoot: (...args) => path.join(".", ...args),

	/**
	 * Carpeta base del proyecto.
	 * @param {Array<string>} args carpetas separadas por comas.
	 */
	base: (...args) => folder.staticRoot(ROOT_FOLDER, ...args),

	/**
	 * Carpeta relativa para montar la aplicación.
	 * @param {Array<string>} args carpetas separadas por comas
	 */
	dist: (...args) => resolvePaths("dist", ...args),

	/**
	 * Carpeta publica estática.
	 * @param {Array<string>} args carpetas separadas por comas.
	 */
	staticPublic: (...args) => folder.staticRoot("public", ...args),

	/**
	 * Carpeta publica relativa.
	 * @param {Array<string>} args carpetas separadas por comas.
	 */
	public: (...args) => resolvePaths("public", ...args),

	/**
	 * Carpeta principal relativa de la aplicación.
	 * @param {Array<string>} args carpetas separadas por comas.
	 */
	src: (...args) => resolvePaths("src", ...args),

	/**
	 * Carpeta relativa donde esta montado el cliente.
	 * @param {Array<string>} args carpetas separadas por comas.
	 */
	client: (...args) => folder.src("client", ...args),

	/**
	 * Carpeta relativa donde esta montado el servidor.
	 * @param {Array<string>} args carpetas separadas por comas.
	 */
	server: (...args) => folder.src("server", ...args),

	/**
	 * Carpeta relativa donde están los Service Workers.
	 * @param {Array<string>} args carpetas separadas por comas.
	 */
	services: (...args) => folder.src("services", ...args),

	/**
	 * Carpeta que contiene el código principal.
	 * @param {Array<string>} args carpetas separadas por comas.
	 */
	app: (...args) => folder.client("app", ...args),

	/**
	 * Carpeta que contiene los componentes.
	 * @param {Array<string>} args carpetas separadas por comas.
	 */
	components: (...args) => folder.client("components", ...args),

	/**
	 * Carpeta que contiene los recursos de la aplicación como:
	 * Imagenes, iconos, fuentes, estilos, licencias, etc.
	 * @param {Array<string>} args carpetas separadas por comas.
	 */
	docs: (...args) => folder.client("docs", ...args),

	/**
	 * Carpeta que contiene las plantillas.
	 * @param {Array<string>} args carpetas separadas por comas.
	 */
	templates: (...args) => folder.client("templates", ...args),

	/**
	 * Carpeta que contiene las vistas.
	 * @param {Array<string>} args carpetas separadas por comas.
	 */
	views: (...args) => folder.client("views", ...args),
};

/**
 * Archivos necesarios para montar la aplicación.
 */
const resource = {
	/**
	 * Archivo que contiene el código de react principal.
	 */
	entry: folder.client("index.js"),

	/**
	 * Archivo donde se insertara el código de react.
	 */
	inputIndex: folder.public("index.html"),

	/**
	 * Nombre del archivo final.
	 */
	outputFile: "index.html",

	/**
	 * Icono de la aplicación.
	 */
	favicon: folder.public("favicon.ico"),

	/**
	 * Archivo json manifest.
	 */
	manifest: folder.public("manifest.json"),
};

//Global Config
function webpackConfigGenerator(env) {
	const devMode = env.mode === "dev";

	return {
		resolve: {
			alias: {
				"@app": folder.app(),
				"@components": folder.components(),
				"@docs": folder.docs(),
				"@templates": folder.templates(),
				"@views": folder.views(),
				"@config": folder.config(),
			},
		},
		entry: {
			app: ["@babel/polyfill", resource.entry],
		},
		output: {
			path: folder.dist(),
			filename: `${folder.base()}/[chunkhash][name].js`,
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)/,
					exclude: /(node_modules|dist)/,
					use: ["babel-loader"],
				},
				{
					test: /\.(css|sass|scss)/,
					exclude: /(node_modules|dist)/,
					use: [
						{
							loader: MiniCSSExtract.loader,
							options: {
								hmr: devMode,
								publicPath: (resourcePath, context) => {
									return (
										path.relative(
											path.dirname(resourcePath),
											context
										) + "/"
									);
								},
							},
						},
						{
							loader: "css-loader",
							options: {
								sourceMap: devMode,
							},
						},
						{
							loader: "postcss-loader",
							options: {
								sourceMap: devMode,
							},
						},
						{
							loader: "sass-loader",
							options: {
								sourceMap: devMode,
							},
						},
					],
				},
				{
					test: /\.(pdf|jpeg|jpg|jpf|png|gif|ico|cur|woff|woff2|eot|otf|ttf)$/,
					use: [
						{
							loader: `file-loader?name=${folder.base()}/[name][hash].[ext]`,
						},
					],
				},
				{
					test: /\.svg$/,
					use: [
						"@svgr/webpack",
						{
							loader: `file-loader?name=${folder.base()}/[name][hash].[ext]`,
						},
					],
				},
			],
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HTMLWebpackPlugin({
				filename: resource.outputFile,
				template: resource.inputIndex,
			}),
			new MiniCSSExtract({
				filename: `${folder.base()}/${
					devMode ? "[name].css" : "[name].[hash].css"
				}`,
				chunkFilename: `${folder.base()}/${
					devMode ? "[id].css" : "[id].[hash].css"
				}`,
			}),
			new InterpolateHtmlPlugin({
				PUBLIC_URL: folder.staticPublic(),
				ROOT: folder.base(),
			}),
			new CopyPlugin({
				patterns: [
					{ from: resource.favicon, to: folder.base() },
					{ from: resource.manifest, to: folder.base() },
				],
			}),
			new ServiceWorkerWebpackPlugin({
				entry: folder.services("serviceWorker.js"),
				publicPath: folder.base(),
			}),
		],
	};
}

// Export module
module.exports = webpackConfigGenerator;
