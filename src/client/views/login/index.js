import Api from "@app/Api";
import Auth from "@app/Auth";
import { getToken } from "@app/Helpers";
import UseText from "@app/UseText";
import { Cell, Checkbox, Grid, Page, Toast } from "@components";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CustomTextField from "../../components/CustomTextField";
import { updateLink } from "@views/payments/APIs";

export default class LoginView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			remember: true,
			email: "",
			password: "",
			emailMsgInvalid: "",
			passwordMsgInvalid: "",
			loading: false,
			redirectToReferrer: false,
			hasError: false,
			hidden: true,
			needTerminos: false,
			focusEmailInput: false,
			errContract: false,
		};
	}

	componentDidMount() {
		if (this.props.location) {
			if (this.props) {
				let { state } = this.props.location;
				if (state) {
					let { emailFromChangePsw } = state || {};
					this.handleOnChange(null, {
						name: "email",
						value: emailFromChangePsw || "",
						focusEmailInput: true,
					});
				}
			}
		}
		if (Auth.isAuthenticated()) {
			this.setState({ redirectToReferrer: true });
		} else {
			const token = getToken(this.props);
			if (!token) return null;

			Api.LoginHashRequest(token)
				.then((res) => {
					res = res.data || {};
					const { username, password, idtoken } = res;
					if (username && password) {
						this.doLogin(res.username, res.password, true);
						sessionStorage.setItem("systemUser", res.systemUser);
						updateLink(idtoken);
					}
				})
				.catch((err) => {
					console.error(err);
					Toast({ html: err.message });
					this.setState({ hasError: true });
				});
		}
	}

	handleOnChange = (e, input) => {
		if (input) {
			this.setState({ [input.name]: input.value });
		}
	};

	doLogin(email, password, loginPlanner) {
		if (!this.isValidEmail(email)) {
			this.handleErrorField("email", "ENTER_VALID_EMAIL");
			return false;
		}

		this.setState({ loading: true });
		const authorization = `Basic ${btoa(`${email}:${password}`)}`;
		Api.AuthRequest(null, { authorization })
			.then((res) => {
				Auth.authenticate(res.data, () => {
					if (!res.error) {
						if (!loginPlanner) {
							this.getDataCheckIn(res.data);
						} else {
							const session = window.sessionStorage;
							// para uso de la planer se setea datos default
							session.setItem("iddef_sap_sociedad", 1);
							session.setItem("need_acept_termino", false);
							this.setState(() => ({
								redirectToReferrer: true,
								loading: false,
								needTerminos: false,
								errContract: false,
							}));
						}
					}
				});
			})
			.catch((err) => {
				if (err.status == 400) {
					for (let i = 0; i < err.data.length; i++) {
						const element = err.data[i];
						this.handleErrorField(element.field, element.message);
					}
				} else {
					this.handleErrorField("email", err.message);
				}
				this.setState({ loading: false });
			});
	}

	handleOnSubmit = (e) => {
		e.preventDefault();
		const { email, password } = Object.assign({}, this.state);
		this.doLogin(email, password, false);
	};

	/**
	 *verifica si ya se ha aceptado los terminos y condiciones
	 *
	 * @param {*} info
	 * @memberof LoginView
	 */
	getDataCheckIn(info) {
		let today = this.getCurrentDate(new Date(), false);
		let dayarriv = this.getCurrentDate(info.date_start, false);

		let data = {
			blockid: info.id_opera,
			idevent_grupo: info.id,
			currentidsap: today >= dayarriv,
		};
		const session = window.sessionStorage;
		Api.getDataCheckIn(Auth.getAuthorizationHeader(), data)
			.then((res) => {
				if (!res.error) {
					session.setItem(
						"iddef_sap_sociedad",
						res.data.postDataResp.iddef_sap_sociedad
					);
					let term = res.data.postDataResp.acepta_termino == "0";
					session.setItem("need_acept_termino", term);
					this.setState(() => ({
						redirectToReferrer: true,
						loading: false,
						needTerminos: term,
						errContract: false,
					}));
				} else {
					this.setState({ loading: false, errContract: true });
					return Auth.signout(() => {
						console.error("Internal server error in datacheckin");
					});
				}
			})
			.catch((err) => {
				this.setState({ loading: false, errContract: true });
				return Auth.signout(() => {
					console.error("Internal server error in datacheckin");
				});
			});
	}

	handleErrorField = (name, value) => {
		this.setState({
			[name + "MsgInvalid"]: value,
		});
	};

	isValidEmail(value) {
		const regex = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
		return regex.test(value);
	}

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.name === "remember" ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	};

	toggleShow = () => {
		this.setState({ hidden: !this.state.hidden });
	};

	/**
	 * formatea una fecha
	 *
	 * @param {*} current
	 * @param {boolean} [useTime=false]
	 * @returns
	 * @memberof TerminosView
	 */
	getCurrentDate(current, useTime = false) {
		var hoy = current !== undefined ? new Date(current) : new Date();
		var dd = hoy.getDate();
		var mm = hoy.getMonth() + 1; //hoy es 0!
		var yyyy = hoy.getFullYear();

		dd = dd < 10 ? "0" + dd : dd;
		mm = mm < 10 ? "0" + mm : mm;

		let date = yyyy + "-" + mm + "-" + dd;

		if (useTime) {
			let hour = hoy.getHours();
			let minute = hoy.getMinutes();
			let second = hoy.getSeconds();
			hour = hour.length == 1 ? "0" + hour : hour;
			minute = minute.length == 1 ? "0" + minute : minute;
			second = second.length == 1 ? "0" + second : second;
			date += " " + hour + ":" + minute + ":" + second;
		}

		return date;
	}

	/**
	 * Iniciar sesión usando email y password al presionar 'enter'
	 */
	submitUsingEnter = (e) => {
		if (e.keyCode === 13) {
			this.handleOnSubmit(e);
		}
	};

	/**
	 * Regresa la URL, la cual, el usuario quiso acceder.
	 * @returns {{pathname: string, state: {}}} URL.
	 */
	getLastPage() {
		const { location } = this.props;
		const { state } = location || {};
		const { from } = state || {};
		if (from instanceof Object) {
			if (from.hasOwnProperty("pathname")) {
				return from;
			}
		}

		return { pathname: "/" };
	}

	render() {
		const {
			email,
			password,
			focusEmailInput,
			emailMsgInvalid,
			loading,
			redirectToReferrer,
			errContract,
			needTerminos,
			remember,
		} = this.state;

		const from = this.getLastPage();
		if (needTerminos) {
			from.pathname = "/terminos/0";
		}

		if (redirectToReferrer === true) {
			return <Redirect to={from} />;
		}

		return (
			<Page loading={loading}>
				<Grid type="x">
					<Cell
						medium="6"
						large="4"
						small="10"
						className="login-view small-offset-1 large-offset-4 medium-offset-3">
						<Grid type="y">
							<Cell>
								<span className="welcome-title-black">
									<UseText i18n="WELCOME" />
								</span>
								<br />
								<span className="subtitle welcome-text-pink">
									<UseText i18n="LOGIN_TEXT" upperCase={true} />
								</span>
							</Cell>
							<Cell className="form">
								<Grid type="y" className="bg-curtains">
									<CustomTextField
										i18n="USERNAME"
										value={email}
										activeLabel={true}
										isFocused={focusEmailInput}
										name="email"
										onChange={this.handleOnChange}
										onKeyUp={this.submitUsingEnter}
										cellClass="username"></CustomTextField>
									<CustomTextField
										i18n="PASSWORD"
										activeLabel={true}
										value={password}
										name="password"
										onChange={this.handleOnChange}
										onKeyUp={this.submitUsingEnter}
										cellClass="password"
										type="password"
										togglepassword
									/>
									<span
										className="message-validation"
										style={{
											display: emailMsgInvalid ? "" : "none",
											color: "darkred",
										}}>
										<UseText i18n={emailMsgInvalid} />
									</span>
									<span
										className="message-validation"
										style={{
											display: errContract ? "" : "none",
											color: "darkred",
										}}>
										<UseText i18n={"CONTACT_WEDDINGPLANNER"} />
									</span>
									<Cell
										className="input-group remember"
										small="12"
										medium="6">
										<Checkbox
											label={<UseText i18n="REMEMBER_ME" />}
											onChange={this.handleInputChange}
											name="remember"
											className="filled-in"
											checked={remember}
										/>
									</Cell>
									<Cell className="input-group" small="12" medium="6">
										<button
											className="sign"
											onClick={this.handleOnSubmit}>
											<UseText i18n="SIGN_IN" />
										</button>
									</Cell>
									<Cell small="12">
										<Link to="/forgotpassword">
											<UseText i18n="FORGOT_PASSWORD" />
											<span className="forgot-password-label pink-text-link">
												{" "}
												<UseText i18n="CLICK_HERE" />
											</span>
										</Link>
									</Cell>
								</Grid>
							</Cell>
						</Grid>
					</Cell>
				</Grid>
			</Page>
		);
	}
}
