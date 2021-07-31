/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @version v1.0.0
 * Componente de formulario.
 */

import React, { Component, createRef } from "react";
import { isEqual } from "lodash";
import { FormProvider } from "./FormContext";
import { isEmpty } from "./Validator";

function getCorrectValue(value) {
	if (typeof value === "number") return 0;
	else if (typeof value === "string") return "";
	else if (typeof value === "boolean") return false;
	else if (Array.isArray(value)) return [];
	else return {};
}

/**
 * Estados del componente.
 */
const estados = {
	/**
	 * Permite saber si se está interactuando con el formulario.
	 */
	isEditing: false,

	/**
	 * Permite saber si los campos del formulario son validos.
	 */
	isValid: false,

	/**
	 * Ordena a los inputs a mostrar los mensajes de error.
	 */
	messagesVisibility: false,

	/**
	 * Valor de los inputs del formulario.
	 */
	fields: {},

	/**
	 * Contiene los inputs que son requeridos o no son validos para el formulario.
	 * @type {Array<String>}
	 */
	invalidFields: [],
};

/**
 * Formulario.
 */
class Form extends Component {
	/**
	 * @param {Object} props Props de componente.
	 * @param {(data: {}, resetForm: Boolean) => void} props.onSubmit Función que se ejecuta al enviar el formulario.
	 * @param {() => void} props.onCancel Función para restablecer el formulario.
	 */
	constructor(props) {
		super(props);
		this.form = createRef();
	}

	/**
	 * Objeto para almacenar temporalmente los valores de los inputs,
	 * para evitar que se pierdan al actualizar el _state_.
	 */
	tmpFields = {};

	/**
	 * _Estados_ del componente.
	 */
	state = { ...estados };

	/**
	 * Evento que se ejecuta después de que el formulario se escribe en el dom.
	 */
	componentDidMount() {
		this.props.$ref.current = this;
		this.setFormState().then((formState) => {
			this.props.onValid(formState.isValid, formState.invalidFields);
		});
	}

	/**
	 * Evento que se ejecuta cada vez que cambian los props o los estados.
	 * @param {{}} prevProps Props anteriores del componente.
	 * @param {estados} prevState Estados anteriores del componente.
	 */
	componentDidUpdate(prevProps, prevState) {
		if (!isEqual(prevState.invalidFields, this.state.invalidFields)) {
			this.setFormState().then((formState) => {
				this.props.onValid(formState.isValid, formState.invalidFields);
			});
		} else if (!isEqual(prevState.fields, this.state.fields)) {
			this.props.onChange(this.state.fields);
		}
	}

	/**
	 * Establece el valor inicial del campo de entrada.
	 * @param {String} name Nombre del campo.
	 * @param {*} initValue Valor inicial del campo.
	 */
	init = (name, initValue) => {
		this.setState((prevState) => {
			const fields = { ...prevState.fields };
			fields[name] = initValue;
			return { fields };
		});
	};

	/**
	 * Evento que actualiza el state de los inputs.
	 * @param {Event} e Evento.
	 */
	handleOnChange = (e) => {
		const input = e.target;
		const value = input.type === "checkbox" ? input.checked : input.value;
		this.setFields({ [input.name]: value }, () => {
			this.setEditing(true);
		});
	};

	/**
	 * Evento que recibe la acción del submit.
	 * @param {Event} e Evento.
	 */
	handleOnSubmit = (e) => {
		e.preventDefault();
		const { onSubmit } = this.props;
		const { fields } = this.state;
		onSubmit(fields, this.handleOnCancel);
	};

	/**
	 * Evento que reinicia el valor de los inputs.
	 * @param {Event} e Evento.
	 */
	handleOnCancel = (e) => {
		const { onCancel } = this.props;
		const fields = Object.assign({}, this.state.fields);
		Object.keys(fields).forEach((key) => {
			const value = getCorrectValue(fields[key]);
			fields[key] = value;
		});
		this.setFields(fields, () => {
			this.setEditing(false);
			onCancel();
		});
		//e.preventDefault();
	};

	/**
	 * Función que actualiza el estado del form de cada input.
	 * @param {{}} params valores con llaves a enviar al estado
	 * @param {()=>{}} callback Función después del state
	 */
	setFields = (params, callback = () => {}) => {
		this.setState((prevState) => {
			const fields = { ...prevState.fields };
			Object.keys(params).forEach((key) => {
				fields[key] = params[key];
			});
			return { fields };
		}, callback);
	};

	/**
	 * Regresa los datos del input del formulario.
	 * @returns {{}}
	 */
	getFields = () => {
		return this.state.fields;
	};

	/**
	 * Estable si el form esta siendo editado.
	 * @param {Boolean} value _True_ o _False_.
	 */
	setEditing = (value) => {
		this.setState({ isEditing: value });
	};

	/**
	 * Establece si se requiere mostrar los mensajes de validación de los inputs.
	 * @param {Boolean} value Valor.
	 */
	setMessagesVisibility = (value) => {
		this.setState({ messagesVisibility: value });
	};

	/**
	 * Establece el estado del formulario, si es valido o no.
	 * @returns {Promise<{isValid: Boolean, invalidFields: Array<String>}>}
	 */
	setFormState = () => {
		return new Promise((resolve, reject) => {
			try {
				const { invalidFields } = this.state;
				const isValid = invalidFields.length == 0;
				this.setState({ isValid }, () => {
					resolve({ isValid, invalidFields });
				});
			} catch (e) {
				reject(e);
			}
		});
	};

	/**
	 * Agrega un input invalido por nombre al estado.
	 * @param {String} name Nombre del input.
	 */
	setInvalidField = (name) => {
		this.setState((prev) => {
			const elms = prev.invalidFields.slice();
			if (!isEmpty(name) && elms.indexOf(name) == -1) {
				elms.push(name);
				return { invalidFields: elms };
			}
		});
	};

	/**
	 * Permite remover un input por nombre del estado.
	 * @param {String} name Nombre del input.
	 */
	removeInvalidField = (name) => {
		this.setState((prev) => {
			let index = -1;
			const elms = prev.invalidFields.slice();
			if (!isEmpty(name) && (index = elms.indexOf(name)) > -1) {
				elms.splice(index, 1);
				return { invalidFields: elms };
			}
		});
	};

	/**
	 * Restablece el formulario.
	 * @param {()=>{}} callback Evento que se ejecta después de restablecer el formulario.
	 */
	resetForm = (callback = () => {}) => {
		this.setState(estados, callback);
	};

	render() {
		const {
			children,
			fileSupport,
			onSubmit,
			onCancel,
			onChange,
			onValid,
			$ref,
			...rest
		} = this.props;
		const { fields, isEditing, messagesVisibility } = this.state;
		const encType = fileSupport ? "multipart/form-data" : null;

		return (
			<form
				ref={this.form}
				encType={encType}
				onSubmit={this.handleOnSubmit}
				{...rest}>
				<FormProvider
					value={{
						fields,
						isEditing,
						messagesVisibility,
						init: this.init,
						setValues: this.setFields,
						setMessagesVisibility: this.setMessagesVisibility,
						setEditing: this.setEditing,
						setInvalidField: this.setInvalidField,
						removeInvalidField: this.removeInvalidField,
						resetForm: this.resetForm,
						handle: this.handleOnChange,
						onCancel: this.handleOnCancel,
					}}>
					{children}
				</FormProvider>
			</form>
		);
	}
}

Form.defaultProps = {
	$ref: createRef(),
	onSubmit: (data, resetForm) => {},
	onChange: (fields) => {},
	onValid: (isValid, invalidFields) => {},
	onCancel: () => {},
};

export default Form;
