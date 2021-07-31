/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description SWRutime.js - Service Worker que escucha las peticiones de los usuarios y agrega el token correspondiente.
 */

import get from "lodash.get";
import runtime from "serviceworker-webpack-plugin/lib/runtime";
import Auth from "./Auth";

export function register() {
	if (navigator && navigator.serviceWorker) {
		runtime
			.register()
			.then((res) => {
				//console.log("Successfully registered sw");
			})
			.catch((err) => {
				//console.error("Cannot register sw", err);
			});

		navigator.serviceWorker.addEventListener("message", (event) => {
			const { action } = event.data;
			const port = event.ports[0];

			if (action === "getAuthTokenHeader") {
				console.debug("Token request from sw");
				port.postMessage({
					authHeader: Auth.getAuthorizationHeader(),
				});
			} else {
				console.error("Unknown event", event);
				port.postMessage({
					error: "Unknown request",
				});
			}
		});
	}
}

export function isRunning() {
	return get(navigator, "serviceWorker.controller.state") === "activated";
}

export function unregister() {
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.ready
			.then((registration) => {
				registration.unregister();
			})
			.catch((error) => {
				//console.error(error.message);
			});
	}
}
