import React from "react";

/**
 * Loader para mostrar al generar archivos como PDFs.
 * @param {Object} params Parametros del componente.
 * @param {boolean} params.isLoading Establece si esta cargando o no para mostrar el loader.
 * @param {boolean} params.text Texto a mostrar en el loader.
 */
function FileLoader({ isLoading, text }) {
	const className = `file-loader${isLoading ? " loading" : ""}`;

	return (
		<div className={className}>
			<div className="content-loader">
				<i className="fas fa-cog"></i>
				<i className="fas fa-cog"></i>
				<span className="label-loader">{text}</span>
			</div>
		</div>
	);
}

FileLoader.defaultProps = {
	isLoading: false,
	text: "I'm Working...",
};

export { FileLoader };
