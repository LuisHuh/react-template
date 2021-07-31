/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com
 * @description SERVER CONFIG FILE
 */

/* * * * * * * * * * * *
 *  Import Statements  *
 * * * * * * * * * * * */
const express = require("express");
const path = require("path");
const { ENV, SERVER_PORT, ROOT_FOLDER, ROOT_API } = require("../../config/global");
const ResponseFormatter = require("./libraries/ResponseFormatter");
let routes = express.Router();

/* * * * * * * * * **
 * Environment File *
 * * * * * * * * * */
const port = SERVER_PORT || 5000;

/* * * * * **
 *  Routes  *
 * * * * * */
const app = express();
app.use(express.static("dist"));
app.use("/public", express.static("public"));

if (ENV !== 'local'){
	routes = require("./app/router");
}else{
	routes = require("./offline/router");
}
app.use(`${ROOT_FOLDER}${ROOT_API}`, routes);

app.get("/*", function(req, res) {
	res.sendFile(path.join(__dirname, "../../dist/index.html"), function(err) {
		if (err) {
      let message;
			if (err.statusCode == 404) {
        message = new ResponseFormatter(`Not Found => ${req.url}`, 404, true);
			}else {
        message = new ResponseFormatter(`Internal Server Error`, 500, true);
      }
			res.status(message.code).send(message.get());
		}
	});
});

/* * * * * * * * * **
 *  Listening Port  *
 * * * * * * * * * */
app.listen(port, () => {
	console.clear();
	console.log();
	console.log("\x1b[35m%s\x1b[0m", "                       ____              _                                        ");
	console.log("\x1b[35m%s\x1b[0m", "                      / __ \\__  ______  (_)___  ____ _                            ");
	console.log("\x1b[35m%s\x1b[0m", "                     / /_/ / / / / __ \\/ / __ \\/ __ `/                            ");
	console.log("\x1b[35m%s\x1b[0m", "                    / _, _/ /_/ / / / / / / / / /_/ /                             ");
	console.log("\x1b[35m%s\x1b[0m", "                   /_/ |_|\\__,_/_/ /_/_/_/ /_/\\__, /                              ");
	console.log("\x1b[35m%s\x1b[0m", " _       ____________  ____  _____   ________/____/     ____________              ");
	console.log("\x1b[35m%s\x1b[0m", "| |     / / ____/ __ \\/ __ \\/  _/ | / / ____/  | |     / / ____/ __ )             ");
	console.log("\x1b[35m%s\x1b[0m", "| | /| / / __/ / / / / / / // //  |/ / / __    | | /| / / __/ / __  |             ");
	console.log("\x1b[35m%s\x1b[0m", "| |/ |/ / /___/ /_/ / /_/ // // /|  / /_/ /    | |/ |/ / /___/ /_/ /  _  _  _ ");
	console.log("\x1b[35m%s\x1b[0m", "|__/|__/_____/_____/_____/___/_/ |_/\\____/     |__/|__/_____/_____/  (_)(_)(_)");
	console.log();
	console.info(`Running mode: ${typeof ENV === "string"? ENV.toUpperCase(): "UNKNOW"}`);
	console.info(`Listening on port ${port}!`);
});
