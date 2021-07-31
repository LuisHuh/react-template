/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description REQUEST METHOD FILE
 */
"use strict";

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const http = require("http");
const https = require("https");
const axios = require("axios");
const ResponseFormatter = require("../libraries/ResponseFormatter");
const RequestException = require("../libraries/ThrowExceptions");

class RequestMethod {
	/**
	 * Crea un nueva peticion
	 * @param {URL} url Url de la API
	 * @param {Array} data Datos a enviar a la API
	 * @param {string} method Tipo de peticion
	 * @param {Headers} headers
	 */
	constructor(url, data, method, headers) {
		this.url = url;
		this.data = data;
		this.method = method;
		this.headers = headers;
	}

	/**
	 * Codigos HTTP exitosos
	 */
	get SUCCESSFUL_HTTP_CODES() {
		return [200, 201, 202, 203, 204, 205, 206, 207, 208, 226];
	}

	/**
	 * Establece la url de la API
	 * @param {string} url Url de la API real
	 */
	set url(url = "") {
		this._url = url;
	}

	/**
	 * @returns {URL} url
	 */
	get url() {
		return this._url;
	}

	/**
	 * Establece los datos a enviar a las APIs
	 * @param {Array} data Datos
	 */
	set data(data) {
		this._data = data || {};
	}

	/**
	 * @returns {Array} Datos
	 */
	get data() {
		return this._data;
	}

	/**
	 * Establece el tipo de peticion a realizar
	 * @param {string} method GET | POST | PUT (default GET)
	 */
	set method(method) {
		this._method = method || "GET";
	}

	/**
	 * @returns {string} Metodo
	 */
	get method() {
		return this._method;
	}

	/**
	 * Establece los encabezados a enviar a la API
	 * @param {Headers} headers Encabezados
	 */
	set headers(headers) {
		this._headers = headers || {};
	}

	/**
	 * @returns {Headers} Encabezados
	 */
	get headers() {
		return this._headers;
	}

	/**
	 * Devuelve la configuracion por defecto de axios
	 */
	get config() {
		return {
			url: this.url,
			method: this.method,
			transformResponse: [
				(data, headers) => this.transformResponse(headers, data),
			],
			headers: this.headers,
			data: this.data,
		};
	}

	/**
	 * Devuelve la configuracion de encabezados por defecto para archivos
	 */
	get fileConfig() {
		const headers = {
			"Response-Type": "stream",
			"Content-Type": "stream",
			Accept: "stream",
		};

		return {
			headers: Object.assign({}, headers, this.headers),
		};
	}

	/**
	 * Devuelve un respuesta correcta al controlador en caso que falle la peticion por error de la API
	 */
	get successResponse() {
		const response = new ResponseFormatter("Success", 200, false);
		return response.get();
	}

	/**
	 * Valida si la respuesta obtenida del la API es correcta.
	 * @param {Response} response Respuesta de la API
	 * @returns {boolean} error
	 */
	hasErrorRequest(response) {
		return this.SUCCESSFUL_HTTP_CODES.indexOf(response.statusCode) < 0;
	}

	/**
	 * Funcion que convierte un json de tipo string a formato json real
	 * @param {Headers} headers Encabezados de la respuesta
	 * @param {string} data Valores a convertir
	 * @param {boolean} toString Establece el formato a convertir
	 * @returns {Array|string} json format
	 */
	jsonParse(data, toString = false) {
		let json = !toString ? {} : "";
		try {
			json = JSON[!toString ? "parse" : "stringify"](data);
		} catch (e) {}

		return json;
	}

	/**
	 * Tranforma la respuesta de la API a formato JSON
	 * @param {Headers} headers Encabezados
	 * @param {string} data Datos
	 */
	transformResponse(headers, data) {
		let response = this.responseType(headers);
		if (response.type !== "pdf") {
			return this.jsonParse(data);
		} else {
			return data;
		}
	}

	/**
	 * Devuelve el tipo de respuesta devuelta por la API
	 * @param {Headers} headers Encabezados de respuesta
	 */
	responseType(headers) {
		if (!headers) return {};
		let type = headers["content-type"] || "";
		type = type.split(";");
		type = type[0].trim();
		type = type.split("/");

		if (type.length < 2) return {};
		return {
			content: type[0],
			type: type[1],
		};
	}

	/**
	 * Devuelve la respuesta de la API buscando el **data**
	 * @param {Response} response Respuesta de la API
	 * @returns {Array} Respuesta
	 */
	apiResponse(response) {
		const code = response.status;
		const type = this.responseType(response.headers);
		if (response.hasOwnProperty("data")) {
			if (typeof response.data === "string") {
				response = { data: response.data };
			} else {
				if (Object.keys(response.data).length == 0) {
					response = { message: response.statusText };
				} else {
					response = response.data;
				}
			}
		}

		response["content"] = type.content;
		response["type"] = type.type;
		response["code"] = code;
		return response;
	}

	/**
	 * Devuelve el mensage de error que la API le regresa
	 * @param {Response} response Respuesta de la API
	 * @returns {string} Mensaje
	 */
	errorMessage(response) {
		if (
			response.hasOwnProperty("data") &&
			response.data.hasOwnProperty("message")
		) {
			return response.data.message;
		}

		const msg = response.message || response.messages || response.status;
		if (msg) {
			return msg;
		}

		if (response.data && typeof response.data === "string") {
			return response.data;
		}

		return "Unknow error";
	}

	/**
	 * Regresa los mensajes de error
	 * @param {Error} e Respuesta de error
	 */
	handleError(e) {
		let [code, clientMsg, message] = "";
		if (e.response) {
			const data = this.apiResponse(e.response);
			let eMsg = this.errorMessage(data);

			code = data.code;
			clientMsg = eMsg;
			eMsg = Array.isArray(eMsg) ? this.jsonParse(eMsg, true) : eMsg;
			message = `${eMsg} at ${this.url}`;
		} else {
			code = 500;
			clientMsg = "Internal Server Error";
			message = `${e.message} at ${this.url}`;
		}

		return { code, clientMsg, message };
	}

	/**
	 * Hace la peticion a la API
	 * @returns {Promise<Response>} Response
	 */
	async sendRequest() {
		try {
			let response = await axios(this.config);
			return this.apiResponse(response);
		} catch (e) {
			if (e.code === "HPE_INVALID_CONSTANT") return this.successResponse;
			e = this.handleError(e);
			throw new RequestException(e.code, e.clientMsg, e.message);
		}
	}

	/**
	 * Hace una peticion para obtener algun archivo
	 * @returns {Promise<Response>} Response
	 */
	fileRequest() {
		return new Promise((resolve, reject) => {
			this.url = new URL(this.url);
			const protocol = this.url.protocol === "http:" ? http : https;
			protocol
				.get(this.url, this.fileConfig, (file) => {
					if (this.hasErrorRequest(file)) {
						const err = new RequestException(
							file.statusCode,
							file.statusMessage,
							`${file.statusMessage} at ${this.url}`
						);
						return reject(err);
					}

					const buffer = [];
					file.on("data", (chunk) => {
						buffer.push(chunk);
					});

					file.on("end", () => {
						const data = Buffer.concat(buffer);
						return resolve(data);
					});
				})
				.on("error", (e) => {
					e = this.handleError(e);
					new RequestException(e.code, e.clientMsg, e.message);
					return reject(e);
				})
				.end();
		});
	}
}

/**
 * Crea un cliente para realizar una peticion
 * @param {URL} url Url de la API
 * @param {Array} data Datos a enviar a la API
 * @param {string} method Tipo de peticion
 * @param {Headers} headers
 * @returns {Promise<Response>} Response
 */
function RequestClient(url, data, method, headers) {
	return new RequestMethod(url, data, method, headers).sendRequest();
}

/**
 * Crea un cliente para realizar una peticion de algun archivo
 * @param {URL} url Endpoint de la API
 * @param {Headers} headers Encabezados
 * @returns {Promise<Response>} Response
 */
function FileRequest(url, headers) {
	return new RequestMethod(url, {}, "", headers).fileRequest();
}
/* * * * * * * * *
 * Export Module *
 * * * * * * * * */
module.exports.RequestClient = RequestClient;
module.exports.FileRequest = FileRequest;
