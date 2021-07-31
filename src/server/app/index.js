/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description APP KERNEL FILE
 */
"use strict";

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const fs = require("fs");
const IncomingForm = require("formidable").IncomingForm;
const { RequestClient, FileRequest } = require("./RequestMethod");
const { AUTH_USERNAME, AUTH_PASSWORD, ENV } = require("../../../config/global");
const ControllerException = require("../libraries/ThrowExceptions");
const ResponseFormatter = require("../libraries/ResponseFormatter");
const {
	serializeData,
	serializeObject,
	localTime,
    argsParse
} = require("../libraries/Helpers");

class App {
	/**
	 * Controlador base para hacer peticiones a APIs
	 * @param {Request} req Petición del cliente
	 * @param {Response} res Respuesta del servidor
	 * @param {Function} next Callback para pasar al siguiente middleware
	 */
	constructor(req, res, next) {
		this.request = req;
		this.response = res;
		this.next = next;
		this.headers = {};
		this.json = true;
		this.method = "GET";
	}

	/**
	 * Define el nombre del proyecto en curso
	 */
	get project() {
		return "clv-service-web";
	}

	/**
	 * Establece el request del cliente
	 * @param {Request} req Request del usuario
	 */
	set request(req) {
		return (this._req = req);
	}

	/**
	 * @returns {Request} req
	 */
	get request() {
		return this._req;
	}

	/**
	 * Establece la respuesta para el cliente
	 * @param {Response} res Respuesta para el cliente
	 */
	set response(res) {
		return (this._res = res);
	}

	/**
	 * @returns {Response} res
	 */
	get response() {
		return this._res;
	}

	/**
	 * Establece la funcion callback para pasar al siguiente middleware
	 * @param {Funcion} next
	 */
	set next(next) {
		return (this._next = next);
	}

	/**
	 * @returns {Function} next
	 */
	get next() {
		return this._next;
	}

	/**
	 * Obtiene y establece variables locales de los middlewares
	 * @param {Array} params Valores
	 */
	set localParams(params) {
		this.response.locals = params;
	}

	/**
	 * @returns {Array} valores
	 */
	get localParams() {
		return this.response.locals;
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
	 * Establece el tipo de solicitud a realizar
	 * @param {string} method GET | POST | PUT | DELETE
	 */
	set method(method) {
		this._method = method;
	}

	/**
	 * @returns {string} GET | POST | PUT | DELETE
	 */
	get method() {
		return this._method;
	}

	/**
	 * Establece los encabezados personalizados a pasar a la API
	 * @param {Headers} headers Encabezados
	 */
	set headers(headers) {
		this._headers = headers;
	}

	/**
	 * @returns {Headers} Encabezados
	 */
	get headers() {
		return this._headers;
	}

	/**
	 * Establece los datos que envia el cliente a tráves de formularios
	 * @param {Array} data Datos del cliente
	 */
	set data(data) {
		this._data = data || {};
	}

	/**
	 * @returns {Array} Datos de formulario
	 */
	get data() {
		return this._data;
	}

	/**
	 * Establece la lista de campos que no se envian al cliente
	 * @param {Array} list Lista de campos
	 */
	set listIgnore(list) {
		this._listIgnore = list;
	}

	/**
	 * @returns {Array} Lista
	 */
	get listIgnore() {
		return this._listIgnore;
	}

	/**
	 * Establece un token
	 * @param {string} token
	 */
	set token(token) {
		this._token = token;
	}

	/**
	 * @returns {string} token
	 */
	get token() {
		return this._token;
	}

	/**
	 * Establece el tipo de autenticacion que requiere la API
	 * @param {string} authorization Tipo de autenticacion
	 */
	set authorization(authorization) {
		this.headers["authorization"] = authorization;
	}

	/**
	 * @returns {string} Tipo de autenticacion
	 */
	get authorization() {
		return this.headers["authorization"];
	}

	/**
	 * Establece el tipo de datos que se envia a tráves de las APIs
	 * @param {boolean} bool
	 */
	set json(bool) {
		this.headers["json"] = bool;
	}

	get json() {
		return this.headers["json"];
	}

	/**
	 * Devuelve los paramtros recibidos de la URL
	 * @return {Array} Parametros
	 */
	get jsonRawParams() {
		return this.request.params;
	}

	/**
	 * Modifica la respuesta del body
	 * @param {any} data Datos a setear.
	 */
	set jsonRawBody(data) {
		this._jsonRawBody = data;
	}

	/**
	 * Devuelve los campos recibidos del cliente, en caso de ser valores por un *FormData*
	 * devuelve una promesa con los valores
	 * @return {Array|Promise} Parametros
	 */
	get jsonRawBody() {
		if (this.isFormData()) {
			return this.getFormData();
		}
		return this._jsonRawBody || this.request.body;
	}

	/**
	 * Devuelve los encabezados de la peticion del cliente
	 * @returns {Headers} Encabezados
	 */
	get jsonRawHeaders() {
		return this.request.headers;
	}

	/**
	 * Devuelve el token que recibe del middleware de autenticacion del sistema
	 */
	get tokenMiddleware() {
		const token = this.localParams.authorization;
		return token ? `Bearer ${token}` : "";
	}

	/**
	 * Devuelve el usuario por defecto del sistema
	 */
	get username() {
		const headers = this.jsonRawHeaders;

		if (headers["system-user"] && headers["system-user"] !== "false") {
			return headers["system-user"];
		}

		return AUTH_USERNAME;
	}

	/**
	 * Devuelve la contraseña por defecto del sistema
	 */
	get password() {
		return AUTH_PASSWORD;
	}

	/**
	 * Devuelve el ambiente por defecto del sistema
	 */
	get enviroment() {
		return ENV;
	}

	/**
	 * Devuelve la fecha actual del sistema
	 */
	get currentTime() {
		return localTime();
	}

	/**
	 * Devuelve los encabezados por defecto para las peticiones hacia las APIs
	 */
	get defaultHeaders() {
		return {
			authorization: this.tokenMiddleware,
			json: true,
		};
	}

	/**
	 * Devuelve los campos por defecto que se insertan en las peticiones POST
	 */
	get basicInfoPost() {
		return {
			estado: 1,
			usuario_creacion: this.username,
			fecha_creacion: localTime(),
			usuario_ultima_modificacion: this.username,
			fecha_ultima_modificacion: localTime(),
		};
	}

	/**
	 * Devuelve los campos por defecto que se insertan en las peticiones PUT
	 */
	get basicInfoUpdate() {
		return {
			estado: 1,
			usuario_ultima_modificacion: this.username,
			fecha_ultima_modificacion: localTime(),
		};
	}

	/**
	 * Devuelve los campos por defecto que se ocultan al cliente
	 */
	get defaultListIgnore() {
		return [
			"usuario_creacion",
			/* "fecha_creacion", */
			"usuario_ultima_modificacion",
			"fecha_ultima_modificacion",
		];
	}

	/**
	 * Valida si el tipo de dato mandado por el cliente es algun tipo de formulario
	 */
	isFormData() {
		const reqHeaders = this.jsonRawHeaders;
		if (reqHeaders["content-type"]) {
			if (reqHeaders["content-type"].match(/octet-stream/i)) {
				return true;
			} else if (reqHeaders["content-type"].match(/urlencoded/i)) {
				return true;
			} else if (reqHeaders["content-type"].match(/multipart/i)) {
				var m = reqHeaders["content-type"].match(
					/boundary=(?:"([^"]+)"|([^;]+))/i
				);

				if (m) {
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * Establece el tipo de token a enviar como credenciales
	 */
	setAuthorization() {
		if (typeof this.authorization === "boolean") {
			if (this.authorization === true) {
				this.authorization = this.tokenMiddleware;
			}
		} else {
			this.authorization = this.authorization || this.tokenMiddleware;
		}
	}

	/**
	 * Establece valores para intercambiar entre middleware
	 * @param {string} key Nombre del parametro
	 * @param {*} value Valor del parametro
	 */
	shareParams(key, value) {
		this.response.locals[key] = value;
	}

	/**
	 * Funcion que convierte un json de tipo string a formato json real
	 * @param {string} values Valores a convertir
	 * @param {boolean} toString Establece el formato a convertir
	 * @returns {Array|string} json format
	 */
	jsonParse(values, toString = false) {
		let json = !toString ? {} : "";
		try {
			json = JSON[!toString ? "parse" : "stringify"](values);
		} catch (e) {}

		return json;
	}

	/**
	 * Agrega al encabezado algun valor que se desee enviar a la API
	 * @param {string} key Nombre del parametro
	 * @param {*} value Valor del parametro
	 */
	append(key, value) {
		this.headers[key] = value;
	}

	/**
	 * Agrega un encabezado a la respuesta para el cliente
	 * @param {string} key Nombre del encabezado
	 * @param {string} value Valor del encabezado
	 */
	appendRes(key, value) {
		this.response.append(key, value);
	}

	/**
	 * Convierte un objeto a un arreglo con indice 0 y tamaño 1
	 * @param {Array} object
	 * @returns {Array} Arreglo
	 */
	toArray(object) {
		return [object];
	}

	/**
	 * Convierte un arreglo a un objeto tomando el primer indice
	 * @param {Array} array Datos
	 * @returns {Object} Objeto
	 */
	toObject(array) {
		return array[0];
	}

	/**
	 * Crea un path a partir de varios
	 * @param  {Array<string|number>} paths
	 * @returns {string} path
	 */
	path(...paths) {
		return paths.join("/");
	}

	/**
	 * Oculta los campos que no se debe mostrar al cliente
	 * @param {Array} data Objetos o arreglo de objetos
	 * @returns {Array} datos
	 */
	keyCleaner(data) {
		const isArray = Array.isArray(data);
		if (!isArray && typeof data === "string") return data;
		const tmp = [];

		data = !isArray ? this.toArray(data) : data;

		for (let i = 0; i < data.length; i++) {
			const object = data[i];
			for (const key in object) {
				if (object.hasOwnProperty(key)) {
					const listIgnore = this.listIgnore || this.defaultListIgnore;
					for (let j = 0; j < listIgnore.length; j++) {
						if (key === listIgnore[j]) {
							delete object[key];
						}
					}
				}
			}
			tmp.push(object);
		}

		return !isArray ? this.toObject(tmp) : tmp;
	}

	/**
	 * Devuelve los valores del FormData resividos del cliente
	 * @return {FormData|URLSearchParams|File}
	 */
	getFormData() {
		return new Promise((resolve, reject) => {
			var formData = new IncomingForm({ multiples: true });
			formData.parse(this.request, (err, fields, files) => {
				if (err) {
					return reject(err);
				}
				const temp = {};
				Object.keys(files).forEach((key) => {
					const file = files[key];
					if (!Array.isArray(file)) {
						temp[key] = fs.createReadStream(file.path);
					} else {
						temp[key] = [];
						for (let i = 0; i < file.length; i++) {
							const source = file[i];
							temp[key].push(fs.createReadStream(source.path));
						}
					}
				});
				return resolve({ ...fields, ...temp });
			});
		});
	}

	/**
	 * Renombra las lleves de los campos regresados por la API,
	 * evitando que el cliente vea las llaves reales
	 * @param {*} data Datos a renombrar
	 * @returns {*} Datos
	 */
	serializeData(data, dic) {
		const isArray = Array.isArray(data);
		if (!isArray && typeof data === "string") return data;
		return !isArray
			? serializeObject(data, false, dic)
			: serializeData(data, dic);
	}

	/**
	 * Envia la respuesta al cliente
	 * @param {ResponseFormatter} message Mensaje
	 * @param {boolean} transform Indica si la respuesta debe ser transformada al formato
	 */
	sendResponse(message, transform = true) {
		if (!transform) {
			return this.response.status(200).send(message);
		}
		return this.response.status(message.code).send(message.get());
	}

	/**
	 * Muestra en consola la petición que se realiza.
	 * @param {Boolean} isRequest Establece si es un request o una respuesta.
	 */
	setDebug(isRequest, response) {
        const nodeArgs = argsParse();
        if (nodeArgs["--debug-mode"] && !!nodeArgs["--debug-mode"]) {
            if (isRequest) {
                console.debug("");
                console.debug("SENDING REQUEST...");
                console.debug(`Api: ${this.url}`);
                console.debug(`Type: ${this.method}`);
                if (this.method !== "GET") {
                    console.debug("Request: ", this.data);
                }
            } else {
                console.debug("");
                console.debug(`Response for: ${this.url}`);
                console.debug(response);
            }
        }
	}

	/**
	 * Realiza la peticion a la API
	 * @param {(error: boolean, response: Array) => {}?} callback
	 * @returns {Promise<Response>|void} request
	 */
	sendRequest(callback) {
		const myRequest = RequestClient(
			this.url,
			this.data,
			this.method,
			this.headers
		);

		if (!callback) {
			return myRequest;
		}

        this.setDebug(true);
		return myRequest
			.then((res) => {
				this.setDebug(false, res);
				return callback(false, res);
			})
			.catch((e) => {
				this.setDebug(false, e);
				return callback(true, e);
			});
	}

	/**
	 * Hace una peticion de tipo GET
	 * @param {(error: boolean, response: Array) => {}?} callback
	 * @returns {Promise<Response>|void} request
	 */
	get(callback) {
		this.method = "GET";
		this.data = null;
		if (!callback) {
			return this.sendRequest();
		}

		return this.sendRequest(callback);
	}

	/**
	 * Hace una peticion de tipo post
	 * @param {(error: boolean, response: Array) => {}?} callback
	 * @returns {Promise<Response>|void} request
	 */
	post(callback) {
		this.method = "POST";
		if (!callback) {
			return this.sendRequest();
		}

		this.sendRequest(callback);
	}

	/**
	 * Hace una peticion de tipo put
	 * @param {(error: boolean, response: Array) => {}?} callback
	 * @returns {Promise<Response>|void} request
	 */
	put(callback) {
		this.method = "PUT";
		if (!callback) {
			return this.sendRequest();
		}

		this.sendRequest(callback);
	}

	/**
	 * Hace una peticion de tipo DELETE
	 * @param {(error: boolean, response: Array) => {}?} callback
	 * @returns {Promise<Response>|void} request
	 */
	delete(callback) {
		this.method = "DELETE";
		this.data = null;
		if (!callback) {
			return this.sendRequest();
		}

		this.sendRequest(callback);
	}

	/**
	 * Obtiene un recurso
	 * @returns {JSON} Datos
	 */
	getResource() {
		try {
			this.setAuthorization();
			this.get((error, response) => {
				if (error) {
					const message = new ResponseFormatter(
						response.clientMessage,
						response.code,
						true
					);
					return this.sendResponse(message);
				}

				this.data = this.keyCleaner(response.data || response);
				this.data = this.serializeData(this.data);
				const message = new ResponseFormatter().setData(this.data);
				return this.sendResponse(message);
			});
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	/**
	 * Obtiene un recurso
	 * @returns {JSON} Datos
	 */
	getResourceLink() {
		try {
			this.setAuthorization();
			this.get((error, response) => {
				if (error) {
					const message = new ResponseFormatter(
						response.clientMessage,
						response.code,
						true
					);
					return this.sendResponse(message);
				}

				this.data = this.keyCleaner(response);
				this.data = this.serializeData(this.data);
				const message = new ResponseFormatter().setData(this.data);
				return this.sendResponse(message);
			});
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	/**
	 * Obtiene un recurso por su id
	 * @param {number} id Id del recurso
	 * @returns {JSON} Datos
	 */
	getResourceId(id) {
		if (!id) {
			const e = new ControllerException(
				400,
				"Unable to send this request, id missing",
				"No se proporciono el id"
			);
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}

		this.url = this.path(this.url, id);
		this.getResource();
	}

	/**
	 * Inserta un nuevo recurso en la base de datos
	 * @returns {JSON} Datos
	 */
	createResource() {
		// validamos que sea un array de obj (caso family gif)
		if (Array.isArray(this.data)) {
			let newArray = [];
			for (let i = 0; i < this.data.length; i++) {
				newArray.push(Object.assign({}, this.basicInfoPost, this.data[i]));
			}
			this.data = newArray;
		} else {
			this.data = Object.assign({}, this.basicInfoPost, this.data);
		}
		// fin de la validacion
		this.setAuthorization();
		this.post((error, response) => {
			try {
				if (error)
					throw new ControllerException(
						response.code,
						"Unable to create this resource",
						response.message
					);

				this.data = this.keyCleaner(this.data);
				const { id, ...rest } = response.data || response || {};
				this.data = Object.assign({}, { postDataResp: rest }, this.data, {
					id,
				});
				const message = new ResponseFormatter(
					"Resource Created",
					200,
					false
				).setData(this.data);
				this.sendResponse(message);
			} catch (e) {
				const message = new ResponseFormatter(
					e.clientMessage,
					e.code,
					true
				);
				this.sendResponse(message);
			}
		});
	}

	/**
	 * Actualiza un recurso por su id
	 * @param {JSON} body Recibe un json con el id y los campos a actualizar del recurso
	 * @returns {JSON} Datos
	 */
	updateResource() {
		try {
			this.data = Object.assign({}, this.basicInfoUpdate, this.jsonRawBody);
			const id = this.data.id;
			this.setAuthorization();

			if (!id)
				throw new ControllerException(
					400,
					"Unable to update this resource, id missing",
					"No se proporciono el id para la actulizacion"
				);

			this.url = this.path(this.url, id);
			this.put((error, response) => {
				if (error)
					throw new ControllerException(
						response.code,
						"Unable to update this resource",
						response.message
					);

				this.data = this.keyCleaner(this.data);
				const message = new ResponseFormatter(
					"Resource has been updated",
					200
				).setData(this.data);
				this.sendResponse(message);
			});
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			this.sendResponse(message);
		}
	}

	/**
	 * Obtiene un archivo
	 * @returns {Buffer} File
	 */
	getFile() {
		try {
			this.setAuthorization();
			FileRequest(this.url, {
				...this.headers,
				json: false,
				"Content-Type": "application/pdf",
			})
				.then((buffer) => {
					this.appendRes("Content-Type", "application/pdf");
					this.appendRes("Content-Length", buffer.length);
					return this.response.status(200).end(buffer);
				})
				.catch((e) => {
					const message = new ResponseFormatter(
						e.clientMessage,
						e.code,
						true
					);
					return this.sendResponse(message);
				});
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			this.sendResponse(message);
		}
	}

	//#region 'Helpers'
	/**
	 * Funcion que arma la estructura basica para cualquier caso de request
	 * @param {Array<String|Number>} url
	 * @param {boolean} isError
	 * @param {object} errorContent
	 * @param {Number} errorContent.code
	 * @param {String} errorContent.eng
	 * @param {String} errorContent.esp
	 * @param {string} responseType
	 */
	resourceLogic(
		url = [],
		isError = false,
		errorContent = {},
		responseType = "GET"
	) {
		// console.log({url,isError,errorContent,responseType});
		try {
			this.setAuthorization();
			// console.log(this.authorization);
			if (isError) {
				const defErrorContent = {
					code: 400,
					eng: "Something was wrong",
					esp: "Algo salio mal",
				};
				const { code, eng, esp } = Object.assign(
					{},
					defErrorContent,
					errorContent
				);
				throw new EventException(code, eng, esp);
			}
			this.url = this.path(...url);
			if (responseType.toLowerCase() == "get") return this.getResource();
			else if (responseType.toLowerCase() == "post")
				return this.createResource();
			else if (responseType.toLowerCase() == "put")
				return this.updateResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}
	//#endregion 'Helpers'
}

/* * * * * * * * *
 * Export Module *
 * * * * * * * * */
module.exports = App;
