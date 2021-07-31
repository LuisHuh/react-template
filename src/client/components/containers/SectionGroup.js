/**
 * @author Luis Enrique Huh Puc <`luisenriquehuhpuc@hotmail.com`>
 * @description SectionGroup.js
 */
import React from "react";

/**
 * Componente para agrupar elementos
 * @param {Object} props Parametros de componente
 * @param {'left'|'center'|'right'} props.smAlign Orientacion del contenido en dispositivos mobiles
 * @param {'left'|'center'|'right'} props.mdAlign Orientacion del contenido en dispositivos tabletas
 * @param {'left'|'center'|'right'} props.lgAlign Orientacion del contenido en dispositivos escritorios
 * @param {'left'|'center'|'right'} props.xlgAlign Orientacion del contenido en dispositivos de pantalla grande
 * @param {JSX.Element} props.children Elementos
 */
function SectionGroup({
	children,
	smAlign,
	mdAlign,
	lgAlign,
	xlgAlign,
	...rest
}) {
	return (
		<section
			name="group"
			sm-align={smAlign}
			md-align={mdAlign}
			lg-align={lgAlign}
			xlg-align={xlgAlign}
			{...rest}>
			{children}
		</section>
	);
}

SectionGroup.defaultProps = {
	smAlign: "center",
	mdAlign: "center",
	lgAlign: "center",
	xlgAlign: "center",
};

export default SectionGroup;
