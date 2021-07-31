/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description PROMOTION CONTROLLER FILE
 */
"use strict";

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const Controller = require('../app');
const Api = require('../app/endpoints');
const ResponseFormatter = require('../libraries/ResponseFormatter');
const PromotionException = require('../libraries/ThrowExceptions');

class PromotionController extends Controller{
   /**
    * Obtiene las promociones del usuario
    */
   promotion(){
      try {
			const params = this.jsonRawParams;
			if (!params.id) {
				throw new PromotionException(
					400,
					"Event id is required",
					"No se recibio el id del grupo del evento"
				);
			}

			this.url = Api.promotions;
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
module.exports = PromotionController;