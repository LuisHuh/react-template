/**
 * @author Luis Enrique Huh Puc <`luisenriquehuhpuc@hotmail.com`>
 * @description Contiene un Componente de Orden Superior (HOC) para la carga de imagenes.
 */

import { useState, useEffect } from "react";
import { getPropertyImage } from "@app/Helpers";

/**
 * Componente que carga una imagen
 * @param {Object} props Parametros del componente.
 * @param {string} props.src Url de la imagen
 * @param {string} props.thumbSrc Url de la imagen de miniatura.
 * @param {()=>{}} props.children Hijo del componente
 * @returns {(thumb: HTMLImageElement, img: HTMLImageElement, isLoaded: boolean) => JSX.Element} Children
 */
function LazyImage({ thumbSrc, src, children }) {
	const [loaded, setImageLoaded] = useState(false);
	const [display, setDisplay] = useState(true);
	const [metaTmb, setMetaTmb] = useState(null);
	const [metaImg, setMetaImg] = useState(null);

	useEffect(() => {
		getPropertyImage(thumbSrc, (hasError, img) => {
			setMetaTmb(img.src);
		});
	}, [thumbSrc]);

	useEffect(() => {
		setImageLoaded(false);
		getPropertyImage(src, (hasError, img) => {
			if (hasError) {
				setDisplay(false);
				return;
			}

			setImageLoaded(true);
			setMetaImg(img.src);
			setDisplay(true);
		});
	}, [src]);

	if (!src || !display) {
		return null;
	}

	return children(metaTmb, metaImg, loaded);
}

export default LazyImage;
