import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import FormContext from "./FormContext";
import { Guid, addClass, mgFunction, generator } from "@app/Helpers";
import { ServiceContext } from "@app/ServiceContext";
import UseText from "@app/UseText";
import MainSelect from "@components/dropdown/select";
import {
	toUpperCase,
	textValidator,
	rangeValidator,
	isEmpty,
	isIntoLimit,
	isEmailValid,
	isPasswordValid,
	isCardNumberValid,
	cardNumberFormatter,
	numericValidator,
} from "./Validator";
import messages from "./validationMessages";
import initialState from "./initialState";

/**
 * Regresa los archivos del input file
 * @param {HTMLElement} input Input
 */
function getFiles(input) {
	const source = input.files;
	let names = [];
	let files = [];

	if (source.length > 0) {
		for (let i = 0; i < source.length; i++) {
			const file = source.item(i);
			names.push(file.name);
			files.push(file);
		}
	}

	names = names.join(";");

	return { filenames: names, source: files };
}

/**
 * Genera los meses para el selector.
 */
const months = (() => {
	const mms = generator.getMonths();
	return mms.map((m, k) => {
		let mm = k + 1;
		let value = mm - Math.floor(mm);
		mm = mm - value;
		value = ("0" + mm).slice(-2) + value.toString().substr(1);

		return {
			value,
			label: value,
		};
	});
})();

// Genera los años.
const years = (() => {
	const yrs = generator.getDropdownYears(10, 0, true);
	return Object.keys(yrs).map((y) => ({ label: y, value: yrs[y] }));
})();

/**
 * Agrupa los componentes del formulario. Ideal para validar dos elementos en uno.
 * @param {Object} param0 Props de componente.
 * @returns {JSX.Element}
 */
function FormGroup({ children, success, error }) {
	return (
		<div component="group" valid={""}>
			{children}
			<span
				className="helper-text"
				data-success={success}
				data-error={error}
			></span>
		</div>
	);
}

/**
 * Etiqueta de formulario
 * @param {Object} param0 Props de componente
 * @param {{}} param0.rest Props de componente
 */
function Label({ children, ...rest }) {
	if (children) {
		return <label {...rest}>{children}</label>;
	}

	return null;
}

/**
 * Agrupa los iconos, etiquetas de un campo de entrada para que se visualicen correctamente.
 * @param {Object} param0 Props del componente.
 * @param {JSX.Element} param0.children Hijos del componente.
 * @param {string|Array<string>} param0.className Lista de clases.
 */
function InputGroup({ children, className, ...rest }) {
	className = addClass("input-group", className);

	return (
		<div className={className} {...rest}>
			{children}
		</div>
	);
}

/**
 * Componente de campo de entrada de formulario (Input normal).
 * @param {Object} param0 Props del componente
 * @param {{current: null}} param0.$ref Referencia de react.
 * @param {String} param0.label Etiqueta del input
 * @param {String} param0.type Tipo de campo de entrada
 * @param {String} param0.name Nombre del campo, se utilizara como variable
 * @param {String} param0.placeholder Texto de ayuda para el campo
 * @param {String} param0.value Valor del input. Se omite cuando esta presente el formulario.
 * @param {String} param0.className Lista de clases.
 * @param {Boolean} param0.enableCaps Habilita el texto en mayúsculas.
 * @param {Boolean} param0.disableNum No permite datos numéricos en el texto.
 * @param {Boolean} param0.required Establece si el campo es requerido.
 * @param {Boolean} param0.validate Establece si el campo requiere ser validado.
 * @param {String} param0.success Mensaje cuando la validación es correcta.
 * @param {String} param0.error Mensaje de error de validación.
 * @param {() => {}} param0.onChange Función que escucha el cambio de los datos en el input.
 * @param {{}} param0.rest otros parámetros.
 */
function Input({
	$ref,
	label,
	type,
	name,
	placeholder,
	value,
	className,
	enableCaps,
	disableNum,
	required,
	validate,
	success,
	error,
	onChange,
	onInput,
	onKeyPress,
	onBlur,
	...rest
}) {
	// Contexto del formulario.
	const context = useContext(FormContext);
	const {
		init,
		setInvalidField,
		removeInvalidField,
		messagesVisibility,
		fields,
		handle,
	} = context;
	const hasContext = context instanceof Object;

	// Variables locales.
	const [id, setID] = useState("");
	const [isMounting, setMounting] = useState(true);
	const [showValidation, setValidate] = useState(false);
	const [isValid, setValid] = useState(false);
	const el = useRef(null);

	useEffect(() => {
		setID(rest.id || Guid());
		$ref.current = { setID, setValid, setValidate };
		let input = null;

		if (hasContext) init(name, initialState[type]);

		if ((input = el.current) instanceof HTMLElement)
			handleValidator({ target: input });
	}, []);

	useEffect(() => {
		if (hasContext) {
			if (isValid) removeInvalidField(name);
			else setInvalidField(name);
		}
	}, [isValid]);

	useEffect(() => {
		if (hasContext) {
			if (messagesVisibility && !isValid) setValidate(true);
			else setValidate(false);
		}
	}, [messagesVisibility]);

	// Parámetros.
	if (hasContext) {
		onChange = handle;
		if (isMounting) {
			value = initialState[type];
			setMounting(false);
		} else {
			if (fields[name]) value = fields[name];
		}
	}

	const handleValidator = (e) => {
		if (required) {
			const element = e.target;
			if (isEmpty(element.value)) setValid(false);
			else setValid(true);
		} else {
			setValid(true);
		}
	};

	const showMessages = (e) => {
		if (validate || required) setValidate(true);
	};

	const on$Input = (e) =>
		mgFunction(e, !!enableCaps ? toUpperCase : null, onInput);
	const on$KeyPress = (e) =>
		mgFunction(e, !!disableNum ? textValidator : null, onInput);
	const on$Blur = (e) => mgFunction(e, handleValidator, showMessages, onBlur);

	const options = {
		placeholder,
		type,
		id,
		name,
		value,
		required,
		onChange,
		onInput: on$Input,
		onKeyPress: on$KeyPress,
		onBlur: on$Blur,
		...rest,
	};

	if (typeof isValid === "boolean") {
		options[isValid ? "valid" : "invalid"] = "";
	}
	options["validate"] = showValidation ? "" : null;

	const InputType = type === "textarea" ? "textarea" : "input";

	return (
		<InputGroup className={className}>
			<InputType ref={el} {...options} />
			<Label htmlFor={id} className="active">
				{label}
			</Label>
			<span
				className="helper-text"
				data-success={success}
				data-error={error}
			></span>
		</InputGroup>
	);
}

function Textarea(props) {
	return <Input {...props} type="textarea" />;
}

function InputNumber({ disableNum, onInput, onBlur, validate, ...rest }) {
	const ref = useRef();
	const options = {
		...rest,
		$ref: ref,
		type: "number",
		onInput,
		onBlur,
	};

	if (!validate) {
		options.onInput = (e) => mgFunction(e, rangeValidator, onInput);
	} else {
		const handleValidate = (e) => {
			ref.current.setValidate(true);
			if (isIntoLimit(e)) {
				ref.current.setValid(true);
			} else {
				ref.current.setValid(false);
			}
		};
		options.onBlur = (e) => mgFunction(e, handleValidate, onBlur);
	}

	return <Input {...options} />;
}

function InputEmail({ disableNum, onBlur, validate, required, ...rest }) {
	const ref = useRef();
	const options = {
		...rest,
		$ref: ref,
		type: "email",
		required,
		onBlur,
	};

	const handleValidate = (e) => {
		const el = e.target;
		ref.current.setValidate(true);

		if (!isEmpty(el.value)) {
			if (isEmailValid(el.value)) {
				ref.current.setValid(true);
			} else {
				ref.current.setValid(false);
			}
		} else {
			if (!required) {
				ref.current.setValid(true);
			}
		}
	};

	options.onBlur = (e) => mgFunction(e, handleValidate, onBlur);

	return <Input {...options} />;
}

function InputPassword({
	disableNum,
	onInput,
	onBlur,
	required,
	validate,
	...rest
}) {
	const ref = useRef();
	const [success, setSuccess] = useState(messages.success);
	const [error, setError] = useState(messages.error);
	const options = {
		...rest,
		$ref: ref,
		type: "password",
		autoComplete: "off",
		success,
		error,
		required,
		onBlur,
	};

	const handleValidate = (e) => {
		const el = e.target;
		ref.current.setValidate(true);
		if (!isEmpty(el.value)) {
			const validation = isPasswordValid(el.value);
			ref.current.setValid(validation.valid);
			if (validation.quality === "low")
				setError(
					`${messages.password.NOTICE} - ${messages.password.LOW}`
				);
			else if (validation.quality === "regular")
				setSuccess(
					`${messages.password.NOTICE} - ${messages.password.REGULAR}`
				);
			else
				setSuccess(
					`${messages.password.NOTICE} - ${messages.password.STRONG}`
				);
		} else {
			if (!required) {
				setSuccess(messages.success);
				ref.current.setValid(true);
			} else {
				setError(messages.error);
			}
		}
	};

	options.onBlur = (e) => mgFunction(e, handleValidate, onBlur);

	return <Input {...options} />;
}

function InputCreditCard({
	disableNum,
	onBlur,
	onInput,
	onKeyPress,
	required,
	validate,
	...rest
}) {
	const ref = useRef();
	const [success, setSuccess] = useState(messages.success);
	const [error, setError] = useState(messages.error);

	const options = {
		...rest,
		$ref: ref,
		type: "text",
		autoComplete: "off",
		success,
		error,
		required,
		onBlur,
		onInput,
		onKeyPress,
		minLength: 14,
		maxLength: 23,
	};

	const handleValidate = (e) => {
		const el = e.target;
		ref.current.setValidate(true);
		if (!isEmpty(el.value)) {
			const validation = isCardNumberValid(el.value);
			if (validation.status === "OK") {
				ref.current.setValid(true);
			} else {
				ref.current.setValid(false);
				if (validation.status === "INVALID_LENGTH") {
					setError(messages.cardNumber.INVALID_LENGTH);
				} else {
					setError(messages.cardNumber.INVALID_CARD);
				}
			}
		} else {
			if (!required) {
				setSuccess(messages.success);
				ref.current.setValid(true);
			} else {
				setError(messages.error);
			}
		}
	};

	const formatter = (e) => {
		const el = e.target;
		if (!isEmpty(el.value)) {
			el.value = cardNumberFormatter(el.value);
		}
	};

	options.onBlur = (e) => mgFunction(e, handleValidate, onBlur);
	options.onInput = (e) => mgFunction(e, formatter, onInput);
	options.onKeyPress = (e) => mgFunction(e, numericValidator, onKeyPress);

	return <Input {...options} />;
}

/**
 * Campo de entrada tipo select.
 * @param {Object} props Props de componente.
 * @param {String} props.className Lista de clases.
 * @param {Object[]} props.items Lista de elementos a renderizar.
 * @param {String} props.items[].value Valor de la opción.
 * @param {String} props.items[].label Etiqueta a mostrar.
 * @param {String} props.name nombre de la variable del select.
 * @param {String} props.value Valor del select.
 * @param {String} props.placeholder Texto a mostrar como referencia, por defecto _Select Options_.
 * @param {Boolean} props.autoComplete Activa el buscador de los elementos, por defecto _false_.
 * @param {Boolean} props.constrainWidth Adapta el ancho del contenido al ancho del input principal, por defecto _true_.
 * @param {Boolean} props.coverTrigger Estable si el menu desplegable se muestra debajo o encima del input, por defecto _true_.
 * @param {Boolean} props.closeOnClick Establece si el menu se cerrara al hacer click en un elemento, pot defecto _true_.
 * @param {Boolean} props.hover Estable si el menu se abrirá al pasar el mouse sobre el input, por defecto _false_.
 * @param {"left"|"right"} props.alignment Posición en la cual se abrirá el menu desplegable, por defecto _left_.
 * @param {Number} props.inDuration Duración de entrada de la animación, por defecto _150ms_.
 * @param {Number} props.outDuration Duración de salida de la animación, por defecto _250ms_.
 * @param {Boolean} props.required Establece si el campo es requerido.
 * @param {Boolean} props.validate Establece si el campo requiere ser validado.
 * @param {String} props.success Mensaje cuando la validación es correcta.
 * @param {String} props.error Mensaje de error de validación.
 * @param {() => void} props.onOpenStart Callback al abrir el menu desplegable.
 * @param {() => void} props.onOpenEnd Callback al finalizar de abrir el menu desplegable
 * @param {() => void} props.onCloseStart Callback al iniciar el cierre del menu desplegable
 * @param {() => void} props.onCloseEnd Callback al cerrar el menu desplegable
 * @param {() => void} props.onItemClick Callback al seleccionar un elemento del menu desplegable
 * @returns {JSX.Element} Select.
 */
function Select({
	$ref,
	className,
	label,
	name,
	value,
	success,
	error,
	required,
	validate,
	onItemClick,
	onCloseEnd,
	...rest
}) {
	const context = useContext(FormContext);
	const {
		fields,
		messagesVisibility,
		handle,
		init,
		removeInvalidField,
		setInvalidField,
	} = context;
	const hasContext = context instanceof Object;
	const [isValid, setValid] = useState(null);
	const [showValidation, setValidate] = useState(false);
	const [selectValue, setSelectValue] = useState("");
	let classValidate;

	useEffect(() => {
		$ref.current = { setValid, setValidate };
		if (hasContext) {
			init(name, initialState["select"]);
		}
		onValidate({ value: selectValue });
	}, []);

	useEffect(() => {
		if (hasContext) {
			if (isValid) removeInvalidField(name);
			else setInvalidField(name);
		}
	}, [isValid]);

	useEffect(() => {
		if (hasContext) {
			if (messagesVisibility && !isValid) setValidate(true);
			else setValidate(false);
		}
	}, [messagesVisibility]);

	if (hasContext) {
		if (fields[name]) {
			value = fields[name];
		}
	}

	const onValidate = (params) => {
		if (required) {
			if (isEmpty(params.value)) setValid(false);
			else setValid(true);
		} else {
			setValid(true);
		}
	}

	const onChange = (params) => {
		setSelectValue(params.value);
		if (typeof handle === "function") {
			handle({ target: { type: "text", name, value: params.value } });
		}
	};

	const showMessages = (e) => {
		if (validate || required) setValidate(true);
	};

	const on$ItemClick = (params) => mgFunction(params, onChange, onItemClick);
	const on$CloseEnd = (params) => mgFunction(params, onValidate, showMessages, onCloseEnd);

	

	if (typeof isValid === "boolean") {
		classValidate = isValid ? "valid" : "invalid";
	}
	classValidate = addClass(classValidate, showValidation ? "validate" : null);

	const options = {
		name,
		value,
		className: classValidate,
		onCloseEnd: on$CloseEnd,
		onItemClick: on$ItemClick,
		...rest,
	};

	return (
		<InputGroup className={className}>
			<MainSelect {...options} />
			<Label className="active">{label}</Label>
			<span
				className="helper-text"
				data-success={success}
				data-error={error}
			></span>
		</InputGroup>
	);
}

/**
 * Componente de campo de entrada para archivos
 * @param {Object} param0 Props del componente
 * @param {string} param0.label Etiqueta del input
 * @param {string} param0.name Nombre del campo, se utilizara como variable
 * @param {string} param0.placeholder Texto de ayuda para el campo
 * @param {'left'|'right'} param0.buttonPos Posicion del boton de seleccionar archivo
 * @param {string} param0.buttonLabel Texto para el boton
 * @param {{}} param0.rest otros parametros
 */
function FileInput({
	label,
	name,
	buttonPos,
	buttonLabel,
	placeholder,
	value,
	onChange,
	...rest
}) {
	const [filename, setFilename] = useState("");
	const context = useContext(FormContext);
	const { getText } = useContext(ServiceContext);

	if (context) {
		const { setValues, setEditing, fields } = context || {};
		const val = fields[name];
		if (filename != val) {
			if (Array.isArray(val) && val.length <= 0) {
				setFilename("");
			}
		}
		onChange = (e) => {
			const input = e.target;
			const files = getFiles(input);
			setValues({ [name]: files.source });
			setFilename(files.filenames);
			setEditing(true);
		};
	} else {
		useEffect(() => {
			setFilename(value);
		}, [value]);
	}

	return (
		<div className="file-input">
			<div component="button" className="hollow" position={buttonPos}>
				<span>{buttonLabel || <UseText i18n={buttoni18n} />}</span>
				<input
					{...rest}
					name={name}
					onChange={onChange}
					value={""}
					type="file"
				/>
			</div>
			<div className="file-path-wrapper">
				<input
					className="file-path validate"
					placeholder={getText(placeholder) || ""}
					type="text"
					defaultValue={filename}
					readOnly={true}
				/>
			</div>
			<Label htmlFor={name} className="active">
				{label ? label : <UseText i18n={i18n} />}
			</Label>
		</div>
	);
}

/**
 * Componente de campo de entrada para archivos
 * @param {Object} param0 Props del componente
 * @param {string} param0.label Etiqueta del checkbox
 * @param {string} param0.name Nombre del campo, se utilizara como variable
 * @param {string} param0.checked defaultchecked, se utilizara para definir si el checkbox esta iniciando checked.
 * @param {string} param0.children Hijos dentro del checkbox se utiliza para agregar una etiqueta personalizada como el label
 * @param {{}} param0.rest otros parametros
 */
function Checkbox({
	$ref,
	label,
	name,
	checked,
	required,
	success,
	error,
	onChange,
	onBlur,
	children,
	...rest
}) {
	const context = useContext(FormContext);
	const {
		fields,
		messagesVisibility,
		handle,
		init,
		removeInvalidField,
		setInvalidField,
	} = context;
	const hasContext = context instanceof Object;

	// Variables locales.
	const [id, setID] = useState("");
	const [showValidation, setValidate] = useState(false);
	const [isValid, setValid] = useState(false);
	const el = useRef(null);

	useEffect(() => {
		setID(rest.id || Guid());
		$ref.current = { setID, setValid, setValidate };
		let input = null;

		if (hasContext) init(name, initialState["checkbox"]);

		if ((input = el.current) instanceof HTMLElement)
			handleValidator({ target: input });
	}, []);

	useEffect(() => {
		if (hasContext) {
			if (isValid) removeInvalidField(name);
			else setInvalidField(name);
		}
	}, [isValid]);

	useEffect(() => {
		if (hasContext) {
			if (messagesVisibility && !isValid) setValidate(true);
			else setValidate(false);
		}
	}, [messagesVisibility]);

	const handleValidator = (e) => {
		if (required) {
			const element = e.target;
			if (!element.checked) setValid(false);
			else setValid(true);
		} else {
			setValid(true);
		}
	};

	const showMessages = (e) => {
		if (required) setValidate(true);
	};

	const on$Blur = (e) => mgFunction(e, handleValidator, showMessages, onBlur);

	if (hasContext) {
		onChange = handle;
		if (fields[name]) {
			checked = fields[name];
		}
	}

	const options = {
		type: "checkbox",
		id,
		name,
		checked,
		onChange,
		onBlur: on$Blur,
		...rest,
	};

	if (typeof isValid === "boolean") {
		options[isValid ? "valid" : "invalid"] = "";
	}

	options["validate"] = showValidation ? "" : null;

	return (
		<label>
			<input ref={el} {...options} />
			<span>
				{label}
				{children}
			</span>
			<span
				className="helper-text"
				data-success={success}
				data-error={error}
			></span>
		</label>
	);
}

function CardExpiryDate() {
	return (
		<FormGroup>
			<Select placeholder="MM" name="mmExp" items={months} required />
			<Select placeholder="YYYY" name="yyExp" items={years} required />
			<Label><UseText i18n="EXPIRATION_DATE" /></Label>
		</FormGroup>
	);
}

Input.propTypes = {
	$ref: PropTypes.any,
	enableCaps: PropTypes.bool,
	disableNum: PropTypes.bool,
	required: PropTypes.bool,
	validate: PropTypes.bool,
	success: PropTypes.string,
	error: PropTypes.string,
	label: PropTypes.any,
	type: PropTypes.string,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
};

Input.defaultProps = {
	$ref: { current: null },
	enableCaps: false,
	disableNum: false,
	required: false,
	validate: true,
	success: "Right",
	error: "Wrong",
	label: null,
	type: "text",
	name: null,
	value: "",
	placeholder: null,
	onChange: () => {},
};

InputNumber.defaultProps = {};

Select.defaultProps = {
	$ref: { current: null },
	label: null,
	name: null,
	items: [],
	value: "",
	placeholder: "Select Options",
	success: "Right",
	error: "Wrong",
	alignment: "left",
	className: "",
	required: false,
	validate: true,
	autoComplete: false,
	constrainWidth: true,
	coverTrigger: true,
	closeOnClick: true,
	hover: false,
	inDuration: 150,
	outDuration: 250,
	onOpenStart: () => {},
	onOpenEnd: () => {},
	onCloseStart: () => {},
	onCloseEnd: () => {},
	onItemClick: () => {},
};
FormGroup.defaultProps = {
	success: "Right",
	error: "Wrong",
};

FileInput.defaultProps = {
	...Input.defaultProps,
	buttonPos: "right",
	buttonLabel: "File",
};

Checkbox.defaultProps = {
	$ref: { current: null },
	required: false,
	success: "Right",
	error: "Wrong",
	label: null,
	name: null,
	checked: false,
	onChange: () => {},
	onBlur: () => {},
};

export {
	FormGroup,
	Label,
	InputGroup,
	Input,
	Textarea,
	InputNumber,
	InputEmail,
	InputCreditCard,
	InputPassword,
	CardExpiryDate,
	Select,
	FileInput,
	Checkbox,
};
