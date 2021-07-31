/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description StyleLoader.js - Contiene funciones para cargar estilos con formato sass.
 */
import React, { useState, useEffect, Fragment } from "react";

/**
 * Cargador de estilos, permite agregar hojas de estilos en formato __Sass__
 * @param {Object} props Cualquier parámetro pasado al cargador de estilos.
 * @param {string} props.stylesheet Nombre de la hoja de estilos, debe ser de tipo __*scss*__
 * @param {React.Component} props.children Cualquier elemento pasado como hijo
 * @returns {JSX.Element} Component
 */
function StyleLoader({ stylesheet, children }) {
	let _mounted = false;
	const [loaded, setLoad] = useState(false);

	useEffect(() => {
		_mounted = true;

		return function abort() {
			_mounted = false;
		};
	});

	import(`../docs/styles/themes/${stylesheet}.scss`).then(() => {
		if (_mounted) {
			setLoad(true);
		}
	});

	return <Fragment>{children(loaded)}</Fragment>;
}

/**
 * Cargador de estilos, debe encapsular el componente dentro del _export default_.
 * @param {string} stylesheet Nombre de la hoja de estilos, debe ser de tipo __*scss*__.
 * @returns {JSX.Element} Component
 */
function withStyleLoader(stylesheet) {
	return (Component) => {
		return (
			<StyleLoader stylesheet={stylesheet}>
				{(isLoaded) => <Component loaded={isLoaded} {...props} />}
			</StyleLoader>
		);
	};
}

export { StyleLoader };
export default withStyleLoader;
