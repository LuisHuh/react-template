import React, { Component } from "react";
import Api from "@app/Api";
import { changeData, getStateView } from "@app/Helpers";
import { Checkout, Page } from "@components";
import {
    getCountries
} from "./APIs";

export default class SendGiftCard extends Component {
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
			extra_info: {},
			movePage: false,
			isLoading: false,
		};
	}
	componentDidMount() {
		this.atStart();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props != prevProps) {
		}
	}

	/**
	 * API que regresa los paises.
	 * @param : idioma  en/es
	 * @type : Get
	 */
	getCountries(idioma) {
		let slcListCountry = [{ value: "USA", label: "USA" }];
		Api.getPais(idioma)
			.then((r) => {
				const datos = r.data || [];
				const f = (i) => i != "content" && i != "type" && i != "code";
				const keys = Object.keys(datos).filter(f);
				slcListCountry = keys.map((key) => ({
					label: datos[key],
					value: key,
				}));
				return this.setState({ slcListCountry });
			})
			.catch((err) => {
				console.error("Countries not found", err);
			});
		this.setState({ slcListCountry });
	}

	onBeforeUnload = (e) => {
		e.preventDefault();
		e.returnValue = `Are you really sure?`;
	};

	atStart() {
		let amount = 0;
		let divisa = "USD";

		// get custom state from last page
		const tmpState = getStateView(this.props);
		const error = [
			{
				img: false,
				description: "No data loaded",
				amount: 0,
				currency: " ",
				quantity: 0,
				u_price: 0,
				extra_info: {
					idevent_grupo: 0,
					nombre_familiar: "",
					correo_familiar: "",
					comentario_familiar: "",
				},
			},
		];

		// concepto 1 => service payments
		// concepto 2 => add pay to balance (or family gift)
		const concepto = 2;

		// termino sociedad
		const society = tmpState.society || 1;

		const serviceList = tmpState.order
			? Array.isArray(tmpState.order)
				? tmpState.order
				: [tmpState.order]
			: error;

		serviceList.map((item, j) => {
			if (j == 0) divisa = item.currency;
			amount += parseFloat(item.amount);
		});
		const { extra_info } = serviceList[0];
		const r_error = (e) => this.setState({}, console.error(e));
		const r_success = (r) => this.setState({ ...r });
		getCountries("en", r_success, r_error);
		this.setState({
			serviceList,
			amount,
			divisa,
			concepto,
			extra_info,
			society,
		});
		return { serviceList, amount, divisa, concepto, extra_info };
	}

	//#region    ----------------------------------------------------------- // ! 'APIs'

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
		const { divisa, tipo_cambio, amount, serviceList } = this.state;
		const { extra_info } = serviceList[0];
		const { idevent_grupo } = extra_info;
		const { billData, cardData } = checkout;
		const data = {
			divisa,
			idevent_grupo,
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
						const {
							ticket,
							authorization,
							amount_charged,
						} = postDataResp;
						const paymentData = { ticket, authorization, amount_charged };
						const giftData = {
							...extra_info,
							monto_regalo: amount,
							fecha_regalo: changeData(Date.now()),
						};
						Api.AddFamilyGift(giftData)
							.then((r2) => {
								if (!r2.error) {
									// this.updateLink();
									isPay = true;
									return this.setState({
										isPay,
										display: "success",
										paymentData,
										isLoading: false,
									});
								}
							})
							.catch((error) => {
								console.error("ERROR AddFamilyGift:", error);
							})
							.finally(() =>{
								this.setState({ isPay, paymentData, isLoading: false })
							}
							);
					}
				}

				this.setState({ isPay, display: "reject" });
			})
			.catch((error) =>{
				this.setState(
					{ isPay, display: "reject", isLoading: false },
					console.warn("error:", error)
				)
				data.id=idevent_grupo;
				data.divisa = divisa;
				this.sendNotification(error,data)
			})
			.finally(() =>{
				this.setState({ isLoading: false })
			});
	}

	sendNotification(error,data){
		let dat = {
			msg:error.message,
			sociedad: data.sociedad,
			idevent_grupo:data.id,
			dataPay:data.pago_online,
			currency:data.divisa
		}
		Api.sendNotificationPlanner(dat)
		.then((response) => {
		})
		.catch((response) => {
			console.warn("error send");
		})
	}

	//#endregion ----------------------------------------------------------- // ! 'APIs'

	render() {
		const {
			billsList,
			serviceList,
			amount,
			divisa,
			concepto,
			slcListCountry,
			isLoading,
		} = this.state;
		const { display, isPay, paymentData, society } = this.state;
		const { ticket, authorization, amount_charged } = paymentData;

		const { extra_info, movePage } = this.state;

		const { SuccessPayment, ErrorPayment } = Checkout;
		return (
			<Page title={"Payment"} loading={isLoading}>
				<section page="checkout">
					<div
						style={{ display: display == "checkout" ? "block" : "none" }}>
						<Checkout
							billsList={billsList} // list
							amount={amount} // number
							currency={divisa} // number
							serviceList={serviceList} // list
							summary_desc={""}
							isLogged={false}
							onFinish={(data) => {
								// console.log(data);
								this.setState({ isLoading: true }, () => {
									if (concepto == 2)
										return this.sendBalancePayments(data);
								});
								// else if(concepto==1) return this.payServicesLoaded(data);
							}}
							slcListCountry={slcListCountry}
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
								i18nBack={"SEND_ANOTHER_GIFT"}
								redirect={{
									path: `/gift-card/${society}`,
									data: extra_info,
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
