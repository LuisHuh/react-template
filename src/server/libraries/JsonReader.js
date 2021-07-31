"use strict";
/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description JSONREADER CLASS FILE. Read json files.
 * @param {str} string
 */

const fs = require("fs");

class JsonReader {
	/**
	 * @constructor JsonReader
	 * @param {URL|String} path Ruta del archivo.
	 * @param {()=>void} callback Callback para obtener la respuesta del json.
	 */
	constructor(path, callback) {
		this._path = path || "";
		this.callback = callback;
		this.readFile();
	}

	get path() {
		return this._path;
	}

	set path(path) {
		this._path = path;
	}

	readFile() {
		if (!this.callback) this.callback = () => {};

		fs.readFile(this._path, (err, data) => {
			try {
				if (err) throw err;
				let _data = JSON.parse(data);
				this.callback(false, _data);
			} catch (e) {
				this.callback(true, e);
			}
		});
	}
}

module.exports = JsonReader;
