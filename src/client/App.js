/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @description App.js - Contiene la estructura para cargar las rutas y las vistas.
 */
import React from "react";
import { Redirect, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ROOT_FOLDER } from "@config/global";

import Route, { PrivateRoute, ErrorRoute } from "@app/CustomRoutes";
import { ServiceProvider } from "@app/ServiceContext";
import CustomHistory from "@app/History";
import * as Templates from "@templates";
import * as Views from "@views";

const RoutePage = (path, component, template, isPrivate) => {
	const Ruta = isPrivate ? PrivateRoute : Route;
	return (
		<Ruta
			path={path}
			exact={true}
			component={Views[component]}
			layout={Templates[template]}
		/>
	);
};
// Ruta con plantilla de Wedding
const RouteWedding = (path, component, isPrivate = true) =>
	RoutePage(path, component, "WeddingTemplate", isPrivate);
// Ruta con plantilla Login
const PublicRoute = (path, component) =>
	RoutePage(path, component, "PublicTemplate", false);
// Ruta con plantilla Catálogo
const RouteCatalog = (path, component) =>
	RoutePage(path, component, "CatalogTemplate", true);

class App extends React.Component {
	constructor(props) {
		super(props);
		// Obtener el último idioma utilizado
		let lastUsedLanguageid = parseInt(sessionStorage.getItem('langWeddings'));
		// Cargar traducciones por defecto
		let defaultLang = isNaN(lastUsedLanguageid) ? 1 : lastUsedLanguageid;

		this.state = {
			// Traducciones mediante directivas
			setTranslations: (languageId, translations) => {
				let languageCode = this.getLanguageCode(languageId);
				return typeof translations !== "object" ? null :
					this.setState({ translations, languageId, languageCode })
			},
			getText: (directive) => {
				let thestring = `{{'${directive}'}}`;
				let thetranslation = this.state.translations[thestring];
				return thetranslation || directive;
			},
			languageId: defaultLang,
			languageCode: this.getLanguageCode(defaultLang),
			setLanguage: (id) => this.setState({ languageId: id }),
			translations: {},

			// Título de la página actual
			pagetitle: "",
			setTitle: (pagetitle) => {
				document.title =
					"Palace Weddings" + (pagetitle ? " | " + pagetitle : "");
				if (pagetitle != this.state.pagetitle) {
					this.setState({ pagetitle });
				}
			},
			showCounter: false,
			setCounter: (showCounter) => {
				if (showCounter != this.state.showCounter) {
					this.setState({ showCounter });
				}
			},
		};
	}

	getLanguageCode = (languageCode) => {
		switch (languageCode) {
			case 2: return 'es';
			default: return 'en';
		}
	}

	render() {
		return (
			<ServiceProvider value={this.state}>
				<BrowserRouter history={CustomHistory} basename={ROOT_FOLDER}>
					<Switch>
						{/* URLs disponibles en el sitio */}
						<Redirect from="/" exact to="/my-wedding" />
						<Redirect from="/catalog" exact to="/my-wedding" />

						{/* RUTAS PRIVADAS */}
						{RouteWedding("/my-wedding", "MyWedding")}
						{RouteWedding("/rooming-list", "RoomingList")}
						{RouteWedding("/detail-sheet", "DetailSheet")}
						{RouteWedding("/family-gift", "FamilyGift")}
						{RouteWedding("/my-cart", "MyCart")}
						{RouteWedding("/my-wishlist", "MyWishList")}
						{RouteWedding("/profile", "GeneralInformation")}
						{RouteWedding("/wedding-extras", "WeddingExtras")}
						{RouteWedding("/reset-password", "ChangePassword")}
						{RouteWedding("/billing-address", "BillingAddress")}
						{RouteWedding("/events/:tagname", "EventView", false)}
						{RouteWedding("/prepayments", "Prepayments")}
						{RoutePage("/todolist", "TodoList", "TodoListTemplate", false)}
						{PublicRoute("/terminos/:inSystem([0-9]+)", "TerminosView")}

						{/* {RouteCatalog("/catalog/:service([0-9]+)", "CatalogView")}
						{RouteCatalog(
							"/catalog/:service([0-9]+)/details",
							"BasicDetailsView"
						)}
						{RouteCatalog(
							"/catalog/:service([0-9]+)/package-details",
							"AdvancedDetailsView"
						)} */}

						{/* Checkout - unlogged */}
						{PublicRoute("/gift-card/:society([0-9]+)", "GiftCard")}
						{PublicRoute("/checkout", "Payments")}
						{PublicRoute("/payments", "Payments")}
						{/* {PublicRoute("/my-gift", "SendGiftCard")} */}
						{/* {PublicRoute("/payments", "GlobalPayment")} */}

						{PublicRoute("/login", "Login")}
						{PublicRoute("/forgotpassword", "RecoverPassword")}
						{PublicRoute("/change-password", "ResetPassword")}
						{PublicRoute("/signup", "Signup")}
						{PublicRoute("/logout", "Logout")}
						{PublicRoute("/form-preview", "FormPreview")}
						{PublicRoute("/checkout-preview", "CheckoutPreview")}

						<ErrorRoute
							path="/*"
							component={Views["e400"]}
							privateLayout={Templates["WeddingTemplate"]}
							publicLayout={Templates["PublicTemplate"]}
						/>
					</Switch>
				</BrowserRouter>
			</ServiceProvider>
		);
	}
}

export default App;
