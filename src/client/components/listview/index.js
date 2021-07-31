import React from "react";
import { Link } from "@app/CustomRoutes";
import { addClass } from "@app/Helpers";

/**
 * Crea un componente tipo lista
 * @param {Object} param0 Props de componente
 * @param {ListOption|JSX.Element} param0.children Hijos del componente *ListOption*
 * @param {{}} param0.props Otros props
 */
function ListView({ children, ...props }) {
	return (
		<div component="list-view" {...props}>
			{children}
		</div>
	);
}

/**
 * Crea un elemento de la lista
 * @param {Object} param0 Props del componente
 * @param {JSX.Element} param0.children Hijos del componente
 * @param {boolean} param0.avatar Indica si la lista contiene una imagen como avatar
 * @param {string} param0.className Lista de clases para el componente
 * @param {URL|{pathname:string, query:'?q=value', hash:'#a-hash', state: {}}} param0.to Crea links internos
 * @param {URL} param0.externalLink Genera un link externo
 * @param {{}} param0.props Otros props
 */
function ListOption({
	children,
	avatar,
	className,
	to,
	externalLink,
	...props
}) {
	const Element = to ? Link : externalLink ? "a" : "li";
	className = addClass(avatar ? "avatar" : null, className);

	return (
		<Element
			component="list-item"
			className={className}
			href={externalLink}
			to={to}
			{...props}>
			{children}
		</Element>
	);
}

/**
 * Crea un encabezado dentro de la lista
 * @param {Object} param0 Props del componente
 * @param {JSX.Element} param0.children Hijos del componente
 * @param {boolean} param0.avatar Indica si la lista contiene una imagen como avatar
 * @param {string} param0.className Lista de clases para el componente
 * @param {URL|{pathname:string, query:'?q=value', hash:'#a-hash', state: {}}} param0.to Crea links internos
 * @param {URL} param0.externalLink Genera un link externo
 * @param {{}} param0.props Otros props
 */
function ListHeader({ children, ...props }) {
	return (
		<ListOption component="list-header" {...props}>
			{children}
		</ListOption>
	);
}

/**
 * Crea un subcontendo dentro del elemento de la lista
 * @param {Object} param0 Props del componente
 * @param {JSX.Element} param0.children Hijos del componente
 * @param {boolean} param0.avatar Indica si la lista contiene una imagen como avatar
 * @param {string} param0.className Lista de clases para el componente
 * @param {URL|{pathname:string, query:'?q=value', hash:'#a-hash', state: {}}} param0.to Crea links internos
 * @param {URL} param0.externalLink Genera un link externo
 * @param {{}} param0.props Otros props
 */
function ListContent({ children, ...props }) {
	return (
		<ListOption component="list-content" {...props}>
			{children}
		</ListOption>
	);
}

export { ListView, ListOption, ListHeader, ListContent };
