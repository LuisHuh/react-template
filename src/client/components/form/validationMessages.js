/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @version v0.1.0
 * @description Archivo que contiene los mensajes predeterminados de los campos de entrada.
 */

export default {
	required: "This input is required.",
	success: "Right",
	error: "Wrong",
	email: "Invalid email.",
	password: {
		NOTICE:
			"Use at least 8 characters, a combination of numbers, letters and at least a characters special",
		LOW: "Too short",
		REGULAR: "Regular",
		STRONG: "Strong",
	},
	cardNumber: {
		EMPTY: "Credit or debit card number is required.",
		INVALID_LENGTH:
			"Card number should contain between 12 and 20 numeric characters.",
		INVALID_CARD: "The card number entered is invalid.",
	},
};
