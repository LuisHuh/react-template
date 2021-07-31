/**
 * @author Luis Enrique Huh Puc <`luisenriquehuhpuc@hotmail.com`>
 * @description Cards
 */
import React from "react";
import { Link } from "@app/CustomRoutes";

/**
 * @param {React.Props} props Parametros del componente
 */
function Card({ children, ...rest }) {
	return (
		<div component="card" {...rest}>
			{children}
		</div>
	);
}

/**
 * @param {React.Props} props Parametros del componente
 */
function BannerCard({ children, srcImg, style, ...rest }) {
	if (!style) {
		style = {};
	}
	return (
		<Card
			type="banner"
			style={{
				backgroundImage: `url(${srcImg})`,
				...style,
			}}
			{...rest}>
			{children}
		</Card>
	);
}

BannerCard.defaultProps = {
	srcImg: "",
};

/**
 * @param {React.Props} props Parametros del componente
 */
function Panel({ children, ...rest }) {
	return (
		<div component="panel" {...rest}>
			{children}
		</div>
	);
}

/**
 * @param {Object} props Parametros del componente.
 * @param {string|Link} props.to Parametros del componente.
 * @param {boolean} props.disabled Establece si el elemento se mostrara inactivo.
 * @param {string} props.srcImg Url de imagen.
 */
function MenuCard({ children, disabled, to, ...rest }) {
	const Element = disabled ? "div" : Link;
	const props = {
		to: disabled ? null : to,
		disabled: disabled ? true : null,
	};

	return (
		<Element component="card-menu" {...props}>
			<BannerCard type="menu" {...rest}>
				{children}
			</BannerCard>
		</Element>
	);
}

MenuCard.defaultProps = {
	to: {},
};

export { Card, BannerCard, MenuCard, Panel };
