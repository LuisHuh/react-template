/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description Apis.js - Lista de APIs para consumir localmente.
 */
import { ROOT_FOLDER, ROOT_API } from "@config/global";
import { getData, sendData } from "./Methods";

const formatter = (...url) =>
	typeof url.join === "function" ? url.join("/") : url;
export const local = (...d) => formatter(ROOT_FOLDER, ROOT_API, ...d);

// ////////////////////////////////////////////////////////////
//                      APIs con promesas                     //
// ////////////////////////////////////////////////////////////

export default {
	// GET example
	getExample: () => getData(local("get-example")),
	// POST example
	postExample: (data) => sendData(local("post-example"), data, "POST"),
};
