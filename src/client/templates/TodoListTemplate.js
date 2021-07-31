/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description Public Template
 */
import React from "react";
import Template from "./Template";
import { Grid, Navbar, Footer, Image,Gradient } from "@components";
import image from '@app/image.js';

/**
 * Plantilla para las vistas publicas o que no requiere todas las opaciones.
 * @param { Object } props Parametros pasado a la plantilla
 * @param { JSX.Element } props.children Hijo de la plantilla
 * @returns { JSX.Element } Component
 */
function TodoListTemplate({ children, ...props }) {
	return (
		<Template stylesheet="wedding-theme" {...props} theme="public-theme">
			<Navbar />
			<Gradient>
				<Image className="todo-image-banner-desktop" src={image.bannerTodoListDesktop}/>
				<Image className="todo-image-banner-mobile" src={image.bannerTodoListMobile}/>
			</Gradient>
			<Grid>{children}</Grid>
			<Footer />
		</Template>
	);
}

export default TodoListTemplate;
