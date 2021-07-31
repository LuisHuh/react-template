/**
 * @view BasicDetailsView
 * @version 1.0.0
 * @author lhuh
 * @summary Vista de detalles básico para el servicio.
 */

import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ErrorCatching from "@app/Error";
import UseText from "@app/UseText";
import CatalogContext from "@templates/catalog/Context";
import { Grid, Cell, Image, Subtitle, Title, Button, Currency } from "@components";
import PanelDetail from "./PanelDetail";
import { SaveToCart, PaymentRequest } from "./DataSources";

/**
 * Regresa la llave de un valor de un objeto
 * @param {{}} values Objeto a recorrer
 * @param {string|number} predicate Valor a buscar
 */
function findInObject(values, predicate) {
	const tmp = Object.keys(values).find((k) => values[k] == predicate);
	if (tmp) {
		return tmp;
	}

	return null;
}

function BasicDetailsView({ location }) {
	const { itemsInCart, business, setToCart } = useContext(CatalogContext);
	const [isSaved, setSaved] = useState(false);
	const [redirectToView, setRedirect] = useState({
		redirect: false,
		pathname: "",
		state: {},
	});
	const [paymentData, setPayment] = useState({});
	const [
		{ from, thumb, src, logo, title, detail, price, id },
		setState,
	] = useState(location.state);

	const getIdConcept = () => {
		const products = itemsInCart.products || {};
		return findInObject(products, id);
	};

	const addToCart = () => {
		SaveToCart(business.idCategory, location.state)
			.then((res) => {
				/* setToCart(res.id); */
				setToCart(res.id, res.idservice_evento);
				setSaved(true);
				/* setPayment({id}) */
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const payNow = () => {
		const idService = getIdConcept();
		const request = PaymentRequest({ ...location.state, idService });
		setRedirect({
			redirect: true,
			pathname: "/checkout",
			state: { ...request },
		});
	};

	useEffect(() => {
		if (itemsInCart && itemsInCart.products) {
			const checked = getIdConcept();
			if (checked) {
				setSaved(true);
			}
		}
	}, [itemsInCart]);

	if (redirectToView.redirect) {
		const { redirect, ...params } = redirectToView;
		return <Redirect push={true} to={{ ...params }} />;
	}

	return (
		<section page="catalog-details">
			<PanelDetail to={from}>
				<Grid type="x">
					<Cell medium="6">
						<Image thumbSrc={thumb} src={src} />
					</Cell>
					<Cell medium="6">
						<Grid type="x">
							<Cell className="logo">
								<Image thumbSrc={logo} src={logo} />
							</Cell>
							<Cell>
								<h5>{title}</h5>
								<hr className="divider" />
							</Cell>
							<Cell>
								{detail.map(({ texto, tipo_servicio }, key) => {
									if (tipo_servicio == 2) {
										return (
											<Subtitle size={2} key={key}>
												{texto}
											</Subtitle>
										);
									}
								})}
							</Cell>
							<Cell>
								<Subtitle size={2} className="detail-price">
									<Currency isDefault={true} value={price || "0.00"} region='usa'/>
								</Subtitle>
							</Cell>
							<Cell>
								<Button
									className="action"
									onClick={!isSaved ? addToCart : payNow}>
									<UseText
										i18n={!isSaved ? "ADD_TO_CART" : "PAY_NOW"}
									/>
								</Button>
							</Cell>
						</Grid>
					</Cell>
				</Grid>
			</PanelDetail>
		</section>
	);
}

BasicDetailsView.defaultProps = {
	location: { state: {} },
};

function withCatching(props) {
	return (
		<ErrorCatching message="Unable to mount this component :(">
			<BasicDetailsView {...props} />
		</ErrorCatching>
	);
}

export default withCatching;
