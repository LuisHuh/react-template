/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description FormContext.js - Contiene funciones para compartir parametros entre componentes hijos
 */

import React, { createContext } from "react";


/**
 * Inicializador de contexto
 * @property FormContext
 * @type React.Context<{
 *    fields: {},
 *    isEditing: Boolean,
 *    messagesVisibility: Boolean,
 *    init: (name: String, initialValue: String|Number) => void,
 *    setValues: (params: {}, callback: () => void) => void,
 *    setMessagesVisibility: (value: boolean) => void,
 *    setEditing: (value: boolean) => void,
 *    setInvalidField: (name: string) => void,
 *    removeInvalidField: (name: string) => void,
 *    handle: (e: Event) => void,
 *    resetForm: (e: Event) => void,
 *    onCancel: (e: Event) => void
 * }>
 */
const FormContext = createContext();
FormContext.displayName = "Form";


/**
 * Permite pasar parametros a través del contexto
 * @property FormProvider
 * @type React.Provider<any>
 */
const FormProvider = FormContext.Provider;

/**
 * Permite consumir los parametros enviados a través del contexto
 * @property FormConsumer
 * @type React.Consumer<any>
 */
const FormConsumer = FormContext.Consumer;

export default FormContext;
export { FormProvider, FormConsumer };