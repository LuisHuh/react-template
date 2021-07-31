import ReactDOM from "react-dom";

/**
 * Nombre del contenedor
 * @member CustomWidget#containerName
 */
let containerName = "react-widgets";

/**
 * Agrega el contenedor donde se rendera los widgets.
 * @param {String} id Identificador del contenedor.
 * @returns {HTMLElement} Container.
 */
function getWidgetContainer(id) {
	id = id || containerName;
	return document.getElementById(id);
}

/**
 * Crea un nuevo contenedor.
 * @param {String} id Identificador del contenedor.
 */
function createWidgetContainer(id) {
	const container = document.createElement("div");
	container.setAttribute("id", id || containerName);
	document.body.appendChild(container);
	return container;
}

/**
 * Agrega un componente al DOM sin pasar por el render.
 * @param {JSX.Element} widget Componente (hijo) a renderear
 * @param {string} widgetId id del componente (hijo) a renderear
 * @param {string} rootId id del padre
 */
function CreateWidget(widget, widgetId, rootId) {
	// Se obtiene la referencia y se crea un elemento temporal para usar en el dom
	let container = document.getElementById(rootId);
	container = container || document.getElementById("react-widgets");
	const el = document.createElement("div");
	if (widgetId) el.id = widgetId;

	// Se agrega el elemento temporal al dom
	container.appendChild(el);

	// Se rendera el componente en el elemento temporal
	ReactDOM.render(widget, el);

	return {
		/**
		 * Elimina el componente creado
		 */
		removeChild: () => {
			try {
				container.removeChild(el);
			} catch (e) {}
		},
	};
}

export default CreateWidget;
export { containerName, getWidgetContainer, createWidgetContainer };
