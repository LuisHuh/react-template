/**
 * @file DataSources.js
 * @version 1.0.0
 * @author lhuh
 * @summary Archivo que contiene los datos para las vistas de detalle del catalogo
 */

import Api from "@app/Api";
import Auth from "@app/Auth";

export function PaymentRequest({
	image_src,
	title,
	price,
	idService,
	idConcepto,
}) {
	const info = Auth.userData();
	return {
		concepto: 1,
		order: [
			{
				img: image_src,
				description: title,
				amount: price,
				currency: "USD",
				quantity: "1",
				u_price: price,
				id: idService,
				idconcepto_ingreso: idConcepto,
				userRequest: info.id_planner,
			},
		],
	};
}

/**
 * Obtiene las locaciones
 * @param {number} id Id del grupo
 */
export function LoadLocation(id) {
	return Api.getShoppingLocations(id)
		.then((res) => {
			res = res.data || {};
			return {
				idevent: res.idevent_evento,
				idlocacion: res.idevent_evento_locacion,
			};
		})
		.catch((e) => {
			return {
				idevent: 0,
				idlocacion: 0,
			};
		});
}

export function SaveToCart(
	idUnidad,
	{ evento_coleccion, id, price, coleccion, personalizable, detail, id_tipo_servicio, idservicio_agrupador }
) {
	const info = Auth.userData();
	console.warn("evento_coleccion =>",evento_coleccion, "id =>",id, "price =>",price, "coleccion =>",coleccion, "personalizable =>",personalizable, "detail =>",detail, "id_tipo_Servicio =>",id_tipo_servicio);
	return new Promise((resolve, reject) => {
		LoadLocation(info.id)
			.then(({ idevent, idlocacion }) => {
				let data = {
					id_evento: idevent,
					idevent_evento: idevent,
					id_locacion: idlocacion,
					idservice_evento_coleccion: idservicio_agrupador,
					idservice_evento: id,
					id_proveedor: "1",
					precio_unitario: price,
					cantidad: 1,
					cantidad_pendiente: price,
					coleccion,
					idservice_evento_coleccion: idservicio_agrupador,
					list_colections: {},
					personalizado: personalizable,
					comentario_recepcion: "_",
					estado_recepcion: 1,
					cantidad_pagada: 0,
					estado: 1,
					idservice_unidad_negocio: idUnidad,
					notas: " ",
					cantidad_coleccion: 0,
					idservice_servicio_tipo: id_tipo_servicio
				};
				Api.postServiceDI(Auth.getAuthorizationHeader(), data)
					.then((postRes) => {
						postRes = postRes.data || {};
						if (Array.isArray(detail)) {
							detail = detail[0]["texto"] || "";
						} else {
							detail = "";
						}
						let de_notes = {
							id: postRes.id,
							comment: detail,
							tipo: 1, // Novia
							tipo_extrainfo: 2, // Notas
							path: "",
							thumb: "",
						};

						Api.postComment(Auth.getAuthorizationHeader(), de_notes)
							.then((comRes) => {})
							.catch((err) => reject(err));
						resolve(postRes);
					})
					.catch((err) => reject(err));
			})
			.catch((err) => reject(err));
	});
}
