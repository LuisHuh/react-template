/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description TRANSLATE CONTROLLER FILE
 */
"use strict";

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const Controller = require("../app");
const Api = require("../app/endpoints");
const ResponseFormatter = require("../libraries/ResponseFormatter");
const AuthException = require("../libraries/ThrowExceptions");

class TranslateController extends Controller {
	translate(){
      this.jsonRawParams;
      this.url = Api.translate;
      this.getResourceId(this.jsonRawParams.id);
   }
}

/* * * * * * * * *
 * Export Module *
 * * * * * * * * */
module.exports = TranslateController;
