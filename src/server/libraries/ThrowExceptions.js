/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com
 * @description CUSTOM EXCEPTION FILE
 */
"use strict";

 /* * * * * * * * * * * *
 *  Import Statements  *
* * * * * * * * * * * */
const Logger = require('../libraries/Logger');

class CustomErrorException extends Error{
    /**
     * Crea una exception personalizada
     * @param {number} code Codigo de error 
     * @param {string} clientMessage Mensage para mostrar al client
     * @param {string} message Mensage para debug
     */
    constructor(code, clientMessage, message = clientMessage){
        super(message);
        const regExpPar = /\(([^)]+)\)/;  
        const regExpUrl = /[\\/]/;
        const regExpLine = /\:/;
        
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomErrorException)
        }

        const _splitString = this.stack.split('\n');
        let _regRes = regExpPar.exec(_splitString[1]);
        _regRes = _regRes? _regRes[1] : _splitString[1]
        const _metadata = _regRes.split(regExpLine);
    

        this.code = code;
        this.name = 'Error';
        this.clientMessage = clientMessage;
        this.file = _metadata[0];
        this.filename = _metadata[0].split(regExpUrl).pop();
        this.line = `${_metadata[1]}:${_metadata[2]}`;
        this.toString = function(){
            return `${this.name} => ${this.message} at ${this.file}:${this.line}`;
        }

        const logger = new Logger(this.filename);
        logger.error(this.message);
        logger.debug(this.toString());
    }
}

module.exports = CustomErrorException;