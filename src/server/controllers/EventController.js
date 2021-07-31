/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description EVENT CONTROLLER FILE
 */
"use strict";

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const Controller = require("../app");
const Api = require("../app/endpoints");
const ResponseFormatter = require("../libraries/ResponseFormatter");
const EventException = require("../libraries/ThrowExceptions");
const ControllerException = require("../libraries/ThrowExceptions");
const DataMask = require("../libraries/DataMasker");
const { MailErrorNotification } = require("../libraries/Notifications");
const { setEnv, getCreditCardEncryption } = require("./SharedController");

class EventController extends Controller {
	constructor(req, res, next) {
		super(req, res, next);
		setEnv(req, res, next);
	}

	/**
	 * Obtiene la suma total de lo pagado y lo faltante por pagar de todos los eventos
	 */
	balance() {
		try {
			const params = this.jsonRawParams;
			if (!params.id) {
				throw new EventException(
					400,
					"Event id is required",
					"No se recibio el id del grupo del evento"
				);
			}

			this.url = Api.eventsummary;
			return this.getResourceId(params.id);
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	/**
	 * Obtiene todos los eventos
	 */
	events() {
		try {
			const params = this.jsonRawParams;
			if (!params.id) {
				throw new EventException(
					400,
					"Event id is required",
					"No se recibio el id del grupo del evento"
				);
			}

			this.url = Api.events;
			return this.getResourceId(params.id);
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	/**
	 * Obtiene las locaciones del evento seleccionado
	 */
	locations() {
		try {
			const params = this.jsonRawParams;
			if (!params.id) {
				throw new EventException(
					400,
					"Event id is required",
					"No se recibio el id del grupo del evento"
				);
			}

			this.url = Api.eventlocations;
			return this.getResourceId(params.id);
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	/**
	 * Obtiene las sevivios del evento seleccionado
	 */
	services() {
		try {
			const params = this.jsonRawParams;
			if (!params.id) {
				throw new EventException(
					400,
					"Event id is required",
					"No se recibio el id del grupo del evento"
				);
			}

			this.url = Api.eventservicesInWeddingextra;
			return this.getResourceId(params.id);
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	/**
	 * Obtiene datos del grupo segun un folio
	 */
	getelementbyfolio() {
		try {
			const params = this.jsonRawParams;
			if (!params.folio) {
				throw new EventException(
					400,
					"folio id is required",
					"No se recibio el blockcode del grupo del evento"
				);
			}

			this.url = Api.eventsgroupbyfolio;
			return this.getResourceId(params.folio);
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	roomingList() {
		try {
			const { resort, blockcode } = this.jsonRawParams;
			if (!resort || !blockcode) {
				throw new EventException(
					400,
					"Resort and blockode id is required",
					"Falta el id de la propiedad o el blockcode"
				);
			}

			this.url = this.path(Api.roominglist, resort, blockcode);
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	/**
	 * Obtiene las sevivios del evento seleccionado
	 */
	getpromotionsbyblockcode() {
		try {
			const params = this.jsonRawParams;
			if (!params.blockcode) {
				throw new EventException(
					400,
					"blockcode id is required",
					"No se recibio el blockcode del grupo del evento"
				);
			}

			this.url = Api.eventspromotionsbyblockcode;
			return this.getResourceId(params.blockcode);
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	/**
	 * Obtiene las sevivios del evento seleccionado
	 */
	getTermsAndPolitics() {
		try {
			const params = this.jsonRawParams;
			if (!params.society) {
				throw new EventException(
					400,
					"society id is required",
					"No se recibio el society"
				);
			}

			this.url = Api.eventsgetTermsAndPoliticse;
			return this.getResourceId(params.society);
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	/**
	 * Obtiene las sevivios del evento seleccionado
	 */
	getLinksbyGroup() {
		try {
			const params = this.jsonRawParams;
			if (!params.id) {
				throw new EventException(400, "id is required", "need id group ");
			}

			this.url = Api.eventsgetLinksByGroup;
			return this.getResourceId(params.id);
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	//#region ------------------------------------------- //! 'reserva_grupo_agencia'
	/**
	 * @author ixicale - 2020.May.07
	 * API to returns a list from 'reserva_grupo_agencia' by idevent_grupo && idclv_propiedad
	 * ! GET
	 * @type {GET request}
	 */
	getReservasAll() {
		const { idevent_grupo, idclv_propiedad } = this.jsonRawParams;
		const url = [
				Api.reserva_gr_ag__byGP,
				idevent_grupo /* , idclv_propiedad */,
			],
			isError = !idevent_grupo || !idclv_propiedad,
			errorContent = {
				eng: "Resort or group id is required",
				esp: "Falta el id de la propiedad o el grupo",
			};
		this.resourceLogic(url, isError, errorContent);
	}

	/**
	 * @author ixicale - 2020.May.26
	 * API to returns an item from 'reserva_grupo_agencia'
	 * ! GET
	 * @type {GET request}
	 */
	getReservasId() {
		const { id } = this.jsonRawParams;
		const url = [Api.reserva_gr_ag__byId, id],
			isError = !id,
			errorContent = {},
			responseType = "getbyid";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	/**
	 * @author ixicale - 2020.May.26
	 * API to CREATE/INSERT object to 'reserva_grupo_agencia'
	 * ! POST
	 * @type {POST request}
	 */
	postReservas() {
		this.json = false;
		this.data = this.jsonRawBody;
		const url = [Api.reserva_gr_ag__post],
			isError = false,
			errorContent = {},
			responseType = "post";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	/**
	 * @author ixicale - 2020.May.26
	 * API to UPDATE an item from 'reserva_grupo_agencia'
	 * ! PUT
	 * @type {PUT request}
	 */
	putReservas() {
		const { id } = this.jsonRawParams;
		const url = [Api.reserva_gr_ag__put, id],
			isError = !id,
			errorContent = {},
			responseType = "put";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}
	//#endregion ------------------------------------------- //! 'reserva_grupo_agencia'

	/**
	 * @author ixicale - 2020.Ago.07
	 * API to ADD grupo_pago
	 * ! POST
	 * @type {PUT request}
	 */
	postGrupoPago() {
		try {
			this.data = {
				...this.basicInfoPost,
				...this.jsonRawBody,
				id_pago: 0,
				autorizacion: "100001",
				merchant: "100001",
				ticket: "100001",
				tipo: 3,
			};
			const url = [Api.eventgrupopagopost],
				isError = false,
				errorContent = { code: 404 },
				responseType = "POST";
			return this.resourceLogic(url, isError, errorContent, responseType);
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	putEventsDetail() {
		const { id } = this.jsonRawParams;
		const url = [Api.putEventDetailItem, id],
			isError = !id,
			errorContent = {},
			responseType = "put";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	postServiceDi() {
		this.url = Api.postServiceDI;
		this.data = {
			...this.jsonRawBody,
			fecha_hora: "1000-01-01 00:00:00",
			pax: 0,
		};

		const url = [Api.postServiceDI],
			isError = false,
			errorContent = {},
			responseType = "post";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	getDetalleItemById() {
		try {
			const params = this.jsonRawParams;
			if (!params.id) {
				throw new EventException(
					400,
					"Event id is required",
					"No se recibio el id del grupo del evento"
				);
			}
			this.url = this.path(Api.getDetalleItemById, params.id, 0);
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	postPositiveBalance() {
		this.data = this.jsonRawBody;

		const url = [Api.postPositiveBalance],
			isError = false,
			errorContent = {},
			responseType = "post";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	postPayWithPositiveBalance() {
		this.data = this.jsonRawBody;

		const url = [Api.postPositiveBalance],
			isError = false,
			errorContent = {},
			responseType = "post";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	getPositiveBalance() {
		try {
			const params = this.jsonRawParams;
			if (!params.id) {
				throw new EventException(
					400,
					"Event id is required",
					"No se recibio el id del grupo del evento"
				);
			}

			this.url = Api.getPositiveBalance;
			return this.getResourceId(params.id);
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	getPositiveBalanceSA() {
		try {
			const params = this.jsonRawParams;
			if (!params.id) {
				throw new EventException(
					400,
					"Event id is required",
					"No se recibio el id del grupo del evento"
				);
			}

			this.url = Api.getPositiveBalanceSA;
			return this.getResourceId(params.id);
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	/**
	 * ! POST
	 * @author ixicale - 2020.Ago.05
	 * @version 2020.Dic.16.ixicale
	 * @description API para agregar saldo a favor del grupo
	 * @type {POST request}
	 */
	async addBalance() {
		try {
			const url = [Api.addBalance];
			const responseType = "POST";
			let id = null;

			this.data = Object.assign(
				{},
				{ usuario_creacion: this.username },
				this.jsonRawBody
			);

			if (!(id = this.data.idevent_grupo)) {
				throw new ControllerException(
					400,
					`Id group is required.`,
					"Id del grupo es requerido."
				);
			}

			const encript =  getCreditCardEncryption();
			if (Array.isArray(encript)) {
				const formatResponse = new ResponseFormatter(
					"Bad Request",
					400,
					true
				).setData(encript);
				return this.sendResponse(formatResponse);
			} else if (typeof encript === "string") {
				const { pago_online, ...rest } = this.data;
				if (pago_online instanceof Object) {
					pago_online.pci_node = encript;
				}
				this.data = { pago_online, ...rest };
			}

			this.setAuthorization();

			this.method = responseType;
			this.url = this.path(...url);
			let resp = {};
			this.post((error, response) => {
				try {
					resp = response;
					if (error){
					throw new ControllerException(
						response.code,
						response.clientMessage,
						response.message
					);
					}
					this.data = this.keyCleaner(this.data);
					const { id, ...rest } = response.data || response || {};
					this.data = Object.assign(
						{},
						{ postDataResp: rest },
						this.data,
						{ id }
					);
					const formatResponse = new ResponseFormatter(
						"Resource Created",
						200,
						false
					).setData(this.data);
					this.sendResponse(formatResponse);
				} catch (e) {
					const { pago_online, ...rest } = this.data;
					const encoded = DataMask(pago_online, {
						symbol: "*",
						listignore: ["name", "lastName", "payment"],
						length: [{ key: "cardNumber", value: 4 }],
					});
					if (encoded.pci_node) {
						delete encoded.pci_node;
					}

					const correo = new MailErrorNotification(this);
					correo.url = this.url;
					correo.method = responseType;
					correo.requestResponse = resp;
					correo.catchError = e;
					correo.payload = { pago_online: encoded, ...rest };
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

	getServicesLocationEvent() {
		try {
			const {
				idvent_evento,
				id_locacion,
				showcanceled,
			} = this.jsonRawParams;
			if (!idvent_evento || !id_locacion || !showcanceled) {
				throw new EventException(
					400,
					"idvent_evento and id_locacion id is required"
				);
			}

			this.url = this.path(
				Api.getServicesLocationEvent,
				idvent_evento,
				id_locacion,
				showcanceled
			);
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	getEventsAndLocations() {
		try {
			const { idevent_grupo } = this.jsonRawParams;
			if (!idevent_grupo) {
				throw new EventException(
					400,
					"idvent_evento and id_locacion id is required"
				);
			}

			this.url = this.path(Api.getEventsAndLocations, idevent_grupo);
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	/**
	 * ! GET
	 * @author ixicale - 2020.Ago.14
	 * @version 2020.Ago.14.ixicale
	 * @description API para agregar felicitaciones/regalos
	 * @type {GET request}
	 */
	getByIdEventoLocacion() {
		const { id } = this.jsonRawParams;
		const url = [Api.getDI__byIdEventoLocacion, id],
			isError = !id,
			errorContent = {},
			responseType = "get";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	/**
	 * @author ersanchez - 2020.Jul.20
	 * API to CREATE/INSERT object to 'event_detalle_pago|event_detalle_item'
	 * ! POST
	 * @type {POST request}
	 * @version ixicale.2020.Sep.24
	 */
	postSinTarjeta() {
		const d = this.jsonRawBody;
		let aux = {};
		d.list_pay.map((service) => {
			const { idevent_detalle_item, toPay, lastToPay } = service;
			aux[idevent_detalle_item] = {
				...service,
				cantidad_pendiente: lastToPay || toPay,
				cantidad_pendiente_seleccionada: lastToPay || toPay,
				notas: " ",
			};
		});
		this.data = {
			...this.basicInfoPost,
			...d,
			list_pay: aux,
		};
		const url = [Api.postSinTarjeta],
			isError = false,
			errorContent = {},
			responseType = "post";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	/**
	 * @author ixicale - 2020.Oct.08
	 * API to return event lists w/ locations w/ services
	 * ! GET
	 * @type {GET request}
	 * @version ixicale.2020.Oct.08
	 */
	getServicesLocationEventByGroup() {
		const { id } = this.jsonRawParams;
		const url = [Api.getServicesLocationEventByGroup, id, 0],
			isError = !id,
			errorContent = {},
			responseType = "get";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	servicelocationevent() {
		try {
			const { idevent, idLocation } = this.jsonRawParams;
			if (!idevent || !idLocation) {
				throw new EventException(
					400,
					"Resort and blockode id is required",
					"Falta el id de la propiedad o el blockcode"
				);
			}

			this.url = this.path(Api.items4, idevent, idLocation, 0);
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	putDetailItem() {
		try {
			const { id } = this.jsonRawBody;

			if (!id) {
				throw new EventException(400, "Id detalle item is required");
			}

			this.url = this.path(Api.putEventDetailItem);
			return this.updateResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	putEventsGroup() {
		try {
			this.data = this.jsonRawBody;
			this.url = this.path(Api.eventgroup);
			return this.updateResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	getPais() {
		try {
			const { idioma } = this.jsonRawParams;
			if (!idioma) {
				throw new EventException(400, "Idioma is requeride");
			}
			this.url = this.path(Api.getPais, idioma);
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	getDataSheet() {
		try {
			const { idioma, eventgroup } = this.jsonRawParams;
			if (!idioma || !eventgroup) {
				throw new EventException(
					400,
					"Idioma is requeride",
					"EventGroup is requeride"
				);
			}
			this.url = this.path(Api.getdatadetailsheet, idioma, eventgroup);
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	/**
	 * @author Added here by: Melissa Mendiola
	 * @description API que me regresa las direcciones.
	 */
	getBillingAddress() {
		try {
			const { id } = this.jsonRawParams;
			if (!id) {
				throw new EventException(400, "ID is requeride");
			}
			this.url = this.path(Api.eventbillingaddress, id);
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}
	/**
	 * @author Added here by: Melissa Mendiola
	 * @description API para hacer update a direcciones.
	 * @version 2020.Sep.18.ixicale
	 */
	putBillingAddress() {
		try {
			this.data = this.jsonRawBody;
			this.setAuthorization();
			this.url = this.path(Api.eventbillingaddressput);
			return this.updateResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	/**
	 * @author Added here by: Melissa Mendiola
	 * @version 2020.Ago.19.ixicale
	 * ! POST
	 * @description API para hacer insert en profile y en events | Direcciones
	 */
	postBillingAddress() {
		this.data = { ...this.jsonRawBody, ...this.basicInfoPost };
		const url = [Api.eventbillingaddresspost],
			isError = false,
			errorContent = {},
			responseType = "post";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}
	/**
	 * Api para recuperar los datos del grupo
	 * amatos 06/06/2020
	 */
	getEventGroup() {
		try {
			const { id } = this.jsonRawParams;
			if (!id) {
				throw new EventException(400, "Id is requeride");
			}
			this.url = this.path(Api.eventData, id);
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	/**
	 * @author Added here by: Melissa Mendiola
	 * @description API para consultar los domicilios por block_code o block_id.
	 */
	getGeneral() {
		const { id } = this.jsonRawParams;
		if (!id) {
			throw new EventException(400, "Id is requeride");
		}

		this.url = Api.eventdomicilios;
		this.setAuthorization();

		const object = {
			block_code: id,
			block_id: "",
		};
		this.data = object;
		this.post((error, response) => {
			try {
				if (error) this.data = this.serializeData(this.data);
				const message = new ResponseFormatter(
					"Resource",
					200,
					false
				).setData(response.data);

				this.sendResponse(message);
			} catch (e) {
				const message = new ResponseFormatter(
					e.clientMessage,
					e.code,
					true
				);
				this.sendResponse(message);
			}
		});
	}

	/**
	 * @author Added here by: Melissa Mendiola
	 * @description API para actualizar el default de los domicilios.
	 */
	getDomicilios() {
		try {
			const { id } = this.jsonRawParams;
			if (!id) {
				throw new EventException(400, "Id is requeride");
			}
			this.setAuthorization();
			this.url = this.path(Api.eventputdefaultdomicilios, id);
			this.put((error, response) => {
				if (error)
					response.code,
						"Unable to update this resource",
						response.message;
				const message = new ResponseFormatter(
					"Resource has been updated",
					200
				).setData(response);
				return this.sendResponse(message);
			});
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}
	/**
	 * @author ixicale - 2020.Jul.25
	 * @description API para obtener todas las direcciones por id_grupo.
	 * ! GET
	 * @type {GET request}
	 */
	getDomiciliosByGroup() {
		const { id } = this.jsonRawParams;
		const url = [Api.billingAddressByGroup, id],
			isError = !id,
			errorContent = {},
			responseType = "get";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	/**
	 * Metodo que recupera el idlocacion y el idevento
	 * 2020-07-08 amatos
	 */
	getShoppingCart() {
		const { id, hotel } = this.jsonRawParams;
		const url = [Api.shoppingcart, id, hotel],
			isError = !id || !hotel,
			errorContent = {
				eng: "group or resort is required",
				esp: "Falta el grupo o el resort",
			};

		this.resourceLogic(url, isError, errorContent);
	}

	getWeddingExtras() {
		const { id, hotel } = this.jsonRawParams;
		const url = [Api.weddingextras, id, hotel],
			isError = !id || !hotel,
			errorContent = {
				eng: "group or resort is required",
				esp: "Falta el grupo o el resort",
			};

		this.resourceLogic(url, isError, errorContent);
	}

	getServiceShopping() {
		try {
			const params = this.jsonRawParams;
			if (!params.id || !params.propiedad) {
				throw new EventException(
					400,
					"Event detalle ID is required or propiedad is required",
					"No se recibio el event detalle item o la propiedad"
				);
			}

			this.url = this.path(Api.serviceShopping, params.id, params.propiedad);
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	getGroupDetail() {
		try {
			const params = this.jsonRawParams;
			if (!params.id ) {
				throw new EventException(
					400,
					"Event detalle ID is required  is required",
					"No se recibio el event detalle item "
				);
			}

			this.url = this.path(Api.getReservaCobro, params.id);
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	getLocationShoppingCart() {
		try {
			const params = this.jsonRawParams;
			if (!params.id) {
				throw new EventException(
					400,
					"Event id is required",
					"No se recibio el id del grupo del evento"
				);
			}

			this.url = Api.locationcarts;
			return this.getResourceId(params.id);
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	sendFamilyGift() {
		this.data = this.jsonRawBody;
		const url = [Api.sendFamilyGift],
			isError = false,
			errorContent = {},
			responseType = "post";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	SendEmailtoChangePassword() {
		this.data = this.jsonRawBody;
		const url = [Api.eventsSendEmailtoChangePassword],
			isError = false,
			errorContent = {},
			responseType = "post";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	getregularBooking() {
		this.data = this.jsonRawBody;
		const url = [Api.eventsgetReservationsByBlockcode],
			isError = false,
			errorContent = {},
			responseType = "post";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	getReservationsExcludedPM() {
		this.data = this.jsonRawBody;
		const url = [Api.eventsgetReservationsByBlockcodeExcludedPM],
			isError = false,
			errorContent = {},
			responseType = "post";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	getDataCheckIn() {
		this.data = this.jsonRawBody;
		const url = [Api.eventsgetDataAcept],
			isError = false,
			errorContent = {},
			responseType = "post";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	postAcceptTerms() {
		this.data = this.jsonRawBody;
		const url = [Api.eventspostAccept],
			isError = false,
			errorContent = {},
			responseType = "post";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	SendEmailNewLetter() {
		this.data = this.jsonRawBody;
		const url = [Api.eventsSendEmailNewLetter],
			isError = false,
			errorContent = {},
			responseType = "post";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	sendNotificationPlanner() {
		this.data = this.jsonRawBody;
		const url = [Api.eventssendNotificationPlanner],
			isError = false,
			errorContent = {},
			responseType = "post";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	getMaxMountByCard() {
		this.data = this.jsonRawBody;
		const url = [Api.eventsgetMaxMountByCard],
			isError = false,
			errorContent = {},
			responseType = "post";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	postServiciesCheckoutAllowed() {
		this.data = this.jsonRawBody;
		const url = [Api.eventspostServiciesCheckoutAllowed],
			isError = false,
			errorContent = {},
			responseType = "post";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	//#region    ----------------------------------------------------------- // ! 'event_reserva_grupo_agencia_gift'
	/**
	 * ! POST
	 * @author ixicale - 2020.Ago.14
	 * @version 2020.Ago.14.ixicale
	 * @description API para agregar felicitaciones/regalos
	 * @type {POST request}
	 */
	addGiftCard() {
		this.data = { ...this.jsonRawBody, ...this.basicInfoPost };
		const url = [Api.regalos__post],
			isError = false,
			errorContent = { code: 404 },
			responseType = "POST";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}

	/**
	 * ! GET
	 * @author ixicale - 2020.Oct.20
	 * @version 2020.Oct.20.ixicale
	 * @description API para obtener felicitaciones/regalos por grupo
	 * @type {GET request}
	 */
	getGiftsByGroup() {
		const { id } = this.jsonRawParams;
		const url = [Api.regalos__byGroup, id],
			isError = !id,
			errorContent = {},
			responseType = "get";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}
	//#endregion ----------------------------------------------------------- // ! 'event_reserva_grupo_agencia_gift'

	//#region    ----------------------------------------------------------- // ! 'event_transaction_link'
	/**
	 * ! PUT
	 * @author ixicale - 2020.Ago.17
	 * @version 2020.Ago.17.ixicale
	 * @description API para editar link
	 * @type {PUT request}
	 */
	putTransactionLink() {
		this.data = { ...this.jsonRawBody, ...this.basicInfoUpdate };
		const url = [Api.transactionLink__put];
		const isError = !this.data.id; // ID was sent
		const errorContent = { code: 404 };
		const responseType = "PUT";
		return this.resourceLogic(url, isError, errorContent, responseType);
	}
	//#endregion ----------------------------------------------------------- // ! 'event_transaction_link'

	/**
	 * @author amatos - 2020.Septiembre.30
	 * API to returns a list from 'reserva_grupo_agencia' by idevent_grupo && idclv_propiedad
	 * ! GET
	 * @type {GET request}
	 */
	getServicesByCollections() {
		const { service, resort } = this.jsonRawParams;
		const url = [Api.servicescollection, service, resort],
			isError = !service || !resort,
			errorContent = {
				eng: "service or resort is required",
				esp: "Falta el servicio o el resort",
			};
		this.resourceLogic(url, isError, errorContent);
	}

	/**
	 * @author mmendiola - 2020.Nov.12
	 * @description API para obtener información del planner.
	 * @type {GET request}
	 */

	infoPlanner() {
		try {
			const { username } = this.jsonRawParams;
			if (!username) {
				throw new EventException(400, "username is requeride");
			}
			this.url = this.path(Api.eventinfoplanner, username);
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	/**
	 * @author angesolis - 2021.Abril.21
	 * API to returns a list from 'infopostlogin' by hotel and lang
	 * ! GET
	 * @type {GET request}
	 */
	getLinksBusinessUnits() {
		try {
			const { hotel, lang } = this.jsonRawParams;
			const isError = !hotel || !lang;
			if (isError) {
				throw new EventException(
					400,
					"property or lang is required",
					"Falta el hotel o el idioma",
				);
			}

			this.url = this.path(Api.getLinksBusinessunits, hotel, lang );
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}

	/**
	 * @author gadrian
	 * API to returns info Todo-list from events
	 * ! GET
	 * @type {GET request}
	 */
	getTodo() {
		try {
			const { lang } = this.jsonRawParams;
			this.url = this.path(Api.todoList, lang);
			return this.getResource();
		} catch (e) {
			const message = new ResponseFormatter(e.clientMessage, e.code, true);
			return this.sendResponse(message);
		}
	}
}

/* * * * * * * * *
 * Export Module *
 * * * * * * * * */
module.exports = EventController;
