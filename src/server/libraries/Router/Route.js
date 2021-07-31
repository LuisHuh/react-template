/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description ROUTE FILE
 */
"use strict";

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const Express = require("express");
const Path = require("path");

class Router {
	/**
	 * Crea las rutas de la aplicación
	 */
	constructor() {
		this.Router();
	}

	Router() {
		this.app = Express.Router();
		this.router = Express.Router();
		this.routes = [];
	}

	/**
	 * Ubicacion de la carpeta del proyecto
	 */
	get rpath() {
		return Path.resolve("./");
	}

	/**
	 * Ubicaciones posibles de la carpeta del servidor
	 */
	get spath() {
		return [
			Path.join(this.rpath),
			Path.join(this.rpath, "server"),
			Path.join(this.rpath, "src", "server"),
		];
	}

	/**
	 * Establece una nueva mini applicacion
	 * @param {Express} app
	 */
	set app(app) {
		this._app = app;
	}

	/**
	 * @return {Express} app
	 */
	get app() {
		return this._app;
	}

	/**
	 * Establece una nueva mini applicacion para las rutas
	 * @param {Express.Router} router
	 */
	set router(router) {
		this._router = router;
	}

	/**
	 * @returns {Express.Router} router
	 */
	get router() {
		return this._router;
	}

	/**
	 * Establece la url que servira como prefijo
	 * @param {string} prefix
	 */
	set prefix(prefix) {
		this._prefix = prefix;
	}

	/**
	 * @returns {string} prefix
	 */
	get prefix() {
		return this._prefix;
	}

	/**
	 * Establece las rutas a usar
	 * @param {Array<string>} routes
	 */
	set routes(routes) {
		this._routes = routes;
	}

	/**
	 * @returns {Array<string>} routes
	 */
	get routes() {
		return this._routes;
	}

	/**
	 * Importa el controlador
	 * @param {string} path Ruta del controlador
	 */
	set controller(path) {
		this._controller = this.fileFinder(path);
	}

	/**
	 * @returns {NodeRequire} controller
	 */
	get controller() {
		return this._controller;
	}

	/**
	 * Importa el middleware
	 * @param {string} path Ruta del middleware
	 */
	set middleware(path) {
		this._middleware = this.fileFinder(path);
	}

	/**
	 * @returns {NodeRequire} middleware
	 */
	get middleware() {
		return this._middleware;
	}

	/**
	 * @private
	 * Busca el archivo proporcionado.
	 * @param {String} file Nombre del archivo
	 */
	fileFinder(file) {
		const paths = this.path(file);
		let tmp = null;
		for (let i = 0; i < paths.length; i++) {
			const p = paths[i];
			try {
				tmp = require(p);
				break;
			} catch (e) {}
		}

		return tmp;
	}

	/**
	 * Establece las rutas a crear en el paso del *mount*
	 * @param {string} method use | get | post | put | delete
	 * @param {string} endpoint endpoint para la api
	 * @param {string} action Funcion a ejecutar
	 */
	setRoute(method, endpoint, action) {
		if (Array.isArray(this.routes)) {
			const routes = this.routes.slice();
			routes.push({ method, endpoint, action });
			this.routes = routes;
		}
	}

	/**
	 * Obtiene la ruta completa del archivo del controlador
	 * @param  {...any} paths
	 */
	path(...paths) {
		return this.spath.map((p) => Path.join(p, ...paths));
	}

	//
	// Metodos publicos.
	//

	/**
	 * Establece el controlador a usar. Proporcione la carpeta y nombre del archivo sin extension.
	 * @param {string} path Ruta del controlador
	 */
	setHandler(path) {
		this.controller = path;
	}

	/**
	 * Establece el endpoint principal
	 * @param {string} endpoint Url
	 */
	setPrefix(endpoint) {
		this.prefix = endpoint;
	}

	/**
	 * Agrega un middlaware, solo una vez.
	 * @param  {Array<Request>} handlers
	 */
	setMiddlaware(path) {
		this.middleware = path;
	}

	/**
	 * Hace peticiones tipo get
	 * @param {string} endpoint Ruta de la api
	 * @param {string} action Funcion a ejecutar del controllador
	 */
	get(endpoint, action) {
		this.setRoute("get", endpoint, action);
	}

	/**
	 * Hace peticiones tipo post
	 * @param {string} endpoint Ruta de la api
	 * @param {string} action Funcion a ejecutar del controllador
	 */
	post(endpoint, action) {
		this.setRoute("post", endpoint, action);
	}

	/**
	 * Hace peticiones tipo put
	 * @param {string} endpoint Ruta de la api
	 * @param {string} action Funcion a ejecutar del controllador
	 */
	put(endpoint, action) {
		this.setRoute("put", endpoint, action);
	}

	/**
	 * Hace peticiones tipo delete
	 * @param {string} endpoint Ruta de la api
	 * @param {string} action Funcion a ejecutar del controllador
	 */
	delete(endpoint, action) {
		this.setRoute("delete", endpoint, action);
	}

	/**
	 * Monta la aplicacion
	 */
	mount() {
		const app = this.app;
		const router = this.router;
		const routes = this.routes;
		const Controller = this.controller;
		const Middleware = this.middleware;

		for (let i = 0; i < routes.length; i++) {
			const { method, endpoint, action } = routes[i];
			if (Middleware)
				router[method](
					endpoint,
					(...params) => new Middleware(...params),
					(...params) => new Controller(...params)[action]()
				);
			else
				router[method](endpoint, (...params) =>
					new Controller(...params)[action]()
				);
		}

		app.use(this.prefix, router);
		return app;
	}
}

/* * * * * * * * *
 * Export Module *
 * * * * * * * * */
module.exports = Router;
