import React, { useContext } from "react";
import { ServiceContext } from "@app/ServiceContext";
import UseText from "@app/UseText";
import {
	CollapsibleDropIcon,
	Subtitle,
	Grid,
	Cell,
	SectionGroup,
	Checkbox,
	Button,
	Cover,
	DateWidget,
} from "@components";
import { getLang } from "@app/Helpers";

export default function ServiceColumn({
	service,
	quantity,
	price,
	total,
	paid,
	balance,
	cover,
	thumb,
	trigger,
	date,
	onAction,
}) {
	const context = useContext(ServiceContext);

	return (
		<Grid type="x" className="service-column">
			<Cell>
				<CollapsibleDropIcon onClick={trigger} />
				<Cover
					src={cover}
					thumbSrc={thumb}
					className="service-cover"
					onClick={trigger}
				/>
				<Grid type="x" onClick={trigger}>
					<Cell>
						<Subtitle size={2}>{service}</Subtitle>
					</Cell>
					<Cell>
						<UseText i18n="FROM" /> Delight,&nbsp;
						<span className="txt-added">
							<UseText i18n="ADDED" />
						</span>
						&nbsp;
						<DateWidget value={date} {...getLang(context.languageId)} />
					</Cell>
					<Cell small="6" className="columns">
						Quantity: {quantity}
					</Cell>
					<Cell small="6" className="columns">
						Price: {price}
					</Cell>
				</Grid>
			</Cell>
			<Cell className="columns">
				<SectionGroup>
					<span>Total</span>
					<span>{total}</span>
				</SectionGroup>
				<SectionGroup>
					<span>Paid</span>
					<span>{paid}</span>
				</SectionGroup>
				<SectionGroup>
					<span>Balance</span>
					<span>{balance}</span>
				</SectionGroup>
			</Cell>
		</Grid>
	);
}

ServiceColumn.defaultProps = {
	service: "Service name",
	quantity: 0,
	price: "0.00",
	total: "0.00",
	paid: "0.00",
	balance: "0.00",
	cover: null,
	thumb: null,
	trigger: () => {},
};
