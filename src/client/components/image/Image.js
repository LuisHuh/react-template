/**
 * @author Luis Enrique Huh Puc <`luisenriquehuhpuc@hotmail.com`>
 * @description Componente de imagen
 */

import React from "react";
import { addClass } from "@app/Helpers";
import LazyImage from "./LazyImage";

/**
 * Componente que carga una imagen
 * @param {Object} props Parametros del componente.
 * @param {string} props.src Url de la imagen
 * @param {string} props.thumbSrc Url de la imagen de miniatura.
 * @param {string} props.className Lista de clases
 * @param {...Array} props.params Parametros del componente.
 */
function Image({ thumbSrc, src, className, ...params }) {
	className = addClass("lazy-image", className);
	return (
		<LazyImage thumbSrc={thumbSrc} src={src}>
			{(tmb, img, isLoaded) => {
				return (
					<div
						className={addClass(className, isLoaded ? null : "loading")}>
						<img
							className="image"
							alt="image"
							src={img}
							{...params}
						/>
						<img
							className="thumb"
							alt="thumbnail-image"
							src={tmb}
							{...params}
						/>
					</div>
				);
			}}
		</LazyImage>
	);
}

export default Image;
