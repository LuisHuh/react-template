import React, { Component, Fragment } from "react";
import Api from "@app/Api";
import UseText from "@app/UseText";
import {
	Button,
	Cell,
	Currency,
	Grid,
	ServiceGrid,
	ServiceLocation,
} from "@components";
import PropTypes from "prop-types";
import Columns from "./Columns";

export default class EventManager extends Component {
	constructor(props) {
		super(props);
		const data = props.data || {};
		this.state = {
			isReadyToPay: {},
			data,
			cpData: data,
			hasServices: false,
			total_pay: {},
			isOk: {},
			anySelected: {},
		};
	}

	static propTypes = {
		data: PropTypes.shape({}),
		onPayment: PropTypes.func,
		onRef: PropTypes.func,
		onLoading: PropTypes.func,
	};

	locationIndex = -1;

	componentDidMount() {
		this.filterByBalance((hasServices) => {
			const { onRef } = this.props;
			if (typeof onRef == "function" && hasServices) onRef(this);
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props != prevProps) {
			if (this.props.remain != prevProps.remain) {
				this.updateAvailableCredit();
			}
		}
	}

	/**
	 * Actualiza el credito de los servicios.
	 */
	updateAvailableCredit() {
		const credit = this.props.remain;
		const { data } = { ...this.state };
		let locations = this.getLocation();
		locations = locations.map(({ service, ...rest }) => ({
			...rest,
			service: service.map((s) => ({ ...s, credit })),
		}));

		data.locacion = locations;
		this.setState({ data });
	}

	//#region    ----------------------------------------------------------- // ! 'ref functions'
	/**
	 * Funcion para filtrar servicios con 'cantidad_pendiente' y iniciar componente
	 * @param {(bool)=>{}} then
	 */
	filterByBalance(then = (bool) => {}) {
		let { data } = this.state;
		const { locacion } = data;
		let hasServices = false;
		Object.keys(locacion).map((id) => {
			data.locacion[id].service = locacion[id].service.filter(
				(j) => parseFloat(j.cantidad_pendiente) > 0
			);
			const hasItems = data.locacion[id].service.length > 0;
			data.locacion[id]["hasItems"] = hasItems;
			hasServices = hasServices || hasItems;
		});
		this.setState({ data, hasServices }, () => {
			then(hasServices);
		});
	}

	/**
	 * Obtiene la lista de registros validos y selecionados (checked && toPay > 0)
	 * @param {Array} events_detalle lista de datos que se muestra en la tabla predefinida
	 * @param {number} id posicion de evento, tabla a mostrar de la locacion
	 * @param {(Object)=>{}} then funcion para acompletar algun subproceso
	 * @returns {object} { id_group: number, idevent_locacion: number, total_pay: number, listSelect: array, isOk: boolean }
	 */
	getTotal = (events_detalle = null, id = null, then = (param) => {}) => {
		const idevent_locacion = id || 0;
		const { data } = this.state;
		const { locacion, id_group } = data;
		events_detalle = events_detalle || locacion[idevent_locacion].service;
		//* registros de tabla validos a pagar
		const listSelect = events_detalle.filter((i) => i.isChecked);
		const isOk =
			listSelect.length > 0
				? listSelect.filter((i) => parseFloat(i.toPay) == 0).length == 0
				: false;
		//* sumar montos
		let sumTotal = 0;
		listSelect.map((i) => (sumTotal += parseFloat(i.toPay)));
		const obj = {
			id_group,
			idevent_locacion,
			total_pay: parseFloat(sumTotal),
			listSelect,
			isOk,
		};
		then(obj);
		return obj;
	};

	getSubtotalLocation = (idevent_locacion = null) => {
		const { total_pay } = this.state;
		if (idevent_locacion) return total_pay[idevent_locacion];
		return total_pay;
	};

	getStatusLocation = (idevent_locacion = null) => {
		const { total_pay } = this.state;
		if (idevent_locacion) return total_pay[idevent_locacion];
		return total_pay;
	};

	/**
	 * Obtener el las locaciones del evento
	 */
	getEventLocations = () => {
		return this.state.data.locacion;
	};

	//#endregion ----------------------------------------------------------- // ! 'ref functions'
	//#region    ----------------------------------------------------------- // ! 'API functions'

	apiGetByIdEventoLocacion(locationIndex, idLocation, then = () => {}) {
		const c = (err) => {}; // console.error(err);

		return Api.getByIdEventoLocacion(idLocation)
			.then((res) => {
				return res.data || {};
			})
			.then((loc) => {
				let { data } = { ...this.state };
				const { service, rango_fechas } = loc;

				data.locacion[locationIndex].service = service;
				data.locacion[locationIndex].rango_fechas = rango_fechas;
				this.setState({ data }, () =>
					this.filterByBalance((a) => {
						then();
					})
				);
			})
			.catch(c)
			.finally(then);
	}

	/**
	 * Funcion para pagar servicios
	 * @param {object} getTotal parte del payload
	 * @param {string} getTotal.isOk validacion si existen servicios a pagar
	 * @param {string} getTotal.id id del grupo
	 * @param {string} getTotal.listSelect lista de servicios a pagar
	 * @param {(response)=>{}} success funcion al ocurrir correctamente
	 * @param {()=>{}} ends funcion realizada al finalizar
	 */
	apiPayServiceList(
		getTotal = { isOk: false },
		success = (r) => {},
		ends = () => {}
	) {
		const { isOk, listSelect, id, id_group } = getTotal;
		if (!isOk) return;
		const c = (err) => console.error("!");
		let id_pago = id;
		let idevent_grupo = id_group;
		let list_pay = listSelect;
		const d = { id_pago, idevent_grupo, list_pay };
		Api.postSinTarjeta(d).then(success).catch(c).finally(ends);
	}

	/**
	 * Funcion para actualizar el saldo del grupo
	 * @param {object} getTotal parte del payload
	 * @param {string} getTotal.isOk validacion si existen servicios a pagar
	 * @param {string} getTotal.total_pay sumatoria del total de servicios a pagar
	 * @param {(response)=>{}} success funcion al ocurrir correctamente
	 * @param {()=>{}} ends funcion realizada al finalizar
	 */
	apiUseRemain(
		getTotal = { isOk: false },
		success = (r) => {},
		ends = () => {}
	) {
		const { isOk, total_pay, id_group } = getTotal;
		if (!isOk) return;
		const c = (err) => console.error("!"); //('ERROR at USE REMAIN: ', err);
		const d = { idevent_grupo: id_group, cantidad: total_pay };
		Api.postGrupoPago(d).then(success).catch(c).finally(ends);
	}

	//#endregion ----------------------------------------------------------- // ! 'API functions'
	//#region    ----------------------------------------------------------- // ! 'window Functions'

	/**
	 * Regresa la locación por índice o todos.
	 * @param {number} index Índice de la locación.
	 * @return {{}|Array} locacion
	 */
	getLocation(index) {
		const { data } = { ...this.state };
		let location = [];
		if ((location = data.locacion)) {
			if (Array.isArray(location)) {
				if (typeof index === "number" && index > -1) {
					return location[index];
				}

				return index ? {} : location;
			}
		}

		return index ? {} : [];
	}

	/**
	 * Regresa los servicios de la locación.
	 * @param {number} index Índice de la locación.
	 * @return {Array} Services
	 */
	getServicesFromLocation(index) {
		if (index > -1) {
			const loc = this.getLocation(index);
			return loc.service || [];
		}

		return [];
	}

	/**
	 * Regresa el servicio por id.
	 * @param {number} index Índice de la locación.
	 * @param {Number} id Identificador del detalle del servicio.
	 * @return {{}} Servicio.
	 */
	getServiceFromId(index, id) {
		if (index > -1 && id > 0) {
			const services = this.getServicesFromLocation(index);
			const service = services.find((s) => s.idevent_detalle_item == id);
			return service || {};
		}

		return {};
	}

	/**
	 * Regresa la posición del servicio en el arreglo.
	 * @param {number} index Índice de la locación.
	 * @param {Number} id Identificador del detalle del servicio.
	 * @return {Number} Index.
	 */
	getIndexOfService(index, id) {
		if (index > -1 && id > 0) {
			const services = this.getServicesFromLocation(index);
			return services.findIndex((s) => s.idevent_detalle_item == id);
		}

		return -1;
	}

	/**
	 * Regresa la cantidad menor de un arreglo.
	 * @param {Array} values Valores a ordenar.
	 * @returns {Number} value.
	 */
	getAmountLess(values) {
		if (Array.isArray(values)) {
			values = values.sort((a, b) => (a < b ? -1 : b < a ? 1 : 0));
			return values.length > 0 ? values[0] : 0;
		}

		return 0;
	}

	/**
	 * Escucha las acciones de los eventos de la tabla.
	 * Regresa multiples parametros, este ejemplo solo aplica para *INPUT_CHANGE*.
	 * @param {string} action Elemento Accionador.
	 *	@param {Event} e Evento accionador.
	 *	@param {{}} service Servicio seleccionado.
	 *	@param {number} rowIndex Indice de la fila de la tabla seleccionada.
	 *	@param {Array} services Arreglo de servicios.
	 *	@param {(id: number, values: {}) => void} setInputValues Actualiza valores del carrito.
	 *	@param {(arr: Array, id: number, values: {}) => Array} updateService Actualiza valores de los servicios.
	 *	@param {number} locationIndex Índice de la locación.
	 */
	handleInputChange(
		locationIndex,
		action,
		e,
		service,
		rowIndex,
		services,
		setInputValues,
		updateService
	) {
		let { value, checked } = { ...e.target };
		let { remain: credit, onPayment } = { ...this.props };
		let { anySelected, isReadyToPay, data, total_pay, isOk } = {
			...this.state,
		};
		const dispatcher = e.type;
		const $service = { ...service };
		const $data = { ...data };
		const idService = $service.idevent_detalle_item || 0;
		const lastToPay = $service.lastToPay;
		const toPay = $service.toPay;
		const balance = parseFloat($service.cantidad_pendiente || 0);
		credit = parseFloat(credit);
		value = parseFloat(value || 0);

		let amount = this.getAmountLess([balance, credit]);

		if (action === "ITEM_CHECKED") {
			if (isReadyToPay[locationIndex] || (credit == 0 && checked)) return;
			$service.toPay = amount;
			$service.inputValue = amount;
			$service.isChecked = !!checked;
			const itemChecked = services.filter((i) => i.isChecked);
			anySelected[locationIndex] = itemChecked.length > 0;
		} else if (action === "INPUT_CHANGE") {
			if (dispatcher == "blur") {
				let $tmp = 0;
				let $credit = 0;
				if (toPay > 0) $tmp = toPay;
				if (toPay == 0 && credit > 0) $tmp = credit;
				else if (toPay <= 0) $tmp = 0;

				if (credit == 0) $credit = lastToPay || toPay;
				else if (credit <= 0) $credit = 0;
				else if (credit > 0) $credit = credit + (lastToPay || toPay);

				if (toPay.toString().trim() != "")
					amount = this.getAmountLess([balance, $credit, $tmp]);
				else amount = this.getAmountLess([balance, $credit]);

				if ($tmp && $tmp <= $credit) {
					$service.lastToPay = $tmp;
				}
			}

			$service.toPay = dispatcher == "blur" ? amount : value;
			$service.inputValue = dispatcher == "blur" ? amount : value;
		}

		if (isReadyToPay[locationIndex]) {
		}

		const $tmpLocations = $data.locacion[locationIndex];
		const $tmpServices = $tmpLocations.service;
		const indexOfService = $tmpServices.findIndex(
			(s) => s.idevent_detalle_item == idService
		);

		if (indexOfService > -1) {
			$tmpServices[indexOfService] = $service;
			$tmpLocations.service = $tmpServices;
			$data.locacion[locationIndex] = $tmpLocations;
			this.setState({ data: $data, anySelected }, () => {
				if (
					action === "ITEM_CHECKED" ||
					(action === "INPUT_CHANGE" && dispatcher == "blur")
				) {
					const table = this.getTotal(null, locationIndex);
					total_pay[locationIndex] = table.total_pay;
					isOk[locationIndex] = table.isOk;
					this.setState({ total_pay, isOk }, () => {
						onPayment();
						setInputValues(idService, { amount });
					});
				}
			});
		}
	}

	/**
	 * Llama la lista de acuerdo a la locacion del evento y realiza el pago de servicio(s)
	 * @param {number} id posicion de la tabla correspondiente a pagar (idevent_locacion)
	 */
	makePayment(id) {
		const d = this.getTotal(null, id);
		const { onLoading } = this.props;
		if (typeof onLoading == "function") onLoading(true);
		this.apiUseRemain(d, (r) => {
			let data = r.data;
			if (data.id)
				this.apiPayServiceList({ ...d, id: data.id }, (r2) => {
					this.reloadList(id, () =>
						typeof onLoading == "function" ? onLoading(false) : null
					);
					const { onLoading } = this.props;
				});
		});
	}

	//#endregion ----------------------------------------------------------- // ! 'window Functions'
	//#region    ----------------------------------------------------------- // ! 'helper functions'

	/**
	 * Recarga los valores de una locacion (tabla)
	 * @param {number} id
	 * @param {()=>{}} then
	 */
	reloadList(id, then = () => {}) {
		let { data, isReadyToPay, total_pay, isOk, anySelected } = this.state;
		const { locacion } = data;
		const item = locacion[id];
		if (item) {
			isReadyToPay[id] = false;
			total_pay[id] = 0;
			anySelected[id] = false;
			isOk[id] = false;
			this.apiGetByIdEventoLocacion(id, item.idevent_evento_locacion, () => {
				this.setState(
					{ isReadyToPay, total_pay, anySelected, isOk },
					() => {
						then();
						this.props.onPayment();
					}
				);
			});
		}
		return;
	}

	//#endregion ----------------------------------------------------------- // ! 'helper functions'

	render() {
		const { isReadyToPay, hasServices, data, total_pay, isOk } = this.state;
		const { onRef, onLoading, onPayment, ...r } = this.props;

		if (!hasServices) return null;

		const { description } = data;
		const locaciones = this.getLocation();

		return (
			<>
				<Cell className="prepayment-title">
					<h3>{description}</h3>
				</Cell>
				<Cell className="container">
					{locaciones.map(
						(
							{ descripcion, fecha_inicia_evento, service, hasItems },
							key
						) => {
							if (!hasItems) return null; // if service.length == 0
							const isCompleted = isReadyToPay[key] || false;
							let dataRender = service;
							if (isCompleted) {
								dataRender = service.filter((i) => i.isChecked);
							}

							return (
								<ServiceLocation
									key={key}
									title={descripcion}
									eventDate={fecha_inicia_evento}>
									<Grid type="x">
										<Cell>
											<ServiceGrid
												auto={false}
												columns={Columns}
												data={dataRender}
												className="table-services"
												enableComments={false}
												onAction={(...params) =>
													this.handleInputChange(key, ...params)
												}
											/>
										</Cell>
										<Cell>
											<section className="controls">
												{isOk[key] ? (
													<article>
														<UseText
															i18n="TOTAL_PAYMENT"
															className="sm-f12x"
														/>
														<br />
														<Currency
															value={total_pay[key] || 0}
															region="usa"
															displayCurrency={true}
															className="right"
														/>
													</article>
												) : (
													""
												)}
											</section>
											<section className="controls">
												{isReadyToPay[key] ? (
													<Fragment>
														<Button
															className="hollow"
															onClick={() =>
																this.reloadList(key)
															}>
															<UseText i18n="CANCEL" />
														</Button>
														<Button
															disabled={!isOk[key]}
															onClick={() =>
																this.makePayment(key)
															}>
															<UseText i18n="MAKE_PAYMENT" />
														</Button>
													</Fragment>
												) : (
													<Button
														disabled={!isOk[key]}
														onClick={() =>
															this.setState({
																isReadyToPay: { [key]: true },
															})
														}>
														<UseText i18n="ALLOCATE_AMOUNT" />
													</Button>
												)}
											</section>
										</Cell>
									</Grid>
								</ServiceLocation>
							);
						}
					)}
				</Cell>
			</>
		);
	}
}
