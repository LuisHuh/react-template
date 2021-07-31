/**
 * @author Luis Enrique Huh Puc <`luisenriquehuhpuc@hotmail.com`>
 * @description Componentes generales sin mucha complejidad
 */

import React from "react";
import PropTypes from "prop-types";
import { addClass } from "@app/Helpers";

/**
 * Carga íconos de Foundation {@link https://zurb.com/playground/foundation-icon-fonts-3}
 * @param {Object} props Parametros del componente
 * @param {string} props.name Nombre del ícono
 * @param {string} props.className Clasess
 */
function FoundationIcon({ name, className }) {
	className = addClass(`fi-${name}`, className);
	return <i className={className}></i>;
}

/**
 * Carga íconos de Font Awesome {@link https://fontawesome.com/icons?d=gallery}
 * @param {Object} props Parametros del componente
 * @param {string} props.name Nombre del ícono
 * @param {'solid'|'regular'|'brand'} props.type Tipo de ícono - __solid__ _default_
 * @param {string} props.className Clasess
 */
function AwesomeIcon({ name, type, className }) {
	const getType = (type) => {
		if (type === "regular") return "far";
		else if (type === "brand") return "fab";
		else return "fas";
	};

	className = addClass(getType(type), `fa-${name}`, className);

	return <i className={className}></i>;
}

/**
 * Titulos
 * @param {Object} param0 Parametros
 * @param {1|2|3} param0.size Tamaño
 * @param {string} param0.className Lista de clases
 */
function Title({ children, className, size, ...rest }) {
	className = addClass(`title-${size}`, className);
	return (
		<p className={className} {...rest}>
			{children}
		</p>
	);
}

Title.propTypes = {
	size: PropTypes.oneOf([1, 2, 3]).isRequired,
};

Title.defaultProps = {
	size: 1,
};

/**
 * Subtitulos
 * @param {Object} param0 Parametros
 * @param {1|2|3} param0.size Tamaño
 */
function Subtitle({ children, size, className, ...rest }) {
	className = addClass(`subtitle-${size}`, className);

	return (
		<span className={className} {...rest}>
			{children}
		</span>
	);
}

Subtitle.propTypes = {
	size: PropTypes.oneOf([1, 2, 3, "1", "2", "3"]).isRequired,
};

Subtitle.defaultProps = {
	size: 1,
};

/**
 * Crea un estandar para las monedas
 * @param {Object} param0 Props de componente
 * @param {'MXN'|'USD'} param0.currency Tipo de moneda
 * @param {string|number} param0.value Valor
 */
function Amount({ currency, value }) {
	return (
		<span widget="amount">
			<Title size={3} currency={""}>
				{currency}
			</Title>
			<Subtitle value={""}>{value}</Subtitle>
			<Title size={3} decimal={""}>
				00
			</Title>
		</span>
	);
}

Amount.defaultProps = {
	currency: "$",
	value: 0.0,
};

/**
 * Crea un titulo con estilo contorneado
 * @param {Object} param0 Props de componente
 * @param {JSX.Element} param0.children Hijos
 */
function Tag({ children }) {
	return <span widget="tag">{children}</span>;
}

/**
 * Crea un badge
 * @param {Object} param0 Props de componente
 * @param {JSX.Element} param0.children Hijos
 * @param {string} param0.className Lista de clases
 * @param {boolean} param0.isNew Establece si el badge debe ser marcada como nueva
 * @param {boolean} param0.isFloat Establece si el elemento debe posicionarse como flotante a la derecha
 */
function Badge({ children, className, isNew, isFloat, ...rest }) {
	className = addClass(
		isNew ? "new" : null,
		isFloat ? "floating" : null,
		className
	);
	return (
		<span component="badge" className={className} {...rest}>
			{children}
		</span>
	);
}

Badge.defaultProps = {
	isNew: true,
	isFloat: false,
};

/**
 * Crea un menu contextual al ponerlo como padre dentro de un componente
 * @param {Object} param0 Props de componente
 * @param {JSX.Element} param0.children Hijos
 */
function ContextMenu({ children }) {
	return <div component="context-menu">{children}</div>;
}

export {
	FoundationIcon,
	AwesomeIcon,
	Amount,
	Tag,
	Title,
	Subtitle,
	Badge,
	ContextMenu,
};
