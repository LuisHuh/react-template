/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description WORDLPAY ENCRYPT FILE
 */
"use strict";

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
/* const worldpayCse = require("./WorldpayCse"); */
const { RequestClient } = require("../../app/RequestMethod");
const WorldpayCse = require("./WorldpayCse");
const getErrors = require("./Codes");

class WorldPay {
	constructor() {}

	/**
	 * Asigna  la llave pública recuperada con anterioridad.
	 * @param {String|URL} url Endpoint de llave pública.
	 */
	set publicKey(key) {
		this._publicKey= key || "";
	}

	/**
	 * Asigna el endpoint a consumir para obtener la llave pública.
	 * @param {String|URL} url Endpoint de llave pública.
	 */
	set publicKeyURL(url) {
		this._publicKeyURL = url;
	}

	/**
	 * @returns {String} Endpoint de llave pública.
	 */
	get publicKeyURL() {
		return this._publicKeyURL || "";
	}

	/**
	 * Asigna el token para el consumo de las APIs de Clever.
	 * @param {String} token Token Bearer.
	 */
	set authorization(token) {
		this._authorization = token;
	}

	/**
	 * @returns {String} Token Bearer.
	 */
	get authorization() {
		return this._authorization || "";
	}

	/**
	 * Asigna los datos necesarios para obtener la llave pública..
	 * @param {Object} data Datos de la llave pública.
	 * @param {String?} data.bank Banco — *__WORLDPAY__ Default*.
	 * @param {String?} data.currency Tipo de moneda — *__USD__ Default*.
	 * @param {String} data.society Identificador de la sociedad — *Required*.
	 * @param {String} data.idClient Identificador del cliente de finanzas — *Required*.
	 * @param {String} data.idHotel Identificador del hotel — *Required*.
	 */
	setPublicKeyData({
		idClient: idcliente,
		idHotel: hotel,
		society: cia,
		currency,
		bank,
	}) {
		const data = {
			bank: bank || "WORLDPAY",
			divisa: currency || "USD",
			cia,
			idcliente,
			hotel,
		};
		this._publicKeyData = data;
	}

	/**
	 * Regresa los datos de la llave pública.
	 * @returns {{}} Datos de llave pública.
	 */
	get publicKeyData() {
		return this._publicKeyData || {};
	}

	/**
	 * Asigna los datos necesarios para generar el encriptado de la tarjeta.
	 * @param {Object} data Datos de la tarjeta.
	 * @param {String} data.cardHolderName Nombre del tarjetahabiente de la tarjeta — *Required*.
	 * @param {String} data.cardNumber Número de la tarjeta — *Required*.
	 * @param {String} data.expiryMonth Mes de expiración de la tarjeta *(__MM__)* — *Required*.
	 * @param {String} data.expiryYear Año de expiración de la tarjeta *(__YYYY__)* — *Required*.
	 * @param {String} data.cvc Código de seguridad de la tarjeta __123__ ó __1234__ — *Required*.
	 */
	setEncryptionData(data) {
		this._encryptionData = data;
	}

	/**
	 * Regresa los datos para generar el encriptado de la tarjeta.
	 * @returns {{}} Datos de la tarjeta.
	 */
	get encryptionData() {
		return this._encryptionData || {};
	}

	/**
	 * Obtiene la llave pública para el encriptado.
	 * @param {Object} data Datos de request para obtener la llave pública.
	 * @param {String?} data.bank Banco — *__WORLDPAY__ Default*.
	 * @param {String?} data.currency Tipo de moneda — *__USD__ Default*.
	 * @param {String} data.society Identificador de la sociedad — *Required*.
	 * @param {String} data.idClient Identificador del cliente de finanzas — *Required*.
	 * @param {String} data.idHotel Identificador del hotel — *Required*.
	 * @returns {Promise<String>} Llave pública.
	 */
	async getPublicKey(data) {
		try {
			data = data || this.publicKeyData;
			let res = await RequestClient(this.publicKeyURL, data, "POST", {
				Authorization: this.authorization,
			});
			res = res.data || {};
			return res.key || "";
		} catch (e) {
			return e;
		}
	}

	/**
	 * Genera el encriptado de los datos de la tarjeta.
	 * @returns {Promise<String>} Encripted data.
	 */
	 encrypt() {
		try {
			const key =  this._publicKey;
			WorldpayCse.setPublicKey(key);
			return WorldpayCse.encrypt(this.encryptionData, (codes) => this.errorHandler(codes, 1));
		} catch (e) {
			return e;
		}
	}

	/**
	 * Regresa los mensajes de error en el idioma seleccionado.
	 * @param {Array<Number>} errorCodes Códigos de error.
	 * @param {1|2} idLang Indetificador de idioma — *1: inglés | 2: español*.
	 * @returns {Array} Mensajes.
	 */
	errorHandler(errorCodes, idLang) {
		const errors = getErrors(errorCodes);
		idLang = idLang == 1? "en" : "es";
		errorCodes = errors.map(err => err[idLang]);
		throw errorCodes;
	}
}

/* * * * * * * * *
 * Export Module *
 * * * * * * * * */
module.exports = WorldPay;
