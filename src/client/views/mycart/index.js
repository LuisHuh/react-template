/**
 * @class MyCartView
 * @version 1.1.0
 * @author Andry Matos <amatos@palaceresorts.com>
 * @author Luis Huh <luisenriquehuhpuc@hotmail.com>
 * @summary Vista del carrito
 */

import React, { Component } from "react";
import WithContext from "@app/ServiceContext";
import { WithCatalog } from "@templates/catalog/Context";
import { Grid, Page } from "@components";

import Location from "./location";

export class MyCartView extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		/* this.reloadData(); */
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
		const { myCart } = catalogState || {};

		return (
			<Page title="MY_CART">
				<Grid type="x" page="my-cart">
					<Location data={myCart || []} />
				</Grid>
			</Page>
		);
	}
}

export default WithContext(WithCatalog(MyCartView));
