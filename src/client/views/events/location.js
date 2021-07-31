import React, { useContext } from "react";

import { Cell, ServiceGrid, ServiceLocation } from "@components";
import CatalogContext from "@templates/catalog/Context";
import cols from "./DataSources";

function Location({ title, event, date, data }) {
	const { departments } = useContext(CatalogContext);
	const depts = departments || [];
	
	return (
		<Cell className="container">
			<ServiceLocation title={title} eventDate={date}>
				<ServiceGrid eventName={event} columns={cols} data={data} units={depts}/>
			</ServiceLocation>
		</Cell>
	);
}

export default Location;
