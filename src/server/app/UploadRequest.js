/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description UPLOAD REQUEST FILE
 */
"use strict";

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const FormData = require("form-data");
const App = require(".");
const Api = require("./endpoints");

class UploadRequest extends App {
	constructor(app) {
		super();
		this.request = app.request;
		this.response = app.response;
		this.next = app.next;
		this.headers = app.headers;
		this.json = app.json;
		this.method = app.method;
   }
   
   /**
    * Metodo para subir un archivo al bucket de amazon
    * @param {File} file Archivo a cargar en el bucket
    * @param {number|string} size Tamaño de la imagen *W* ó *WxH*
    * @param {string} folder Nombre de la carpeta donde se almacenara el archivo
    */
	sendFile(file, size = 150, folder = 'events') {
      const form = new FormData();
      form.append("filename", file, { filename: '-weddingweb'});
      
		this.json = false;
		this.headers = form.getHeaders();
		this.data = form;
      this.authorization = this.tokenMiddleware;
      this.url = this.path(Api.awsBucketResize, folder, size)
		return new Promise((resolve, reject) => {
			this.post((err, data) => {
				if (err) {
					return reject(data);
				}
				return resolve(data);
			});
		});
	}
}

/* * * * * * * * *
 * Export Module *
 * * * * * * * * */
module.exports = UploadRequest;
