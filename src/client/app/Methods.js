/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description Methods.js - Contiene métodos para realizar peticiones.
 */

import fetchErrorHandler from "./fetchErrorHandler";
import Auth from "@app/Auth";
import { JsonConverter } from "@app/Helpers";

/**
 * Verifica si los datos son json o un formulario.
 * @param {*} data Datos.
 * @returns {Boolean}
 */
function isJson(data) {
	if (data instanceof URLSearchParams || data instanceof FormData) {
		return false;
	}
	return true;
}

/**
 * Genera los headers para realizar la petición
 */
const setHeaders = () => ({
	Accept: "*",
	"Content-Type": "application/json",
});

/**
 * Realiza peticiones de tipo get.
 * @param {String|URL} url Endpoint.
 * @param {{}} options Opciones de la petición.
 * @returns
 */
export const getData = (url, options = {}) =>
	fetch(url, {
		headers: setHeaders(),
		method: "GET",
		...options,
	})
		.then(fetchErrorHandler)

		.then((response) =>
			typeof response.json === "function" ? response.json() : response
		)
		.then((json) =>
			!json.error
				? Promise.resolve(json)
				: Promise.reject(json || "No data received.")
		);

/**
 * Realiza peticiones usando métodos POST/PUT
 * @param {String|URL} url La url del objeto a solicitar
 * @param {{}} data Los datos a enviar del tipo clave:valor
 * @param {String} method El tipo de método a usar, default: POST
 */
export const sendData = (url, data, method = "POST", headers = {}) => {
	const session = Auth.userData();
	const systemUser = session.systemUser || false;
	const options = {
		method: method,
		headers: headers,
		mode: "cors",
		cache: "default",
		body: data,
	};

	headers = Object.assign(
		{},
		{ "system-user": systemUser },
		setHeaders(),
		headers
	);

	if (isJson(data)) {
		if (data) {
			data = JsonConverter(data);
		}
	} else {
		delete headers["Content-Type"];
	}

	if (method == "PUT") {
		options.redirect = "follow";
	}

	return fetch(url, options)
		.then((response) =>
			typeof response.json === "function" ? response.json() : response
		)
		.then((json) =>
			!json.error
				? Promise.resolve(json)
				: Promise.reject(json || "No data received.")
		);
};
