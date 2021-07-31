/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @version v2.0.0
 * @description Wizard.
 */

import React, {
	useState,
	useRef,
	useContext,
	useEffect,
	cloneElement,
	createRef,
	RefObject,
} from "react";
import PropTypes from "prop-types";
import { formatNumber, addClass } from "@app/Helpers";
import UseText from "@app/UseText";
import { TryCatch } from "@app/Error";
import { CancelForm, Form, SendForm } from "../form";
import WizardContext, { WizardProvider } from "./WizardContext";

/**
 * Props de wizard.
 */
const wizardProps = {
	/**
	 * Referencia para acceder a los métodos del wizard.
	 */
	$ref: createRef(),

	/**
	 * Lista de clases.
	 */
	className: "",

	/**
	 * Texto del botón atrás.
	 */
	previousText: "Back",
	/**
	 * Texto del botón next.
	 */
	nextText: "Next",
	/**
	 * Texto del botón finalizar.
	 */
	finishText: "Finish",
	/**
	 * Función al finalizar los pasos.
	 */
	onFinish: () => {},
	/**
	 * Función que se ejecuta cada vez que cambian los datos de los formularios.
	 */
	onChange: () => {},
};

/**
 * Componente Wizard.
 * @type {(props: wizardProps)=>JSX.Element} props Parámetros del componente.
 */
const Wizard = TryCatch(function Wizard({
	$ref,
	className,
	previousText,
	nextText,
	finishText,
	onFinish,
	onChange,
	children,
}) {
	// Variables
	const initialStep = 0;
	const [header, setHeader] = useState(null);
	const [content, setContent] = useState(null);
	const [active, setActive] = useState(initialStep);
	const [validSteps, setValidStep] = useState([]);
	const [size, setSize] = useState(0);
	const [finish, setFinish] = useState(false);
	const [enableBtnNext, setEnableBtnNext] = useState(true);
	const [idxMessageForm, setIdxFormMessage] = useState(-1);
	const [fields, setFields] = useState({});

	useEffect(() => {
		$ref.current = {
			isValidStep,
			onClickStep,
			onClickPrevious,
			onClickNext,
			handleFinish,
			setEnableBtnNext,
		};
	}, []);

	useEffect(() => {
		onChange(fields);
	}, [fields]);

	/**
	 * Verifica si el step actual es valido.
	 * @returns {Boolean}
	 */
	const isValidStep = (index) => {
		if (typeof index === "number") {
			const isPrev = index < active;
			if (isPrev) return true;
		}

		return validSteps.indexOf(active) > -1;
	};

	/**
	 * Evento que permite navegar entre los steps.
	 * @param {Event} e Evento
	 * @param {Number} index Indice del elemento.
	 */
	const onClickStep = (e, index) => {
		if (isValidStep(index)) {
			setActive(index);
			setFinish(index == size ? true : false);
		} else {
			setIdxFormMessage(active);
			/* console.log(
				"No se puede mover, porque falta completar el step ",
				active
			); */
		}
	};

	/**
	 * Evento que permite retroceder.
	 */
	const onClickPrevious = () => {
		if (active > 0) {
			const newIndex = active - 1;
			setActive(newIndex);
			setFinish(false);
		}
	};

	/**
	 * Evento que permite avanzar
	 */
	const onClickNext = () => {
		if (isValidStep()) {
			if (active < size) {
				const newIndex = active + 1;

				setActive(newIndex);
				setFinish(newIndex == size);
			}
		} else {
			setIdxFormMessage(active);
			/* console.log(
				"No se puede mover, porque falta completar el step ",
				active
			); */
		}
	};

	/**
	 * Evento al enviar el formulario.
	 */
	const handleFinish = () => {
		onFinish(fields);
	};

	/**
	 * Métodos compartidos en el context.
	 */
	const methods = {
		active,
		fields,
		validSteps,
		idxMessageForm,
		setSize,
		setFields,
		setHeader,
		setContent,
		setValidStep,
		onClickStep,
		onClickPrevious,
		onClickNext,
		setEnableBtnNext,
	};

	return (
		<WizardProvider value={methods}>
			<section component="wizard" className={className}>
				<section component="w-header">
					<ul component="w-navigation">{header}</ul>
				</section>
				<section component="w-body">{content}</section>
				<section component="w-footer">
					<CancelForm
						onClick={onClickPrevious}
						className={addClass("w-cancel", active > 0 ? null : "hide")}>
						<i className="prs pr-chevron-left"></i>
						<UseText i18n={previousText} />
					</CancelForm>
					<SendForm
						disabled={!enableBtnNext}
						onClick={!finish ? onClickNext : handleFinish}
						className="w-next-pay">
						<UseText i18n={!finish ? nextText : finishText} />
					</SendForm>
				</section>
				{children}
			</section>
		</WizardProvider>
	);
});

/**
 * Encabezado del wizard, permite agrear los títulos de los pasos.
 * @param {Object} param0 Props de componente.
 * @param {Array<StepHeader>} param0.children Hijos del componente.
 * @returns {JSX.Element}
 */
function WizardHeader({ children }) {
	if (!children) return null;

	const wizard = useContext(WizardContext);
	if (!(wizard instanceof Object)) return null;
	const { active, validSteps, onClickStep, setHeader, setSize } = wizard;

	useEffect(() => {
		if (Array.isArray(children)) {
			const width = formatNumber(100 / children.length, 2);
			children = children.map((child, index) => {
				child = cloneElement(child, {
					key: index,
					style: { width: `${width}%` },
					index,
					active,
					onClick: onClickStep,
				});
				return child;
			});

			if (typeof setSize === "function") {
				const length = children.length || 0;
				setSize(length - 1);
			}

			if (typeof setHeader === "function") {
				setHeader(children);
			}
		}
	}, [active, validSteps]);

	return null;
}

/**
 * Cuerpo del wizard, permite agregar el contenido de los pasos.
 * @param {Object} param0 Props de componente.
 * @param {Array<StepContent>} param0.children Hijos del componente.
 * @returns {JSX.Element}
 */
function WizardBody({ children }) {
	if (!children) return null;

	const wizard = useContext(WizardContext);
	if (!(wizard instanceof Object)) return null;
	const { active, validSteps, setContent } = wizard;

	useEffect(() => {
		if (Array.isArray(children)) {
			children = children.map((child, index) => {
				child = cloneElement(child, {
					key: index,
					index,
					active,
				});
				return child;
			});
			if (typeof setContent === "function") {
				setContent(children);
			}
		}
	}, [active, validSteps]);

	return null;
}

/**
 * Titulo del paso.
 * @param {Object} param0 Props de componente.
 * @param {String|JSX.Element} param0.icon Icono del paso.
 * @returns {JSX.Element}
 */
function StepHeader({ icon, children, style, onClick, active, index }) {
	return (
		<li
			component="w-step"
			style={style}
			onClick={(e) => onClick(e, index)}
			className={addClass(
				index == active ? "active" : null,
				active >= index ? "completed" : null
			)}>
			<div component="w-icon">
				<span>{icon}</span>
			</div>
			<div component="w-label">{children}</div>
		</li>
	);
}

/**
 * Contenido del paso.
 * @param {Object} param0 Props de componente.
 * @returns {JSX.Element}
 */
function StepContent({ children, index, active }) {
	const wizard = useContext(WizardContext);
	const { validSteps, setValidStep, idxMessageForm, fields, setFields } =
		wizard;
	const form = useRef(null);

	useEffect(() => {
		if (index == idxMessageForm) form.current.setMessagesVisibility(true);
	}, [idxMessageForm]);

	const onValid = (isValid) => {
		if (wizard instanceof Object) {
			// Validaciones
			const steps = validSteps.slice();
			const pos = steps.indexOf(index);
			if (isValid) {
				if (pos == -1) {
					steps.push(index);
					setValidStep(steps);
				}
			} else {
				if (pos > -1) {
					steps.splice(pos, 1);
					setValidStep(steps);
				}
			}
		}
	};

	const onChange = (formFields) => {
		if (wizard instanceof Object) {
			// Campos de formulario.
			formFields = { ...fields, ...formFields };
			setFields(formFields);
		}
	};

	return (
		<div
			component="w-content"
			className={addClass(index == active ? "active" : null)}>
			<Form $ref={form} onChange={onChange} onValid={onValid}>
				{children}
			</Form>
		</div>
	);
}

Wizard.defaultProps = wizardProps;

Wizard.propTypes = {
	previousText: PropTypes.string,
	nextText: PropTypes.string,
	finishText: PropTypes.string,
	onFinish: PropTypes.func,
	onChange: PropTypes.func,
};

export default Wizard;
export { WizardHeader, WizardBody, StepHeader, StepContent };
