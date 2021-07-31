import React, { Component } from "react";
import Api from "@app/Api";
import Auth from "@app/Auth";
import Routes from "@app/Routes";
import EventPage from "@components/page/EventPage";
import BackgroundPrepayment from "@docs/img/experience-bg.jpg";
import EventManager from "./EventManager";

export default class PrepaymentView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			idevent_grupo: 0,
			paymetData: {
				positiveBalance: 0.0,
				idevent_grupo: 0,
			},
			total_pay: 0,
			_dataEventsAndLocations: [],
			lista_detalles_for_events: [],
			resetlist: false,
			//aux
			remain: 0.0,
			// lista a mostrar
			events: [],
			// loader
			isLoading: false,
		};

		this.reloadRemain = this.reloadRemain.bind(this);
		// refs
		this.rLocationEvent = {};
	}

	componentDidMount() {
		let { id } = Auth.userData();
		this.setState({ idevent_grupo: id });
		this.apiGetRemaining(id);
		// this.apiGetIdEventList(id);
		this.apiGeServicesByGroup(id);
		this.setState({ r: this.rLocationEvent });
	}

	componentDidUpdate(prevProps, prevState) {}

	//#region    ----------------------------------------------------------- // ! 'HELPER FUNCTIONS'

	/**
	 * Obtiene el saldo a favor por asignar
	 * @param {number} idevent_grupo
	 */
	apiGetRemaining(idevent_grupo, f = () => {}) {
		// TODO: borrar hardcode
		// let paymetData = { idevent_grupo, positiveBalance: 4000 };
		// return this.setState({ events: ['269', '234'], paymetData, remain: paymetData.positiveBalance });
		Api.getPositiveBalanceSA(idevent_grupo)
			.then((response) => {
				const positiveBalance = response.data["saldofavor"] || 0;
				this.setState(
					{
						paymetData: { idevent_grupo, positiveBalance },
						remain: positiveBalance,
					},
					() => f()
				);
			})
			.catch((e) => {
				// console.warn("erro =>>>", e);
			});
	}

	apiGeServicesByGroup(
		idevent_grupo,
		atSuccess = () => {},
		atError = (error) => {}
	) {
		const err = atError;
		Api.getServicesLocationEventByGroup(idevent_grupo)
			.then((r) => {
				r = r.data || [];
				r = r.filter((i) => i.description.trim().toLowerCase() != "cart");
				return this.setState({ events: r });
			})
			.catch(err)
			.finally(atSuccess);
	}

	/**
	 * Recargar monto 'REMAINING' y montos
	 */
	atPay() {
		const { id } = sessionStorage;
		this.apiGetRemaining(id, () => this.reloadRemain());
	}

	reloadRemain() {
		const { paymetData, r } = this.state;
		const { positiveBalance } = paymetData;
		let remain = positiveBalance;
		let totalToPay = 0;
		let update = { total_pay: totalToPay, remain, positiveBalance };
		if (r) {
			Object.keys(r).map((id) => {
				const item = r[id];
				const totalLocacion = item.getSubtotalLocation();
				const isOkLocacion = item.getStatusLocation();

				Object.keys(isOkLocacion).map((j) => {
					totalToPay += isOkLocacion[j] ? totalLocacion[j] : 0;
				});
			});

			remain -= totalToPay;
			update = { total_pay: totalToPay, remain, positiveBalance };
			this.setState({ ...update });
		}
		return update;
	}

	/**
	 * API para obtener todos los eventos del grupo
	 */
	apiGetIdEventList(id) {
		Api.getEventsGroup2(id)
			.then((r) => {
				r = r.data || [];
				// * Filtra los que no sean 'cart'
				r = r.filter((i) => i.description.trim().toLowerCase() != "cart");
				// * retorna lista con solo los idevent_evento
				r = r.map(({ idevent_evento, description }) => ({
					idevent_evento,
					description,
				}));

				return this.setState({ events: r });
			})
			.catch();
	}

	loadStateParams(data, callback) {
		if (!data) {
			return this.setState({ redirectToRefered: true });
		}
		this.setState({ data }, () => {
			callback();
		});
	}

	render() {
		const { isLoading, total_pay, paymetData, events, remain } = this.state;
		return (
			<EventPage
				pageName="prepayments"
				backPage={Routes.myWedding.path}
				bannerImg={BackgroundPrepayment}
				title={"UNALLOCATED_AMOUNT"}
				statusBar={{
					balance: false,
					paid: total_pay,
					total: paymetData.positiveBalance,
					i18nPaid: "ASSIGNED",
					i18nTotal: "REMAINING",
				}}>
				{events.map((data, i) => (
					<EventManager
						key={`e${i}`}
						remain={remain}
						data={data}
						onPayment={this.reloadRemain}
						onRef={(r) => (this.rLocationEvent[data.idevent_evento] = r)}
						onLoading={(isLoading) => {
							if (!isLoading) this.atPay();
							this.setState({ isLoading });
						}}
					/>
				))}
			</EventPage>
		);
	}
}

PrepaymentView.propTypes = {
	// extraClass: PropTypes.exact({ section: PropTypes.string }),
};
PrepaymentView.defaultProps = {
	// extraClass: { section: '' },
};
