import React, { useContext } from "react";
import {
	GradientNavbar,
	Grid,
	Cell,
	Title,
	BadgeSuper,
	LinkButton,
} from "@components";
import UseText from "@app/UseText";
import { Iconwedd } from "../../oldweddingcomponents";
import CatalogContext from "./Context";

export default function CatalogNavbar() {
	const { itemsInCart } = useContext(CatalogContext);
	return (
		<GradientNavbar>
			<div className="container">
				<Grid type="x">
					<Cell small="6" medium="6" large="6">
						<LinkButton to="/" className="clear">
							<Title className="information title title-3">
								<UseText i18n="BACK_BTN" />
								<Iconwedd icon="chevron-left" color="light-melon" />
							</Title>
						</LinkButton>
					</Cell>
					<Cell small="6" medium="6" large="6">
						<LinkButton to="/my-cart" className="clear cart">
							<div>
								<Title className="information title title-3">
									<UseText i18n="MY_CART" />
									<i className="prr pr-shopping-cart"></i>
									<BadgeSuper>{itemsInCart.total || 0}</BadgeSuper>
								</Title>
							</div>
						</LinkButton>
					</Cell>
				</Grid>
			</div>
		</GradientNavbar>
	);
}
