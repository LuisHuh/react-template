/**
 * Unidades de negocios, Tipos de servicios
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description MENU CONTROLLER FILE
 */
"use strict";

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const Controller = require("../app");
const Api = require("../app/endpoints");
const ResponseFormatter = require("../libraries/ResponseFormatter");
const MenuException = require("../libraries/ThrowExceptions");

const JsonReader = require("../libraries/JsonReader");

class MenuController extends Controller {
	department() {
		this.url = Api.menu;
		this.getResource();
	}

	categories(){
		this.url = Api.category;
		this.getResource();
	}

	category() {
		try {
			const params = this.jsonRawParams;
			if (!params.id) {
				throw new MenuException(400, 'Id is required', 'No se recibio id para los tipos de servicos');
			}
			this.url = this.path(Api.submenu, params.id);
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
         return this.sendResponse(message);
		}
	}
	
	filter() {
		try {
			const params = this.jsonRawParams;
			if (!params.id) {
				throw new MenuException(400, 'Id is required', 'No se recibio id para los tipos de servicos');
			}
			this.url = this.path(Api.filters, params.id);
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
         return this.sendResponse(message);
		}
	}

	service(){
		
		try {
			const params = this.jsonRawParams;
			if (!params.idHotel|| !params.idNegocio) {
				throw new MenuException(
					400,
					"Id Hotel is required",
					"Id Business is required",
					"No se recibio el id del hotel",
					"No se recibio el id del negocio"
				);
			}
			this.url = this.path(Api.menuservice, params.idHotel, params.idNegocio);
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}
}

module.exports = MenuController;
