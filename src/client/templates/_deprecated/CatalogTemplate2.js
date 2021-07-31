/**
 * @class CatalogTemplate
 * @version 2.0.0
 * @author mmendiola
 * @summary Template de catálogo, se adapta template.
 */
import UseText from '@app/UseText';
import { Cell, Grid, Image, Navbar, Title } from '@components';
import BadgeSuper from '@components/badge';
import React, { createContext } from 'react';

import GradientBar from '../../views/catalog/gradientbar';
import Api from '../../app/Api';
import ModalVideo from '../../oldweddingcomponents/modalvideo';
import WeddingsSlider from '../../oldweddingcomponents/wellmakeyour';
import { Iconwedd } from '../../oldweddingcomponents/wirefragment';
import Template from '../Template';
/* import CoverImage from '../components/catalogtemplate/cover'; */


/**
 * Inicializador de contexto
 * @property ServiceContext
 * @type React.Context
 */
const CatalogContext = createContext();

/**
 * Permite pasar parametros a través del contexto
 * @property CatalogProvider
 * @type React.Provider<any>
 */
const CatalogProvider = CatalogContext.Provider;

/**
 * Permite consumir los parametros enviados a través del contexto
 * @property CatalogConsumer
 * @type React.Consumer<any>
 */
const CatalogConsumer = CatalogContext.Consumer;

/**
 * Permite modificar un componente y anexarle los parametros enviados a través del contexto.
 * @param {React.Component} Component Componente a anexar los parametros enviados a través del contexto.
 * @returns { JSX.Element } NewComponent
 */
const WithCatalog = (Component) => {
	return function CatalogHoc(props) {
		return (
			<CatalogConsumer>
				{(value) => <Component {...props} catalogState={value} />}
			</CatalogConsumer>
		);
	};
};

class CatalogTemplate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			businessUnits: [],
			selectedUnit: null,

			unidades: [],
			data: {},
			cover: [],
			tabDataContent: {
				title: "",
				cover: ""
			},
			countInCart: 0,
			inCartArr: [],
			carArray: [],
			cast: 1,
			isShow: false
		};
	}

	componentDidMount() {
		this.getUnidadesNegocio();
		this.onCart();
		this.setState({ isShow: this.isViewCatalog() });
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.children !== this.props.children) {
			this.setState({ isShow: this.isViewCatalog() });
		}
	}

	isViewCatalog = () => {
		const catalogo = this.props.children.props.location.pathname;
		const viewdetail = catalogo.indexOf("viewdetailcatalog");
		const detail = viewdetail == 1 ? true : false;
		return detail;
	};

	actualizarCart(props) {
		this.setState({ countInCart: props })
	}

	getUrlParam(paramName) {
		let tmp = {};
		if ((tmp = this.props.children)) {
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

	getCurrentUnit(data) {
		const { service } = this.getUrlParam();
		return Array.isArray(data) ? data.find((item) => item.idCategory == service) : {};
	}

	getCoverDesk(unit = {}) {
		const { extra } = unit;
		try {
			const inf = JSON.parse(extra);
			return inf.portadadesk;
		} catch (e) {
			return {};
		}
	}

	getCoverMov(unit = {}) {
		const { extra } = unit;
		try {
			const inf = JSON.parse(extra);
			return inf.portadamov;
		} catch (e) {
			return {};
		}
	}

	getVideo(unit = {}) {
		const { extra = {} } = unit;
		try {
			const inf = JSON.parse(extra);
			return inf.video_comercial;
		} catch (e) {
			return {};
		}
	}

	getLogo(unit = {}) {
		const { extra } = unit;
		try {
			const inf = JSON.parse(extra);
			return inf.logo[0] || [];
		} catch (e) {
			return {};
		}
	}

	/**
	 * API que trae las unidades de negocio
	 */
	getUnidadesNegocio() {
		Api.getBusinessUnits()
			// Verificar que tenga información
			.then(response => {
				if (Object.keys(response).length > -1) {
					return Array.isArray(response.data) ? response.data : [];
				}
				return Promise.reject(response);
			})
			.then(data => {
				// Recorrer las categorías y convertir el campo extra en JSON
				for (const category in data) {
					if (data.hasOwnProperty(category)) {
						const catego = data[category];
						// Convertir el campo a JSON
						let { extra } = catego;
						if (catego.hasOwnProperty('extra')) {
							if (extra === '"{}"') {
								extra = {};
							} else {
								try {
									extra = JSON.parse(extra);
								} catch (error) {
									extra = {};
								}
							}
						}
						catego.extra = extra || {};
					}
				}
				return data;
			})
			.then(businessUnits => {
				// Guardamos las unidades de negocio y marcamos la seleccionada
				this.setState({
					businessUnits,
					selectedUnit: this.getUrlParam('service')
				})
			})
			// .then((apiresponse) => {
			// 	const data = this.getCurrentUnit(apiresponse);
			// 	const portadadesk = this.getCoverDesk(data);
			// 	const portadamov = this.getCoverMov(data);
			// 	const video = this.getVideo(data)
			// 	const logo = this.getLogo(data);
			// 	this.setState({
			// 		unidades: apiresponse,
			// 		data,
			// 		portadadesk,
			// 		portadamov,
			// 		video
			// 	});
			// 	if (data.nombre === data.description) {
			// 		this.setState(prevState => ({
			// 			tabDataContent: {
			// 				...prevState.tabDataContent,
			// 				title: `${data.nombre}`,
			// 				cover: logo
			// 			}
			// 		}));
			// 	} else {
			// 		this.setState(prevState => ({
			// 			tabDataContent: {
			// 				...prevState.tabDataContent,
			// 				title: `${data.nombre} ${data.description}`,
			// 				cover: logo
			// 			}
			// 		}));
			// 	}
			// })
			.catch((e) => console.error(e));
	}

	showModal() {
		this.setState({
			cast: this.state.cast == 1 ? 2 : 1
		})
	}

	onCart() {
		var carrito = [];
		Api.getShoppingCart(sessionStorage.id, sessionStorage.id_resort)
			.then((res) => {
				if (res.data.length > 0) {
					let datos = res.data;
					let sumresult = 0;
					for (const it of datos.filter(e => e.cantidad_pendiente != 0)) {
						sumresult += isNaN(it.cantidad) ? 0 : parseInt(it.cantidad);
					}
					this.setState({ countInCart: sumresult });
					this.setState({ carArray: res.data });
					let carritos = res.data.map((item, index) => {
						carrito.push(item.idservice_evento);
					}
					);
					this.setState({ inCartArr: carrito });
				} else {
					this.setState({ countInCart: 0 });
					this.setState({ inCartArr: [] });
				}
			})
			.catch((err) => {
				console.warn("error =>>>>>>>>>>", err);
			});
	}

	render() {
		const { children } = this.props;
		const { portadadesk, portadamov, video, data, carArray, inCartArr } = this.state;
		const actualizarCart = this.actualizarCart.bind(this);
		const { idservicio } = this.getUrlParam.bind(this);
		return (
			<Template stylesheet="wedding-theme">
				<Navbar />
				<section component="bannercatalog">
					<div className="desktop">
						<Image
							src={portadadesk}
							onClick={this.showModal.bind(this)}
						/>
					</div>
					<div className="movil">
						<Image
							src={portadamov}
							onClick={this.showModal.bind(this)}
						/>
					</div>
					{this.state.cast == 1 ? "" : <ModalVideo close={this.showModal.bind(this)}>
						<iframe src={video} width="100%" height="550px" style={{ border: "none" }}></iframe>
					</ModalVideo>}
				</section>
				{/* <CoverImage /> */}
				<section component="personalizeyourcatalog">
					{/* <Cell small="12" medium="12" large="12">
						<Titlesection
							key={"title"}
							title={<div><h3>{this.state.tabDataContent.title}</h3></div>}
						/>
						<Subtitle className="texto subtitle subtitle-2">Enjoy an unforgettable wedding cake experience at the most exclusive all-inclusive resorts in the Caribbean</Subtitle>
					</Cell> */}
					<Cell small="12" medium="12" large="12">
						<center className="covercatalog">
							<img src={this.state.tabDataContent.cover}></img>
						</center>
					</Cell>
					<GradientBar>
						<div className="container">
							<Grid type="x">
								<Cell small="6" medium="6" large="6">
									<a href="/">
										<Title className="information title title-3">
											<UseText i18n="BACK_BTN" />
											<Iconwedd icon={"chevron-left"} color={"light-melon"} />
										</Title>
									</a>
								</Cell>
								<Cell small="6" medium="6" large="6">
									<a href="/my-cart">
										<div>
											<Title className="information title title-3">
												<UseText i18n="MY_CART" />
												<i className="prr pr-shopping-cart"></i>
												<BadgeSuper>{this.state.countInCart}</BadgeSuper>
											</Title>
										</div>
									</a>
								</Cell>
							</Grid>
						</div>
					</GradientBar>
				</section>
				<Grid>
					<CatalogProvider value={{ unidad: data, carArray, inCartArr, actualizarCart }}>
						{children}
					</CatalogProvider>
				</Grid>
				<Grid type="x">
					{this.state.data.idCategory == 2 && this.state.isShow ?
						'' :
						<WeddingsSlider
							data={data.idCategory}
							idservicio={idservicio} />
					}
				</Grid>
			</Template>
		);
	}
}

CatalogTemplate.defaultProps = {};
export { WithCatalog };
export default CatalogTemplate;
