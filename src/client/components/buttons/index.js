import React, { useState, useEffect, forwardRef } from "react";
import { Link } from "@app/CustomRoutes";

function Button({ children, ...rest }) {
	return <button {...rest}>{children}</button>;
}

/**
 * Botton tipo link
 * @param {Object} param0 Parametros del componente
 * @param {string|Link} param0.to Destino
 * @param {string} param0.className Lista de clases
 */
const LinkButton = forwardRef(function LinkButton(
	{ children, to, externalLink, className, ...rest },
	ref
) {
	const Element = to ? Link : "a";

	return (
		<Element
			ref={ref}
			component="button"
			className={className}
			href={externalLink}
			to={to}
			{...rest}>
			{children}
		</Element>
	);
});

function CloseButton({ children, ...rest }) {
	return (
		<LinkButton {...rest}>
			<span className="show-for-sr">{children}</span>
			<span>
				<i className="fi-x"></i>
			</span>
		</LinkButton>
	);
}

export { Button, LinkButton, CloseButton };
