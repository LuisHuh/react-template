/**
 * Funciones para validar los campos del formulario.
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 */
import { substr } from "@app/Helpers";
import {
	emailRegExp,
	passwordRegExp,
	cardRegExp,
	regVisa,
	regMC1,
	regMC2,
	regAmex,
} from "./RegExp";

// #region ================= TRANSFORMS ================= //
// ================= ================= ================= //
/**
 * Transforma el contenido del input a mayúsculas.
 * @param {Event} e Evento.
 */
function toUpperCase(e) {
	const input = e.target;
	const value = input.value;

	if (typeof value === "string") {
		input.value = value.toUpperCase();
	}

	e.preventDefault();
}

/**
 * Verifica si la entrada es numérica, de lo contrario regresa 0.
 * @param {*} value Valor.
 * @returns {Number} value.
 */
function parseNum(value) {
	return isNaN(value) ? 0 : value;
}

/**
 * Regresa el numero de tarjeta sin espacios.
 * @param {String} cardNumber Número de tarjeta.
 */
function parseCardNumber(cardNumber) {
	if (!isEmpty(cardNumber)) {
		return cardNumber.replace(cardRegExp.digit, "");
	}

	return "";
}

/**
 * Devuelve la cadena ingresada como un número de teléfono en formato de 7, 10 y 11 dígitos
 * @author Alan Jimenez <alanjimenez@palaceresorts.com>
 * @param {string} cardNumber El número de la tarjeta al cual se le dará formato.
 */
function cardNumberFormatter(cardNumber) {
	// Extraemos los dígitos del número.
	const extractedNumbers = parseCardNumber(cardNumber);
	let match = extractedNumbers.match(
		/^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})(\d*)$/
	);
	if (match) {
		return `${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`.trim();
	}
	return extractedNumbers;
}
// #endregion

// #region ================= VALIDATORS ================= //
// ================= ================= ================= //

/**
 * Verifica si un elemento cumple con la expresión regular.
 * @param {String} value Valor a testear.
 * @param {RegExp} reg Expresión regular.
 */
function regexValidator(value, reg) {
	const validator = new RegExp(reg);
	return validator.test(value);
}

/**
 * Verifica si un valor esta vacío.
 * @param {*} value Valor.
 * @returns {Boolean} Bool
 */
function isEmpty(value) {
	if (value == undefined || value === "" || !regexValidator(value, /[^\s]/)) {
		return true;
	}

	return false;
}

/**
 * Algoritmo de Luhn para verificar el formato de las tarjetas.
 * @param {String} value Numero de la tarjeta.
 * @returns {Boolean} Bool
 */
function luhnCheck(value) {
	// Luhn Algorithm.
	let nCheck = 0;
	let nDigit = 0;
	let bEven = false;

	value = parseCardNumber(value);

	for (let n = value.length - 1; n >= 0; n--) {
		var cDigit = value.charAt(n);
		nDigit = parseInt(cDigit, 10);
		if (bEven) {
			if ((nDigit *= 2) > 9) nDigit -= 9;
		}
		nCheck += nDigit;
		bEven = !bEven;
	}
	return nCheck % 10 === 0;
}

/**
 * Identifica el tipo de tarjeta
 * @param {String} value Numero de la tarjeta.
 * @returns
 */
function cardIdentifier(value) {
	const $default = { name: "Unknown", code: "UKN" };
	if (isEmpty(value)) return $default;

	if (regexValidator(substr(value, 0, 1), regVisa))
		return { name: "Visa", code: "VISA" };
	else if (
		regexValidator(substr(value, 0, 2), regMC1) ||
		regexValidator(substr(value, 0, 4), regMC2)
	)
		return { name: "Mastercard", code: "MC" };
	else if (regexValidator(substr(value, 0, 2), regAmex))
		return { name: "American Express", code: "AMEX" };
	else return $default;
}

/**
 * Bloquea cualquier dato que no sea numérico.
 * @param {Event} e Evento.
 * @param {Boolean} isFloat Establece si se reconoce números fraccionarios.
 */
function numericValidator(e, isFloat = false) {
	const keyPressed = e.which;
	let isKeyBlocked = false;

	const isKeyAllowed = keyPressed < 48 || keyPressed > 57;
	const isDeleteKey = keyPressed == 46;

	if (isFloat) isKeyBlocked = isKeyAllowed && !isDeleteKey;
	else isKeyBlocked = isKeyAllowed;

	if (isKeyBlocked) e.preventDefault();
}

/**
 * Bloquea cualquier dato que no sea texto.
 * @param {Event} e Evento.
 */
function textValidator(e) {
	const keyPressed = e.which;
	const isKeyAllowed = keyPressed >= 48 && keyPressed <= 57;

	if (isKeyAllowed) e.preventDefault();
}

/**
 * Valida el limite establecido entre cantidades (Min - Max) del input.
 * @param {Event} e Evento.
 */
function rangeValidator(e) {
	const input = e.target;

	if (!!input.max && !!input.min) {
		const max = parseNum(parseFloat(input.max));
		const min = parseNum(parseFloat(input.min));
		const val = parseNum(parseFloat(input.value));

		if (val >= max) {
			input.value = max;
		} else if (val <= 0) {
			input.value = min == 0 ? 1 : min;
		}

		// e.preventDefault();
	}
}
// #endregion

// #region ================== BOOLEANS ================== //
// ================= ================ ================= //
/**
 * Verifica si el número esta dentro del rango establecido (Min - Max).
 * @param {Event} e Evento.
 * @returns {Boolean} bool
 */
function isIntoLimit(e) {
	const input = e.target;

	const max = parseNum(parseFloat(input.max));
	const min = parseNum(parseFloat(input.min));
	const val = parseNum(parseFloat(input.value));

	if (val > max || val < min) return false;

	return true;
}

/**
 * Valida si el correo electrónico introducido es correcto.
 * @param {String} email Correo electrónico.
 * @returns {Boolean} Boolean
 */
function isEmailValid(email) {
	return regexValidator(email, emailRegExp.rfc);
}

/**
 * Valida la calidad de la contraseña.
 * @param {String} password Contraseña a validar.
 * @returns {{valid: Boolean, quality: "low"|"regular"|"strong"}} validation.
 */
function isPasswordValid(password) {
	const tmp = {};
	if (isEmpty(password)) {
		tmp.valid = false;
	} else if (regexValidator(password, passwordRegExp.strong)) {
		tmp.valid = true;
		tmp.quality = "strong";
	} else if (regexValidator(password, passwordRegExp.medium)) {
		tmp.valid = true;
		tmp.quality = "regular";
	} else {
		tmp.valid = false;
		tmp.quality = "low";
	}
	return tmp;
}

/**
 * Valida el numero de la tarjeta.
 * @param {String} cardNumber Numero de tarjeta.
 * @returns {{valid: Boolean, status: "OK"|"EMPTY"|"INVALID_LENGTH"|"INVALID_CARD"}}
 */
function isCardNumberValid(cardNumber) {
	const tmp = { valid: false };
	if (!isEmpty(cardNumber)) {
		cardNumber = parseCardNumber(cardNumber);
		if (regexValidator(cardNumber, cardRegExp.length)) {
			if (luhnCheck(cardNumber)) {
				tmp.valid = true;
				tmp.status = "OK";
			} else {
				tmp.status = "INVALID_CARD";
			}
		} else {
			tmp.status = "INVALID_LENGTH";
		}
	} else {
		tmp.status = "EMPTY";
	}

	return tmp;
}

// #endregion

export {
	toUpperCase,
	cardNumberFormatter,
	numericValidator,
	textValidator,
	rangeValidator,
	cardIdentifier,
	parseNum,
	parseCardNumber,
	isIntoLimit,
	isEmailValid,
	isPasswordValid,
	isCardNumberValid,
	isEmpty,
};
