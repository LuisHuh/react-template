/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description ACL MIDDLEWARE FILE
 */

/* * * * * * * * * * * *
 *  Import Statements  *
* * * * * * * * * * * */
const Middleware = require("../app");
const Auth = require("../app/AuthRequest");
const { ENABLE_MIDDLEWARE } = require("../../../config/global");
const ResponseFormatter = require("../libraries/ResponseFormatter");
const MiddlewareException = require("../libraries/ThrowExceptions");

class ACLMiddleware extends Middleware{
   /**
	 * Middleware que obtiene el token de autenticacion para las APIs
	 * @param {Request} req Request de la api
	 * @param {Response} res Respues para la api
	 * @param {Function} next Callback para pasar al siguiente middleware
	 */
   constructor(...params){
      super(...params);
      this.ACLMiddleware();
   }

   /**
    * Cuerpo del middleware
    */
   ACLMiddleware(){
      let message = {};
      try {
         if (!ENABLE_MIDDLEWARE) {
            return this.next();
         }
         
         this.token = this.jsonRawHeaders.authorization;
         if (!this.token) throw new MiddlewareException(401, 'Authentication token is required', 'No se proporciono un token');

         Auth.tokenDecoder(this.token)
         .then( res => {
            this.next();
         })
         .catch( e => {
            message = new ResponseFormatter('Authentication has failed.', 401, true);
            return this.sendResponse(message);
         });
      } catch (e) {
         message = new ResponseFormatter(e.clientMessage, 401, true);
         return this.sendResponse(message);
      }
   }
}
 /* * * * * * * * * * * * * *
 * Export Module Middleware *
* * * * * * * * * * * * * **/
module.exports = ACLMiddleware;