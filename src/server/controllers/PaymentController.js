/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description PAYMENT CONTROLLER FILE
 */
"use strict";

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const Controller = require("../app");
const Api = require("../app/endpoints");
const ResponseFormatter = require("../libraries/ResponseFormatter");
const PaymentException = require("../libraries/ThrowExceptions");
const Auth = require("../app/AuthRequest");
const DataMask = require("../libraries/DataMasker");
const { MailErrorNotification } = require("../libraries/Notifications");
const { setEnv, getCreditCardEncryption } = require("./SharedController");

class PaymentController extends Controller {
	constructor(req, res, next) {
		super(req, res, next);
		setEnv(req, res, next);
	}
	/**
	 * Obtiene los datos de
	 */
	async getTransactionLink() {
		try {
			const { id } = this.jsonRawParams;
			if (!id) {
				throw new PaymentException(400, "Id is required");
			}

			this.url = this.path(Api.getTransactionLink, id);
			this.setAuthorization();
			const linkInfo = await this.get();
			if (linkInfo instanceof Object) {
				const tmp = this.jsonParse(linkInfo.data);
				const USDLimit = 10000;
				if (tmp.divisa != "MXN") tmp.paymentLimit = USDLimit;
				else {
					let cambio = 0;
					if ((cambio = parseFloat(tmp.exchange)) > 0) {
						tmp.paymentLimit = USDLimit * cambio;
					}
				}
				linkInfo.data = this.jsonParse(tmp, true);
				const { code, content, type, ...rest } = linkInfo;

				const data = this.serializeData(rest);
				const message = new ResponseFormatter().setData(data);
				return this.sendResponse(message);
			}

			throw new PaymentException(502, "Unable to process this link");
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	/**
	 * Obtiene los datos del hash encriptado
	 */
	getDataHash() {
		let message = {};
		const format = new ResponseFormatter();
		const requestData = this.jsonRawBody;
		let data = requestData.body;

		Auth.tokenGenerator(data)
			.then((authRes) => {
				authRes = authRes.data || authRes;
				if (!authRes.hasOwnProperty("token"))
					throw new PaymentException(
						401,
						"Unable to process token",
						"No se regreso ningun token"
					);
				this.token = authRes.token;
				Auth.tokenDecoder(this.token)
					.then((authDec) => {
						authDec = authDec.data || authDec;
						if (
							!authDec.hasOwnProperty("idToken") ||
							!authDec.hasOwnProperty("username")
						)
							throw new PaymentException(
								401,
								"Invalid token",
								"No contiene el usuario y el idToken"
							);
						const { idToken, username } = authDec;

						message = new ResponseFormatter().setData({
							username,
							idToken,
						});
						this.sendResponse(message);
					})
					.catch((e) => {
						console.log("e =>>>>>>>", e);
					});
			})
			.catch((e) => {
				message = new ResponseFormatter(e.clientMessage, e.code, true);
				this.sendResponse(message);
			});
	}

	/**
	 * ! POST
	 * @author ixicale - 2020.Ago.20
	 * @version 2020.Ago.20.ixicale
	 * @description API para pagar servicios parcial o total
	 * @type {POST request}
	 */
	doPayment() {
		try {
			const { billData, cardData, extra, DataCard } = this.jsonRawBody;
			let DataCar = DataCard || {};
			let idevent_grupo = null;
			if (!(idevent_grupo = extra.e)) {
				throw new PaymentException(
					400,
					`Id group is required.`,
					"Id del grupo es requerido."
				);
			}
			// build payload object
			let paymentlist = {};
			extra.d.forEach((item, key) => {
				paymentlist[`payment_amount_${item.id}`] = {
					value: item.amount,
					concepto_ingreso: item.description,
					idevent_detalle_item: item.id,
					idconcepto_ingreso: item.idconcepto_ingreso
						? item.idconcepto_ingreso
						: "2",
				};
			});

			// build payload to send
			const d = {
				data: {
					divisa: extra.a,
					idevent_grupo: extra.e,
					idfin_forma_pago: 1,
					paymentlist: paymentlist,
					tipo_cambio: extra.c,
					limite:extra.h,
					idioma: extra.g,
					tipo_pago:extra.i
				},
				importe: extra.b,
				online: false,
				tc_apellido: billData.lastName,
				tc_ciudad: billData.city,
				tc_codigo: cardData.cvc,
				tc_codigo_postal: billData.zipcode,
				tc_direccion: billData.address,
				tc_mm_exp: cardData.mmExp,
				tc_nombre: billData.name,
				tc_numero: cardData.cardNumber,
				tc_pais: billData.country,
				tc_tipo_tarjeta: cardData.card,
				tc_yy_exp: cardData.yyExp,
				username: this.username,
			};

			// Se agrega encriptado

			const encript =  getCreditCardEncryption({
				idevent_grupo,
				pago_online: { ...billData, ...cardData },
				DataCar
			});
			if (Array.isArray(encript)) {
				const formatResponse = new ResponseFormatter(
					"Bad Request",
					400,
					true
				).setData(encript);
				return this.sendResponse(formatResponse);
			} else if (typeof encript === "string") {
				d.data.pci_node = encript;
			}

			this.data = d;
			const responseType = "POST";

			this.setAuthorization();
			this.method = responseType;
			this.url = this.path(Api.payservices);
			let resp = {};
			this.post((error, response) => {
				try {
					resp = response;
					if (error)
						throw new PaymentException(
							response.code,
							response.clientMessage,
						response.message
						);

					this.data = this.keyCleaner(this.data);
					const { id, ...rest } = response.data || response || {};
					this.data = Object.assign(
						{},
						{ postDataResp: rest },
						this.data,
						{
							id,
						}
					);
					const formatResponse = new ResponseFormatter(
						"Resource Created",
						200,
						false
					).setData(this.data);
					return this.sendResponse(formatResponse);
				} catch (e) {
					const { data, importe, online, username, ...rest } = this.data;
					const encoded = DataMask(rest, {
						symbol: "*",
						listignore: ["tc_apellido", "tc_nombre"],
						length: [{ key: "tc_numero", value: 4 }],
					});

					const correo = new MailErrorNotification(this);
					correo.url = this.url;
					correo.method = responseType;
					correo.requestResponse = resp;
					correo.catchError = e;
					correo.payload = { data, importe, online, username, ...encoded };
					correo.send();

					const formatResponse = new ResponseFormatter(
						e.clientMessage,
						e.code,
						true
					);
					return this.sendResponse(formatResponse);
				}
			});
		} catch (e) {
			const formatResponse = new ResponseFormatter(
				e.clientMessage,
				e.code,
				true
			);
			return this.sendResponse(formatResponse);
		}
	}
}

/* * * * * * * * *
 * Export Module *
 * * * * * * * * */
module.exports = PaymentController;
