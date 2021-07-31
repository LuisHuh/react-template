/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description CustomRoutes.js - Archivo que contiene componentes de rutas personalizadas.
 */

import React, { Fragment, useRef, useEffect } from "react";
import { Route, Redirect, Link as ReactLink } from "react-router-dom";
import Auth from "./Auth";

/**
 * Crea una ruta personalizada con una plantilla
 * @param {Object} props
 * @param {React.Component} props.component Componente o vista a renderear.|
 * @param {React.Component} props.layout Plantilla para la vista
 * @param {Object} props.rest Otros atributos.
 */
function AppRoute({ component: Component, layout, ...rest }) {
	const Layout = layout ? layout : Fragment;
	return (
		<Route
			{...rest}
			render={(props) => (
				<Layout>
					<Component {...props} />
				</Layout>
			)}
		/>
	);
}

/**
 * Evita entrar a rutas sin una session de usuario.
 * @param {Object} props Parámetros.
 */
function PrivateRoute(props) {
	if (Auth.isAuthenticated()) {
		return <AppRoute {...props} />;
	}

	return (
		<Redirect
			to={{
				pathname: "/login",
				state: { from: props.location },
			}}
		/>
	);
}

/**
 * Genera un ruta personalizada para los errores de paginas como 404, 500 u otro.
 * @param {Object} props Parámetros.
 * @param {JSX.Element} props.publicLayout Renderea un tema publico.
 * @param {JSX.Element} props.privateLayout Renderea un tema privado.
 */
function ErrorRoute({publicLayout, privateLayout, ...rest}){
	const layout = Auth.isAuthenticated()? privateLayout : publicLayout;
	return <AppRoute layout={layout} {...rest} />;
}

/**
 * Genera un componente personalizado sobre *Link* de *React DOM*.
 * @param {Object} param0 Props de componente.
 * @param {JSX.Element} param0.children Hijo del elemento.
 * @param {string} param0.component Tipo de componente para estilos.
 * @param {{}|string} param0.to Ruta destino.
 * @param {{}} param0.props Otros parámetros.
 */
function Link({ children, component, ...props }) {
	const ref = useRef();
	useEffect(() => {
		if (component) {
			ref.current.setAttribute("component", component);
		}
	}, []);

	return (
		<ReactLink {...props} ref={ref}>
			{children}
		</ReactLink>
	);
}

export { PrivateRoute, ErrorRoute, Link };
export default AppRoute;
