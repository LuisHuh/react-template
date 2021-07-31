import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import FormContext from "./FormContext";
import { Button } from "@components";
import { addClass, mgFunction } from "@app/Helpers";

/**
 * Componente para cancelar y limpiar formulario.
 * @param {Object} param0 Props de componente.
 * @param {String} param0.className Lista de clases.
 * @param {()=>void} param0.onClick Evento click.
 * @param {Boolean} param0.disabled Desactiva el botón.
 * @returns {JSX.Element}
 */
function CancelForm({ children, className, onClick, disabled, ...rest }) {
	const context = useContext(FormContext);
	const hasContext = context instanceof Object;
	const { isEditing, onCancel } = context || {};

	className = addClass("hollow", className);

	if (hasContext && disabled == null) {
		disabled = !isEditing;
	}

	const on$Click = (e) => mgFunction(e, onCancel, onClick);

	return (
		<Button
			type="button"
			className={className}
			disabled={disabled}
			onClick={on$Click}
			{...rest}>
			{children}
		</Button>
	);
}

CancelForm.defaultProps = {
	children: "Cancel",
	className: "",
	onClick: () => {},
	disabled: null,
};

/**
 * Componente para enviar el formulario.
 * @param {Object} param0 Props de componente.
 * @param {String} param0.className Lista de clases.
 * @param {()=>void} param0.onClick Evento click.
 * @param {Boolean} param0.disabled Desactiva el botón.
 * @returns {JSX.Element}
 */
function SendForm({ children, className, onClick, disabled, ...rest }) {
	const context = useContext(FormContext);
	const hasContext = context instanceof Object;
	const { isEditing } = context || {};

	if (hasContext && disabled == null) {
		disabled = isEditing ? false : true;
	}

	return (
		<Button
			className={className}
			disabled={disabled}
			onClick={onClick}
			{...rest}>
			{children}
		</Button>
	);
}

SendForm.defaultProps = {
	children: "Save",
};

export { SendForm, CancelForm };
