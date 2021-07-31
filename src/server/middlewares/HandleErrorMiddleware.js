/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description HANDDLE ERRORS FILE
 */
"use strict";


/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const Middleware = require("../app");
const ResponseFormatter = require("../libraries/ResponseFormatter");


class HandleErrorMiddleware extends Middleware{
   /**
    * Middleware de errores
    * @param {Error} err Error del servidor - *Opcional*
    * @param {Request} req Petición del cliente
    * @param {Response} res Respuesta del servidor
    * @param {Function} next Callback para pasar al siguiente middleware
    */
   constructor(err, ...params){
      if (params.length == 3) this.error = err;
      else params.unshift(err);
      super(...params);
      this.HandleErrorMiddleware();
   }

   /**
    * Logica del middleware
    */
   HandleErrorMiddleware(){
      if(!this.error) return this.hErr400();

      return this.hErr500();
   }

   /**
    * Establece el error del servidor
    * @param {Error} err Error
    */
   set error(err){
      this._error = err;
   }

   /**
    * @returns {Error} Error
    */
   get error(){
      return this._error;
   }

   /**
    * Regresa la url del cliente
    * @returns {string} url
    */
   get rUrl(){
      return this.request.url;
   }

   /**
    * Url Not Found
    */
   hErr400(){
      const message = new ResponseFormatter(`Not Found => ${this.rUrl}`, 404, true);
      return this.sendResponse(message);
   }

   /**
    * Internal Server Error
    */
   hErr500(){
      const message = new ResponseFormatter(`Internal Server Error`, 500, true).setData(this.error);
      return this.sendResponse(message);
   }
}


/* * * * * * * * *
 * Export Module *
 * * * * * * * * */
module.exports = HandleErrorMiddleware;