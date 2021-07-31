/**
 * Tipos de servicios
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description TYPE CONTROLLER FILE
 */
"use strict";

 /* * * * * * * * * * * *
 *  Import Statements  *
* * * * * * * * * * * */
const Controller = require('../app');
const Api = require("../app/endpoints");
const ResponseFormatter = require("../libraries/ResponseFormatter");
const AuthException = require("../libraries/ThrowExceptions");

class TypeController extends Controller{

}

/* * * * * * * * *
 * Export Module *
 * * * * * * * * */
module.exports = TypeController;