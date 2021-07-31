/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description PURCHASE CONTROLLER FILE
 */
"use strict";

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const Controller = require('../app');
const Api = require('../app/endpoints');
const ResponseFormatter = require('../libraries/ResponseFormatter');
const PurchaseException = require('../libraries/ThrowExceptions');

class PurchaseController extends Controller{
   /**
    * Obtiene la concentracion de las compras del usuario
    */
   purchase(){
      try {
			const params = this.jsonRawParams;
			if (!params.id) {
				throw new PurchaseException(
					400,
					"Event id is required",
					"No se recibio el id del grupo del evento"
				);
			}

			this.url = Api.purchase;
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
module.exports = PurchaseController;