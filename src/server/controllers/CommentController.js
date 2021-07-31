/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description COMMENTS CONTROLLER FILE
 */
"use strict";

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const Controller = require("../app");
const Api = require("../app/endpoints");
const ResponseFormatter = require("../libraries/ResponseFormatter");
const CommentException = require("../libraries/ThrowExceptions");
const Upload = require("../app/UploadRequest");

class CommentController extends Controller {
	byId() {
		try {
			const params = this.jsonRawParams;
			if (!params.id) {
				throw new EventException(
					400,
					"Comment id is required",
					"No se recibio el id del comentario"
				);
			}

			this.url = Api.comments;
			return this.getResourceId(params.id);
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	postComment() {
		const { id, comment, tipo, tipo_extrainfo } = this.jsonRawBody;
		this.data = Object.assign({}, this.basicInfoPost, {
			idevent_detalle: id,
			extra_informacion: comment,
			tipo: tipo, // Novia
			tipo_extrainfo: tipo_extrainfo, // Notas
			thumb:" ",
			path: " "
		});

		const url = [Api.newcomment],
			isError = false,
			errorContent = {},
			responseType = "post";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	newComment(id, comment, image) {
		this.url = Api.newcomment;
		this.data = Object.assign({}, this.basicInfoPost, {
			...image,
			idevent_detalle: id,
			extra_informacion: comment,
			tipo: 2, // Novia
			tipo_extrainfo: 1, // Notas
		});

		this.post((err, res) => {
			let msg = {};
			if (!err) {
				// this.data = this.keyCleaner(this.data);
				this.data = this.serializeData(this.data);
				msg = new ResponseFormatter().setData({
					id_note: res.id,
					...this.data,
				});
				return this.sendResponse(msg);
			}
			msg = new ResponseFormatter("Unable to save data", 500, true);
			return this.sendResponse(msg);
		});
	}

	saveComment() {
		const errorResponse = (e) => {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		};

		try {
			const requestData = this.jsonRawBody;
			this.authorization = this.tokenMiddleware;
			requestData
				.then((res) => {
					const { id, comment, image } = res || {};
					//validamos que traiga una img de lo contrario guardamos sin ella.
					if(image==undefined || image == '' ){
						let dtaimg = {path:" ", thumb:" "}
						return this.newComment(id, comment, dtaimg);
					}else{
						new Upload(this)
						.sendFile(image)
						.then((bucket) => {
							const { objectURL: path, objectURLtamano: thumb } =
								bucket.data || {};
							return this.newComment(id, comment, {path, thumb});
						})
						.catch((e) => {
							return errorResponse(e);
						});
					}
				})
				.catch((e) => {
					return errorResponse(e);

				});
		} catch (e) {
			return errorResponse(e);
		}
	}

	/**
	 * Obtiene las notas, que para la novia son comentarios
	 */
	history() {
		return this.extraInfoNovia(1);
	}

	/**
	 * Obtiene lo que incluye el servicio del lado de la novia,
	 * en caso que en un futuro se decida que la novia agregue incluye
	 */
	serviceBride() {
		return this.extraInfoNovia(2);
	}

	/**
	 * Obtiene lo que incluye el servicio del lado de la novia,
	 * en caso que en un futuro se decida que la novia agregue incluye
	 */
	servicePlanner() {
		return this.extraInfoPlanner(2);
	}

	/**
	 * Obtiene la informacion guardada en event_detalle_extrainfo
	 * @param {1|2} tipo Tipo de dato a obtener. 1 es Notas y 2 lo que incluye el servicio.
	 */
	extraInfoNovia(tipo) {
		try {
			const { id } = this.jsonRawParams;
			if (!id) {
				throw new CommentException(
					400,
					"id is required",
					"No se recibio el ID en extraInfoNovia"
				);
			}
			this.url = this.path(Api[tipo == 1? "commenthistory" : "servicedetails"], id);
			this.listIgnore = [
				"usuario_creacion",
				"usuario_ultima_modificacion",
				"fecha_ultima_modificacion",
			];
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	extraInfoPlanner(tipo) {
		try {
			const { id } = this.jsonRawParams;
			if (!id) {
				throw new CommentException(
					400,
					"id is required",
					"No se recibio el ID en extraInfoNovia"
				);
			}
			this.url = this.path(Api[tipo == 1? "commenthistory2" : "servicedetails2"], id);
			this.listIgnore = [
				"usuario_creacion",
				"usuario_ultima_modificacion",
				"fecha_ultima_modificacion",
			];
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	weddingsNotes(){
		try {
			const { id } = this.jsonRawParams;
			if (!id) {
				throw new CommentException(
					400,
					"id is required",
					"No se recibio el ID en extraInfoNovia"
				);
			}

			this.url = Api.weddingnotes;
			this.listIgnore = [
				"usuario_creacion",
				"usuario_ultima_modificacion",
				"fecha_ultima_modificacion",
			];
			return this.getResourceId(id);
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}
}

/* * * * * * * * *
 * Export Module *
 * * * * * * * * */
module.exports = CommentController;
