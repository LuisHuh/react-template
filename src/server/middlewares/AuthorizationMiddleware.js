/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com
 * @description CACHE CONFIG FILE
 */
"use strict";

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const flatCache = require("flat-cache");
const Middleware = require("../app");
const Auth = require("../app/AuthRequest");
const ResponseFormatter = require("../libraries/ResponseFormatter");
const MiddlewareException = require("../libraries/ThrowExceptions");

class AuthorizationMiddleware extends Middleware {
	/**
	 * Middleware que obtiene el token de autenticacion para las APIs
	 * @param {Request} req Request de la api
	 * @param {Response} res Respues para la api
	 * @param {Function} next Callback para pasar al siguiente middleware
	 */
	constructor(...params) {
		super(...params);
		this.cacheFilename = "weddingCache";
		this.cacheKey = "__wedding__token";
		this.token = "";
		this.loggedSystem = false;
		this.tokenLifetime = 24;
		this.timeToUpdate = 12;
		this.AuthorizationMiddleware();
	}

	/**
	 * Codigo principal para obtener el token
	 */
	AuthorizationMiddleware() {
		if (this.updateIsRequired()) {
			this.getToken(data => {
				const cache = this.cacheFile;
				cache.removeKey(this.cacheKey);
				cache.setKey(this.cacheKey, this.jsonParse(data, true));
				cache.save();
				this.shareParams("authorization", data.token);
				return this.next();
			});
		} else {
			const cache = this.authCache;
			this.shareParams("authorization", cache.token);
			return this.next();
		}
	}

	/**
	 * Establece el nombre del archivo de cache
	 * @param {string} name Nombre del archivo
	 */
	set cacheFilename(name) {
		this._cachefile = name;
	}

	/**
	 * @returns {string} Name
	 */
	get cacheFilename() {
		return this._cachefile;
	}

	/**
	 * Establece el valor de la llave para el cache
	 */
	set cacheKey(name) {
		this._key = name;
	}

	/**
	 * @returns {string} key
	 */
	get cacheKey() {
		return this._key;
	}

	/**
	 * Establece el tiempo de vida para el token
	 * @param {number} time Tiempo de vida
	 */
	set tokenLifetime(time) {
		this._tokenLifetime = time;
	}

	/**
	 * @returns {number} time
	 */
	get tokenLifetime() {
		return this._tokenLifetime;
	}

	/**
	 * Establece el tiempo para actualizar el token
	 * @param {number} time Horas antes de actualizar
	 */
	set timeToUpdate(time) {
		this._timeToUpdate = time;
	}

	/**
	 * @returns {number} time
	 */
	get timeToUpdate() {
		return this._timeToUpdate;
	}

	/**
	 * Establece si el usuario generar tiene un token valido
	 * @param {boolean} logged true or false
	 */
	set loggedSystem(logged) {
		this._isLoggedSystem = logged;
	}

	/**
	 * @returns {boolean} true or false
	 */
	get loggedSystem() {
		return this._isLoggedSystem;
	}

	/**
	 * Devuelve el archivo del cache
	 */
	get cacheFile() {
		return flatCache.load(this.cacheFilename, this.path);
	}

	/**
	 * Devuelve la ruta del archivo de cache
	 */
	get path() {
		return __dirname.concat("/../.cache");
	}

	/**
	 * Devuelve el contenido del cache
	 * @return {JSON} {}
	 */
	get authCache() {
		let cache = this.cacheFile;
		cache = cache.getKey(this.cacheKey);
		return this.jsonParse(cache);
	}

	/**
	 * Devuelve en horas el tiempo transcurrido
	 * @param {Date} time Tiempo a convertir
	 */
	elapsedTime(time) {
		const createdTime = new Date(time).getTime();
		const currentTime = new Date().getTime();
		const distance = currentTime - createdTime;
		let hours = 0;
		if (distance > 0) {
			hours = Math.floor(distance / (1000 * 60 * 60));
		}
		return hours;
	}

	/**
	 * Devuelve si el token debe ser renovado
	 */
	updateIsRequired() {
		const { token, lifetime, update_before, created } = this.authCache;
		if (!token) return true;

		const elapsedTime = this.elapsedTime(created);
		const updateTime = lifetime - update_before;

		if (elapsedTime >= updateTime) {
			return true;
		}

		return false;
	}

	/**
	 * Obtiene el token de auth
	 * @param {(data = {}) => {}} success Callback
	 */
	getToken(success) {
		Auth.authenticate(this.username, this.password)
			.then(res => {
				const temp = {};
				const token = res.data;
				if (!token)
					throw new MiddlewareException(
						401,
						"System unable to authenticate.",
						"Error al obtener el token de auth."
					);

				temp.token = token;
				temp.created = Date.now();
				temp.lifetime = this.tokenLifetime;
				temp.update_before = this.timeToUpdate;
				success(temp);
			})
			.catch(e => {
				const format = new ResponseFormatter(e.clientMessage, e.code, true);
				return this.response.status(e.code).send(format.get());
			});
	}
}

/* * * * * * * * * * * * * *
 * Export Module Middleware *
 * * * * * * * * * * * * * **/
module.exports = AuthorizationMiddleware;
