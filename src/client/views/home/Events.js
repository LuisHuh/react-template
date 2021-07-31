import React, { useContext } from "react";
import { formatNumber, isObjectEmpty, formatter } from "@app/Helpers";
import { ServiceContext } from "@app/ServiceContext";
import UseText from "@app/UseText";
import {
	Button,
	Cell,
	CircularProgressbar,
	Currency,
	Grid,
	MenuCard,
	SectionGroup,
	Subtitle,
	Tag,
} from "@components";
import BackgroundPrepayment from "@docs/img/experience-bg.jpg";
import { useEvent, usePositiveBalance } from "./DataSources";

/**
 * Convierte un texto a mayusculas
 * @param {string} value Texto a transformar
 */
function transformText(value) {
	if (typeof value === "string") {
		value = value.trim();
		value = value.toLowerCase();
		return value;
	}

	return "---";
}

/**
 * Regresa el porcentaje a partir del total y lo pagado.
 * @param {number} total Cantidad total.
 * @param {number} paid Cantidad pagada.
 * @returns {number} percent.
 */
function getPercent(total, paid) {
	return formatNumber((paid * 100) / total, 0);
}

/**
 * Genera la URL y los datos a enviar a la vista de servicios.
 * @param {{}} data Datos para la vista.
 */
function linkData(data) {
	if (data == "prepayments") {
		return {
			pathname: `/prepayments`,
			state: data,
		};
	} else {
		return {
			pathname: `/events/${formatter.toTextTag(data.description || "")}`,
			state: data,
		};
	}
}

/**
 * Genera la gráfica del menu.
 * @param {Object} param0 Props del componente.
 * @param {{}} param0.data Datos de la gráfica.
 */
function ChartSection({ data }) {
	if (isObjectEmpty(data)) {
		return null;
	}

	let { percent, paid, balance, total } = data;
	percent = getPercent(total, paid);
	percent = total == paid ? 100 : percent;

	return (
		<SectionGroup className="subcontent">
			<CircularProgressbar value={percent}>
				<span className="percent-values">
					<span className="value">{percent}</span>
					<span>%</span>
				</span>
				<span className="paid-label">
					<UseText i18n="PAID" />
				</span>
				<Currency className="currency" value={paid} isDefault={true} />
			</CircularProgressbar>
			<Subtitle size={2}>
				<UseText i18n="BALANCE" />
				:&nbsp;
				<Currency value={balance} isDefault={true} />
			</Subtitle>
		</SectionGroup>
	);
}

/**
 * Componente.
 */
function Events() {
	const context = useContext(ServiceContext);
	const [events, eventReloadData] = useEvent();
	const [positiveBalance, positiveReloadData] = usePositiveBalance();

	return (
		<section name="wedding-events">
			<Grid type="x">
				<Cell small="12" large="12" className="card-row">
					<MenuCard
						className="unassigned-prepayment"
						srcImg={BackgroundPrepayment}
						to={linkData("prepayments")}>
						<Tag>{transformText(context.getText("UNASSIGNED"))}</Tag>
						<SectionGroup className="subcontent">
							<Currency size={3} value={positiveBalance} />
							<Button>
								<UseText i18n="ASSIGN" />
							</Button>
						</SectionGroup>
					</MenuCard>
				</Cell>
				{events.map(({ cover, pago, isDisabled, ...data }, key) => {
					return (
						<Cell small="12" medium="6" large="6" key={key} className="card-row">
							<MenuCard
								srcImg={cover.img || BackgroundPrepayment}
								disabled={isDisabled}
								to={linkData({ ...data, cover, pago })}>
								<Tag>{transformText(data.description)}</Tag>
								<ChartSection data={pago} />
							</MenuCard>
						</Cell>
					);
				})}
			</Grid>
		</section>
	);
}

export default Events;
