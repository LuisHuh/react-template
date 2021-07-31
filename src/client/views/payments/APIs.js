/**
 * @author Isaias Xicale <ixicale@palaceresorts.com>
 * @version v0.1.0
 * @description Archivo que contiene las peticiones de pagos.
 */

import Auth from "@app/Auth";
import Api from "@app/Api";
import { getToken } from "@app/Helpers";

/**
 * @description API que regresa los paises.
 * @param {string} idioma  ['en'|'es']
 * @type {GET}
 */
export function getCountries(
	codigo,
	atSuccess = (data) => {},
	atError = (e) => {}
) {
	let slcListCountry = [{ label: "USA", value: "USA" }];
	Api.getPaises(codigo)
		.then((r) => {
			if (r.error) return atSuccess(slcListCountry);
			const dd = r.data;
			// obtener los que no tengan null
			const f = (i) => i != "code" && i != "content" && i != "type";

			const list = Object.keys(dd).filter(f);

			// TODO: ver como aplicar el JSON.parse en los valores del response
			const aux = list.map((value) => ({ label: dd[value], value }));
			aux.sort((a, b) =>
				a.label > b.label ? 1 : b.label > a.label ? -1 : 0
			);
			slcListCountry = aux;
			return atSuccess({ slcListCountry });
		})
		.catch(atError)
		.finally(() => {
			if (slcListCountry[0].value != "") {
				slcListCountry.unshift({ label: "", value: "" }); // Agregar item vacío
			}
			atSuccess({ slcListCountry });
		});
}

/**
 * Funcion para obtener datos del hash y del link enviado desde URL
 * @param {Object} props datos de donde se invoca
 * @param {Function} func recibe parametros por response. En caso de error manda 'false' por parametro
 * @example readHash( (hash, link) => (console.log(hash, link)) )
 */
export function readHash(
	props,
	atSuccess = (resp_hash, resp_link, msg, msgUser) => {},
	atError = (e) => {}
) {
	const token = getToken(props);
	let message = "LINK_ERROR";
	const msg1 = "LINK_DEACTIVATED";
	const msgU1 = "MSG_LINK_DEACTIVATED";
	const msg2 = "LINK_EXPIRED";
	const msgU2 = "MSG_LINK_EXPIRED";
	const msg3 = "LINK_ERROR";
	const msgU3 = "MSG_LINK_ERROR";
	const respError = { error: true, data: {} };
	Api.PaymentHashRequest({ body: token })
		.then((res) => {
			Api.GetLink(res["data"]["idToken"])
				.then((response) => {
					// const linkData = JSON.parse(response['data']['data']);
					if (!response.error) {
						if (!response.data.status || response.data.status == 0) {
							return atSuccess(respError, respError, msg1, msgU1);
						}
						if (!response.data) {
							return atSuccess(respError, respError, msg2, msgU2);
						}
						return atSuccess(res, response, message);
					} else {
						return atSuccess(respError, respError, msg3, msgU3);
					}
				})
				.catch((e) => {
					atError(e);
					return atSuccess(res, respError, msg2, msgU2);
				});
		})
		.catch((e) => {
			atError(e);
			return atSuccess(respError, respError, msg3, msgU3);
		});
}

/**
 * Funcion para asignar saldo a favor
 * @param {Object} state
 * @param {string} state.divisa
 * @param {string} state.tipo_cambio tipo de cambio
 * @param {string} state.amount monto a pagar
 * @param {string} state.id_group id del grupo
 * @param {string} state.u usuario creacion
 * @param {Object} checkout
 * @param {Object} checkout.billData
 * @param {string} checkout.billData.address
 * @param {string} checkout.billData.city
 * @param {string} checkout.billData.country
 * @param {string} checkout.billData.idevent_billing_address
 * @param {string} checkout.billData.lastName
 * @param {string} checkout.billData.name
 * @param {string} checkout.billData.zipcode
 * @param {Object} checkout.cardData
 * @param {string} checkout.cardData.card
 * @param {string} checkout.cardData.cardNumber
 * @param {string} checkout.cardData.cvc
 * @param {string} checkout.cardData.mmExp
 * @param {string} checkout.cardData.yyExp
 * @param {function} atSuccess (data) => {}
 * @param {function} atError (e) => {console.error(e)}
 */
export function sendBalancePayments(
	state,
	checkout,
	atSuccess = (data) => {},
	atError = (e) => {}
) {
	let isPay = false;
	let display = "reject";
	const { divisa, tipo_cambio, amount, id_group, u, s } = state;
	const { billData, cardData, DataCard } = checkout;
	const data = {
		sociedad: s,
		usuario_creacion: u,
		divisa,
		idevent_grupo: id_group,
		idfin_cliente_interno: "1",
		tipo_cambio,
		pago_online: {
			...billData,
			...cardData,
			payment: amount,
			currency: divisa,
			exchange: divisa == "USD" ? "1" : tipo_cambio,
		},
		DataCard: DataCard || {},
	};

	Api.addBalance(data)
		.then((r) => {
			if (!r.error) {
				const { postDataResp } = r.data;
				if (postDataResp) {
					const { ticket, authorization, amount_charged } = postDataResp;
					const paymentData = { ticket, authorization, amount_charged };
					isPay = true;
					display = "success";
					return atSuccess({
						isPay,
						display,
						paymentData,
						isLoading: false,
					});
				}
			}
		})
		.catch((error) => {
			let dat = {
				msg: error.message,
				sociedad: data.sociedad,
				idevent_grupo: data.idevent_grupo,
				dataPay: data.pago_online,
			};
			Api.sendNotificationPlanner(dat)
				.then((response) => {})
				.catch((response) => {
					console.warn("error send");
				});
		})
		.finally((e) => {
			atSuccess({ isPay, display, isLoading: false });
		});
}

/**
 * Funcion para actualizar el link de la tabla 'event_transaction_link'
 * @param {number} idevent_transaction_link pk de la tabla
 * @param {*} atSuccess funcion accionada al finalizar correctamente
 * @param {*} atError funcion accionada cuando hay error
 */
export function updateLink(
	idevent_transaction_link,
	atSuccess = (data) => {},
	atError = (e) => {}
) {
	const data = { estado: 0, id: idevent_transaction_link };
	Api.putLink(data).then(atSuccess).catch(atError);
}

/**
 * Obtiene y mapea las direcciones de los clientes
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @version v1.0.0
 */
export function AddressSource() {
	const { id } = Auth.userData();
	if (!id) {
		return Promise.reject("Falta id para obtener direcciones");
	}

	return Api.getAddressByGroup(id)
		.then((res) => {
			res = res.data || [];
			if (Array.isArray(res)) {
				return res;
			}

			throw "Se requiere que los datos sean un arreglo de objetos";
		})
		.then((adds) => {
			return adds.filter(
				({ detalle_contacto, detalle_direccion }) =>
					detalle_contacto instanceof Object &&
					detalle_direccion instanceof Object
			);
		})
		.then((adds) => {
			return adds.map(
				({
					idevent_billing_address,
					detalle_contacto,
					detalle_direccion,
				}) => {
					return {
						id: idevent_billing_address,
						firstName: detalle_contacto.nombre,
						lastName: detalle_contacto.apellido,
						email: detalle_contacto.email,
						street: detalle_direccion.calle,
						zipCode: detalle_direccion.codigo_postal,
						city: detalle_direccion.ciudad,
						country: detalle_direccion.pais_iso,
					};
				}
			);
		});
}
