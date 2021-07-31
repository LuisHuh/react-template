import { Grid, Page } from "@components";
import React, { Component } from "react";

import EventsSection from "./Events";
import GeneralInfo from "./GeneralInfo";
import StatusPayment from "./StatusPayment";

export default class MyWeddingView extends Component {
	render() {
		return (
			<Page title="MARRIED" showCounter={true}>
				<Grid page="my-wedding">
					<GeneralInfo />
					<StatusPayment />
					<EventsSection />
				</Grid>
			</Page>
		);
	}
}
