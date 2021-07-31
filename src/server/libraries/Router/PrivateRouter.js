/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description PRIVATE ROUTE FILE
 */
"use strict";

 /* * * * * * * * * * * *
 *  Import Statements  *
* * * * * * * * * * * */
const Route = require('./Route');
const ACLMiddleware = require('../../middlewares/ACLMiddleware');

class PrivateRoute extends Route{
   /**
    * Crea las rutas de la aplicacion agregado un middleware 
    * para la proteccion de la ruta por medio de un token.
    */
   constructor(){
      super();
   }

   mount(){
      const app = this.app;
      const router = this.router;
      const routes = this.routes;
      const Controller = this.controller;
      const Middleware = this.middleware;

      for (let i = 0; i < routes.length; i++) {
         const {method, endpoint, action } = routes[i];
         if (Middleware)
            router[method](endpoint, (...params) => new ACLMiddleware(...params), (...params) => new Middleware(...params), (...params) => new Controller(...params)[action]());
         else
            router[method](endpoint, (...params) => new ACLMiddleware(...params), (...params) => new Controller(...params)[action]());
      }

      app.use(this.prefix, router);
      return app;
   }
}

/* * * * * * * * *
 * Export Module *
 * * * * * * * * */
module.exports = PrivateRoute;