/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description ROUTES
 */

/* * * * * * * * * * *
 * Import Statements *
 * * * * * * * * * * */
const express = require("express");
const { Route, PrivateRoute } = require("../libraries/Router");
const AuthorizationMiddleware = require("../middlewares/AuthorizationMiddleware");

const router = express.Router();
router.use(express.json());
router.use((...params) => new AuthorizationMiddleware(...params));

/* * * * * * * * *
 * RUTAS PUBLICAS *
 * * * * * * * * * */
// #region Publicas
/**
 * @module Auth
 * @description Se encarga de la sesion del usuario
 */

let auth = new Route();
auth.setHandler("controllers/AuthController");
auth.setPrefix("/auth");
auth.post("/login", "authenticate");
auth.post("/decoding", "credentials");
router.use(auth.mount());

/**
 * Unidades de negocios
 * @module Menu
 * @description Se encarga de la sesion del usuario
 */
//const menu = new PrivateRoute();
const menu = new Route();
menu.setHandler("controllers/MenuController");
menu.setPrefix("/menu");
menu.get("/departments", "department");
menu.get("/categories", "categories");
menu.get("/categories/:id", "category");
menu.get("/filters/:id", "filter");
menu.get("/categories/:idHotel/:idNegocio", "service");
router.use(menu.mount());
// #endregion

/* * * * * * * * *
 * RUTAS PRIVADAS *
 * * * * * * * * * */
// #region Privadas
/**
 * Privado
 * @module Auth
 * @description Se encarga de la sesion del usuario
 */
auth = new PrivateRoute();
auth.setHandler("controllers/AuthController");
auth.setPrefix("/auth");
auth.put("/reset-password", "resetPassword");
auth.put("/changepassword", "changePassword");
auth.put("/skip-password", "skipPassword");
auth.get("/user-info/:username", "userInfo");
router.use(auth.mount());

/**
 * @module Translate
 * @description Se encarga de traducir la aplicacion
 */
const translate = new PrivateRoute();
translate.setHandler("controllers/TranslateController");
translate.setPrefix("/translate");
translate.get("/:id", "translate");
router.use(translate.mount());

/**
 * @module Payment
 * @description Pagos
 */
const payment = new Route();
payment.setHandler("controllers/PaymentController");
payment.setPrefix("/payment");
payment.post("/", 'doPayment');
payment.post("/hash", 'getDataHash');
payment.get("/eventtransactionlink/:id", "getTransactionLink");
router.use(payment.mount());

/**
 * Servicios o Items
 * @module Items
 * @description Obtiene los productos
 */
const items = new Route();
items.setHandler("controllers/ItemController");
items.setPrefix("/items");
items.get("/filter/:id_filter/:id_category", "filter");
items.get("/category/:id", "category");
items.get("/resort/:idResort([A-Z]+)/:idTipo([0-9]+)/:idIdioma([0-9]+)", "resort");
items.get("/ids/:id", "tags");
router.use(items.mount());

/**
 * Hoteles
 * @module Resorts
 * @description Obtiene informacion relacionada a las propiedades y hoteles
 */
const resorts = new Route();
resorts.setHandler("controllers/ResortController");
resorts.setPrefix("/resorts");
resorts.get("/", "resort");
router.use(resorts.mount());

/**
 * Promociones
 * @module Promotion
 * @description Obtiene las promociones de los clientes
 */
const promotion = new PrivateRoute();
promotion.setHandler("controllers/PromotionController");
promotion.setPrefix("/promotions");
promotion.get("/:id", "promotion");
router.use(promotion.mount());

/**
 * Compras del usuario
 * @module Purchase
 * @description Maneja todo lo que tenga que ver con las compras del usuario
 */
const purchase = new PrivateRoute();
purchase.setHandler("controllers/PurchaseController");
purchase.setPrefix("/purchases");
purchase.get("/:id", "purchase");
router.use(purchase.mount());

/**
 * Eventos
 * @module Events
 * @description Maneja todo lo relacionado a los eventos del usuario.
 */
// const event = new PrivateRoute();
const event = new Route();
event.setHandler("controllers/EventController");
event.setPrefix("/events");
event.get("/:id([0-9]+)", "events");
event.get("/:id([0-9]+)/locations", "locations");
event.get("/balance/:id", "balance");
event.get("/eventsaldofavor/:id", "getPositiveBalanceSA");
event.get("/group/:id/gifts/own", "getGiftsByGroup");
event.get("/eventevento/:idevent_grupo", "getEventsAndLocations");
event.get("/eventdetalleitem/:idvent_evento/:id_locacion/:showcanceled", "getServicesLocationEvent");
event.get("/rooming/:resort/:blockcode", "roomingList");
event.get("/reserva/:idevent_grupo/:idclv_propiedad", "getReservasAll");
event.get("/services/:idevent/:idLocation","servicelocationevent");
event.get("/pais/:idioma", "getPais");
event.get("/event/detalleitem/:id","getDetalleItemById");
event.get("/getdatasheet/:idioma/:eventgroup", "getDataSheet");
event.get("/billing-address/:id", "getBillingAddress");
event.get("/billing-address/group/:id([0-9]+)","getDomiciliosByGroup");
event.get("/domicilios/:id", "getGeneral");
event.get("/putDomicilios/:id","getDomicilios");
event.get("/eventgroup/:id","getEventGroup");
event.get("/shopping/:id/:hotel","getShoppingCart");
event.get("/shoppingService/:id/:propiedad","getServiceShopping");
event.get("/shoppingloc/:id","getLocationShoppingCart");
event.get("/weddingsextras/:id/:hotel","getWeddingExtras");
event.get("/getelementbyfolio/:folio", "getelementbyfolio");
event.get("/collections/:service/:resort", "getServicesByCollections");
event.get("/service/event/locacion/:id", "getByIdEventoLocacion");
event.get("/service/grupo/:id", "getServicesLocationEventByGroup");
event.get("/todo/:lang([0-9]+)", "getTodo");
event.get("/:id([0-9]+)/services", "services");
event.get("/:blockcode/getpromotionsbyblockcode", "getpromotionsbyblockcode");
event.get("/:society/getTermsAndPolitics", "getTermsAndPolitics");
event.get("/:id/getLinksbyGroup", "getLinksbyGroup");
event.get("/getgroupdetail/:id","getGroupDetail");
event.get("/:infoplanner/:username","infoPlanner");
event.get("/getlinksnusinessunits/:hotel/:lang","getLinksBusinessUnits");
// ---------------------------------------- //! PUT
event.put("/detalleitem/put/:id","putDetailItem");
event.put("/reserva/put/:id", "putReservas");
event.put("/event-grupo", "putEventsGroup");
event.put("/event-address-put", "putBillingAddress");
event.put("/link", "putTransactionLink");
// ---------------------------------------- //! POST
event.post("/grupopago", "postGrupoPago");
event.post("/send/gift", "addGiftCard");
event.post("/reserva/post", "postReservas");
event.post("/detalledepg", "postSinTarjeta");
event.post("/services/di","postServiceDi");
event.post("/insert-address/post", "postBillingAddress");
event.post("/balance/add", "addBalance");
event.post("/sendFamilyGift", "sendFamilyGift");
event.post("/sendEmailToChangePassword", "SendEmailtoChangePassword");
event.post("/regularBoking", "getregularBooking");
event.post("/reservationsExcludedPM", "getReservationsExcludedPM");
event.post("/getDataCheckIn", "getDataCheckIn");
event.post("/acceptterms", "postAcceptTerms");
event.post("/sendEmailNewLetter", "SendEmailNewLetter");
event.post("/sendNotificationPlanner", "sendNotificationPlanner");
event.post("/getMaxMountByCard", "getMaxMountByCard");
event.post("/postServiciesCheckoutAllowed", "postServiciesCheckoutAllowed");
router.use(event.mount());

/**
 * Terminos de servicios
 * @module Term
 * @description maneja todo lo relacionado con los terminos de los servicios
 */
const term = new PrivateRoute();
term.setHandler("controllers/TermController");
term.setPrefix("/terms");
term.get("/:id_lang/:ids", "terms");
router.use(term.mount());

/**
 * Comentarios
 * @module Comments
 * @description Comentarios del cliente en el servicio
 */
const comment = new Route();
comment.setHandler("controllers/CommentController");
comment.setPrefix("/comments");
comment.get("/:id([0-9]+)", "byId");
comment.get("/:id([0-9]+)/history", "history");
comment.post("/", "saveComment");
comment.post("/post", "postComment");
comment.get("/weddingsNotes/:id([0-9]+)", "weddingsNotes");
router.use(comment.mount());

/**
 * Detalle de lo que incluye los servicios
 * @module Details
 * @description Obtiene lo que incluye el servicio
 */
const details = new Route();
details.setHandler("controllers/CommentController");
details.setPrefix("/details");
/* details.get("/:id([0-9]+)", "byId"); */
// details.get("/:id([0-9]+)/service", "serviceBride");
details.get("/:id([0-9]+)/service", "servicePlanner");
/* details.post("/", "saveComment");
details.post("/post", "postComment"); */
router.use(details.mount());

/**
 * Archivos
 * @module Files
 * @description Manaja todo lo relacionado con archivos: PDF, Cargar de imagenes, etc...
 */
const file = new PrivateRoute();
file.setHandler("controllers/FileController");
file.setPrefix("/files");
file.post("/upload", "upload");
file.get("/pdf/detail-sheet/:lang/:id", "detailSheet");
file.get("/pdf/v2/detail-sheet/:lang/:id", "detailSheetV2");
file.get("/pdf/rooming-pdf/:lang/:idevent_grupo", "getRoomingPDF");
router.use(file.mount());
// #endregion

/**
 * Core's APIs
 * @module core
 * @description Todas las APIs de modulo Core a ocupar
 */
const core = new PrivateRoute();
core.setHandler("controllers/CoreController");
core.setPrefix("/core");
core.get("/paises/:idioma", "getPaises");
// core.get("/endpoint", "metodo");
// core.post("/endpoint", "metodo");
// core.put("/endpoint", "metodo");
router.use(core.mount());

/**
 * FRM's APIs
 * @module FRM
 * @description Todas las APIs de modulo FRM a ocupar
 */
const FRM = new PrivateRoute();
FRM.setHandler("controllers/FRMController");
FRM.setPrefix("/FRM");
FRM.get("/language", "getIdiomas");
// FRM.get("/endpoint", "metodo");
// FRM.post("/endpoint", "metodo");
// FRM.put("/endpoint", "metodo");
router.use(FRM.mount());

/* * * * * * * * * * * * * *
 * Export Module Middleware *
 * * * * * * * * * * * * * **/
module.exports = router;
