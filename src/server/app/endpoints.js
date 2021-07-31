/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description ENDPOINTS FILE
 */

/* * * * * * * * * * *
 * Import Statements *
 * * * * * * * * * * */
const { ENV, SYSTEM_ID } = require("../../../config/global");
const _HOSTS = require("./hosts");

/* * * * * * * * * * **
 *  Environment File  *
 * * * * * * * * * * **/
const _SYSTEM_CONTEXT = ENV || "dev";
const _SYSTEM_ID = SYSTEM_ID || 0;

/* * * **
 * Apis *
 * * * **/
const {
	apiAuth,
	apiFramework,
	apiCore,
	apiEvents,
	apiProducts,
	apiSales,
	apiAWS,
	apiFRM,
	apiLocal,
	apiFinances,
} = _HOSTS(_SYSTEM_CONTEXT);

/* * * * * * *
 * Endpoints *
 * * * * * * */

const _ENDPOINTS = {
	/**
	 * Endpoint para autenticar al usuario del sistema
	 * @property authenticate
	 * @type string
	 */
	authenticate: apiAuth("v2/authenticate"),

	/**
	 * Endpoint para generar un token de auth
	 * @property tokenizer
	 * @type string
	 */
	tokenizer: apiAuth("sessiontoken"),

	/**
	 * Endpoint para decodificar un token de auth
	 * @property detokenizer
	 * @type string
	 */
	detokenizer: apiAuth("usuario/validatetoken"),

	/**
	 * Endpoint para obtener las traducciones del portal
	 * @property translate
	 * @param {string} id Identificador de la traduccion
	 * @type string
	 */
	translate: apiFramework("idioma/translate", _SYSTEM_ID),

	/**
	 * Endpoint para obtener el nombre del hotel
	 * @property resortName
	 * @param {string} id Identificador del la propiedad
	 * @type string
	 */
	resortname: apiCore("propiedad/bycode"),

	/**
	 * Endpoint para obtener todos los hoteles
	 * @property resorts
	 * @type string
	 */
	resorts: apiCore("propiedad/dropdown/id_opera/nombre_comercial/1"),
	//#region 'EVENTS'
	//#region EVENTS_auth

	/**
	 * Endpoint para obtener una lista de paises.
	 * @property getPais
	 * @type string
	 */
	getPais: apiCore("pais/listassoc/codigo/nombre_largo"),

	/**
	 * @author ixicale - 2020.Ago.29
	 * @version ixicale.2020.Sep.2
	 * @type {GET}
	 * @description Endpoint obtener todos los paises con ISO3166 alpha-3
	 * @property idioma__search
	 * @param {string} language idioma a enviar ['es'|'en']
	 * @example "{{core-dev}}/pais/listassoc/abreviatura/nombre_largo/{language}"
	 */
	getPaisA3: apiCore("pais/listassoc/abreviatura/nombre_largo"),

	/**
	 * Endpoint para autenticar al usuario del portal
	 * @property authenticate2
	 * @type string
	 */
	authenticate2: apiEvents("auth/login"),
	//#endregion EVENTS_auth

	//#region EVENTS_eventpromocion
	/**
	 * Endpoint para obtener las promociones del cliente
	 * @property promotions
	 * @param {string} id Identificador del grupo
	 * @type string
	 */
	promotions: apiEvents("eventpromocion/getpromotionbygroup"),
	//#endregion EVENTS_eventpromocion

	//#region EVENTS_eventevento
	/**
	 * Endpoint para obtener la sumatoria de todas las cantidades de los eventos
	 * @property eventSummary
	 * @param {string} id Identificador del grupo
	 * @type string
	 */
	eventsummary: apiEvents("eventevento/getsum3"),

	/**
	 * Endpoint para obtener los eventos
	 * @property events
	 * @param {string} id Identificador del grupo
	 * @type string
	 */
	events: apiEvents("eventevento/geteventbygroup2"),

	/**
	 * Endpoint para obtener las llaves de los servicio en forma de tag
	 * @property serviceTags
	 * @param {string} id Identificador del grupo
	 * @type string
	 */
	servicetags: apiEvents("eventevento/getservicesgroup"),

	/**
	 * Endpoint para obtener la locacion y el idevento y idlocacion
	 * @property serviceTags
	 * @param {string} id Identificador del grupo
	 * @type string
	 */
	locationcarts: apiEvents("eventevento/getEventLocationsCart"),

	//#endregion EVENTS_eventevento

	//#region EVENTS_eventdetalleitem

	// /**
	//  *
	//  * @author ixicale - 2020.Ago.20
	//  * @type {PUT}
	//  * @description Endpoint para hacer pagos parciales-totales por servicio
	//  * @property payservices
	//  * @example "{{events-dev}}/eventdetalleitem/payservices"
	//  * @returns {string}
	//  */
	// payservices: apiEvents("eventdetalleitem/payservices"),


	/**
	 *
	 * @author angesolis - 2021.May.04
	 * @type {POST}
	 * @description Endpoint para hacer pagos parciales-totales por servicio
	 * @property payservices
	 * @example "{{events-dev}}/eventdetalleitem/payservicesbylimit"
	 * @returns {string}
	 */
	payservices: apiEvents("eventdetalleitem/payservicesbylimit"),

	/**
	 * @author ixicale - 2020.May.25
	 * @type {GET}
	 * @description Endpoint para obtener todos los servicios desde locaciones y eventos
	 * @property getServicesLocationEventByGroup
	 * @param {[0-9]+} idevent_grupo id del grupo [0-9]+
	 * @param {[0|1]} asDict Show as dict - default 1
	 * @example "{{events-dev}}/eventdetalleitem/getbygroup/:idevent_grupo"
	 * @example "{{events-dev}}/eventdetalleitem/getbygroup/:idevent_grupo/:asDict"
	 */
	getServicesLocationEventByGroup: apiEvents("eventdetalleitem/getbygroup"),

	/**
	 * Endpoint para obtener los servicios por evento y hotel
	 * @property items3
	 * @param {string} id_event Identificador del evento
	 * @param {string} id_location Identificador del hotel
	 * @type string
	 */
	items4: apiEvents("eventdetalleitem/gerservicebyeventandlocation"),

	/**
	 * Endpoint para obtener los servicios en el shoppingCart
	 * @param {integer} idevent_grupo Identificador del evento
	 * @type string
	 */
	shoppingcart: apiEvents("eventdetalleitem/getShoppingCart"),

	/**
	 * Endpoint para obtener los servicios del WeddingExtras
	 * @param {integer} idevent_grupo Identificador del evento
	 */
	weddingextras: apiEvents("eventdetalleitem/getWeddingExtras"),

	/**
	 * Endpoint para obtener los servicios a pagar de shoppingCart
	 * @param {integer} idevent_detalle_item Identificador del servicio
	 * @type string
	 */
	serviceShopping: apiEvents("eventdetalleitem/getservicesbyshopping"),

	/**
	 * @author amatos - 2020.May.29
	 * @type {PUT}
	 * @description Endpoint para actualizar Eventdetalleitem
	 * @property putEventDetailItem
	 * @example "this"
	 * @param {string} id Identificador del evento
	 */
	putEventDetailItem: apiEvents("eventdetalleitem/put"),

	/**
	 * @author amatos - 2020.May.29
	 * @type {POST}
	 * @description Endpoint para agregar un nuevo servicio
	 * @property postServiceDI
	 * @example "this"
	 */
	postServiceDI: apiEvents("eventdetalleitem/post"),

	/**
	 * @author amatos - 2020.May.29
	 * @type {GET}
	 * @description Endpoint para obtener un detalle_item por id
	 * @property getDetalleItemById
	 * @example "this"
	 * @param {string} id Identificador del evento
	 */
	getDetalleItemById: apiEvents("eventdetalleitem/getdetailandextrainfo"),

	/**
	 * @author ixicale - 2020.Oct.12
	 * @type {GET}
	 * @description Endpoint para obtener todos servicios por idevent_evento_locacion
	 * @property getDI__byIdEventoLocacion
	 * @param {string} idevent_evento_locacion
	 * @example "{{events-qa}}/eventdetalleitem/getbyeventlocation/:idevent_evento_locacion"
	 */
	getDI__byIdEventoLocacion: apiEvents("eventdetalleitem/getbyeventlocation"),

	/**
	 * @author amatos - 2020.Agosto.06
	 * @type {GET}
	 * @description Endpoint para enviar correos de family gift
	 * @property sendFamilyGift
	 * @example "this"
	 * @param {object} data
	 */
	sendFamilyGift: apiEvents("eventdetalleitem/sendFamilyGift"),
	/**
	 * @author Added here by: ersanchez - 2020.JUN.29
	 * @type {GET}
	 * @description Endpoint para mostrar servicios con id_evento & id_locacion
	 * @property getServicesLocationEvent
	 */
	getServicesLocationEvent: apiEvents(
		"eventdetalleitem/gerservicebyeventandlocation/"
	),

	//#endregion EVENTS_eventdetalleitem

	//#region EVENTS_eventdetalleextrainfo
	/**
	 * Endpoint para obtener los comentarios de la novia y planer
	 * @property comments
	 * @param {string} id Identificador de detalle
	 * @type string
	 */
	weddingnotes: apiEvents("eventdetalleextrainfo/weddingnotes/"),

	/**
	 * Endpoint para obtener el ultimo comentario del servicio comprado
	 * @property comments
	 * @param {string} id Identificador de detalle de compra
	 * @type string
	 */
	comments: apiEvents("eventdetalleextrainfo/comments"),

	/**
	 * Endpoint para obtener el historial de los comentarios del servicio comprado del lado de la novia
	 * @property commentHistory
	 * @param {string} id Identificador del detalle de compra
	 * @type string
	 */
	commenthistory: apiEvents("eventdetalleextrainfo/notes/2"),

	/**
	 * Endpoint para obtener el historial de los comentarios del servicio comprado del lado de la planner
	 * @property commentHistory
	 * @param {string} id Identificador del detalle de compra
	 * @type string
	 */
	commenthistory2: apiEvents("eventdetalleextrainfo/notes/1"),

	/**
	 * Endpoint para obtener el detalle del servicio del lado de la novia
	 * @property commentHistory
	 * @param {string} id Identificador del detalle de compra
	 * @type string
	 */
	servicedetails: apiEvents("eventdetalleextrainfo/details/2"),

	/**
	 * Endpoint para obtener el detalle del servicio del lado de la planner
	 * @property commentHistory
	 * @param {string} id Identificador del detalle de compra
	 * @type string
	 */
	servicedetails2: apiEvents("eventdetalleextrainfo/details/1"),

	/**
	 * Endpoint para agregar un nuevo comentario al servicio comprado
	 * @property newComment
	 * @type string
	 */
	newcomment: apiEvents("eventdetalleextrainfo/post"),

	/**
	 * Endpoint para actualizar el comentario del servicio comprado
	 * @property editComment
	 * @param {string} id Identificador del comentario
	 * @type string
	 */
	editcomment: apiEvents("eventdetalleextrainfo/put"),
	//#endregion EVENTS_eventdetalleextrainfo

	//#region EVENTS_eventgrupo
	/**
	 * Endpoint para cambiar la contraseña del portal
	 * @property resetPassword
	 * @type string
	 */
	resetpassword: apiEvents("eventgrupo/reset-password"),

	/** se hace cambio de contraseña / no se nececita contraseña anterior */
	changepassword: apiEvents("eventgrupo/changepassword"),

	/**
	 * Endpoint para actualizar la caratula del portal
	 * @property uploadCover
	 * @type string
	 */
	uploadcover: apiEvents("eventgrupo/uploadcover"),

	/**
	 * Endpoint para obtener las fechas de los eventos
	 * @property eventDay
	 * @param {string} id Identificador del grupo
	 * @type string
	 */
	eventday: apiEvents("eventgrupo/Getdate"),

	/**
	 * Endpoint para obtener el rooming list del cliente
	 * @property roomingList
	 * @param {string} id Identificador del hotel
	 * @param {string} blockode Blockcode de opera
	 * @type string
	 */
	roominglist: apiEvents("eventgrupo/roominglist"),

	/**
	 * Endpoint para obtener los datos del grupo
	 * @property elemenbyid
	 * @param {string} id idevent_grupo
	 * @type string
	 */
	eventData: apiEvents("eventgrupo/elementbyid"),

	/**
	 * Endpoint para obtener los eventos por hotel
	 * @property eventLocations
	 * @param {string} id Identificador del evento
	 * @type string
	 */
	eventlocations: apiEvents("eventgrupo/getlocationsandservices"),

	/**
	 * Endpoint para obtener los eventos por hotel
	 * @property eventLocations
	 * @param {string} id Identificador del evento
	 * @type string
	 */
	eventservicesInWeddingextra: apiEvents("eventgrupo/getservices"),

	/**
	 * Endpoint para obtener la sumatoria de la compra del usuario
	 * @property purchase
	 * @param {string} id Identificador del grupo
	 * @type string
	 */
	purchase: apiEvents("eventgrupo/getservicesbygropups"),

	/**
	 * Endpoint para obtener el PDF de compra
	 * @property detailSheet
	 * @param {string} lang [1: en, 2:es]
	 * @param {string} id Identificador del grupo
	 * @type string
	 */
	detailsheet: apiEvents("eventgrupo/getdetailsheet/1"),

	/**
	 * Endpoint para obtener la nueva version del detail sheet
	 * @property detailSheet
	 * @param {string} lang [1: en, 2:es]
	 * @param {string} id Identificador del grupo
	 * @type string
	 */
	detailsheetV2: apiEvents("eventgrupo/calldetailsheetpdf"),

	/**
	 * Endpoint para obtener el PDF de rooming
	 * @property rooming
	 * @param {string} id Identificador del grupo
	 * @type string
	 */
	roomingpdf: apiEvents("eventgrupo/getroomingpdf"),

	/**
	 * Endpoint para obtener todo el detailSheet
	 * @property getdatadetailsheet
	 * @param {integer} lang [1: en, 2:es]
	 * @param {string} id Identificador del grupo
	 * @type string
	 */
	getdatadetailsheet: apiEvents("eventgrupo/getdatadetailsheet"),

	/**
	 * Endpoint para actualizar
	 * @property eventgroup
	 * @param {string} id Identificador del grupo
	 * @type put
	 */
	eventgroup: apiEvents("eventgrupo/put"),

	//#endregion EVENTS_eventgrupo

	//#region EVENTS_infopostlogin
	/**
	 * @author Angel Solis Ek
	 * @description Obtiene la informacion de la sociedad y folio asignado al grupo.
	 * @property getLinksBusinessunits
	 * @param {string} id_resort id del hotel.
	 * @param {string} lang idioma del sitio.
	 * @type {GET}
	 */
	getLinksBusinessunits: apiEvents("infopostlogin/getlinksbusinessunits"),
	 //#endregion

	//#region    ----------------------------------------------------------- // ! 'EVENTS -> event_reserva_grupo_agencia'

	/**
	 * @author ixicale - 2020.May.25
	 * @type {POST}
	 * @description Endpoint para insertar
	 * @property reserva_gr_ag_post
	 * @example "this"
	 */
	reserva_gr_ag__post: apiEvents("eventreservagrupoagencia/post"),
	/**
	 * @author ixicale - 2020.May.25
	 * @type {PUT}
	 * @description Endpoint para actualizar
	 * @property reserva_gr_ag__put
	 * @param {string} idevent_reserva_grupo_agencia pk de la tabla
	 * @example "this/:idevent_reserva_grupo_agencia"
	 */
	reserva_gr_ag__put: apiEvents("eventreservagrupoagencia/put"),
	/**
	 * @author ixicale - 2020.May.25
	 * @type {GET}
	 * @description Endpoint para obtener todos
	 * @property reserva_gr_ag__byId
	 * @param {string} idevent_reserva_grupo_agencia
	 * @example "this/:idevent_reserva_grupo_agencia"
	 */
	reserva_gr_ag__byId: apiEvents("eventreservagrupoagencia/elementbyid"),
	/**
	 * @author ixicale - 2020.May.25
	 * @type {GET}
	 * @description Endpoint para obtener todos los registros
	 * @property reserva_gr_ag__search
	 * @example "{{events-dev}}/eventreservagrupoagencia/search"
	 */
	reserva_gr_ag__search: apiEvents("eventreservagrupoagencia/search"),
	/**
	 * @author ixicale - 2020.Ago.07
	 * @type {GET}
	 * @description Endpoint para obtener todos registros por grupo y propiedad
	 * @property reserva_gr_ag__byGP
	 * @example "{{events-dev}}/eventreservagrupoagencia/bygroupresort/{id_grupo}/{id_propiedad}"
	 */
	reserva_gr_ag__byGP: apiEvents("eventreservagrupoagencia/bygroupresort"),
	//#endregion ----------------------------------------------------------- // ! 'EVENTS -> event_reserva_grupo_agencia'

	//#region EVENTS_eventsaldofavor
	/**
	 * @author amatos - 2020.May.29
	 * @type {GET}
	 * @description Endpoint saldo a favor del grupo
	 * @property getPositiveBalance
	 * @example "this"
	 * @param {string} idevent_grupo Identificador del grupo
	 */
	getPositiveBalance: apiEvents("eventsaldofavor/saldofavor/"),

	/**
	 * @author Added here by: ersanchez - 2020.JUN.29
	 * @type {GET}
	 * @description Endpoint para mostrar saldo favor
	 * @property getPositiveBalanceSA
	 */
	getPositiveBalanceSA: apiEvents("eventsaldofavor/saldofavor/"),

	/**
	 * @author amatos - 2020.May.29
	 * @type {POST}
	 * @description Endpoint para agregar el saldo a favor de los servicios cancelados
	 * @property postPositiveBalance
	 * @example "this"
	 */
	postPositiveBalance: apiEvents("eventsaldofavor/post"),
	//#endregion EVENTS_eventsaldofavor

	//#region EVENTS_grupopago
	/**
	 * @author amatos - 2020.May.29
	 * @type {POST}
	 * @description Endpoint para hacer los pagos con saldo en positivo
	 * @property postPayWithPositiveBalance
	 * @example "this"
	 */
	postPayWithPositiveBalance: apiEvents("grupopago/post"),

	/**
	 * @author ixicale - 2020.Ago.04
	 * @type {GET}
	 * @description Endpoint para obtener el tipo de cambio
	 * @property exchange
	 * @example "{{events-qa}}/grupopago/tipocambio"
	 */
	exchange: apiEvents("grupopago/tipocambio"),

	/**
	 * @author ixicale - 2020.Ago.04
	 * @type {POST}
	 * @description Realizar el pago
	 * @property addBalance
	 * @example "{{events-qa}}/grupopago/payment"
	 */
	addBalance: apiEvents("grupopago/payment"),
	//#endregion EVENTS_grupopago

	/**
	 * @author Added here by: ersanchez - 2020.JUN.29
	 * @type {GET}
	 * @description Endpoint para mostrar events and locations con el id_grupo
	 * @property getEventsAndLocations
	 */
	getEventsAndLocations: apiEvents("eventevento/geteventsandlocations/"),

	/**
	 * @author Added here by: ersanchez - 2020.JUN.29
	 * @type {GET}
	 * @description Endpoint para Reflejar Detalle pago
	 * @property getServicesLocationEvent
	 */
	postSinTarjeta: apiEvents("eventdetallepago/postsintarjeta"),

	//#endregion EVENTS_event_reserva_grupo_agencia

	//#region    ----------------------------------------------------------- // ! 'EVENTS -> event_billing_address'

	/**
	 * @author Added here by: Melissa Mendiola - 2020.JUN.29
	 * @type {GET}
	 * @description Endpoint para mostrar direcciones
	 * @property event_billing_address
	 */
	eventbillingaddress: apiEvents("eventbillingaddress/address"),

	/**
	 * @author Added here by: Melissa Mendiola - 2020.JUN.29
	 * @type {GET}
	 * @description Endpoint para hacer update a direcciones
	 * @property event_billing_address
	 */
	eventbillingaddressput: apiEvents("eventbillingaddress/put"),
	/**
	 * @author Added here by: Melissa Mendiola - 2020.JUL.01
	 * @type {GET}
	 * @description Endpoint para insertar direcciones
	 * @property event_billing_address
	 */
	eventbillingaddresspost: apiEvents("eventbillingaddress/postInsert"),

	eventgrupopagopost: apiEvents("grupopago/post"),

	/**
	 * @author Added here by: Melissa Mendiola - 2020.JUL.14
	 * @type {PUT}
	 * @description Endpoint para actualizar el default de domicilios
	 * @property events
	 */
	eventputdefaultdomicilios: apiEvents("eventbillingaddress/putDomicilios"),

	/**
	 * @author ixicale - 2020.Jul.25
	 * @type {GET}
	 * @description Endpoint para obtener todas las direcciones por id_grupo
	 * @property billingAddressByGroup
	 * @param {integer} id_grupo identificador del grupo
	 * @example "{{events-qa}}/eventbillingaddress/bygroup/{id_grupo}"
	 */
	billingAddressByGroup: apiEvents("eventbillingaddress/bygroup"),

	/**
	 * Endpoint para obtener los datos de un usuario segun su blockcode
	 */
	eventsgroupbyfolio: apiEvents("eventgrupo/getelementbyfolio"),

	/**
	 * Endpoint para obtener las promociones de un usuario segun su blockcode
	 */
	eventspromotionsbyblockcode: apiEvents(
		"eventeventopromocion/getpromotionbyblockcode"
	),

	eventsgetTermsAndPoliticse: apiEvents("sapsociedadtermino/elementbyid"),

	/** links segun un grupo */
	eventsgetLinksByGroup: apiEvents(
		"eventreservagrupoagencialink/linksbygroupid"
	),

	/**
	 * Endpoint para obtener los datos de un usuario segun su blockcode
	 */
	eventsSendEmailtoChangePassword: apiEvents(
		"eventgrupo/sendemailtochangepassword"
	),

	/**
	 * Endpoint para obtener los datos de un usuario segun su blockcode
	 */
	eventsgetReservationsByBlockcode: apiEvents(
		"eventeventopromocion/getreservationsbyblockcode"
	),

	/**
	 * Endpoint para obtener los datos d
	 */
	eventsgetReservationsByBlockcodeExcludedPM: apiEvents(
		"wire/getreservationsexcludedpm"
	),

	/**
	 * Endpoint para obtener dato de un usuario segun su blockid(reglas para terminos y condiciones )
	 */
	eventsgetDataAcept: apiEvents("grupoaceptatermino/getDataAcept"),

	/**
	 * Endpoint para guardar que ya se ha aceptado los terminos y condiciones
	 */
	eventspostAccept: apiEvents("grupoaceptatermino/post"),

	/**
	 * Endpoint para obtener enviar el correo de confirmacion de suscripcion
	 */
	eventsSendEmailNewLetter: apiEvents("eventgrupo/sendnewsletterweddings"),


		//envio de notificaciones a planner sobre link o pago fallido
	eventssendNotificationPlanner: apiEvents("eventgrupo/sendNotificationPlanner"),

    /**
     * Endpoint que regresa la lista de tareas de la novia.
     */
	todoList: apiEvents("infotodolist/gettodolist"),


	//#endregion ----------------------------------------------------------- // ! 'EVENTS -> event_billing_address'
	//#endregion 'EVENTS'

	//#region 'PRODUCTS'
	/**
	 * Endpoint para obtener todos los tipos de servicios
	 * @property category
	 * @type string
	 */
	category: apiProducts("serviceserviciotipo/getall"),

	/**
	 * Endpoint para obtener todas las unidades de negocio que tengan 'enable_online > 0' y 'estado > 0'
	 * @property menu
	 * @type string
	 */
	menu: apiProducts("serviceunidadnegocio/search/"),

	/**
	 * Endpoint para obtener todos los tipo de servicio por unidad de negocio
	 * @property submenu
	 * @type string
	 */
	submenu: apiProducts("serviceunidadnegocio/getservicetypebybusinessunit"),

	/**
	 * Endpoint para obtener los servicios por tipo de servicio
	 * @property items
	 * @param {string} id Identificador del tipo de servicio
	 * @type string
	 */
	items: apiProducts("serviceservicio/servicewithimagebycategory"),

	/**
	 * Endpoint para obtener los servicios por propiedad u hotel
	 * @property items2
	 * @param {string} id Identificador del hotel
	 * @type string
	 */
	items2: apiProducts("serviceservicio/prices/service"),

	/**
	 * Endpoint para obtener los servicio por clasificacion *filtro*
	 * @property items3
	 * @param {string} id_tag Identificador del tag
	 * @param {string} id_ser Identificador del tipo de servicio
	 * @type string
	 */
	items3: apiProducts("tagservicio/getservicebytagandservicetype"),

	/**
	 * Endpoint para obtener las clasificaciones *filtros* por tipo de servicio
	 * @property filters
	 * @param {string} id Identificador del tipo de servicio
	 * @type string
	 */
	filters: apiProducts("tagtiposervicio/gettagbyservicetype"),

	/**
	 * Endpoint para obtener el servicio por su identificador
	 * @property item
	 * @param {string} id Identificador del servicio
	 * @type string
	 */
	item: apiProducts("serviceservicio/elementbyid"),

	/**
	 * Endpoint para obtener las imagenes de los servicios
	 * @property images
	 * @param {string} id Identificador del servicio
	 * @type string
	 */
	images: apiProducts("serviceservicioasset/elementbyservice"),

	/**
	 * Endpoint para obtener los terminos de los servicios
	 * @property terms
	 * @param {string} flag Idioma [1: en, 2: es]
	 * @param {string} ids Identificadores de los servicios
	 * @type string
	 */
	terms: apiProducts("servicetermino/getTermByServicesLanguage"),

	/**
	 * Endpoint para obtener los servicios con base a las coincidencias de palabras
	 * @property itemSearch
	 * @param {string} limit Limite de resultados
	 * @param {string} word Palabras o frases a buscar
	 * @type string
	 */
	itemsearch: apiProducts("serviceservicio/item/search"),

	/**
	 * Endpoint para obtener los servicios con base a las coincidencias de palabras, filtrando por tipo de servicio
	 * @property resetPassword
	 * @param {string} id Identificador del tipo de servicio
	 * @param {string} limit Limite de resultados
	 * @param {string} word Palabras o frases a buscar
	 * @type string
	 */
	itemsearch2: apiProducts("serviceservicio/category/search"),

	/**
	 * Endpoint para obtener los servicios con base a las coincidencias de palabras, filtrando por unidad de negocio.
	 * @property resetPassword
	 * @param {string} id Identificador de la unidad de negocio
	 * @param {string} limit Limite de resultados
	 * @param {string} word Palabras o frases a buscar
	 * @type string
	 */
	itemsearch3: apiProducts("serviceservicio/business/search"),

	/**
	 * Endpoint que regresará los tipos de servicios
	 * @property menuservice
	 * @param {string} idHotel Identificador del hotel
	 * @param {string} idUnidadNegocio Identificador la unidad de negocio
	 * @type string
	 */
	menuservice: apiProducts("serviceserviciopropiedad/getfamiliespropiety"),

	/**
	 * Endpoint que regresará todos los elementos de una colección
	 * @property getCollections
	 * @param {int} service Identificador del servicio
	 * @param {int} idcoleccion Identificador
	 */
	servicescollection: apiProducts("serviceservicio/getCollections"),

	/**
	 * Endpoint para autenticar al usuario del portal
	 * @property userInfo
	 * @type string
	 */
	userInfo: apiAuth("usuario/elementbyid"),

	/**
	 * @author Added here by: Melissa Mendiola - 2020.JUL.06
	 * @type {POST}
	 * @description Endpoint para consultar los domicilios por block_code o block_id
	 * @property events
	 */
	eventdomicilios: apiSales("ventacuentaentidad/blockCodeAdress"),

	/**
	 * @author Added here by: Melissa Mendiola - 2020.Nov.12
	 * @type {GET}
	 * @description Endpoint para consultar la información de los planners.
	 * @property events
	 */
	eventinfoplanner: apiSales("ventaagente/agentUsername"),

	//#endregion 'PRODUCTS'

	//#region    ----------------------------------------------------------- // ! ''EVENTS -> event_reserva_grupo_agencia_gift''
	/**
	 *
	 * @author ixicale - 2020.Oct.20
	 * @version ixicale.2020.Oct.20
	 * @type {GET}
	 * @description Endpoint obtener todos regalos enviados a la novia por grupo
	 * @property regalos__byGroup
	 * @param {string} idevent_grupo pk del grupo
	 * @example "{{events-dev}}/eventreservagrupoagenciagift/group/{idevent_grupo}"
	 */
	regalos__byGroup: apiEvents("eventreservagrupoagenciagift/group"),

	/**
	 * @author ixicale - 2020.Ago.10
	 * @type {PUT}
	 * @description Endpoint para actualizar tarjetas de regalo
	 * @property regalos__put
	 * @example "{{events-dev}}/eventreservagrupoagenciagift/put"
	 */
	regalos__put: apiEvents("eventreservagrupoagenciagift/put"),

	/**
	 * @author ixicale - 2020.Ago.10
	 * @type {POST}
	 * @description Endpoint para agregar tarjetas de regalo
	 * @property regalos__post
	 * @example "{{events-dev}}/eventreservagrupoagenciagift/post"
	 */
	regalos__post: apiEvents("eventreservagrupoagenciagift/post"),
	//#endregion ----------------------------------------------------------- // ! ''EVENTS -> event_reserva_grupo_agencia_gift''

	//#region Amazon Bucket
	/**
	 * @author Luis Enrique Huh Puc
	 * @type {POST}
	 * @description Endpoint para subir archivos al bucket publico de amazon
	 * @property folder
	 */
	awsBucket: apiAWS("s3upload/webfiles_palace"),

	/**
	 * @author Luis Enrique Huh Puc
	 * @type {POST}
	 * @description Endpoint para subir archivos al bucket publico de amazon y ajustando el tamaño
	 * @param {string} folder Carpeta destino para la imagen
	 * @param {string} size Tamaño de la imagen *WxH* ó *W*
	 */
	awsBucketResize: apiAWS("s3uploadimageescala/webfiles_palace"),

	//#endregion

	//#region    ----------------------------------------------------------- // ! 'FRM -> idioma'

	/**
	 * @author ixicale - 2020.Ago.29
	 * @type {GET}
	 * @description Endpoint obtener todos los idiomas
	 * @property idioma__search
	 * @example "{{frm-dev}}/idioma/search"
	 */
	idioma__search: apiFRM("idioma/search"),
	//#endregion ----------------------------------------------------------- // ! 'FRM -> idioma'

	//#region    ----------------------------------------------------------- // ! 'FRM -> notificaciones'

	/**
	 * @author ixicale - 2020.Ago.29
	 * @type {GET}
	 * @description Endpoint enviar correo
	 * @property frm_mail
	 * @example "{{frm-dev}}/notificaciones/mail"
	 */
	notificaicones__mail: apiFRM("notificaciones/mail"),
	/**
	 * @author ixicale - 2020.Ago.29
	 * @type {GET}
	 * @description Endpoint enviar correo
	 * @property frm_mail
	 * @example "{{frm-dev}}/notificaciones/notificacion/{tagnotificacion}"
	 */
	notificaicones__notificacion: apiFRM("notificaciones/notificacion"),
	//#endregion ----------------------------------------------------------- // ! 'FRM -> notificaciones'

	//#region decodeToken
	/**
	 * @author Andry Matos Caamal
	 * @type {POST}
	 * @description Endpoint para obtener los datos del event_transaction_link recibido
	 * @param {int} id
	 */
	getTransactionLink: apiEvents("eventtransactionlink/elementbyid"),

	/**
	 * @author Angel Solis Ek
	 * @type {POST}
	 * @description Endpoint para obtener los datos del getservicesbylimitallowed recibido
	 * @param {int} id
	 */
	eventspostServiciesCheckoutAllowed: apiEvents("eventdetalleitem/getservicesbylimitallowed"),

	/**
	 * @author ixicale - 2020.Ago.17
	 * @type {PUT}
	 * @description Endpoint para actualizar link
	 * @property regalos__put
	 * @param {int} id
	 * @example "{{events-dev}}/eventtransactionlink/put/{id}"
	 */
	transactionLink__put: apiEvents("eventtransactionlink/put"),

	/**
	 * @author Luis Enrique Huh Puc
	 * @description Obtiene la informacion de la sociedad y folio asignado al grupo.
	 * @property getReservaCobro
	 * @param {string} id Identificador del grupo.
	 * @type {GET}
	 */
	getReservaCobro: apiEvents("eventreservacobro/elementbyideventevento"),
	//#endregion

	//#region LocalHost
	eventDataLocal: apiLocal("events/eventgroup"),
	//#endregion

	//#region Finanzas
	encryptedPublicKeyWorldpay: apiFinances("pagos/getkeyencrypted"),
	//se recupera monto maximo segun parametros
	eventsgetMaxMountByCard: apiFinances("keyandmerchant/generate"),
	//#endregion
};
// console.log("_ENDPOINTS", _ENDPOINTS);
/* * * * * * * * * * * * * *
 * Export Module Endpoints *
 * * * * * * * * * * * * * */
module.exports = _ENDPOINTS;
