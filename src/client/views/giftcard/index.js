import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Grid, Cell, Input, Panel, Checkbox, Toast } from "@components";
import { getToken, showValidateByName } from "../../app/Helpers";
import Api from "@app/Api";
import { getStateView, validateInput } from "@app/Helpers";
import image from "@app/image.js";
import WizardStep from "../../components/checkout/step/WizardStep";
import AmountSelector from "./amountSelector";
import UseText from "@app/UseText";
import WithContext from "@app/ServiceContext";

class GiftCard extends WizardStep {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			showErrorControls: true,
			errorMsg: "LINK_EXPIRED",
			data: {},
			amount: 0,
			idevent_transaction: 0,
			redirect: false,
			idevent_grupo: 0,
			userRequest: "",
			email: "",
			name: "",
			comments: "",
			disabled: true,
			// Campos del formulario
			fullname: "",
		};
		this.dataPrivaci1 = {
			1: "I have read and I agree the ",
			2: "He leído y acepto el ",
		};
		this.dataPrivaci2 = {
			1: "Privacy Notice",
			2: "Aviso de privacidad",
		};
		this.dataPrivaci3 = {
			1: " which has been made available to me.",
			2: " que ha sido puesto a mi disposición.",
		};

		this.ref = "/postlogin/terminos/" + this.props.match.params.society;
		this.next = this.next.bind(this);
	}

	componentDidMount() {
		// this.atStart();
	}

	atStart() {
		this.setState({ isLoading: true }, this.checkPropsHash());

		return;
	}

	checkPropsHash() {
		let lanId = this.props.app.languageId ? this.props.app.languageId : 1;
		const tmpState = getStateView(this.props);
		let tokenData = {};
		let message ="LINK_DEACTIVATED";
		let messageUser="MSG_LINK_DEACTIVATED";
		const hasIdLink =
			tmpState && tmpState.hasOwnProperty("idevent_transaction");

		if (hasIdLink) {
			const hasGroup = tmpState && tmpState.hasOwnProperty("idevent_grupo");
			const hasUser = tmpState && tmpState.hasOwnProperty("correo_familiar");
			const hasUserRequest =
				tmpState && tmpState.hasOwnProperty("userRequest");

			const idevent_transaction = hasIdLink
				? tmpState.idevent_transaction
				: "";
			const idevent_grupo = hasGroup ? tmpState.idevent_grupo : "";
			const userRequest = hasUserRequest ? tmpState.userRequest : "";

			this.setState({
				idevent_transaction,
				idevent_grupo,
				userRequest,
				email: tmpState.correo_familiar,
			});
		} else {
			Api.PaymentHashRequest({ body: getToken(this.props) })
				.then((res) => {
					Api.GetLink(res["data"]["idToken"])
						.then((response) => {
							this.setState({
								idevent_transaction: res["data"]["idToken"],
							});
							try {
								tokenData = JSON.parse(response["data"]["data"]);
							} catch (error) {}
							const { user: email, ...rest } = tokenData;
							let error = false;
							this.setState({
								email,
								...rest,
							});
							if (
								!response["data"]["status"] ||
								response["data"]["status"] == 0
							) {
								message ="LINK_DEACTIVATED";
								messageUser = "MSG_LINK_DEACTIVATED";
								error = true;
							}
							if (!tokenData) {
								message ="LINK_EXPIRED"
								messageUser = "MSG_LINK_EXPIRED";
								error = true;
							}
							if(error){
								let text= this.props.app.getText(message);
								this.setState({
									hasError: true,
									showErrorControls: false,
									errorMsg: messageUser,
								},()=>{this.sendNotification(text)});
							}
							else {
								this.next();
							}
						})
						.catch((e) => {
							console.warn("e =>>>>>", e);
							message ="LINK_EXPIRED";
							messageUser = "MSG_LINK_EXPIRED";
							let text= this.props.app.getText(message);
								this.setState({
									hasError: true,
									showErrorControls: false,
									errorMsg: messageUser,
								},()=>{this.sendNotification(text)});
						});
				})
				.catch((e) => {
					message = "MSG_LINK_ERROR";
					let text= this.props.app.getText(message);
					this.setState({
						hasError: true,
						showErrorControls: false,
						errorMsg: message,
					},()=>{this.sendNotification(text)});
				});
		}
	}

	//envio de notificaciones por link vencido o token expirado
	sendNotification(msg){
		let token = getToken(this.props);
		let dat = {
			msg:msg,
			errortoken:true,
			token:{token:token},
		}
		Api.sendNotificationPlanner(dat)
		.then((response) => {

		})
		.catch((response) => {
			console.warn("error send")
		})
	}

	next() {
		// if (this.state.amount <= 0) {
		// 	Toast({ html: "Required, an amount greater than zero" });
		// 	return;
		// }
		// if (this.state.name == "") {
		// 	showValidateByName("name", { error: true, message: "is required" });
		// 	return;
		// }
		let services = [];
		services.push({
			img: false,
			description: "Family Gift",
			amount: this.state.amount,
			currency: "USD",
			quantity: "1",
			u_price: this.state.amount,
			id: 0,
			idconcepto_ingreso: 0,
			isGiftCard:true,
			extra_info: {
				idevent_grupo: this.state.idevent_grupo,
				nombre_familiar: this.state.name,
				correo_familiar: this.state.email,
				comentario_familiar:
					this.state.comments != "" ? this.state.comments : " ",
				idevent_transaction: this.state.idevent_transaction,
				userRequest: this.state.userRequest,
			},
		});
		this.setState({ redirect: true, services: services });
	}

	/**
	 * Actualiza el monto de la GiftCard según el valor indicado
	 */
	updateSelectedAmount = (newValue) => {
		if (newValue != 0 || typeof newValue === "number" || !isNaN(newValue)) {
			// Si es un número lo quitamos de los campos obligatorios
			this.removeRequiredField("amount");
		} else {
			// Si no es numérico, lo agregamos como campo pendiente
			this.addRequiredField("amount");
		}
		this.setState({ amount: newValue });
	};

	render() {
		// const { redirect, hasError, paymentLimit } = this.state;
		// let lanId = this.props.app.languageId ? this.props.app.languageId : 1;
		const {location} = this.props || null
		const { hash } = location || "";
		return (
			<Redirect
				push
				to={{
					pathname: `/checkout`,
					state: {
						order: this.state.services,
						concepto: 2,
						society: this.props.match.params.society,
						hash: hash,
						isGiftCard: true,
						lastView: `/checkout`,
					}
				}}
			/>
		);
	}
}
export default WithContext(GiftCard);
