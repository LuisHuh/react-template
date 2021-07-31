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

class FRMController extends Controller {
    /**
     * @author ixicale - 2020.Jul.29
     * @description API para obtener todos los idiomas
     * ! GET
     * @type {GET request}
     */
    getIdiomas() {
        const url = [Api.idioma__search],
            isError = false,
            errorContent = {},
            responseType = 'get';
        return this.resourceLogic(url, isError, errorContent, responseType);
    }

    /**
     * ! POST
     * @author ixicale - 2020.Dic.14
     * @version 2020.Dic.14.ixicale
     * @description API para mandar notificaciones
     * @type {POST request}
     */
    notify() {
        this.data = { ...this.basicInfoPost, ...this.jsonRawBody };
        const url = [Api.notificaicones__mail],
            isError = false,
            errorContent = { code: 404 },
            responseType = 'POST';
        return this.resourceLogic(url, isError, errorContent, responseType);
    }

}

/* * * * * * * * *
 * Export Module *
 * * * * * * * * */
module.exports = FRMController;
