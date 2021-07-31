/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description Auth.js - Archivo para validar las sesiones del usuario.
 */

import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { formatter, JsonConverter, objectIterator, objectSerializer } from "./Helpers";

/**
 * Variable de sessión
 */
const session = window.sessionStorage;

/**
 * Contiene los métodos de autenticación.
 */
const Auth = {
	/**
	 * Verifica si el usuario esta logueado.
	 */
	isAuthenticated: () => {
		const isLoggedIn = formatter.parseBoolean(session.logged_in);
		const hasToken = !!session.getItem("token");
		return isLoggedIn && hasToken;
	},

	/**
	 * Función para guardar los datos de la sesión del usuario
	 * @param {{}} data Datos para guardar en la sessionStorage
	 * @param {()=>void} callback Función que se ejecuta después de 10ms.
	 */
	authenticate(data, callback) {
		session.setItem("logged_in", true);
		objectIterator(data, (key, value) => {
			if (typeof value === "object") {
				value = JsonConverter(value, true);
			}
			session.setItem(key, value);
		});
		setTimeout(callback, 100);
	},

	/**
	 * Función para cerrar la sesión del usuario.
	 * @param {()=>void} callback Función que se ejecuta después de 10ms.
	 */
	signOut(callback) {
		session.clear();
		session.setItem("logged_in", false);
		setTimeout(callback, 100);
	},

	/**
	 * Función que obtiene la información de la sesión del usuario
	 */
	userData() {
		const data = { ...session };
		return objectSerializer(data);
	},

	/**
	 * Obtiene el token de autenticación
	 */
	getAuthorizationHeader() {
		if (!this.isAuthenticated) {
			return null;
		}

		const token = session.getItem("token");
		return `Bearer ${token}`;
	},
};

/**
 * Vista para cerrar la sesión del usuario
 * @param {{}} props Props de componente
 */
function Logout(props) {
	let _mounted = false;

	const [redirectToReferrer, setToRedirect] = useState(false);

	useEffect(() => {
		_mounted = true;

		return function abort() {
			_mounted = false;
		};
	});

	Auth.signOut(() => {
		if (_mounted) {
			setToRedirect(true);
		}
	});

	if (redirectToReferrer === true) {
		return <Redirect to="/login" />;
	}

	return <div>Logout...</div>;
}
export { Logout };
export default Auth;
