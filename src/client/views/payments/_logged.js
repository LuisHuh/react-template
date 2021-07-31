import React, { Component } from "react";
import Api from "@app/Api";
import { getStateView } from "@app/Helpers";
import { Checkout, Page } from "@components";
import { getCountries } from "@views/payments/APIs";
import Auth from "@app/Auth";

export default class Payments extends Component {
	constructor(props) {
		super(props);

		this.state = {
			billsList: null,
			serviceList: [],
			amount: 0,
			display: "checkout",
			isPay: false,
			paymentData: {
				ticket: "",
				authorization: "",
				amount_charged: "",
			},
			divisa: "USD",
			tipo_cambio: "0",
			u: null, // usuario o planer para enviar correo
			// aux states
			isLoading: false,
			lastView: "/my-wedding",
			movePage: false,
			event: "",
			isChangeAmount:false
		};
	}
	componentDidMount() {
		this.atStart();
		this.getDireccionesList();
		getCountries("en", (r) => {
			this.setState(r);
		});
	}

	//#region    ----------------------------------------------------------- // ! 'helper functions'
	atStart() {
		let amount = 0;
		let isChangeAmount = false;
		let divisa = "USD";

		// get custom state from last page
		const tmpState = getStateView(this.props);
		const error = [
			{
				img: false,
				description: "No data loaded",
				amount: 0,
				currency: "",
				quantity: 0,
				u_price: 0,
				userRequest: null,
			},
		];
		const hasOrderList = tmpState && tmpState.hasOwnProperty("order");
		if (hasOrderList) {

			const update = tmpState.hasOwnProperty("update")
				? tmpState.update
				: [];
			if(update.length > 0){
				update.map((item, idx) =>{
					this.UpdateCost(item['idevent_detalle_item'],item['cantidad'], item['events_service']['costo'])
				})
			}
			// concepto 1 => service payments
			// concepto 2 => add pay to balance (or family gift)
			const concepto = tmpState.hasOwnProperty("concepto")
				? tmpState.concepto
				: 2;
			const evento = tmpState.hasOwnProperty("event") ? tmpState.event : "";
			const lastView = tmpState.hasOwnProperty("lastView")
				? tmpState.lastView
				: "/my-wedding";

			const serviceList = tmpState.order
				? Array.isArray(tmpState.order)
					? tmpState.order
					: [tmpState.order]
				: error;

			serviceList.map((item, j) => {
				if (j == 0) divisa = item.currency;
				amount += parseFloat(item.amount);
				isChangeAmount = item.isChangeAmount;
			});

			const overWrite = {
				serviceList,
				amount,
				divisa,
				concepto,
				u: serviceList[0].userRequest,
				lastView,
				event: evento,
				isChangeAmount:isChangeAmount
			};

			this.setState(overWrite);
			return overWrite;
		} else {
			const concepto = 1;
			let amount = 0; // desde la API para colocar cantidad pendiente por pagar
			let serviceList = [];
			let divisa = "USD";
			const { search } = this.props.location;
			const params = search.split("=").pop();
			const { id_resort } = sessionStorage;
			Api.getServiceShopping(params, id_resort)
				.then((r) => {
					r = r.data || {};
					if(r.cantidad_pagada> 0){
						amount = parseFloat(r.cantidad_pendiente);
						serviceList = [
							{
								img: r.events_service["path"],
								idconcepto_ingreso: r.events_service["idconcepto_ingreso"],
								description: r.events_service["descripcion"],
								amount: r.cantidad_pendiente,
								currency: "USD",
								quantity: r.cantidad,
								u_price: r.precio_unitario,
								userRequest: "",
								id: params,
							},
						];
					}else if(r.precio_unitario != r['events_service']['costo']){
						amount = parseFloat(r['events_service']['costo'] * r['cantidad']);
						serviceList = [
							{
								img: r.events_service["path"],
								idconcepto_ingreso: r.events_service["idconcepto_ingreso"],
								description: r.events_service["descripcion"],
								amount: r['events_service']['costo'] * r['cantidad'],
								currency: "USD",
								quantity: r.cantidad,
								u_price: r['events_service']['costo'],
								userRequest: "",
								id: params,
							},
						];
						return this.UpdateCost(params, r['cantidad'], r['events_service']['costo']);
					}else{
						amount = parseFloat(r.cantidad_pendiente);
						serviceList = [
							{
								img: r.events_service["path"],
								idconcepto_ingreso: r.events_service["idconcepto_ingreso"],
								description: r.events_service["descripcion"],
								amount: r.cantidad_pendiente,
								currency: "USD",
								quantity: r.cantidad,
								u_price: r.precio_unitario,
								userRequest: "",
								id: params,
							},
						];
					}
				})
				.catch((err) => {
					serviceList.push(error);
					console.warn(err);
				})
				.finally(() => {
					this.setState({
						amount,
						divisa,
						concepto,
						serviceList,
					});
				});
		}
	}
	//#endregion ----------------------------------------------------------- // ! 'helper functions'

	//#region    ----------------------------------------------------------- // ! 'APIs'

	/**
	 * Get Direcciones by group
	 */
	getDireccionesList() {
		const { id } = sessionStorage;

		Api.getAddressByGroup(id)
			.then((json) => {
				const { error } = json;
				if (!error) {
					let billsList = json.data || json;
					this.setState({ billsList });
				}
			})
			.catch((err) => {
				// console.log('err', err);
			});
	}

	/**
	 * Funcion para asignar saldo a favor
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
	 */
	sendBalancePayments(checkout) {
		let isPay = false;
		const { id } = sessionStorage;
		const { divisa, tipo_cambio, amount, u } = this.state;
		const { billData, cardData } = checkout;
		const data = {
			divisa,
			idevent_grupo: id,
			idfin_cliente_interno: "1",
			tipo_cambio,
			pago_online: {
				...billData,
				...cardData,
				payment: amount,
				currency: divisa,
				exchange: divisa == "USD" ? "1" : tipo_cambio,
			},
		};

		Api.addBalance(data)
			.then((r) => {
				if (!r.error) {
					const { postDataResp } = r.data;
					if (postDataResp) {
						isPay = true;
						const {
							ticket,
							authorization,
							amount_charged,
						} = postDataResp;
						const paymentData = { ticket, authorization, amount_charged };
						this.setState({
							isPay,
							display: "Balance sent successfully",
							paymentData,
							isLoading: false,
						});
					}
				}
				if(!isPay){
					data.id=id;
					data.divisa = divisa;
					let error = {
						message:"error when making a payment"
					}
					this.sendNotification(error,data,id);
				}
				this.setState({ isPay, display: "reject" });
			})
			.catch((error) =>{
				this.setState(
					{ isPay, display: "reject", isLoading: false },
					console.warn("error:", error)
				)
				data.id=id;
				data.divisa = divisa;
				this.sendNotification(error,data,id);
			}
			);
	}

	/**
	 * Funcion para pagar servicios
	 * @param {Object} data
	 * @param {Object} data.billData
	 * @param {string} data.billData.address
	 * @param {string} data.billData.city
	 * @param {string} data.billData.country
	 * @param {string} data.billData.idevent_billing_address
	 * @param {string} data.billData.lastName
	 * @param {string} data.billData.name
	 * @param {string} data.billData.zipcode
	 * @param {Object} data.cardData
	 * @param {string} data.cardData.card
	 * @param {string} data.cardData.cardNumber
	 * @param {string} data.cardData.cvc
	 * @param {string} data.cardData.mmExp
	 * @param {string} data.cardData.yyExp
	 */
	payServices(data) {
		let isPay = false;
		const { serviceList, tipo_cambio, amount, divisa, u } = this.state;
		const { id } = sessionStorage;
		// ocultar datos reales al envio de peticion...
		const extra = {
			a: divisa,
			b: amount,
			c: divisa == "USD" ? "1" : tipo_cambio,
			d: serviceList,
			e: id,
			f: u,
		};
		Api.makePayment({ ...data, extra })
			.then((r) => {
				if (!r.error) {
					const { postDataResp } = r.data;
					if (postDataResp) {
						isPay = true;
						const {
							ticket,
							authorization,
							amount_charged,
						} = postDataResp;
						const paymentData = { ticket, authorization, amount_charged };
						return this.setState({
							isPay,
							display: "Paid services",
							paymentData,
							isLoading: false,
						});
					}
				}
			})
			.catch((error) =>{
				data.id=id;
				data.divisa = divisa;
				this.sendNotification(error,data);
				this.setState(
					{ isPay, display: "reject", isLoading: false },
					console.warn("error:", error)
				)
			}
			);
	}

	sendNotification(error,data){
		let dat = {
			msg:error.message,
			sociedad: data.sociedad,
			idevent_grupo:data.id,
			dataPay:data.cardData,
			currency:data.divisa
		}
		Api.sendNotificationPlanner(dat)
		.then((response) => {

		})
		.catch((response) => {
			console.warn("error send")
		})
	}

	/**
	* Actualiza el precio guardado del servicio cuando se detecte
	* un cambio de precio en products
	*/
	UpdateCost(id,cantidad,pru){
		let cantidad_pendiente = cantidad * pru;
		let update_data = {id: id,precio_unitario: pru, cantidad_pendiente:cantidad_pendiente};
		console.warn("update_data =>>>>>>>>>>>", update_data);
		return Api.putDetailitem(id,update_data,Auth.getAuthorizationHeader()).then((res) => res);
	}

	defaultList(amount = "0") {
		const display = {
			amount,
			currency: "USD",
			description: "Pay Balance",
			img: false,
		};
		const informative = { quantity: 0, u_price: "0", id: 0 };
		const serviceList = [{ ...display, ...informative }];
		return serviceList;
	}

	//#endregion ----------------------------------------------------------- // ! 'APIs'

	render() {
		const {
			billsList,
			serviceList,
			amount,
			divisa,
			concepto,
			isLoading,
			isChangeAmount
		} = this.state;
		const {
			display,
			isPay,
			paymentData,
			lastView,
			movePage,
			slcListCountry,
			event,
		} = this.state;
		const { ticket, authorization, amount_charged } = paymentData;
		const { SuccessPayment, ErrorPayment } = Checkout;
		return (
			<Page title={""} loading={isLoading}>
				<section page="checkout">
					<div
						style={{ display: display == "checkout" ? "block" : "none" }}>
						<Checkout
							billsList={billsList} // list
							amount={amount} // number
							currency={divisa} // number
							serviceList={serviceList} // list
							summary_desc={event}
							isLogged={true}
							onFinish={(data) => {
								this.setState({ isLoading: true }, () => {
									if (concepto == 2)
										return this.sendBalancePayments(data);
									else if (concepto == 1)
										return this.payServices(data);
								});
							}}
							slcListCountry={
								slcListCountry || [{ value: "USA", label: "USA" }]
							}
							isChangeAmount={isChangeAmount}
							updateAmount={(amount) =>
								this.setState({
									amount,
									serviceList: this.defaultList(amount),
								})
							}
						/>
					</div>
					<div
						className="checkout-s"
						style={{ display: display == "checkout" ? "none" : "block" }}>
						{isPay ? (
							<SuccessPayment
								ticket={ticket}
								authNum={authorization}
								amount={amount_charged}
								divisa={divisa}
								className={""}
								redirect={{
									path: lastView,
									data: {},
								}}
								onBack={(e) => {
									this.setState({ movePage: true }, () => {
										this.setState({
											movePage: false,
											display: "checkout",
											isPay: false,
										});
									});
								}}
								movePage={movePage}
							/>
						) : (
							<ErrorPayment
								className={""}
								onBack={() => {
									this.setState({ display: "checkout", isPay: false });
								}}
							/>
						)}
					</div>
				</section>
			</Page>
		);
	}
}
