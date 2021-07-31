/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description RESORT CONTROLLER FILE
 */
"use strict";

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const Controller = require("../app");
const Api = require("../app/endpoints");
const ResponseFormatter = require("../libraries/ResponseFormatter");
const ResortException = require("../libraries/ThrowExceptions");

const JsonReader = require("../libraries/JsonReader");

class ResortController extends Controller {
	/**
	 * Obtiene el hotel
	 */
	resort() {
    	this.url = Api.resorts;
		return this.getResource();
   }
}

/* * * * * * * * *
 * Export Module *
 * * * * * * * * */
module.exports = ResortController;
