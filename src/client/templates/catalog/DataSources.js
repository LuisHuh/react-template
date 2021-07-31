/**
 * @file DataSources.js
 * @version 1.0.0
 * @author lhuh
 * @summary Archivo que contiene los datos para la plantilla del catalogo
 */

import Api from "@app/Api";
import Auth from "@app/Auth";
import { objectSerializer } from "@app/Helpers";

/**
 * Formatea el campo extra de la unidad
 * @param {string} value Campo extra a formatear
 */
function extraParse(value) {
	if (value) {
		if (value === '"{}"') {
			value = {};
		} else {
			if (value instanceof Object) {
                return value;
            }
		}
	}
	return value || {};
}

/**
 * Cuenta el total de los elementos del arreglo de datos.
 * @param {Array} data Datos
 */
function dataCounter(data) {
	return {
		total: data.length,
		items: data,
	};
}

/**
 * Regresa todas las unidades de negocios.
 * @returns {Promise<Array>} business.
 */
export function LoadBusiness() {
	return Api.getBusinessUnits()
		.then((res) => res.data || [])
		.then((res) => res.filter((el) => el.enable_online == 1))
		.then((res) => res.map((el) => objectSerializer(el)));
}

/**
 * Regresa una unidad negocio por su id.
 * @param {string|number} id Identificador de la unidad.
 * @returns {Promise<{}>} business.
 */
export function LoadCurrentBusiness(id) {
	return LoadBusiness()
		.then((res) => res.find((item) => item.idCategory == id))
		.then((res) => {
			res.extra = extraParse(res.extra);
			return res;
		});
}

/**
 * Regresa los elementos del carrito
 * @param {Number} id Identificador del grupo
 * @returns {Promise<Array>} items.
 */
export function LoadCartItems() {
	const { id, id_resort } = Auth.userData();
	return Api.getShoppingCart(id, id_resort).then((res) => res.data || []);
}

/**
 * Regresa los elementos que se encuentran pagados
 * @param {Number} id Identificador del grupo
 * @returns {Promise<Array>} items.
 */
export function LoadWeddingExtraItems() {
	const { id, id_resort } = Auth.userData();
	return Api.getWeddingExtras(id, id_resort).then((res) => res.data || []);
}

/**
 * Regresa el total de los elementos en el carrito
 */
export function LoadTotalItems() {
	return LoadCartItems().then((res) => {
		let count = 0;
		let products = {};
		res.forEach(
			({
				cantidad_pendiente,
				cantidad,
				idservice_evento,
				idevent_detalle_item,
			}) => {
				if (cantidad_pendiente != 0) {
					products[idevent_detalle_item] = idservice_evento;
					count += isNaN(cantidad) ? 0 : parseInt(cantidad);
				}
			}
		);

		return {
			total: count,
			products,
		};
	});
}

/**
 * Regresa los elementos comprados, divididos en sus respectivos locaciones virtuales.
 */
export function LoadElementsFromVirtualLocation() {
	let myCartWishList = [];
	let weddingExtra = [];
	return new Promise((resolve, reject) => {
		Promise.allSettled([LoadCartItems(), LoadWeddingExtraItems()])
			.then((reqs) => {
				reqs.forEach(({ status, value }, index) => {
					if (status == "fulfilled") {
						if (index == 0) {
							myCartWishList = value;
							myCartWishList.map((item, idx) => {
								if(myCartWishList[idx]['cantidad_pagada'] > 0){
									myCartWishList[idx]["costo_real"] = item['precio_unitario'];
								}else{
									myCartWishList[idx]["costo_real"] = item['precio_unitario'];
									myCartWishList[idx]['cantidad_pendiente'] = item['events_service']['costo'] * item['cantidad'];
									myCartWishList[idx]['precio_unitario'] = item['events_service']['costo'];
								}
							})
						} else {
							weddingExtra = value;
						}
					}
				});
			})
			.then((reqs) => {
				const myCart = myCartWishList.filter(
					(el) => el.venta_en_linea == 1
				);
				const myWishList = myCartWishList.filter(
					(el) => el.venta_en_linea == 2
				);
				resolve({
					myCart,
					myWishList,
					weddingExtra,
				});
			})
			.catch((e) => reject(e));
	});
}
