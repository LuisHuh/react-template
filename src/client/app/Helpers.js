/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description Helpers.js - Lista de funciones globales
 */

/**
 * Retorna el estado enviado desde otra vista
 * @param {Object} props Parametros del component
 */
export function getStateView(props) {
	const loc = findInObject(props, "location");
	if (loc != -1) {
		const state = findInObject(loc, "state");
		if (state && state != -1) {
			return state;
		}
	}

	return false;
}

/**
 *
 * @param {{}} props Props de componente
 * @param  {Array<string>} params Lista de llaves a acceder
 * @returns {Array|{}|string} *Values* Regresa el ultimo valor accesible o existente
 */
export function getParamFromProps(props, ...params) {
	for (let i = 0; i < params.length; i++) {
		const param = params[i];
		if (props.hasOwnProperty(param)) props = props[param];
		else break;
	}

	return props;
}

/**
 * Función que permite convertir un texto a json o viceversa.
 * @param {string|{}|Array} values Datos a convertir.
 * @param {boolean} toString Define si se convertirá de texto a json o viceversa *default **false***.
 * @returns {values|boolean} *values* Regresa false si no se puede convertir.
 */
export function JsonConverter(values, toString = false) {
	try {
		if (!values) {
			return false;
		}
		return JSON[toString ? "stringify" : "parse"](values);
	} catch (e) {
		return false;
	}
}

/**
 * Regresa la region y el lenguaje seleccionado.
 * @param {number} idLang Identificador del lenguaje
 */
export const getLang = (idLang) => {
	if (idLang == 2) {
		return {
			region: "mex",
			lang: "es",
		};
	} else {
		return {
			region: "usa",
			lang: "en",
		};
	}
};

/**
 * Función que recorre un arreglo de objetos
 * @param {{}} data Objeto a iterar
 * @param {(key: string, value: *) => void} callback Funcion para ejecutar en cada iteracion
 */
export const objectIterator = (data, callback) => {
	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			callback(key, data[key]);
		}
	}
};

/**
 * Estandariza los elementos de un objeto.
 * @param {{}} data Arragle de objeto a transformar.
 */
export const objectSerializer = (data) => {
	objectIterator(data, (key, value) => {
		let tmp = null;
		if ((tmp = JsonConverter(value))) {
			data[key] = tmp;
		}
	});

	return data;
};

/**
 * Comprueba si un objeto está vacío o no.
 * @param {{}} object Objeto a comprobar
 */
export const isObjectEmpty = (object) => Object.keys(object).length == 0;

/**
 * Funcion para validar si es solo numeros
 * @param {String} target
 * @param {any} limitChars default 12 - limite de caracteres
 * @returns {Boolean}
 */
export function testInteger(target = "", limitChars = 12) {
	let re = /^[0-9\b]+$/;
	if (limitChars == 20) re = /^[0-9\b]{0,20}$/;
	if (limitChars == 19) re = /^[0-9\b]{0,19}$/;
	if (limitChars == 16) re = /^[0-9\b]{0,16}$/;
	if (limitChars == 12) re = /^[0-9\b]{0,12}$/;
	if (limitChars == 4) re = /^[0-9\b]{0,4}$/;
	if (limitChars == 3) re = /^[0-9\b]{0,3}$/;
	return target === "" || re.test(target);
}
/**
 * Convierte una array de clases en un string
 * @param  {Array<string>} clss Lista de clases
 */
export function addClass(...clss) {
	let tmp = "";
	if (clss.length > 0) {
		for (let i = 0; i < clss.length; i++) {
			const item = clss[i];
			if (item) {
				tmp += `${item} `;
			}
		}
	}

	tmp = tmp.trim();

	return tmp || null;
}

/**
 * Fusiona más de una función en uno.
 * @param  {Event} e Evento.
 * @param  {Array<()=>void>} fns Función.
 */
export function mgFunction(e, ...fns) {
	fns.forEach((fn) => {
		if (typeof fn === "function") {
			fn(e);
		}
	});
}

export const removeFromObject = (obj, key) =>
	Object.keys(obj).reduce((prev, curr) => {
		if (curr !== key) {
			prev[curr] = obj[curr];
		}
		return prev;
	}, {});

export const substr = (text = "", start = 0, end = text ? text.length : 0) => {
	if (text) {
		return text.substr(start, end);
	} else {
		return "";
	}
};

export const slice = (text = "", slices = 1) => {
	let tmp = [];
	if (text) {
		if (Array.isArray(slices)) {
			let count = 0;
			for (let i = 0; i < slices.length; i++) {
				tmp.push(text.substr(count, slices[i]));
				count += slices[i];
			}
		} else {
			for (let i = 0; i < text.length / slices; i++) {
				tmp.push(text.substr(i * slices, slices));
			}
		}
		return tmp;
	} else {
		return [];
	}
};

export const replace = (text = "", length = 1, replaceWith = " ") => {
	const tmp = slice(text, length);
	return tmp.join(replaceWith);
};

export const Guid = () => {
	const s4 = () => {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	};

	return (
		s4() +
		s4() +
		"-" +
		s4() +
		"-" +
		s4() +
		"-" +
		s4() +
		"-" +
		s4() +
		s4() +
		s4()
	);
};

export const findInObject = (object, value) => {
	let found = false;
	let _tmp = "";
	for (const key in object) {
		if (object.hasOwnProperty(key)) {
			if (key == value) {
				_tmp = object[key];
				found = true;
				break;
			}
		}
	}

	return found ? _tmp : -1;
};

export const findInArray = (array = [], key = "", value = "") => {
	return array.find((item) => item[key] == value);
};

/**
 * Lee una imagen y regresa los datos
 * @param {string} url Url de la imagen
 * @param {(hasError: boolean, meta: EventTarget) => {}} callback Funcion que retorna la imagen leida
 */
export const getPropertyImage = (url, callback) => {
	const img = new Image();

	img.addEventListener("load", (el) => {
		return callback(false, el.target);
	});

	img.addEventListener("error", () => {
		return callback(true, {});
	});

	img.src = url;
};

export const formatNumber = (value, decimals) => {
	return parseFloat((Math.round(value * 100) / 100).toFixed(decimals));
};

export const randomNumber = (min, max) => {
	if (max == null || max == undefined) {
		max = min;
		min = 1;
	}
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const onlyNumbers = (e) => {
	const key = e.which;
	if (key < 48 || key > 57) {
		e.preventDefault();
	}
};

export const maxValue = (e, value) => {
	const input = e.target;
	if (input.value >= value) {
		input.value = value;
		e.preventDefault();
	}
};

export const onlyText = (e) => {
	const key = e.which;
	if (key >= 48 && key <= 57) {
		e.preventDefault();
	}
};

export const getItemFromArray = (array = [], item) => {
	return array.indexOf(item);
};

export const deleteItemFromArray = (array = [], item) => {
	const index = getItemFromArray(array, item);
	if (index != -1) {
		array.splice(item, 1);
		return array;
	} else {
		return array;
	}
};

export const objectsEquals = (a, b) => {
	var aKeys = Object.keys(a).sort();
	var bKeys = Object.keys(b).sort();
	if (aKeys.length !== bKeys.length) {
		return false;
	}
	if (aKeys.join("") !== bKeys.join("")) {
		return false;
	}
	for (var i = 0; i < aKeys.length; i++) {
		const _a = aKeys[i];
		const _b = bKeys[i];
		if (a[_a] !== b[_b]) {
			return false;
		}
	}
	return true;
};

export const arraysEquals = (a, b) => {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length != b.length) return false;
	for (var i = 0; i < a.length; ++i) {
		if (!objectsEquals(a[i], b[i])) {
			return false;
		}
	}
	return true;
};
