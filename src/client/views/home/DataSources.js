/**
 * @file DataSources.js
 * @version 1.0.0
 * @author lhuh
 * @summary Archivo que contiene las funciones para cargar los datos de los eventos.
 */

import { useEffect, useState } from "react";
import Api from "@app/Api";
import Auth from "@app/Auth";
import { objectSerializer, isObjectEmpty } from "@app/Helpers";

/**
 * Determina si una variable es un arreglo de lo contrario regresa vacío.
 * @param {any} values Valores
 */
function isResArray(values) {
	if (Array.isArray(values)) {
		return values;
	}

	return [];
}

/**
 * Obtiene el saldo positivo del cliente.
 * @returns {Promise<Array>} Positive Balance.
 */
export function PositiveBalanceDataLoader() {
	const { id } = Auth.userData();
	return Api.getPositiveBalanceSA(id)
		.then((res) => res.data || {})
		.then((res) => res.saldofavor)
		.then((res) => {
			if (!(res = parseFloat(res))) {
				return 0;
			}

			return res;
		});
}

/**
 * Obtiene los eventos del cliente.
 * @returns {Promise<Array>} Data.
 */
export function EventDataLoader() {
	const { id } = Auth.userData();
	return Api.getEventsGroup2(id)
		.then((res) => isResArray(res.data))
		.then((res) => res.map((el) => objectSerializer(el)))
		.then((res) =>
			res.map(({ evento, cover, pago, ...rest }) => {
				let tmp = {};
				if (!isObjectEmpty(evento)) {
					tmp = evento;
					tmp["description"] = evento["descripcion"];
					tmp["isDisabled"] = false;
					delete evento["descripcion"];
				} else {
					tmp = rest;
					tmp["isDisabled"] = true;
				}
				tmp["cover"] = !isObjectEmpty(cover) ? cover : {};
				tmp["pago"] = !isObjectEmpty(pago) ? pago : {};

				return tmp;
			})
		)
		.then((res) => res.sort((a, b) => a.isDisabled - b.isDisabled));
}

/**
 * Hook para cargar datos asyncronos.
 * @param {{}|Array} emptyVar Inicializar variable vacio con el tipo de dato correcto.
 * @param {new Promise} promiseFun Promesa a ejecutar
 * @return {Array<number|Array, ()=>{}>} Result
 */
function useDataLoader(emptyVar, promiseFun) {
	const [data, setData] = useState(emptyVar);
	const [reload, setReload] = useState(false);

	useEffect(() => reloadData(), []);

	useEffect(() => {
		if (reload) {
			promiseFun()
				.then((res) => setData(res))
				.catch((e) => setData(emptyVar))
				.finally(() => setReload(false));
		}
	}, [reload]);

	const reloadData = () => setReload(true);

	return [data, reloadData];
}

/**
 * Hook para cargar los datos del evento.
 * @return {Array<Array, ()=>{}>} Result
 */
export function useEvent() {
	return useDataLoader([], EventDataLoader);
}

/**
 * Hook para cargar el saldo a favor del cliente.
 * @return {Array<number, ()=>{}>} Result
 */
export function usePositiveBalance() {
	return useDataLoader(0, PositiveBalanceDataLoader);
}
