/**
 * Translator
 * @version 0.1.0
 * @author Luis Enrique Huh Puc <lhuh@palaceresorts.com>
 * @summary Archivo de configuración de traducciones.
 */

import React, { createContext, useContext } from "react";
import { Route } from "react-router-dom";
import { RouteProps } from "react-router";

/**
 * Inicializador de contexto
 * @property TranslatorContext
 * @type React.Context
 */
const TranslatorContext = createContext({ translations: {}, lang: "en" });
TranslatorContext.displayName = "i18n";

/**
 * Permite pasar parámetros a través del contexto
 * @property TranslatorProvider
 * @type React.Provider<any>
 */
const TranslatorProvider = TranslatorContext.Provider;

/**
 * Permite consumir los parámetros enviados a través del contexto
 * @property TranslatorConsumer
 * @type React.Consumer<any>
 */
const TranslatorConsumer = TranslatorContext.Consumer;

/**
 * Route para incorporar las traducciones directamente en la vista.
 * @param {RouteProps} props Props de componente.
 * @returns {Route}
 */
function TranslatorRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) => {
				return (
					<TranslatorConsumer>
						{(values) => (
							<Component
								{...props}
								translations={values.translations}
								lang={values.lang}
							/>
						)}
					</TranslatorConsumer>
				);
			}}
		/>
	);
}

/**
 * Obtiene las traducciones por directiva.
 * @param {{"{{DIRECTIVE_NAME}}": {en: String, es: String}}} translations Traducciones.
 * @param {String} directiveName Nombre de la directiva en mayúsculas y sin espacios.
 * @returns {{en: String, es: String}} Translation.
 */
function getTranslation(translations, directiveName) {
	if (translations instanceof Object && typeof directiveName === "string") {
		if (!/\s/.test(directiveName)) {
			let directive = `{{'${directiveName}'}}`;
			if (translations.hasOwnProperty(directive)) {
				return translations[directive];
			}

			return directiveName;
		}

		return `No valid ${directiveName}`;
	}

	return "";
}

/**
 * Obtiene la traducción por directiva e idioma.
 * @param {"en"|"es"} lang Idioma.
 * @param {{"{{DIRECTIVE_NAME}}": {en: String, es: String}}} translations Traducciones.
 * @param {String} directiveName Nombre de la directiva en mayúsculas y sin espacios.
 * @returns {String} Translation.
 */
function _Translator(lang, translations, directiveName) {
	if (translations instanceof Object) {
		const translation = getTranslation(translations, directiveName);
		if (translation instanceof Object) {
			if (typeof lang === "string") {
				if (translation.hasOwnProperty(lang)) {
					return translation[lang];
				}
			}
			return translation.en;
		}

		return translation;
	}

	return typeof directiveName === "string" ? directiveName : "";
}

/**
 * Componente que obtiene la traducción del texto.
 * @param {Object} props Props de componente.
 * @param {String} props.keyword Directiva del texto.
 */
function Translator({ keyword }) {
    console.log(keyword);
	let { translations, lang } = useContext(TranslatorContext);

	if (typeof lang == "number") {
		lang = lang == 2 ? "es" : "en";
	}

	return _Translator(lang, translations, keyword);
}

export default Translator;
export { TranslatorProvider, TranslatorRoute };
