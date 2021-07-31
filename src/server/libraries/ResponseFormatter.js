/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com
 * @description CACHE CONFIG FILE
 */
"use strict";

class ResponseFormatter{
   /**
    * Establece el formato de respuesta
    * @param {number} code Codigo de error
    * @param {boolean} hasError true or false
    * @param {array} data Datos
    */
   constructor(message = 'OK', code = 200, hasError = false){
      this.message = message; 
      this.code = code; 
      this.error = hasError;
      this.setData([]);
   }

   /**
    * Establece lo datos a enviar al cliente
    * @param {array} data Datos
    */
   setData(data){
      this._data = data;
      return this;
   }

   /**
    * Devuelve lo datos a enviar al cliente
    * @returns {array} Datos
    */
   get data(){
      return this._data;
   }

   /**
    * Establece el codigo de respuesta para el cliente
    * @param {number} value
    */
   set code(value){
      this._code = value;
   }

   /**
    * @return {number} 200 - 511
    */
   get code(){
      return this._code;
   }

   /**
    * Establece si hay error
    * @param {boolean} value true or false
    */
   set error(value){
      this._error = value;
   }

   /**
    * @return {boolean} true or false
    */
   get error(){
      return this._error;
   }

   /**
    * Establece el mensaje para el cliente
    * @param {string} value Mensaje
    */
   set message(value){
      this._message = value;
   }

   /**
    * @returns {string} Mensaje
    */
   get message(){
      return this._message;
   }

   /**
    * Establece los valores a enviar
    * @param {array} data Datos
    * @param {string} message Mensaje
    * @param {number} code Codigo de error
    * @param {boolean} hasError true or false
    */
   set(data, message, code, hasError){
      this.data = data;
      this.code = code;
      this.error = hasError;
      this.message = message;
   }

   /**
    * Obtiene los datos a enviar al cliente
    * @param {boolean} toString Establece si returna un objeto o texto
    */
   get(toString = false){
      const data = {
         data: this.data,
         message: this.message,
         code: this.code,
         error: this.error
      };
      return toString? JSON.stringify(data) : data;
   }
}

/* * * * * * * * *
 * Export Module *
 * * * * * * * * */
module.exports = ResponseFormatter;