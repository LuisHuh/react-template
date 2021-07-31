/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description FILE CONTROLLER FILE
 */
"use strict";

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const Controller = require("../app");
const Api = require("../app/endpoints");
const ResponseFormatter = require("../libraries/ResponseFormatter");
const FileException = require("../libraries/ThrowExceptions");
const FormData = require("form-data");
const { Guid } = require("../libraries/Helpers");

class FileController extends Controller {
	detailSheet() {
		try {
			const params = this.jsonRawParams;
			if (!params.lang || !params.id) {
				throw new FileException(
					400,
					"Lang and id are required",
					"No se recibio el lenguaje o id del PDF"
				);
			}
			this.url = this.path(Api.detailsheet, params.lang, params.id);
			return this.getFile();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}
	
	detailSheetV2() {
		try {
			const params = this.jsonRawParams;
			if (!params.lang || !params.id) {
				throw new FileException(
					400,
					"Lang and id are required",
					"No se recibio el lenguaje o id del PDF"
				);
			}
			this.url = this.path(Api.detailsheetV2, params.lang, params.id);
			return this.getFile();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	/**
	 * Sube una imagen al bucket publico de events
	 */
	upload() {
		try {
			const request = this.jsonRawBody;
			const errorResponse = (e) => {
				const message = new ResponseFormatter(e.clientMessage, e.code, true);
				return this.sendResponse(message);
			};

			request
			.then((data) => {
					const form = new FormData();
					
					form.append("id-profile", data.id);
					form.append("name-bucket", "events");
					form.append("file", data.cover, {
						filename: `${Guid()}-wedding-cover`
					});
					
					this.url = Api.uploadcover;
					this.headers = form.getHeaders();
					this.json = false;
					this.authorization = this.tokenMiddleware;
					this.data = form;

					return this.post(( err, res) => {
						if (!err) {
							res = res.data || res || {};
							const msg = new ResponseFormatter().setData({
								path: res.objectURL
							});
							return this.sendResponse(msg);
						}

						errorResponse({clientMessage: res, code: 400});
					});
				})
				.catch((e) => {
					errorResponse(e);
				});
			} catch (e) {
				errorResponse(e);
			}
	}
	/**
	 * Consulta PDF de Rooming.
	 * @param: lang, idevent_grupo
	 */
	getRoomingPDF() {
		try {
			const params = this.jsonRawParams;
			if (!params.lang, !params.idevent_grupo) {
				throw new FileException(
					400,
					"Required",
				);
			}
			this.url = this.path(Api.roomingpdf, params.lang, params.idevent_grupo);
			return this.getFile();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}
}

/* * * * * * * * *
 * Export Module *
 * * * * * * * * */
module.exports = FileController;
