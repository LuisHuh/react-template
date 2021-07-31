/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description ResetScroll.js - Archivo para reiniciar el scroll de las vistas.
 */

import React, { useEffect, useRef } from "react";

/**
 * Reinicia el scroll cuando se cambia de vista
 * @param {Object} param0 Props
 * @param {JSX.Element} param0.children Props
 * @param {Number} param0.y Posicion en la coordenada de las Y
 */
function ResetScroll({ children, y }) {
	const el = useRef();

	const getMeasure = () => {
      const parent = el.current;
		return parent === null ? {x: 0, y: 0} : parent.parentElement.getBoundingClientRect();
	};

	useEffect(() => {
      if (y) {
         window.scrollTo(0, y);
      }else{
         window.scrollTo(0, 0);
         setTimeout(() => {
            const { y: posY } = getMeasure();
            window.scrollTo(0, (posY - 50));
         }, 500);
      }
	}, [children]);

	return <div ref={el}>{children}</div>;
}

ResetScroll.defaultProps = {
   y: null
}

export default ResetScroll;
