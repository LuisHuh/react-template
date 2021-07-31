import React, { Component } from "react";
import {
	AddressSource,
	getCountries,
	readHash,
	sendBalancePayments,
	updateLink,
} from "./APIs";
import { Page, Grid, Cell, Panel, Toast } from "@components";
import { getStateView, changeData, getToken } from "@app/Helpers";
import WithContext from "@app/ServiceContext";
import UseText from "@app/UseText";
import Auth from "@app/Auth";
import Api from "@app/Api";
import { Redirect } from 'react-router-dom';
import { Checkout } from "@components/v2";
import { cardIdentifier, parseCardNumber } from "@components/v2/form/Validator";

/**
 * Muestra un componente de respaldo en caso de surgir un error.
 * @param {Object} param0 Props de componente.
 * @param {Boolean} param0.hasError Controla si se muestra el componente de respaldo en caso de error.
 * @param {Function|JSX.Element} param0.fallback Componente de respaldo.
 * @param {JSX.Element} param0.children Componente hijo normal.
 * @returns {JSX.Element}
 */
function ErrorCatcher({ fallback, hasError, children }) {
	if (hasError) {
		if (typeof fallback === "function") {
			return fallback();
		} else return fallback;
	}

	return children;
}

class GlobalPayment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			manual: false,
			billsList: [],
			serviceList: [],
			amount: 1,
			display: "checkout",
			paymentLimit: 10000,
			typeOfPayment: null, //tipo de pago para parcialidades
			paymentData: {
				ticket: "",
				authorization: "",
				amount_charged: "",
			},
			divisa: "USD",
			tipo_cambio: "0",
			idevent_transaction_link: "",
			id_group: "",
			event: "",
			u: null,
			society: null,
			isLoading: true,
			isPay: false,
			isChangeAmount: false,
			isGiftCard: false,
			movePage: false,
			haveError: false,
			msg: "LINK_EXPIRED",
			extra_info: {
				idevent_grupo: 0,
				nombre_familiar: "",
				correo_familiar: "",
				comentario_familiar: " ",
			},
			extraData: {},
		};
		this.tmpState = false;
		this.concepto = 0;
		this.isLogged = false;
		this.isLink = false;
		this.onBackSuccess= this.onBackSuccess.bind(this);
	}

	componentDidMount() {
		this.isLogged = Auth.isAuthenticated();
		this.tmpState = getStateView(this.props);
		this.atStart();
	}

	atStart() {
		const hasState = this.tmpState instanceof Object;
		let isGiftCard = false;
		this.concepto = 0;

		if (hasState) {
			isGiftCard = this.tmpState.isGiftCard;
			this.concepto = this.tmpState.concepto;
		}

		this.setState({ isLoading: true }, () => {
			if (this.isLogged && !isGiftCard) this.checkPropsGeneral();
			else this.checkPropsHash();
		});

		// Direcciones
		if (this.isLogged && !isGiftCard) {
			this.getDireccionesList();
		} else {
			this.setState({ manual: true });
		}

		// Países
		this.getCountriesList();
	}

	//logged
	checkPropsGeneral() {
		let amount = 0;
		let isChangeAmount = false;
		let divisa = "USD";

		// get custom state from last page
		const error = [
			{
				img: false,
				description: "No data loaded",
				amount: 0,
				currency: "",
				quantity: 0,
				u_price: 0,
				userRequest: null,
				extra_info: {
					idevent_grupo: 0,
					nombre_familiar: "",
					correo_familiar: "",
					comentario_familiar: "",
				},
			},
		];
		const hasOrderList =
			this.tmpState && this.tmpState.hasOwnProperty("order");
		if (hasOrderList) {
			const update = this.tmpState.hasOwnProperty("update")
				? this.tmpState.update
				: [];
			if (update.length > 0) {
				update.map((item, idx) => {
					this.UpdateCost(
						item["idevent_detalle_item"],
						item["cantidad"],
						item["events_service"]["costo"]
					);
				});
			}
			// concepto 1 => service payments
			// concepto 2 => add pay to balance (or family gift)
			const concepto = this.tmpState.hasOwnProperty("concepto")
				? this.tmpState.concepto
				: 2;
			const evento = this.tmpState.hasOwnProperty("event")
				? this.tmpState.event
				: "";
			const lastView = this.tmpState.hasOwnProperty("lastView")
				? this.tmpState.lastView
				: "/my-wedding";

			const serviceList = this.tmpState.order
				? Array.isArray(this.tmpState.order)
					? this.tmpState.order
					: [this.tmpState.order]
				: error;

			serviceList.map((item, j) => {
				if (j == 0) divisa = item.currency;
				amount += parseFloat(item.amount);
				isChangeAmount = item.isChangeAmount;
			});
			isChangeAmount = isChangeAmount || false;

			const overWrite = {
				serviceList,
				amount,
				divisa,
				concepto,
				u: serviceList[0].userRequest,
				lastView,
				event: evento,
				isChangeAmount: isChangeAmount || false,
				isLoading: false,
			};

			this.setState(overWrite);
			return overWrite;
		} else {
			const concepto = 1;
			this.concepto = 1;
			let amount = 0; // desde la API para colocar cantidad pendiente por pagar
			let serviceList = [];
			let divisa = "USD";
			const { search } = this.props.location;
			const params = search.split("=").pop();
			const { id_resort } = sessionStorage;
			Api.getServiceShopping(params, id_resort)
				.then((r) => {
					r = r.data || {};
					if (r.cantidad_pagada > 0) {
						amount = parseFloat(r.cantidad_pendiente);
						serviceList = [
							{
								img: r.events_service["path"],
								idconcepto_ingreso:
									r.events_service["idconcepto_ingreso"],
								description: r.events_service["descripcion"],
								amount: r.cantidad_pendiente,
								currency: "USD",
								quantity: r.cantidad,
								u_price: r.precio_unitario,
								userRequest: "",
								id: params,
							},
						];
					} else if (r.precio_unitario != r["events_service"]["costo"]) {
						amount = parseFloat(
							r["events_service"]["costo"] * r["cantidad"]
						);
						serviceList = [
							{
								img: r.events_service["path"],
								idconcepto_ingreso:
									r.events_service["idconcepto_ingreso"],
								description: r.events_service["descripcion"],
								amount: r["events_service"]["costo"] * r["cantidad"],
								currency: "USD",
								quantity: r.cantidad,
								u_price: r["events_service"]["costo"],
								userRequest: "",
								id: params,
							},
						];
						return this.UpdateCost(
							params,
							r["cantidad"],
							r["events_service"]["costo"]
						);
					} else {
						amount = parseFloat(r.cantidad_pendiente);
						serviceList = [
							{
								img: r.events_service["path"],
								idconcepto_ingreso:
									r.events_service["idconcepto_ingreso"],
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
					this.setState(
						{
							amount,
							divisa,
							concepto,
							serviceList,
						},
						() =>
							this.setState({
								isChangeAmount: isChangeAmount,
								isLoading: false,
							})
					);
				});
		}
	}

	/**
	 * Get Direcciones by group
	 * @param {() => void} callback Función que se ejecuta después de obtener las direcciones.
	 */
	getDireccionesList(callback = () => {}) {
		AddressSource()
			.then((adds) =>
				this.setState({ billsList: adds }, () => {
					callback(adds);
				})
			)
			.catch((e) => console.log(e));
	}

	getCountriesList() {
		const hasState = this.tmpState instanceof Object;
		let hasCountries = false;
		if (hasState) {
			hasCountries = this.tmpState.slcListCountry;
		}

		if (!hasCountries) {
			const r_error = (e) => console.error(e);
			const r_success = (r) => this.setState({ ...r });
			getCountries("en", r_success, r_error);
		} else {
			this.setState({ slcListCountry: this.tmpState.slcListCountry });
		}
	}

	/**
	 * Funcion para agregar un (registry)family gift
	 * @param object giftData
	 */
	AddFamilyGift(giftData, paymentData, callback) {
		Api.AddFamilyGift(giftData)
			.then((r2) => {
				callback(false,
						{
							data: paymentData,
							backBtnText:'SEND_ANOTHER_GIFT',
							onBack:this.onBackSuccess
						});
			})
			.catch((error) => {
                callback(false, { data: paymentData });
                console.warn("ERROR AddFamilyGift:", error)
				/* this.setState(
                    { isPay: false, display: "reject" },
                    console.warn("ERROR AddFamilyGift:", error)
				); */
			})
			.finally(() => {
				this.setState({ isLoading: false });
			});
	}

	/**
	 * checkPropsHash
	 * Funcion para verificar el hash del link
	 * @returns mixed
	 */
	checkPropsHash() {
		this.isLink=true;
		let isChangeAmount = true;
		const hasIdLink =
			this.tmpState &&
			this.tmpState.hasOwnProperty("idevent_transaction_link");
		const isGiftCard =
			this.tmpState && this.tmpState.hasOwnProperty("isGiftCard");
		const lastView = this.tmpState.hasOwnProperty("lastView")
			? this.tmpState.lastView
			: "/my-wedding";
		if (hasIdLink) {
			const hasGroup =
				this.tmpState && this.tmpState.hasOwnProperty("id_group");
			const hasUser = this.tmpState && this.tmpState.hasOwnProperty("u");
			const hasSoc = this.tmpState && this.tmpState.hasOwnProperty("s");
			const idevent_transaction_link = hasIdLink
				? this.tmpState.idevent_transaction_link
				: "";
			const id_group = hasGroup ? this.tmpState.id_group : "";
			const u = hasUser ? this.tmpState.u : "";
			const society = hasSoc ? this.tmpState.s : "";

			this.setState({
				idevent_transaction_link,
				isGiftCard,
				isChangeAmount,
				id_group,
				u,
				society,
				lastView,
			});
			return this.setState({ isLoading: false });
		} else {
			let token = !this.tmpState
				? this.props
				: { location: { hash: this.tmpState.hash } };
			readHash(
				token,
				(hash, link, msg, msgUser) => {
					if (link.error) {
						this.sendNotification(msg);
						let text = this.props.app.getText(msgUser);
						return this.setState({
							isLoading: false,
							haveError: true,
							msg: text,
						});
					}
					const serviceList = this.defaultList(1);
					const { idevent_transaction_link, id_group, data } = link.data;
					const _data = JSON.parse(data);
					const { userRequest, sociedad, paymentLimit, ...rest } = _data;
					const { notificacion_data } = _data;
					let extraData = {};
					this.concepto = 2;
					Api.getGroupDetail(id_group)
						.then((response) => {
							let { folio, hotel, sociedad } = response.data[0];
							extraData = {
								folio: folio,
								hotel: hotel,
								sociedad: sociedad,
							};
							this.setState({ society: sociedad, extraData: extraData });
						})
						.catch((e) => {
							console.warn("error send");
						});
					this.setState({
						serviceList,
						idevent_transaction_link,
						id_group,
						paymentLimit,
						isGiftCard,
						isChangeAmount,
						lastView,
						u: userRequest,
						society: sociedad,
						...rest,
					});
					return this.setState({ isLoading: false });
				},
				(e) => {
					console.error(e);
				}
			);
		}
	}

	/**
	 * metodo para enviar notificacion de correo
	 * @param string msg
	 */
	sendNotification(msg, data = null) {
		let text = this.props.app.getText(msg);
		let token = getToken(this.props);

		let dat = {
			msg: text,
			errortoken: true,
			token: { token: token },
		};

		if (data != null) {
			dat = {
				msg: msg.message,
				sociedad: data.sociedad,
				idevent_grupo: data.id,
				dataPay: data.cardData,
				currency: data.divisa,
			};
		}
		Api.sendNotificationPlanner(dat)
			.then((response) => {})
			.catch((response) => {
				console.warn("error send");
			});
	}

	/**
	 * Actualiza el precio guardado del servicio cuando se detecte
	 * un cambio de precio en products
	 */
	UpdateCost(id, cantidad, pru) {
		let cantidad_pendiente = cantidad * pru;
		let update_data = {
			id: id,
			precio_unitario: pru,
			cantidad_pendiente: cantidad_pendiente,
		};
		console.warn("update_data =>>>>>>>>>>>", update_data);
		return Api.putDetailitem(
			id,
			update_data,
			Auth.getAuthorizationHeader()
		).then((res) => res);
	}

	defaultList(amount = "0") {
		const isGiftCard =
			this.tmpState && this.tmpState.hasOwnProperty("isGiftCard");
		let display = {
			amount,
			currency: "USD",
			description: "Add Balance",
			img: false,
			quantity: 0,
			u_price: "0",
			id: 0,
		};
		if (isGiftCard) {
			display = {
				amount,
				currency: "USD",
				description: "Gift",
				u_price: amount,
				quantity: "1",
				img: false,
				id: 0,
				idconcepto_ingreso: 0,
				extra_info: {
					idevent_grupo: this.state.idevent_grupo,
					// nombre_familiar: this.state.name,
					// correo_familiar: this.state.email,
					// comentario_familiar:
					// 	this.state.comments != "" ? this.state.comments : " ",
					idevent_transaction: this.state.idevent_transaction_link,
					userRequest: this.state.u,
				},
			};
		}
		const serviceList = [{ ...display }];
		return serviceList;
	}

	/**
	 * Funcion para devolver el mensaje de error
	 * @returns JXS
	 */
	showErrorMessage() {
		return (
			<Grid type="x" className="grid-margin-x">
				<Cell medium="1" large="1"></Cell>
				<Cell small="12" medium="10" large="10">
					<Panel style={{ marginTop: "10%" }}>
						<Grid type="x">
							<Cell small="12" medium="12" large="12">
								<center>
									<i
										className="prs pr-alert pr-7x"
										style={{ color: "#bf914d " }}></i>
								</center>
							</Cell>
							<br></br>
							<Cell small="12" medium="12" large="12">
								<center>
									<UseText i18n={this.state.msg} />
								</center>
							</Cell>
						</Grid>
					</Panel>
				</Cell>
				<Cell medium="1" large="1"></Cell>
			</Grid>
		);
	}

	/**
	 * Guarda la dirección proporcionada.
	 * @param {{}} data Datos del formulario de dirección.
	 * @param {() => void} callback Funcion que se ejecuta después de guardar.
	 */
	onAddressSubmit = (data, callback = () => {}) => {
		let info = Auth.userData();

		//se anexan campos adicionales al json dataForm
		let request = {
			fullName: data.firstName,
			apellido: data.lastName,
			address: " ",
			email: data.email,
			country: data.country,
			city: data.city,
			zip: data.zipCode,
			direccion_principal: 0,
			iddef_direccion_tipo: 1, // Temporalmente hardcodeado en 1 por indicación de atolentino
			id_contacto_main: info.id,
			// country_select: data.country_select,
		};

		Api.postBillingAddress(request)
			.then((response) => {
				if (!response.error) {
					const res = response.data || {};
					this.getDireccionesList((address) => {
						const index = address.findIndex((ad) => ad.id == res.id);
						if (index > -1) {
							callback(index, address[index]);
						}
					});
					Toast({ html: "Great! Address saved successfully!" });
				}
			})
			.catch((err) => {
				console.log(err);
				Toast({ html: "Wait! Something went wrong, please try again!" });
				/* this.setState({	addNew:false,name: "",lastName: "",	address: "", email: "", city: "",country: "",	zipcode: "",idevent_billing_address:""});
				 */
			});
	};

	/**
	 * Funcion que se ejecuta al momento de pagar un balance o un servicio.
	 * @param {{}} data Datos del checkout.
	 * @param {(hasError: Boolean, response: {})=>void} callback Callback que indica lo que hará el checkout después del proceso de pago.
	 */
	onFinishBalance = (data, callback) => {
		this.setState({ isLoading: true }, () => {
			switch (this.concepto) {
				case 1:
					return this.payServices(data, callback);
				case 2:
					return this.sendBalancePayments(data, callback);
			}
		});
	};

	/**
	 * Funcion para pagar servicios
	 * @param {Object} data
	 * @param {Object} data.billData
	 * @param {string} data.billData.email
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
	 * @param {(hasError: Boolean, response: {})=>void} callback Evento que se ejecuta después del proceso de pago.
	 */
	payServices(data, callback) {
		let isPay = false;
		const { serviceList, tipo_cambio, amount, divisa, u, paymentLimit } =
			this.state;
		const { id, langWeddings } = sessionStorage;
		let lastUsedLanguageid = parseInt(langWeddings);
		let defaultLang = isNaN(lastUsedLanguageid) ? 1 : lastUsedLanguageid;

		const billData = {
			email: data.email,
			address: data.address || " ",
			city: data.city,
			country: data.country,
			idevent_billing_address: data.id,
			lastName: data.lastName,
			name: data.firstName,
			zipcode: data.zipCode,
		};

		const cardNumber = parseCardNumber(data.cardNumber);
		const card = cardIdentifier(cardNumber).code;
		const cardData = {
			card: card,
			cardNumber: cardNumber,
			cvc: data.cvc,
			mmExp: data.mmExp,
			yyExp: data.yyExp,
		};

		// ocultar datos reales al envio de peticion...
		const extra = {
			a: divisa,
			b: amount,
			c: divisa == "USD" ? "1" : tipo_cambio,
			d: serviceList,
			e: id,
			f: u,
			g: defaultLang,
			h: paymentLimit,
			i: data.typeOfPayment,
		};

		Api.makePayment({ billData, cardData, extra })
			.then((r) => {
				if (!r.error) {
					const { postDataResp } = r.data;
					if (postDataResp) {
						isPay = false;
						const paymentData = [];
						Object.keys(postDataResp).forEach((index) => {
							const element = postDataResp[index] || {};
							const voucher = element.payment || {};
							let details = element.services || [];

							details = details.map((d) => ({
								description: d.concepto_ingreso,
								amount: d.importe,
							}));

							const paymentServices = {
								isRejected: element.error,
								ticket: voucher.ticket,
								authorization: voucher.authorization,
								amount: voucher.amount_charged,
								order: details,
							};

							if (!element.error) {
								isPay = true;
							}
							paymentData.push(paymentServices);
						});

						if (!isPay) {
							throw "Rejected";
						}

						callback(false, { data: paymentData,onBack:this.onBackSuccess});

						return this.setState({
							isLoading: false,
						});
					}
				}
			})
			.catch((error) => {
				const message = error.message || error || "";
				data.id = id;
				data.divisa = divisa;
				this.sendNotification(error, data);
				callback(true, { message });
				/* 
				this.setState(
					{ isPay, display: "reject", isLoading: false },
					console.warn("error:", error)
				); */
			});
	}

	/**
	 * Funcion para asignar saldo a favor
	 * @param {Object} checkout
	 * @param {string} checkout.city
	 * @param {string} checkout.country
	 * @param {string} checkout.id
	 * @param {string} checkout.lastName
	 * @param {string} checkout.name
	 * @param {string} checkout.zipCode
	 * @param {string} checkout.card
	 * @param {string} checkout.cardNumber
	 * @param {string} checkout.cvc
	 * @param {string} checkout.mmExp
	 * @param {string} checkout.yyExp
	 * @param {(hasError: Boolean, response: {})=>void} callback Evento que se ejecuta después del proceso de pago.
	 */
	sendBalancePayments(checkout, callback) {
		const { id } = Auth.userData();
		const { divisa, tipo_cambio, amount, serviceList, id_group } = this.state;
		const { extra_info } = serviceList[0];
		const { idevent_grupo } = extra_info || {};
		let {
			id: idevent_billing_address,
			firstName: name,
			zipCode: zipcode,
			cardNumber,
			...rest
		} = checkout;
		cardNumber = parseCardNumber(cardNumber);
		const card = cardIdentifier(cardNumber).code;

		const data = {
			divisa,
			idevent_grupo: idevent_grupo || id || id_group,
			idfin_cliente_interno: "1",
			tipo_cambio,
			pago_online: {
				address: " ",
				idevent_billing_address,
				name,
				zipcode,
				cardNumber,
				card,
				payment: amount,
				currency: divisa,
				exchange: divisa == "USD" ? "1" : tipo_cambio,
				...rest,
			},
		};
		Api.addBalance(data)
			.then((response) => response.data || {})
			.then((response) => response.postDataResp || {})
			.then((response) => {
				const { ticket, authorization, amount_charged } = response;
				const paymentData = [
					{
						isRejected: false,
						ticket,
						authorization,
						amount: amount_charged,
						order: [],
					},
				];

				if (this.state.isGiftCard) {
					//se valida si es un regalo
					const nombre_familiar= name +" "+checkout.lastName;
					const correo_familiar=checkout.email;
					const comentario_familiar= (checkout.message && checkout.message !="") ? checkout.message : " ";
					const giftData = {
						...extra_info,
						correo_familiar,
						nombre_familiar,
						monto_regalo: amount,
						comentario_familiar,
						fecha_regalo: changeData(Date.now()),
					};
					this.AddFamilyGift(giftData, paymentData, callback);
				} else {
					//si no es un regalo
					callback(false,
						{
							data: paymentData,
							backBtnText: this.isLink ? 'SEND_ANOTHER_PAYMENT' : 'RETURN_DASHBOARD',
							onBack:this.onBackSuccess
						});
					this.setState({
						isLoading: false,
					});
				}
			})
			.catch((error) => {
				const message = error.message || "";
				data.id = idevent_grupo;
				data.divisa = divisa;
				this.sendNotification(error, data);
				callback(true, { message });
			})
			.finally(() => {
				this.setState({ isLoading: false });
			});
	}

	onBackSuccess(){
		this.setState({movePage:true,isLoading: true},()=> this.setState({movePage:false,isLoading: false}));
	}
	render() {
		const {
			manual,
			billsList,
			serviceList,
			amount,
			divisa,
			isLoading,
			paymentLimit,
			isChangeAmount,
			display,
			isPay,
			paymentData,
			lastView,
			event,
			idevent_transaction_link,
			id_group,
			u,
			society,
			slcListCountry,
			movePage,
			isGiftCard,
			extraData,
			typeOfPayment,
			haveError,
		} = this.state;
		const data = { idevent_transaction_link, id_group, u, slcListCountry };

		if (movePage) {
			return <Redirect push to={{ pathname: lastView, state: data }} />;
        }
		return (
			<Page title={"Payment"} loading={isLoading}>
				<ErrorCatcher
					hasError={haveError}
					fallback={this.showErrorMessage()}>
					<section page="checkout">
						<div className="checkout-s">
							<Checkout
								address={billsList}
								countries={slcListCountry}
								manualAddress={manual}
								messageRequired={isGiftCard}
								onAddressSubmit={this.onAddressSubmit}
								onSubmit={this.onFinishBalance}
								// ! Deprecated params.
								isGiftCard={isGiftCard}
								isChangeAmount={isChangeAmount}
								paymentLimit={paymentLimit}
								society={society}
								amount={amount}
								currency={divisa}
								serviceList={serviceList}
								extraData={extraData}
								updateAmount={(amount) => {
									const serviceList = this.defaultList(amount);
									this.setState({ amount, serviceList });
								}}
								updatePaymentLimit={(paymentLimit) =>
									this.setState({
										paymentLimit,
									})
								}
								updateServiciesList={(serviceList, amount) => {
									this.setState({
										amount,
										serviceList,
									});
								}}
							/>
						</div>
					</section>
				</ErrorCatcher>
			</Page>
		);
	}
}

export default WithContext(GlobalPayment);
