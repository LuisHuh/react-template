/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description ROUTES OFFLINE MODE
 */

/* * * * * * * * * * *
 * Import Statements *
 * * * * * * * * * * */
const express = require("express");
const JsonReader = require("../libraries/JsonReader");

const router = express.Router();
router.use(express.json());

const mergePath = (...path) => path.join("/");

/**
 *
 * @param {Response} response
 * @param {string} filename Nombre del archivo json
 */
const readingJson = (response, filename) => {
	new JsonReader(mergePath(__dirname, `APIs/${filename}.json`), (error, data) => {
        if (!error)
		    return response.send(data);
        
        return response.status(500).send(data);
	});
};

// Rutas
router.get("/translate/:id", (req, res) => readingJson(res, "lang-en"));
router.get("/core/paises/:idioma", (req, res) => readingJson(res, "paises"));
router.get("/menu/departments", (req, res) => readingJson(res, "unidades"));
router.get("/menu/categories/:idHotel/:idNegocio", (req, res) => readingJson(res, "categories"));
router.post("/auth/login", (req, res) => readingJson(res, "user"));
router.get("/events/:id([0-9]+)", (req, res) => readingJson(res, "events"));
router.get("/events/:id([0-9]+)/locations", (req, res) => readingJson(res, "locations"));
router.get("/events/:id([0-9]+)/services", (req, res) => readingJson(res, "services"));
router.get("/items/resort/:id/:idioma", (req, res) => readingJson(res, "item-resort"));
router.get("/menu/categories/:idHotel/:idNegocio", (req, res) => readingJson(res, "categories"));
router.get("/resorts", (req, res) => readingJson(res, "resort"));
router.get("/events/balance/:id([0-9]+)", (req, res) => readingJson(res, "balance"));
router.get("/events/domicilios", (req, res) => readingJson(res, "profile"));
router.get("/events/shopping/99", (req, res) => readingJson(res, "shopping"));
router.get("/events/shoppingloc/99", (req, res) => readingJson(res, "shoppingloc"));
router.get("/events/:blockcode/getpromotionsbyblockcode", (req, res) => readingJson(res, "promotions"));
router.post("/events/getDataCheckIn", (req,res)=> readingJson(res,"terminosycondiciones"))
router.get("/events/billing-address/group/:id([0-9]+)", (req, res) => readingJson(res, "billing-address-cards"));
router.get("/items/category/8", (req, res) => readingJson(res, "category"));



/* * * * * * * * * * * * * *
 * Export Module Middleware *
 * * * * * * * * * * * * * **/
module.exports = router;
