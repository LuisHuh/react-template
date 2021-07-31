"use strict";
/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description BTOA CLASS FILE. Encrypted data class.
 * @param {str} string
 */

class Btoa{
   constructor(){
      this.buffer = '';
   }

   /**
    * @description Method to encrypt strings
    * @param {str} string
    */
   encrypt(str = ''){
      if (str instanceof Buffer) {
         this.buffer = str;
      }else {
         this.buffer = Buffer.from(str.toString(), 'binary');
      }
      return this.buffer.toString('base64');
   }

   /**
    * @description Method to decrypt strings
    * @param {str} string
    */
   decrypt(str = ''){
      if (str instanceof Buffer) {
         this.buffer = str;
      }else {
         this.buffer = Buffer.from(str.toString(), 'base64');
      }
      return this.buffer.toString('binary');
   }

   /**
    * Separa el token del texto *Bearer*
    * @param {string} bearer Token Bearer a separar
    */
   static tokenBearer(bearer){
      bearer = bearer.trim();
      bearer = bearer.split(' ');
      return bearer[1];
   }

   /**
    * @description Method to decrypt basic credentials
    * @param {encrypted} string
    */
   static decodeCredentials(encrypted){
      encrypted = encrypted.trim();
      const _tmp = encrypted.split(' ');
      const decrypt = new Btoa().decrypt(_tmp[1]);
      return decrypt.split(':');
   }

   /**
    * @description Method to encrypt basic credentials
    * @param {str} string
    */
   static encodeCredentials(username, password){
      let ecrypt = `${username}:${password}`;
      ecrypt = new Btoa().encrypt(ecrypt);
      return `Basic ${ecrypt}`;
   }
}

module.exports = Btoa;