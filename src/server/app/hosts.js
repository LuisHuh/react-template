/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description HOSTS FILE
 */

// Imports
const { SERVER_PORT, ROOT_FOLDER, ROOT_API } = require("../../../config/global");

// Concatena los parametros pasados
const formatt = (...url) =>
	typeof url.join === "function" ? url.join("/") : url;

/* * * * * * * * *
 * Hosts Address *
 * * * * * * * * */
const $HOSTS = {
	dev: {
		env: "development",
		yourAPI: (...d) => formatt("http://your-api-url.local", ...d),
	},
	qa: {
		env: "quality",
		yourAPI: (...d) => formatt("http://your-api-url.local", ...d),
	},
	pro: {
		env: "production",
		yourAPI: (...d) => formatt("http://your-api-url.local", ...d),
	},
};

/* * * * * * * * *
 * Hosts Context *
 * * * * * * * * */
const _HOSTS = (context = "dev") => {
	const apiLocal = (...d) =>
		formatt(`http://localhost:${SERVER_PORT}${ROOT_FOLDER}${ROOT_API}`, ...d);
	const hosts = { apiLocal, ...$HOSTS[context] };
	return hosts;
};

/* * * * * * * * * * * *
 * Export Module HOSTS *
 * * * * * * * * * * * */
module.exports = _HOSTS;
