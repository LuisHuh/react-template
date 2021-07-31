"use strict";
/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description LOGGER FILE
 */

/* * * * * * * * * * * *
 *  Import Statements  *
* * * * * * * * * * * */
const fs = require('fs');
const util = require('util');

class Logger{
   constructor(filename = ''){
      this._filename = filename;
      this._message = '';
      this._path = __dirname.concat('/../.logs');
      this._infoStream = this.createFile('/info.log');
      this._debugStream = this.createFile('/debug.log');
      this._errorStream = this.createFile('/error.log');
   }

   set filename(filename){
      this._filename = filename;
   }

   get filename(){
      return this._filename;
   }

   set message(value){
      this._message = `[${new Date().toISOString()}] [${value.type.toUpperCase()}] ${this.filename} : ${util.format('%j', value.msg)} \n`;
   }

   get message(){
      return this._message;
   }

   createFile(filename){
      if (!fs.existsSync(this._path)){
         fs.mkdirSync(this._path);
      }

      return fs.createWriteStream(this._path.concat(filename), { flags: 'a' });
   }

   info(...msg){
      this.message = {type: 'info', msg:[...msg]};
      this._infoStream.write(this.message);
   }

   debug(...msg){
      this.message = {type: 'debug', msg:[...msg]};
      this._debugStream.write(this.message);
   }

   error(...msg){
      this.message = {type: 'error', msg:[...msg]};
      this._errorStream.write(this.message);
   }
}

module.exports = Logger;