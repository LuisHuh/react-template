/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description WORDLPAY - ERROR MESSAGES FILE
 */

/**
 * Diccionario de traducción.
 */
const directives = {
	CD_EMPTY: {
		en: "A credit or debit card number is mandatory.",
		es: "El número de tarjeta es requerido.",
	},
	CD_CARD_NUM_LENGTH: {
		en: "Card number should contain between 12 and 20 numeric characters.",
		es:
			"El número de tarjeta debe contener entre 12 y 20 carácteres numéricos.",
	},
	CD_CARD_NUM_INVALID: {
		en: "The card number entered is invalid.",
		es: "El número de tarjeta es invalido.",
	},
	CD_CVC_INVALID: {
		en: "The security code is invalid.",
		es: "El número de seguridad es invalido.",
	},
	CD_MONTH_LENGTH: {
		en: "'Expiry Month' must contain exactly 2 numbers.",
		es: "El mes de expiración debe contener dos dígitos.",
	},
	CD_MONTH_INVALID: {
		en: "'Expiry Month' should be between 01 and 12.",
		es: "El mes de expiración debe ser entre 01 y 12.",
	},
	CD_YEAR_EMPTY: {
		en: "The 'Expiry Year' is not included.",
		es: "El año de expiración es requerido.",
	},
	CD_YEAR_LENGTH: {
		en: "'Expiry Year' must contain exactly 4 numbers.",
		es: "El año de expiración debe contener 4 dígitos.",
	},
	CD_MONTH_YEAR_INVALID: {
		en:
			"'Expiry Month' and 'Expiry Year' together must be a date in the future.",
		es: "La tarjeta ha expirado.",
	},
	CD_HOL_NAME_EMPTY: {
		en: "'Card Holder' name is mandatory.",
		es: "El nombre del tarjetahabiente es requerido.",
	},
	CD_HOL_NAME_LENGTH: {
		en: "'Card Holder' name cannot exceed thirty (30) characters.",
		es: "El nombre del tarjetahabiente no debe exceder de 30 carácteres.",
   },
   UNKNOW_ERROR: {
      en: "Unknow Error",
      es: "Error desconocido."
   }
};

/**
 * Codigos de error de la tarjeta.
 */
const codes = {
	101: "CD_EMPTY",
	102: "CD_CARD_NUM_LENGTH",
	103: "CD_CARD_NUM_INVALID",
	201: "CD_CARD_NUM_INVALID",
	301: "CD_CVC_INVALID",
	302: "CD_MONTH_LENGTH",
	303: "CD_MONTH_INVALID",
	304: "CD_YEAR_EMPTY",
	305: "CD_YEAR_LENGTH",
	306: "CD_MONTH_YEAR_INVALID",
	401: "CD_HOL_NAME_EMPTY",
	402: "CD_HOL_NAME_LENGTH",
};

/**
 * Regresa los mensajes de acuerdo a la directiva.
 * @param {String} directive Directiva de la traducción.
 * @returns {{en: string, es: string}} Mensajes.
 */
const getTranslation = (directive) => {
   if (directives.hasOwnProperty(directive)) {
      return directives[directive];
   }

   return {};
}

/**
 * Regresa el mensaje de error de acuerdo al código.
 * @param {Number} code Código de error.
 */
const codeReader = (code) => {
   if (codes.hasOwnProperty(code)) {
      const directive = codes[code];
      return getTranslation(directive);
   }

   return getTranslation("UNKNOW_ERROR");
}

/**
	 * Regresa los mensajes de error
	 * @param {Array<Number>} codes Códigos de error.
	 * @returns {Array} Mensajes.
	 */
const getMessageValidator = (codes) => {
	if (Array.isArray(codes)) {
		return codes.map(code => codeReader(code))	
	}

	return [];
}

module.exports = getMessageValidator;