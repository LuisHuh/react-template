/**
 * @file DataSources.js
 * @version 1.0.0
 * @author lhuh
 * @summary Archivo que contiene los datos para las vistas del catalogo
 */

import Api from "@app/Api";

/**
 * Regresa los tipos de servicios por unidad de servicio
 * @param {number} id Identificador de la unidad
 * @returns {Promise<Array>} Values
 */
export function LoadCategories(id) {
	return Api.getServiceByBussinessUnit(id)
		.then((res) => res.data || [])
		.then((res) => res.sort((a, b) => a.item_order - b.item_order));
}

/**
 * Regresa los servicios por hotel y tipo de servicio
 * @param {number} idResort Identificador de la propiedad
 * @param {number} idCategory Identificador del tipo de servicio
 * @param {number} idLang Identificador del idioma
 * @returns {Promise<Array>} Values
 */
export function LoadServices(idResort, idCategory, campo_descripcion_comercial,idLang = 1) {
	return Api.getServicesByHotel(idResort, idCategory, idLang)
		.then((res) => res.data || [])
		.then((res) =>
			res.map(
				({
					idProduct,
					description,
					coleccion,
					personalizable,
					idconcepto_ingreso,
					price,
					includes,
					images,
					idSubcategory,
					idservicio_agrupador,
				}, key, items) => { 
					const { path, thumb, imagen_extra } =
						Array.isArray(images) && images.length > 0 ? images[0] : {};
					return {
						id: idProduct,
						image_src: path,
						value: idProduct,
						label: items[key][campo_descripcion_comercial],
						logo: imagen_extra,
						src: path,
						thumb,
						title: description,
						evento_coleccion: "",
						coleccion: coleccion,
						personalizable: personalizable,
						idConcepto: idconcepto_ingreso,
						price: price,
						detail: includes,
						id_tipo_servicio: idSubcategory,
						idservicio_agrupador: idservicio_agrupador,
					};
				}
			)
		);
}
