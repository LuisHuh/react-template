/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description DATAMASKER CLASS FILE. Replace sensitive data with symbols.
 */

//
// EXAMPLE
// const data = {
//     name: "Luis",
//     lastName: "Huh",
//     age: 24,
//     height: 1.55,
//     skills: ["can speak English", "can swimming"],
//     info: {
//      // children: 0,
//      // hobbies: {}
//     }
// };
// console.log(DataMask(data, {length: [{key: "name", value: 2}, {key: "lastName", value: 1}]}));
//

"use strict";

/**
 * Valores por defecto.
 */
let _defaults = {
	/**
	 * Symbol mask — **•** *Default*.
	 * @type {String}
	 */
	symbol: "•",

	/**
	 * Visible length, end to start — **0** *Default*.
	 * @type {Number|Array<{key: String, value: Number}>}
	 */
	length: 0,

	/**
	 * Ignore list.
	 * @type {Array<String>}
	 */
	listignore: [],
};

/**
 * Replace values.
 * @param {String} value Data to replace.
 * @param {String} symbol Symbol mask.
 * @param {Number} length Visible length, end to start.
 * @return {String|false} *False* if data is empty or incorrect params.
 */
function replaceValue(value, symbol, length) {
	if (typeof value === "string" && symbol && length >= 0) {
		const textLength = value.length;

		if (textLength <= length) return value;

		const start = textLength - length;

		return value.substr(0, start).replace(/./g, symbol) + value.substr(start);
	}

	return false;
}

/**
 * Replace sensitive data with symbols
 * @class DataMasker
 */
class DataMasker {
	/**
	 * @constructor
	 * @param {String|Number|Array|{}} data Sensitive data
	 * @param {_defaults} options Options.
	 */
	constructor(data, options) {
		/**
		 * Options.
		 */
		this.options = Object.assign({}, DataMasker.defaults, options);

		/**
		 * Sensitive data.
		 */
		this.data = data;

		/**
		 * Ignore List
		 */
		DataMasker._listIgnore = this.options.listignore;

		/**
		 * Return masked data.
		 */
		this.getMaskedData = this._getMaskedData;
	}

	/**
	 * Default options.
	 */
	static get defaults() {
		return _defaults;
	}

	/**
	 * Check what type of values was typed and redirect to correct.
	 * @param {String|Array|{}|String} data Sensitive data.
	 * @returns {String|Array|{}|String} Replaced data.
	 */
	_getMaskedData() {
		const { symbol, length } = this.options;
		const data = this.data;

		if (typeof data === "number") {
			return DataMasker._replaceNumber(data, symbol, length);
		} else if (typeof data === "string") {
			return DataMasker._replaceString(data, symbol, length);
		} else if (Array.isArray(data)) {
			return DataMasker._replaceArray(data, symbol, length);
		} else if (data instanceof Object) {
			return DataMasker._replaceObject(data, symbol, length);
		} else {
			return "DataMasker — Invalid data";
		}
	}

	/**
	 * Replace array data.
	 * @param {Array} values Array data.
	 * @param {String} symbol Symbol mask.
	 * @param {Number} length Visible length, end to start.
	 * @returns {Array} Replaced values.
	 */
	static _replaceArray(values, symbol, length) {
		return values.map((val) => {
			if (val instanceof Object) {
				return DataMasker._replaceObject(val, symbol, length);
			}

			return `DataMasker — ${typeof val} don't supported.`;
		});
	}

	/**
	 * Replace object data.
	 * @param {{}} values Object data.
	 * @param {String} symbol Symbol mask.
	 * @param {Number} length Visible length, end to start.
	 * @returns {{}} Replaced values.
	 */
	static _replaceObject(values, symbol, length) {
		const tmp = {};

		for (const key in values) {
			if (Object.hasOwnProperty.call(values, key)) {
				const val = values[key];
				let _length = length;

				if (Array.isArray(length)) {
					let index = -1;
					if ((index = length.findIndex((l) => l.key == key)) > -1) {
						let obj = {};
						if ((obj = length[index]) instanceof Object) {
							_length = length[index].value || 0;
						}
					} else {
						_length = 0;
					}
				}

				if (DataMasker._listIgnore.indexOf(key) == -1) {
					if (typeof val === "string") {
						tmp[key] = DataMasker._replaceString(val, symbol, _length);
					} else if (typeof val === "number") {
						tmp[key] = DataMasker._replaceNumber(val, symbol, _length);
					} else {
						if (Array.isArray(val)) {
							tmp[
								key
							] = `DataMasker — array don't supported. If you want to show, add to ignore list.`;
						} else {
							tmp[
								key
							] = `DataMasker — ${typeof val} don't supported. If you want to show, add to ignore list.`;
						}
					}
				} else {
					tmp[key] = val;
				}
			}
		}

		return tmp;
	}

	/**
	 * Replace number data.
	 * @param {Number} value Number value.
	 * @param {String} symbol Symbol mask.
	 * @param {Number} length Visible length, end to start.
	 * @returns {Number} Replaced value.
	 */
	static _replaceNumber(value, symbol, length) {
		length = Array.isArray(length) ? DataMasker.defaults.length : length;
		value = value.toString();
		return replaceValue(value, symbol, length);
	}

	/**
	 * Replace string data.
	 * @param {String} value String value.
	 * @param {String} symbol Symbol mask.
	 * @param {Number} length Visible length, end to start.
	 * @returns {String} Replaced value.
	 */
	static _replaceString(value, symbol, length) {
		length = Array.isArray(length) ? DataMasker.defaults.length : length;
		return replaceValue(value, symbol, length);
	}
}

/**
 * @static
 * @memberof DataMasker
 * @type {Array<String>}
 */
DataMasker._listIgnore = [];

/**
 * Replace sensitive data with symbols.
 * @param {String|Number|Array|{}} data Sensitive data
 * @param {_defaults} options Options.
 */
function DataMask(data, options) {
	return new DataMasker(data, options).getMaskedData();
}

module.exports = DataMask;
