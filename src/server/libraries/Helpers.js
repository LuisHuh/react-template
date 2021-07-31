"use strict";
/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description OTHERS CLASSES
 */

/* * * * * * * * * * * *
 *  Import Statements  *
* * * * * * * * * * * */
const axios = require('axios');
const Btoa = require('./Btoa');
const diccionary = require('../app/dic');

Object.defineProperty(exports, "__esModule", {
   value: true
});

exports.ResponseFormat = exports.Validator = exports.getAuthorizationToken = exports.sendRequest = undefined;

class ResponseFormat{
   constructor(){
      this.format = { 
         data: [], 
         status: 200,
         error: false,
         message: ""
      };
   }

   set data(values){
      this.format.data = values;
   }

   get data(){
      return this.format.data;
   }

   set status(values){
      this.format.status = values;
   }

   get status(){
      return this.format.status;
   }

   set error(value){
      this.format.error = value;
   }

   get error(){
      return this.format.error;
   }

   set message(value){
      this.format.message = value;
   }

   get message(){
      return this.format.message;
   }

   set(data, status, error, message){
      this.data = data;
      this.status = status;
      this.error = error;
      this.message = message;
   }

   get(){
      return this.format;
   }
}

/**
 * @description 
 * @param {fields} array
 */
class Validator{
   constructor(fields){
      this.fields = fields;
      this.valid = true;
      this.res = new ResponseFormat;
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

const getAuthorizationToken = async (username, password, url) => {
   try {
      const encryptor = new Btoa;
      const basicAuth = encryptor.encodeCredentials(username, password);
      const response = await axios.post(url, {}, { headers: {
         json: true,
         authorization: basicAuth
      }});

      return response.data;
   } catch (error) {
      if (error.response) {
         if (error.response.data) {
            throw error.response.data;
         }else{
            throw error.response;
         }
      }
      throw error;
   }
}

const sendRequest = async (url = '', data = {}, method = 'GET', headers = []) => {
   try {
      
      const config = {
         url,
         method,
         transformResponse: [
            (data) => {
               try {
                  data = JSON.parse(data);
               } catch (x) {
                  data = data || {};
               }
               return data;
            }
         ],
         headers,
         data
      }
      let response = await axios(config);
      return response.data;
   } catch (error) {
      if (error.code === 'HPE_INVALID_CONSTANT') {
         return {
            status: 'OK',
            code: 200,
            message: '',
            data: [],
            error: false
         }
      }else{
         if (error.response) {
            if (error.response.data) {
               throw error.response.data;
            }else{
               throw error.response;
            }
         }
         throw error;
      }
   }
}

const boundaryGenerator = () => '-------------'.concat(Date.now().toString(16));

const buildDataFiles = (boundaryDelimiter = '', fields = {}, files = []) => {
   let data = '';
   const eol = '\r\n';
   for (const key in fields) {
      if (fields.hasOwnProperty(key)) {
         data += '--'.concat(boundaryDelimiter, eol);
         data += 'Content-Disposition: form-data; name="'.concat(key, '"', eol, eol);
         data += fields[key].concat(eol);
      }
   }
   files.forEach((file) => {
      data += '--'.concat(boundaryDelimiter, eol);
      data += 'Content-Disposition: form-data; name="'.concat(file['field'], '"; filename="', file['name'], '"', eol);
      data += 'Content-Type:'.concat(file['type'], eol);
      data += 'Content-Transfer-Encoding: binary'.concat(eol, eol);
      data += file['file'].concat(eol);
   });

   data += '--'.concat(boundaryDelimiter, '--', eol);

   return data;
}

const getValueObject = (object, ...keys) => {
   for (let i = 0; i < keys.length; i++) {
      const element = keys[i];
      if (object.hasOwnProperty(element)) {
         object = object[element];
      }
   }

   return object;
}

const serializeObject = (data = {}, reverse = false, dic = diccionary) => {
   const tmp = {};

   for (const key in data) {
      if (data.hasOwnProperty(key)) {
         let found = false;
         let newKey = '';
         for (const keyword in dic) {
            if (dic.hasOwnProperty(keyword)) {
               const compareKey = reverse? dic[keyword] : keyword;
               if (key === compareKey) {
                  found = true;
                  newKey = reverse? keyword : dic[keyword];
                  break;
               }
            }
         }
         
         if (found) {
            tmp[newKey] = data[key];
         }else{
            tmp[key] = data[key];
         }
      }
   }

   return tmp;
}

const serializeData = (data = [], dic = diccionary, reverse = false) => {
   return data.map(element => {
      return serializeObject(element, reverse, dic);
   });
}

const localTime = (time = 'now') => {
   const date = time === 'now' ? new Date() : new Date(time);
   const offset = date.getTimezoneOffset() * 60 * 1000;
   return new Date(date.getTime() - offset);
}

const Guid = () => {
   const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
   };

   return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

/**
 * Regresa los argumentos pasados a nodeJS.
 * @returns {{}}
 */
const argsParse = () => {
    const tmp = {};
    const args = process.argv.slice(2);
    args.forEach(a => {
        a = a.split("=");
        if (a.length == 2) {
            tmp[a[0]] = a[1];
        }
    })
    return tmp;
}

module.exports.ResponseFormat = ResponseFormat;
module.exports.Validator = Validator;
module.exports.boundaryGenerator = boundaryGenerator;
module.exports.buildDataFiles = buildDataFiles;
module.exports.getAuthorizationToken = getAuthorizationToken;
module.exports.sendRequest = sendRequest;
module.exports.getValueObject = getValueObject;
module.exports.serializeObject = serializeObject;
module.exports.serializeData = serializeData;
module.exports.localTime = localTime;
module.exports.Guid = Guid;
module.exports.argsParse = argsParse;