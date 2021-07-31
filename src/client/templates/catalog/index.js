/**
 * @class CatalogTemplate
 * @version 3.0.0
 * @author mmendiola, alanjimenez, lhuh
 * @summary Plantilla para las vistas que utilizan el carrito de compras
 */

import React from "react";
import ResetScroll from "@app/ResetScroll";
import Template from "@templates/Template";
import { Navbar, Footer, NavbarBottom, Page } from "@components";
import { LoadCurrentBusiness, LoadTotalItems } from "./DataSources";
import { CatalogProvider } from "./Context";
import GradientNavbar from "./Navbar";
import Banner from "./CatalogBanner";

/**
 * Obtiene el parametro que la vista recibe por URL
 * @param {React.Component} props Props del componente hijo
 * @param {string|Number} paramName Nombre del parametro de la vista
 */
function getUrlParam(props, paramName) {
	let tmp = {};
	if ((tmp = props.children)) {
		if ((tmp = tmp.props)) {
			if ((tmp = tmp.match)) {
				if ((tmp = tmp.params)) {
					if (paramName && tmp.hasOwnProperty(paramName)) {
						return tmp[paramName] || undefined;
					}
					return tmp;
				}
			}
		}
	}
	return {};
}

/**
 * Obtiene la url de la imagen
 * @param {{}} value Valores del campo extra
 */
function getURLBanner(value) {
	const defaulImage =
		"https://s3.amazonaws.com/webfiles_palace/clever/events/assets/e41af3c5-d06a-1d1c-95ea-d0374873b730-wedding-cover";
	let srcDesktop = "";
	let srcMobile = "";
	let srcVideo = "";
	if (value && (srcDesktop = value.banner)) {
		srcMobile = srcDesktop[1];
		srcDesktop = srcDesktop[0];
		srcVideo = value.video_comercial;
		if (!(srcDesktop = srcDesktop[0])) {
			srcDesktop = defaulImage;
		}
		if (!(srcMobile = srcMobile[0])) {
			srcMobile = defaulImage;
		}
	}

	return {
		srcDesktop,
		srcMobile,
		srcVideo,
	};
}

/**
 * Plantilla del catalogo
 */
class CatalogTemplate extends React.Component {
	constructor(props) {
		super(props);
	}

	_isMounted = false;

	state = {
		business: {},
		itemsInCart: {
			total: 0,
			products: {},
		},
		isloading: true
	};

	/**
	 * Actualiza los estados
	 * @param {string} key Estado a actualizar
	 * @param {string|number|Array|{}} value Valor del estado
	 */
	setState(key, value) {
		const prevState = { ...this.state };
		prevState[key] = value;
		super.setState({ ...prevState });
	}

	setToCart = (idConcepto, idService) => {
		let { products, total } = { ...this.state.itemsInCart }
		products[idConcepto] = idService;
		total += 1;

		this.setState("itemsInCart", { products, total });
	}

	componentDidMount() {
		this._isMounted = true;
		this.loadData();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			getUrlParam(prevProps, "service") != getUrlParam(this.props, "service")
		) {
			this.loadData();
		}
	}

	loadData() {
		const idCategory = getUrlParam(this.props, "service");
		Promise.all([
			LoadCurrentBusiness(idCategory),
			LoadTotalItems()
		])
			.then((result) => {
				let currentBusiness = result[0];
				let totalItems = result[1];

				if (this._isMounted) {
					this.setState("business", currentBusiness);
					this.setState("itemsInCart", totalItems);
				}
			})
			.finally(() => {
				this.setState("isloading", false);
			})

		// const idCategory = getUrlParam(this.props, "service");
		// LoadCurrentBusiness(idCategory).then((res) => {
		// 	if (this._isMounted) this.setState("business", res);
		// });
		// LoadTotalItems().then((res) => {
		// 	console.log('res', res);
		// 	if (this._isMounted) {
		// 		this.setState("itemsInCart", res);
		// 		this.setState("isloading", false);
		// 	};
		// });
	}

	render() {
		const { business, isloading } = this.state;
		const { children } = this.props;
		const banners = getURLBanner(business.extra);

		return (
			<CatalogProvider value={{ ...this.state, setToCart: this.setToCart }}>
				<Template stylesheet="wedding-theme" theme="catalog-theme">
					<Page loading={isloading}>
						<Navbar />
						<Banner {...banners} />
						<GradientNavbar />
						<ResetScroll>{children}</ResetScroll>
						<Footer />
						<NavbarBottom />
					</Page>
				</Template>
			</CatalogProvider>
		);
	}
}

CatalogTemplate.defaultProps = {};

export default CatalogTemplate;
