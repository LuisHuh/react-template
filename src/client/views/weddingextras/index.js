/**
 * @class WeddingExtrasView
 * @version 1.1.0
 * @author Avnel Santos <avsantos@palaceresorts.com>
 * @author Luis Huh <luisenriquehuhpuc@hotmail.com>
 * @summary Vista de Wedding Extra
 */

import React, { Component } from "react";
import { WithCatalog } from "@templates/catalog/Context";
import { CollapsibleTable as Table, Grid, Page } from "@components";

import CollapsedContent from "./CollapsedContent";
import columns from "./DataSources";

class WeddingExtrasView extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		/* this.reloadData(); */
		// this.setState({ isloading: false });
	}

	reloadData() {
		let { catalogState } = this.props;
		const { reloadItems } = catalogState || {};
		if (typeof reloadItems === "function") {
			reloadItems();
		}
	}

	render() {
		let { catalogState } = this.props;
		const { weddingExtra } = catalogState || {};

		return (
			<Page title="WEDDING_EXTRAS">
				<Grid type="x" page="wedding-extra">
					<Table
						showToolbar={false}
						columns={columns}
						data={weddingExtra || []}
						options={{ sorting: false }}
						className="table-services">
						{(index, open, data) => (
							<CollapsedContent data={data} isOpen={open} />
						)}
					</Table>
				</Grid>
			</Page>
		);
	}
}

export default WithCatalog(WeddingExtrasView);
