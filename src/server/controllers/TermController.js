/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description TERM CONTROLLER FILE
 */
"use strict";

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const Controller = require('../app');
const Api = require('../app/endpoints');
const ResponseFormatter = require('../libraries/ResponseFormatter');
const TermException = require('../libraries/ThrowExceptions');

class TermController extends Controller{
   /**
    * Obtiene los terminos y las condiciones de los servicios
    */
   terms(){
      try {
         const params = this.jsonRawParams;
         if (!params.id_lang || !params.ids) {
            throw new EventException(
               400,
               "Item ids and Lang id are required",
               "No se recibio los ids de los servicios o el del idioma"
            );
			}

			this.url = this.path(Api.terms, params.id_lang, params.ids);
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
   }
}

/* * * * * * * * *
 * Export Module *
 * * * * * * * * */
module.exports = TermController;