/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description CustomHooks.js - Hooks Propios.
 */

import { useRef, useEffect } from "react";

/**
 * Hook para crear un intervalo de tiempo.
 * @param {() => {}} callback Función para ejecutar por intervalos de tiempo.
 * @param { number } delay Intervalo de tiempo para ejecutar la función.
 */
function useInterval(callback, delay) {
	// Referencia para guardar la función del usuario
	const myCallback = useRef();

	// Guarda la función del usuario
	useEffect(() => {
		myCallback.current = callback;
	}, [callback]);

	// Ejecuta la función de intervalo
	useEffect(() => {
		const tick = () => myCallback.current();

		if (delay !== null) {
			const id = setInterval(tick, delay);

			return () => clearInterval(id);
		}
	}, [delay]);
}

/**
 * Regresa el estado anterior en un hook
 * @param {*} value Variable de estado
 * @returns {string|number|Array<string>|Array<Number>} value
 */
function usePrevious(value) {
	const ref = useRef();

	useEffect(() => {
		if (Array.isArray(value)) {
			value = value.slice();
		}
		ref.current = value;
	});

	return ref.current;
}

export { useInterval, usePrevious };
