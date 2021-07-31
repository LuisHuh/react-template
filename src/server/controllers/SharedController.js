/**
 * Controlador que comparte metodos entre controladores.
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description SHARE CONTROLLER FILE
 */
"use strict";

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const RequestController = require("../app");
const Api = require("../app/endpoints");
const WorldPay = require("../libraries/WorldPay");
const ResponseFormatter = require("../libraries/ResponseFormatter");
const AuthException = require("../libraries/ThrowExceptions");
const { ENABLE_ENCRYPTED_PAYMENT } = require("../../../config/global");

class SharedController {
	/**
	 * Setea los valores del request.
	 * @param {Request} req Petición.
	 * @param {Response} res Respuesta.
	 * @param {()=>{}} next Siguiente controlador.
	 */
	static setEnv(req, res, next) {
		global.SharedRequest = { req, res, next };
	}

	/**
	 * Regresa la información del grupo.
	 * @param {Number} id Identificador del grupo.
	 * @returns {Promise<Response>} Grupo
	 */
	static  getGroupDetail(id) {
		const _this = global.SharedRequest;
		const request = new RequestController(_this.req, _this.res, _this.next);
		request.setAuthorization();

		// Se obtiene folio y sociedad.
		request.url = request.path(Api.getReservaCobro, id);
		let _sociedad =  request.get();
		_sociedad = _sociedad.data || {};
		if (Array.isArray(_sociedad) && _sociedad.length > 0) {
			_sociedad = _sociedad[0];
		}
		const {
			folio,
			hotel: idHotel,
			sociedad,
			idevent_datos_sociedad: idSociedad,
		} = _sociedad;

		request.url = request.path(Api.eventData, id);
		let group =  request.get();
		group = { folio, idHotel, sociedad, idSociedad, ...group };

		return group;
	}

	/**
	 * Regresa los datos de la tarjeta cifrada
	 * @param {Object} data Datos del encriptado.
	 * @param {Number} data.idevent_grupo Id del grupo.
	 * @param {String} data.sociedad ISO sociedad.
	 * @param {Object} data.pago_online Datos de la tarjeta.
	 * @param {String} data.pago_online.name Nombre del tarjetahabiente.
	 * @param {String} data.pago_online.lastName Apellido del tarjetahabiente.
	 * @param {String} data.pago_online.cardNumber Número de la tarjeta.
	 * @param {String} data.pago_online.mmExp Mes de expiración de la tarjeta.
	 * @param {String} data.pago_online.yyExp Año de expiración de la tarjeta.
	 * @param {String} data.pago_online.cvc Código de seguridad de la tarjeta.
	 */
	static  getCreditCardEncryption(data) {
		try {
			const _this = global.SharedRequest;
			const request = new RequestController(
				_this.req,
				_this.res,
				_this.next
			);
			request.setAuthorization();
			const {  pago_online,  DataCard } = data || request.jsonRawBody;
			let EncriptRequired = false;
			if(!DataCard) EncriptRequired = DataCard.key_required;
			// Se inicia encriptación.
			if (EncriptRequired) {
				const worldpay = new WorldPay();
				const { name, lastName, cardNumber, mmExp, yyExp, cvc } =
					pago_online || {};
					if(DataCard){
						worldpay.publicKey = DataCard.key;
					}
				worldpay.authorization = request.authorization;
				worldpay.setEncryptionData({
					cardHolderName: `${name} ${lastName}`,
					cardNumber: cardNumber,
					expiryMonth: mmExp,
					expiryYear: yyExp,
					cvc: cvc || null,
				});

            return  worldpay.encrypt();
			}

			return null;
		} catch (e) {
			return null;
		}
	}

	/**
	 * Valida si el pago requiere encriptado
	 * @param {'PRG'|'GCH'|'NOR'} society Sociedad
	 * @returns {boolean} Encripted?
	 */
	static isEncriptRequired(society) {
		if (
			(society === "PRG" || society === "GCH" || society === "NOR") &&
			ENABLE_ENCRYPTED_PAYMENT
		) {
			return true;
		}

		return false;
	}
}

/* * * * * * * * *
 * Export Module *
 * * * * * * * * */
module.exports = SharedController;
