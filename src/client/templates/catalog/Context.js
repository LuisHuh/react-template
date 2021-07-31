/**
 * @context CatalogContext
 * @version 1.0.0
 * @author lhuh
 * @summary Contexto para el intercambio de parametros entre padre e hijos
 */

import React, { createContext } from "react";

/**
 * Inicializador de contexto
 * @property CatalogContext
 * @type React.ContextP
 */
const CatalogContext = createContext();

/**
 * Permite pasar parametros a través del contexto
 * @property CatalogProvider
 * @type React.Provider<any>
 */
const CatalogProvider = CatalogContext.Provider;

/**
 * Permite consumir los parametros enviados a través del contexto
 * @property CatalogConsumer
 * @type React.Consumer<any>
 */
const CatalogConsumer = CatalogContext.Consumer;

/**
 * Permite modificar un componente y anexarle los parametros enviados a través del contexto.
 * @param {React.Component} Component Componente a anexar los parametros enviados a través del contexto.
 * @returns { JSX.Element } NewComponent
 */
const WithCatalog = (Component) => {
	return function CatalogHoc(props) {
		return (
			<CatalogConsumer>
				{(value) => <Component {...props} catalogState={value} />}
			</CatalogConsumer>
		);
	};
};

export default CatalogContext;
export { CatalogProvider, CatalogConsumer, WithCatalog };
