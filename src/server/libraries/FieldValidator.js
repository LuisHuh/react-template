/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description CACHE CONFIG FILE
 */
"use strict";

 /* * * * * * * * * * * *
 *  Import Statements  *
* * * * * * * * * * * */
const ResponseFormatter = require('./ResponseFormatter');

class FieldValidator{
   constructor(fields){
      this.fields = fields;
      this.valid = true;
      this.res = new ResponseFormatter;
      this.validate();
   }

   set isValid(value){
      this.valid = value;
   }

   get isValid(){
      return this.valid;
   }

   isNull(value){
      return !value;
   }

   validate(){
      const _tmp = [];
      for (const key in this.fields) {
         if (this.fields.hasOwnProperty(key)) {
            const val = this.fields[key];
            if (this.isNull(val)) {
               _tmp.push({field: key, type: 'required', message: `${key} is required.`})
            }
         }
      }

      this.isValid = !_tmp.length;
      this.res.set(_tmp, 400, true, 'Some fields are empty');
   }

   reponse(){
      return this.res.get();
   }
}

/* * * * * * * * * * * * * *
 * Export Module Middleware *
 * * * * * * * * * * * * * **/
module.exports = FieldValidator;