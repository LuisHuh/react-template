import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Routes from "@app/Routes";
import EventPage from "@components/page/EventPage";
import { getStateView, JsonConverter } from "@app/Helpers";
import UseText from "@app/UseText";
import Api from "@app/Api";
import {
	Grid,
	Cell,
	LinkButton,
	BannerCard,
	StatusPaymentbar,
} from "@components";
import BackgroundPrepayment from "@docs/img/experience-bg.jpg";
import Location from "./location";

export default class EventView extends Component {
	state = {
		data: {},
		locations: [],
		redirectToRefered: false,
		isOpen: false,
	};

	componentDidMount() {
		const data = getStateView(this.props);
		this.loadStateParams(data, () => {
			this.loadDataSource(data.idevent_evento);
		});
	}

	loadStateParams(data, callback) {
		if (!data) {
			return this.setState({
				redirectToRefered: true,
			});
		}

		this.setState(
			{
				data,
			},
			() => {
				callback();
			}
		);
	}

	loadDataSource(id) {
		Api.getLocationEvent(id)
			.then((res) => {
				res = res.data || [];
				this.setState({ locations: res });
			})
			.catch();
	}

	/**
	 * Funcion escucha de eventos de la fila de la tabla
	 * @param {Event} e Evento listener
	 * @param {Array} data Datos de la fila
	 */

	render() {
		const { redirectToRefered, data, locations, isOpen } = this.state;
		if (redirectToRefered) {
			return <Redirect to={Routes.myWedding.path} />;
		}
		const { total, balance, paid } = data.pago || {};
		const cover = data.cover || {};

		return (
			<EventPage
				pageName="events"
				backPage={Routes.myWedding.path}
				bannerImg={cover.img || BackgroundPrepayment}
				title={data.description}
				statusBar={{
					balance,
					paid,
					total,
				}}>
				{locations.map((event, key) => {
					const services = event.events_detalle || [];
					return (
						<Location
							key={key}
							title={event.descripcionevento}
							event={data.description}
							date={event.fecha_inicia_evento}
							data={services}
						/>
					);
				})}
			</EventPage>
		);
	}
}
