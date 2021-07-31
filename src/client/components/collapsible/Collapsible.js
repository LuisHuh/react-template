/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description Collapsible.js - Collapsible base
 */

import React, { Component, createRef } from "react";
import ErrorCatching from "@app/Error";
import { addClass } from "@app/Helpers";
import {
	Collapsible as CollapsibleContainer,
	CollapsibleHeader,
	CollapsibleBody,
	CollapsibleDropIcon,
	CollapsibleContentHeader,
} from "./CollapsibleWidgets";

/**
 * Componente de collapsible
 */
class Collapsible extends Component {
	/**
	 * Constructor del componente
	 * @param {Object} props Props del componente
	 * @param {boolean} props.disabled Indica si el collapsible esta inactivo
	 *	@param {number} props.transitionTime Tiempo de la transicion al inicio
	 *	@param {string} props.transitionEffect Tipo de efecto para la transicion
	 *	@param {boolean} props.openAtStart Indica si el collapsible estará abierto o cerrado al inicio
	 *	@param {JSX.Element} props.header Contenido del encabezado
	 *	@param {JSX.Element} props.headerLeft Contenido del encabezado antes del icono
	 *	@param {() => {}} props.onOpen Función que se ejecuta cuando ya se termino de abrir el collapsible
	 *	@param {() => {}} props.onClose Función que se ejecuta cuando ya se termino de cerrar el collapsible
	 *	@param {() => {}} props.onOpening Función que se ejecuta cuando inicia su desplazamiento del collapsible
	 *	@param {() => {}} props.onClosing Función que se ejecuta cuando inicia el cierre del collapsible
	 */
	constructor(props) {
		super(props);
		this.handleOnTrigger = this.handleOnTrigger.bind(this);
	}

	/**
	 * Estados del componente
	 */
	state = {
		openAtStart: false,
		style: {},
	};

	/**
	 * Referencia para el contenedor del collapsible, permite obtener las medidas del contenedor.
	 */
	contentRef = createRef();

	/**
	 * Regresa la clases *is-open* e *is-disabled*.
	 */
	get headerClass() {
		return addClass(this.openClass, this.disabledClass);
	}

	/**
	 * Retorna el valor de *offsetHeight* del contenedor
	 * @return {number} offsetHeight
	 */
	get getOffsetHeight() {
		const refs = this.contentRef.current || {};
		return refs.offsetHeight || 0;
	}

	/**
	 * Regresa la clase *is-open* cuando esta abierto
	 */
	get openClass() {
		const { openAtStart } = this.state;
		return openAtStart ? "is-open" : "is-closed";
	}

	/**
	 * Regresa la clase *is-disabled* cuando esta desactivado el collapsible
	 */
	get disabledClass() {
		const { disabled } = this.props;
		return disabled ? "is-disabled" : "";
	}

	/**
	 * Retorna los estilos a pintar en el contendor del dropdown del collapsible
	 */
	get getDropdownStyles() {
		return this.state.style;
	}

	/**
	 * Establece los valores de los estados tipo estilos del componente
	 * @param {() => {}} callback Funcion a ejecutar despues del estado
	 * @param {number} height Altura del contendor
	 * @param {string} overflow tipo de scroll
	 * @param {number} transitionTime Tiempo para el effecto
	 * @param {string} effect Tipo de efecto a aplicar
	 */
	setStyles = (callback, height, overflow, transitionTime, effect) => {
		const style = Object.assign({}, this.state.style);
		if (height !== null && height !== undefined) style.height = height;
		if (overflow !== undefined) style.overflow = overflow;
		if (transitionTime && effect)
			style.transition = `height ${transitionTime}ms ${effect}`;

		this.setState(
			{
				style,
			},
			() => {
				if (callback && typeof callback === "function") callback();
			}
		);
	};

	/**
	 * Inicializa los estos del componente
	 */
	initComponent = () => {
		const { openAtStart, transitionTime, transitionEffect } = this.props;
		const height = openAtStart ? "auto" : 0;
		const overflow = openAtStart ? null : "hidden";
		const tranTime = openAtStart ? null : transitionTime;
		this.setStyles(
			() => {
				this.setState({ openAtStart });
			},
			height,
			overflow,
			tranTime,
			transitionEffect
		);
	};

	/**
	 * Funcion que genera las transiciones y estados del collapsible al abrir
	 */
	onOpen() {
		const height = this.getOffsetHeight;
		const { transitionTime, transitionEffect } = this.props;
		this.setState({ openAtStart: true });
		this.setStyles(null, height, "hidden", transitionTime, transitionEffect);
	}

	/**
	 * Funcion que genera las transiciones y estados del collapsible al cerrar
	 */
	onClose() {
		const height = this.getOffsetHeight;
		const { transitionTime, transitionEffect } = this.props;
		this.setStyles(
			() => {
				setTimeout(() => {
					this.setStyles(null, 0, "hidden");
					this.setState({ openAtStart: false });
				}, 50);
			},
			height,
			null,
			transitionTime,
			transitionEffect
		);
	}

	/**
	 * Funcion que agrega el evento click en el desplegable
	 * @param {Event} e Event Handle
	 */
	handleOnTrigger(e) {
		e.preventDefault();
		const { disabled, onOpening, onClosing } = this.props;
		const { openAtStart } = this.state;

		if (disabled) return;

		if (!openAtStart) {
			this.onOpen(e);
			onOpening(e);
		} else {
			this.onClose(e);
			onClosing(e);
		}
	}

	/**
	 * Funcion que agrega el evento al finalizar las tranciones del contenedor de collapsible
	 * @param {Event} e Event Handle
	 */
	handleOnTransitionEnd = (e) => {
		const { openAtStart } = this.state;
		const { onOpen, onClose } = this.props;
		if (openAtStart) {
			this.setStyles(null, "auto", "auto");
			onOpen();
		} else {
			onClose();
		}
	};

	componentDidMount() {
		this.initComponent();
	}

	render() {
		const { children, header, headerLeft, className } = this.props;
		return (
			<ErrorCatching>
				<CollapsibleContainer className={className}>
					<CollapsibleHeader className={this.headerClass}>
						{headerLeft}
						<CollapsibleDropIcon onClick={this.handleOnTrigger} />
						<CollapsibleContentHeader onClick={this.handleOnTrigger}>
							{header}
						</CollapsibleContentHeader>
					</CollapsibleHeader>
					<CollapsibleBody
						style={this.getDropdownStyles}
						onTransitionEnd={this.handleOnTransitionEnd}
						ref={this.contentRef}>
						{children}
					</CollapsibleBody>
				</CollapsibleContainer>
			</ErrorCatching>
		);
	}
}

Collapsible.defaultProps = {
	disabled: false,
	openAtStart: false,
	transitionTime: 400,
	transitionEffect: "linear",
	header: null,
	headerLeft: null,
	onOpen: () => {},
	onClose: () => {},
	onOpening: () => {},
	onClosing: () => {},
};

export default Collapsible;
