/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description WizardContext.js - Contiene funciones para compartir parámetros entre componentes hijos
 */

import React, { createContext } from "react";


/**
 * Inicializador de contexto
 * @property WizardContext
 * @type React.Context<{
 *    active: Number,
 *    fields: {}, 
 *    setSize: Number,
 *    idxMessageForm: Number,
 *    setFields: function,
 *    validSteps: Array<Number>,
 *    setHeader: function,
 *    setContent: function,
 *    setValidStep: function,
 *    onClickStep: function,
 *    onClickPrevious: function,
 *    onClickNext: function,
 *    setEnableBtnNext: function,
 * }>
 */
const WizardContext = createContext();
WizardContext.displayName = "Wizard";


/**
 * Permite pasar parámetros a través del contexto
 * @property WizardProvider
 * @type React.Provider<any>
 */
const WizardProvider = WizardContext.Provider;

/**
 * Permite consumir los parámetros enviados a través del contexto
 * @property WizardConsumer
 * @type React.Consumer<any>
 */
const WizardConsumer = WizardContext.Consumer;

export default WizardContext;
export { WizardProvider, WizardConsumer };