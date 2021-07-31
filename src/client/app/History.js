/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description History.js - Archivo que contiene una funcion para manipular el historial del navegador
 */

import { createBrowserHistory } from "history";
import { ROOT_FOLDER } from "@config/global";

export default createBrowserHistory({
   basename: ROOT_FOLDER
});
