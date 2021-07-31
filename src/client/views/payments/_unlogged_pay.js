import React, { Component, Fragment } from "react";
import { getStateView , getToken} from "@app/Helpers";
import { Checkout, Page,Grid, Cell, Panel } from "@components";
import Api from "@app/Api";

import {
	getCountries,
	readHash,
	sendBalancePayments,
} from "./APIs";
import UseText from "@app/UseText";
import WithContext from "@app/ServiceContext";

class GlobalPayment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			billsList: null,
			serviceList: [],
			amount: 1,
			display: "checkout",
			isPay: false,
			paymentData: {
				ticket: "",
				authorization: "",
				amount_charged: "",
			},
			divisa: "USD",
			tipo_cambio: "0",
			idevent_transaction_link: "",
			id_group: "",
			u: null,
			s: null,
			isLoading: true,
			movePage: false,
			haveError:false,
			msg:"LINK_EXPIRED",
			extraData:{}
		};
	}

	componentDidMount() {
		this.atStart();
	}

	//#region    ----------------------------------------------------------- // ! 'helper functions'
	atStart() {
		this.setState({ isLoading: true }, this.checkPropsHash);
	}

	checkPropsHash() {
		const tmpState = getStateView(this.props);
		const hasIdLink =
			tmpState && tmpState.hasOwnProperty("idevent_transaction_link");

		const r_error = (e) => console.error(e);
		const r_success = (r) => this.setState({ ...r });
		if (hasIdLink) {
			const hasGroup = tmpState && tmpState.hasOwnProperty("id_group");
			const hasUser = tmpState && tmpState.hasOwnProperty("u");
			const hasSoc = tmpState && tmpState.hasOwnProperty("s");
			const hasCountries =
				tmpState && tmpState.hasOwnProperty("slcListCountry");

			const idevent_transaction_link = hasIdLink
				? tmpState.idevent_transaction_link
				: "";
			const id_group = hasGroup ? tmpState.id_group : "";
			const u = hasUser ? tmpState.u : "";
			const s = hasSoc ? tmpState.s : "";
			if (!hasCountries) getCountries("en", r_success, r_error);
			else this.setState({ slcListCountry: tmpState.slcListCountry });

			this.setState({ idevent_transaction_link, id_group, u, s });
			return this.setState({ isLoading: false });
		} else
			readHash(
				this.props,
				(hash, link,msg,msgUser) => {
					if (link.error){
						this.sendNotification(msg);
						let text= this.props.app.getText(msgUser);
						return this.setState({ isLoading: false,haveError: true,msg:text });
					};
					getCountries("en", r_success, r_error);
					const serviceList = this.defaultList(1);
					const { idevent_transaction_link, id_group, data } = link.data;
					const _data = JSON.parse(data);
					const { userRequest, sociedad, paymentLimit, ...rest } = _data;
					const {notificacion_data} = _data;
					let extraData = {}
					Api.getGroupDetail(id_group).then((response) => {
						let {folio,hotel,sociedad} = response.data[0];
						 extraData = {
							folio:folio,
							hotel:hotel,
							sociedad:sociedad
						}
						this.setState({extraData:extraData});
					})
					.catch((e) => {
						console.warn("error send");
					})
					this.setState({
						serviceList,
						idevent_transaction_link,
						id_group,
						paymentLimit,
						u: userRequest,
						s: sociedad,
						...rest,
					});
					return this.setState({ isLoading: false });
				},
				(e) => {
					console.error(e);
				}
			);
	}

	sendNotification(msg){
		let text= this.props.app.getText(msg);
		let token = getToken(this.props);
		let dat = {
			msg:text,
			errortoken:true,
			token:{token:token},
		}
		Api.sendNotificationPlanner(dat)
		.then((response) => {
		})
		.catch((response) => {
			console.warn("error send");
		})
	}

	defaultList(amount = "0") {
		const display = {
			amount,
			currency: "USD",
			description: "Add Balance",
			img: false,
		};
		const informative = { quantity: 0, u_price: "0", id: 0 };
		const serviceList = [{ ...display, ...informative }];
		return serviceList;
	}

	render() {
		const {
			billsList,
			serviceList,
			amount,
			divisa,
			isLoading,
			paymentLimit,
		} = this.state;
		const {
			idevent_transaction_link,
			id_group,
			u,
			slcListCountry,
			movePage,
		} = this.state;
		const data = { idevent_transaction_link, id_group, u, slcListCountry };
		const { display, isPay, paymentData } = this.state;
		const { ticket, authorization, amount_charged } = paymentData;

		const { SuccessPayment, ErrorPayment } = Checkout;
		return (
			<Page title={"Payment"} loading={isLoading}>
				{
					(this.state.haveError) ?
						<Grid type='x' className='grid-margin-x'>
                    <Cell medium='1' large='1'></Cell>
                    <Cell small='12' medium='10' large='10'>
                        <Panel style={{ marginTop: '10%' }}>
                            <Grid type='x'>
                                <Cell small='12' medium='12' large='12'>
                                    <center>
                                        <i className='prs pr-alert pr-7x' style={{ color: '#bf914d ' }}></i>
                                    </center>
                                </Cell>
                                <br></br>
                                <Cell small='12' medium='12' large='12'>
                                    <center>
									<UseText i18n={this.state.msg} />
                                    </center>
                                </Cell>
                            </Grid>
                        </Panel>
                    </Cell>
                    <Cell medium='1' large='1'></Cell>
                </Grid>
				: <section page="checkout">
					<div
						style={{ display: display == "checkout" ? "block" : "none" }}>
						{!isPay ? ( // reload checkout
							<Checkout
								id_group = {this.state.id_group}
								billsList={billsList} // list
								amount={amount} // number
								paymentLimit={paymentLimit}
								currency={divisa} // number
								serviceList={serviceList} // list
								summary_desc={""}
								isLogged={false}
								isChangeAmount={true}
								extraData={this.state.extraData}
								updateAmount={(amount) =>
									this.setState({
										amount,
										serviceList: this.defaultList(amount),
									})
								}
								onFinish={(checkout) => {
									// console.log(checkout);
									this.setState({ isLoading: true }, () =>
										sendBalancePayments(
											this.state,

											checkout,
											(r) =>
												this.setState(
													{ ...r, isPay: false },
													() => {
														// reload checkout if pay is successful
														if (r.isPay)
															this.setState({ isPay: true });
													}
												),

											(error) => {}
										)
									);
								}}
								slcListCountry={slcListCountry}
							/>
						) : (
							<Fragment />
						)}
					</div>
					<div
						className="checkout-s"
						style={{ display: display == "checkout" ? "none" : "block" }}>
						{isPay ? (
							<SuccessPayment
								ticket={ticket}
								authNum={authorization}
								amount={amount_charged}
								className={""}
								i18nBack={"SEND_ANOTHER_PAYMENT"}
								redirect={{
									path: "/payments",
									data: data,
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
				}
			</Page>
		);
	}
}
export default WithContext(GlobalPayment);
