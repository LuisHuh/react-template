/**
 * @author Isaias Xicale <ixicale@palaceresorts.com>
 * @description CORE CONTROLLER FILE
 */
'use strict';

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const Controller = require('../app');
const Api = require('../app/endpoints');
const ResponseFormatter = require('../libraries/ResponseFormatter');
const AuthException = require('../libraries/ThrowExceptions');

class CoreController extends Controller {
    /**
     * @author ixicale - 2020.Jul.29
     * @description API para obtener todos los paises.
     * ! GET
     * @type {GET request}
     */
    getPaises() {
        const { idioma } = this.jsonRawParams;
        const url = [Api.getPaisA3, idioma],
            isError = !idioma,
            errorContent = {},
            responseType = 'get';
        return this.resourceLogic(url, isError, errorContent, responseType);
    }
}

/* * * * * * * * *
 * Export Module *
 * * * * * * * * */
module.exports = CoreController;
