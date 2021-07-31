/**
 * @author Luis Enrique Huh Puc <`luisenriquehuhpuc@hotmail.com`>
 * @description Componente que carga una imagen como background (Cover)
 */

import React from "react";
import { addClass, getPropertyImage } from "@app/Helpers";
import LazyImage from "./LazyImage";

/**
 * Componente que carga una imagen
 * @param {Object} props Parametros del componente.
 * @param {string} props.src Url de la imagen
 * @param {string} props.thumbSrc Url de la imagen de miniatura.
 * @param {string} props.className Lista de clases
 * @param {...Array} props.params Parametros del componente.
 */
function Cover({ thumbSrc, src, className, children, ...params }) {
	return (
		<LazyImage thumbSrc={thumbSrc} src={src}>
			{(thumb, img, isLoaded) => {
				const styleThumb = { backgroundImage: `url(${thumb})` };
				const styleImage = { backgroundImage: `url(${img})` };
				return (
					<div
						component="cover"
						className={addClass(className, isLoaded ? null : "loading")}>
						<div className="image" style={styleImage}>
							{children}
						</div>
						<div className="thumb" style={styleThumb}></div>
					</div>
				);
			}}
		</LazyImage>
	);
}

export default Cover;
