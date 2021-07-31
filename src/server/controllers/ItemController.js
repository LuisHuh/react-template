/**
 * Unidades de negocios, Tipos de servicios
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description ITEM CONTROLLER FILE
 */
"use strict";

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const Controller = require("../app");
const Api = require("../app/endpoints");
const ResponseFormatter = require("../libraries/ResponseFormatter");
const ItemException = require("../libraries/ThrowExceptions");

class ItemController extends Controller {
	filter() {
		try {
			const params = this.jsonRawParams;
			if (!params.id_filter || !params.id_category) {
				throw new ItemException(
					400,
					"Filter and category id are required",
					"No se recibio los ids para los tags"
				);
			}
			this.url = this.path(Api.items3, params.id_filter, params.id_category);
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	category() {
		try {
			const params = this.jsonRawParams;
			if (!params.id) {
				throw new ItemException(
					400,
					"Id is required",
					"No se recibio el id de la categoria del servicio"
				);
			}
			this.url = Api.items;
			return this.getResourceId(params.id);
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	resort() {
		try {
			const { idResort, idTipo, idIdioma } = this.jsonRawParams;
			if (!idResort && !idTipo && !idIdioma) {
				throw new ItemException(
					400,
					"Some entries are required.",
					`Los siguentes campos son requeridos: idResort:${idResort}, idTipo:${idTipo}, idIdioma:${idIdioma}`
				);
			}

			this.url = this.path(Api.items2, idResort, idTipo, idIdioma);
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	tags() {
		try {
			const params = this.jsonRawParams;
			if (!params.id) {
				throw new ItemException(
					400,
					"Event id is required",
					"No se recibio el id del grupo del evento"
				);
			}

			this.url = Api.servicetags;
			return this.getResourceId(params.id);
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}
}

/* * * * * * * * *
 * Export Module *
 * * * * * * * * */
module.exports = ItemController;
