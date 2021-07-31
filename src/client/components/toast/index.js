/**
 * Toast
 * @author Luis Enrique Huh Puc <`luisenriquehuhpuc@hotmail.com`>
 * @version 0.1.0
 * @description Clase que genera toasts.
 */
"use strict";

import React, { Fragment, forwardRef } from "react";
import ReactDOM from "react-dom";
import { Guid } from "@app/Helpers";
import Anime from "@app/Anime";
import { createWidgetContainer, getWidgetContainer } from "@app/CustomWidget";
import polyfillRemove from "./polyfill"; // Don't remove this line.

/**
 * Valores por defecto del toast.
 */
let _defaults = {
	html: "",
	displayLength: 4000,
	inDuration: 300,
	outDuration: 375,
	classes: "",
	completeCallback: null,
	activationPercent: 0.8,
};

/**
 * Contenedor del Toast
 */
const TContainer = forwardRef(
	/**
	 * @param {Object} props Props de componente.
	 * @param {String} props.id Identificador de componente.
	 * @param {()=>{}} props.onTouchStart Evento al presionar el toast.
	 * @param {()=>{}} props.onTouchMove Evento al mover el toast.
	 * @param {()=>{}} props.onTouchEnd Evento al dejar de presionar el toast.
	 * @param {()=>{}} props.onMouseDown Evento al hacer click en el toast.
	 * @param {()=>{}} props.onMouseMove Evento al mover el toast con el mouse.
	 * @param {()=>{}} props.onMouseUp Evento al soltar el click del toast.
	 * @param {React.createRef} ref Referencia de componente.
	 */
	function ToastContainer({ children, ...rest }, ref) {
		return (
			<div ref={ref} {...rest}>
				{children}
			</div>
		);
	}
);

/**
 * Componente Toast
 * @param {Object} props Props de componente.
 * @param {React.Component} props.children Hijo del componente.
 */
function Toast({ children }) {
	return <Fragment>{children}</Fragment>;
}

/**
 * Clase que contiene la lógica del toast.
 * @class ToastJS
 */
class ToastJS {
	constructor(options) {
		/**
		 * Opciones del toast
		 */
		this.options = Object.assign({}, ToastJS.defaults, options);
		this.message = this.options.html;

		/**
		 * Establece si el toast está siendo manupulado por el mouse.
		 */
		this.isOnDrag = false;

		/**
		 * Tiempo restante hasta que el toast desaparezca.
		 */
		this.timeRemaining = this.options.displayLength;

		if (ToastJS._toasts.length === 0) {
			ToastJS._createContainer();
		}

		// Se crea nuevo Toast
		ToastJS._toasts.push(this);
		let toastElement = this._createToast();
		toastElement.R_Toast = this;
		this.el = toastElement;
		this._animateIn();
		this._setTimer();
	}

	/**
	 * Regresa los valores por defecto del Toast
	 */
	static get defaults() {
		return _defaults;
	}

	/**
	 * Crea el contenedor para los Toast y agrega eventos.
	 */
	static _createContainer() {
		let parent = getWidgetContainer();
		if (!parent) {
			parent = createWidgetContainer();
		}

		const container = (
			<TContainer
				ref={ToastJS._containerRef}
				id="toast-container"
				onTouchStart={ToastJS._onDragStart}
				onTouchEnd={ToastJS._onDragEnd}
				onMouseDown={ToastJS._onDragStart}
			/>
		);

        document.addEventListener("mousemove", ToastJS._onDragMove);
        document.addEventListener("mouseup", ToastJS._onDragEnd);

		ReactDOM.render(container, parent);
		ToastJS._container = ToastJS._containerRef.current;
        ToastJS._container.addEventListener("touchmove", ToastJS._onDragMove);
	}

	/**
	 * Elimina el contenedor de los Toasts.
	 */
    static _removeContainer() {
        // Remove event handler
		ToastJS._container.removeEventListener("mouseup", ToastJS._onDragEnd);
        
		document.removeEventListener("mousemove", ToastJS._onDragMove);
        document.removeEventListener("mouseup", ToastJS._onDragEnd);

		ReactDOM.unmountComponentAtNode(ToastJS._container.parentElement);
		ToastJS._container = null;
	}

	/**
	 * Evento cuando se presiona o se hace click sobre el toast.
	 * @param {Event} e Evento accionador.
	 */
	static _onDragStart(e) {
		const el = e.target;
		const $toast = ToastJS._toasts;
		let index = -1;

		if (el && (index = $toast.findIndex((t) => t.el.id == el.id)) > -1) {
			let toast = $toast[index].el.R_Toast;
			toast.isOnDrag = true;
			ToastJS._draggedToast = toast;
			toast.el.classList.add("dragging");
			toast.el.style.transition = "";
			toast.startingXPos = ToastJS._xPos(e);
			toast.time = Date.now();
			toast.xPos = ToastJS._xPos(e);
		}
	}

	/**
	 * Evento de arrastre del toast.
	 * @param {Event} e Evento accionador.
	 */
	static _onDragMove(e) {
		if (!!ToastJS._draggedToast) {
			e.preventDefault();
			let toast = ToastJS._draggedToast;
			toast.deltaX = Math.abs(toast.xPos - ToastJS._xPos(e));
			toast.xPos = ToastJS._xPos(e);
			toast.velocityX = toast.deltaX / (Date.now() - toast.time);
			toast.time = Date.now();

			let totalDeltaX = toast.xPos - toast.startingXPos;
			let activationDistance =
				toast.el.offsetWidth * toast.options.activationPercent;
			toast.el.style.transform = `translateX(${totalDeltaX}px)`;
			toast.el.style.opacity =
				1 - Math.abs(totalDeltaX / activationDistance);
		}
	}

	/**
	 * Evento al dejar de ejercer presión sobre el toast.
	 * @param {Event} e Evento accionador.
	 */
	static _onDragEnd(e) {
		if (!!ToastJS._draggedToast) {
			let toast = ToastJS._draggedToast;
			toast.isOnDrag = false;
			toast.el.classList.remove("dragging");

			let totalDeltaX = toast.xPos - toast.startingXPos;
			let activationDistance =
				toast.el.offsetWidth * toast.options.activationPercent;
			let shouldBeDismissed =
				Math.abs(totalDeltaX) > activationDistance || toast.velocityX > 1;

			// Remove toast
			if (shouldBeDismissed) {
				toast.wasSwiped = true;
				toast.dismiss();

				// Animate toast back to original position
			} else {
				toast.el.style.transition = "transform .2s, opacity .2s";
				toast.el.style.transform = "";
				toast.el.style.opacity = "";
			}
			ToastJS._draggedToast = null;
		}
	}

	/**
	 * Regresa la posicion en X del evento del mouse o el touch.
	 * @param {Event} e Evento accionador.
	 */
	static _xPos(e) {
		if (e.targetTouches && e.targetTouches.length >= 1) {
			return e.targetTouches[0].clientX;
		}
		// mouse event
		return e.clientX;
	}

	/**
	 * Elimina todos los toast.
	 */
	static dismissAll() {
		for (let toastIndex in ToastJS._toasts) {
			ToastJS._toasts[toastIndex].dismiss();
		}
	}

	/**
	 * Crea el Toast y lo agrega al contenedor.
	 * @returns {HTMLElement} toast.
	 */
	_createToast() {
		const { classes } = this.options;
		const toastWrapper = document.createElement("div");
		toastWrapper.setAttribute("id", Guid());
		toastWrapper.setAttribute("component", "toast");

		if (!!classes.length) {
			toastWrapper.setAttribute("class", classes);
		}

		ToastJS._container.appendChild(toastWrapper);

		let toast = <Toast>{this.message}</Toast>;
		ReactDOM.render(toast, toastWrapper);
		return toastWrapper;
	}

	/**
	 * Elimina el toast actual.
	 */
	_remove() {
		ReactDOM.unmountComponentAtNode(this.el);
		this.el.remove();
	}

	/**
	 * Animación de entrada.
	 */
	_animateIn() {
		Anime({
			targets: this.el,
			top: 0,
			opacity: 1,
			duration: this.options.inDuration,
			easing: "easeOutCubic",
		});
	}

	/**
	 * Contador que establece el tiempo que permanece el Toast en pantalla.
	 */
	_setTimer() {
		if (this.timeRemaining !== Infinity) {
			this.counterInterval = setInterval(() => {
				// Si el toast no ha sido arrastrado, el tiempo empieza a disminuir.
				if (!this.isOnDrag) {
					this.timeRemaining -= 20;
				}

				// Inicia la animación de salida.
				if (this.timeRemaining <= 0) {
					this.dismiss();
				}
			}, 20);
		}
	}

	/**
	 * Animación de salida del toast.
	 */
	dismiss() {
		clearInterval(this.counterInterval);
		let activationDistance =
			this.el.offsetWidth * this.options.activationPercent;

		if (this.wasSwiped) {
			this.el.style.transition = "transform .05s, opacity .05s";
			this.el.style.transform = `translateX(${activationDistance}px)`;
			this.el.style.opacity = 0;
		}

		Anime({
			targets: this.el,
			opacity: 0,
			marginTop: -40,
			duration: this.options.outDuration,
			easing: "easeOutExpo",
			complete: () => {
				// Función callback opcional.
				if (typeof this.options.completeCallback === "function") {
					this.options.completeCallback();
				}
				// Elimina el toast del DOM.
				this._remove();
				ToastJS._toasts.splice(ToastJS._toasts.indexOf(this), 1);
				if (ToastJS._toasts.length === 0) {
					ToastJS._removeContainer();
				}
			},
		});
	}
}

/**
 * @static
 * @memberof ToastJS
 * @type {React.createRef()}
 */
ToastJS._toastRef = React.createRef();

/**
 * @static
 * @memberof ToastJS
 * @type {Array.<ToastJS>}
 */
ToastJS._toasts = [];

/**
 * @static
 * @memberof ToastJS
 * @type {React.createRef()}
 */
ToastJS._containerRef = React.createRef();

/**
 * @static
 * @memberof ToastJS
 * @type {HTMLElement}
 */
ToastJS._container = null;

/**
 * @static
 * @memberof ToastJS
 * @type {ToastJS}
 */
ToastJS._draggedToast = null;

/**
 * Variable global
 */
if (!globalThis.Toast) {
	globalThis.Toast = ToastJS;
}

/**
 * Toast
 * @param {Object} props Props de componente.
 * @param {String|React.Component} props.html Contenido del toast.
 * @param {Number} props.displayLength Tiempo de duración en la pantalla.
 * @param {Number} props.inDuration Tiempo de duración de la animación de entrada.
 * @param {Number} props.outDuration Tiempo de duración de la animación de salida.
 * @param {String} props.classes Clases para el toast.
 * @param {()=>{}} props.completeCallback Función a ejecutar despues de desaparecer el toast.
 * @param {Number} props.activationPercent Porcentaje de algo.
 */
function ReactToast(props) {
	return new ToastJS(props);
}

export default ReactToast;
