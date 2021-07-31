/**
 * @author Luis Enrique Huh Puc <`luisenriquehuhpuc@hotmail.com`>
 * @description Expresiones regulares
 */

/****************************************
 * Expresiones regulares para tarjetas. *
 ****************************************/
/**
 * Expresión regular para tarjetas tipo visa
 */
const regVisa = /^4$/;

/**
 * Expresión regular para tarjetas tipo mastercard con prefijos *51 - 55*
 */
const regMC1 = /^5[1-5]$/;

/**
 * Expresión regular para tarjetas tipo mastercard con prefijos *222[1-9]*
 */
const regMC2 = /^2(22[1-9]|2[3-9][0-9]|[3-6][0-9][0-9]|7[0-1][0-9]|720)$/;

/**
 * Expresión regular para tarjetas tipo america express
 */
const regAmex = /^3[47]$/;

/*******************************************
 * Expresiones regulares para formularios. *
 *******************************************/

/**
 * Expresión regular para validar espacios.
 */
const space = /\s/;

/**
 * Expresión regular para validar correos electrónicos.
 */
const emailRegExp = {
	// Basic
	basic: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

	// Accept Unicode
	unicode:
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,

	// RFC 2822 standar
	rfc: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]| \\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?| \[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]: (?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
};

/**
 * Expresión regular para validar el campo de contraseña.
 */
const passwordRegExp = {
	space,
	medium:
		/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/,
	strong:
		/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#.$%-^_&*]{8,}$/,
};

/**
 * Expresión regular para validar el campo de tarjeta.
 */
const cardRegExp = {
	digit: /\D/g,
	length: /^[0-9]{12,20}$/,
	cvcLength: /^[0-9]{3,4}$/,
};

/****************
 * Exportación.
 ****************/
export {
	regVisa,
	regMC1,
	regMC2,
	regAmex,
	space,
	emailRegExp,
	passwordRegExp,
	cardRegExp,
};
