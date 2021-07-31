/**
 * @class WeddingTemplate
 * @version 1.0.0
 * @author alanjimenez
 * @author Luis Huh <luisenriquehuhpuc@hotmail.com>
 * @summary Plantilla para el sitio
 */
import React from "react";
import Api from "@app/Api";
import Auth from "@app/Auth";
import images from "@app/image";
import { getParamFromProps } from "@app/Helpers";
import ResetScroll from "@app/ResetScroll";
import WithContext from "@app/ServiceContext";
import {
	CoverUploader,
	Footer,
	Cell,
	Grid,
	Card,
	Navbar,
	NavbarBottom,
	Sidebar,
	DateWidget,
	CountdownTimer,
	SectionGroup,
} from "@components";
import Loader from "@components/page/loader";

import WeddingsSlider from "../oldweddingcomponents/wellmakeyour";
import Template from "./Template";
import { CatalogProvider } from "./catalog/Context";
import {
	LoadBusiness,
	LoadElementsFromVirtualLocation,
} from "./catalog/DataSources";

class WeddingTemplate extends React.Component {
	constructor(props) {
		super(props);
		this.mainContainer = React.createRef();
		this.weddingTitleSmall = React.createRef();
		this.weddingTitleDesktop = React.createRef();
		this.handleOnUploadCover = this.handleOnUploadCover.bind(this);
	}

	state = {
		showChangeButtonCover: false,
		isLoading: false,
		showCounter: false,
		myCart: [],
		myWishList: [],
		weddingExtra: [],
		departments: [],
	};

	/**
	 * Lista de vistas donde no se mostrará la imagen de portada
	 */
	viewsExcluded = ["/checkout"];

	/**
	 * Vistas asociadas al modulo de profile
	 */
	profileViews = ["/profile", "/billing-address", "/reset-password"];

	/**
	 * Ajusta el Sidebar para que se adapte a la altura del título de la página (solo en desktop)
	 */
	alignSidebarWithTitle = (sidebarcontainer) => {
		if (this.weddingTitleDesktop) {
			let eltitle = this.weddingTitleDesktop.current;
			if (sidebarcontainer) {
				sidebarcontainer.style.marginTop = `${eltitle}.clientHeight}px`;
			}
		}
	};

	/**
	 * Valida si el usuario esta en una cierta vista
	 * @param {Array<string>} modules Url de las vistas
	 */
	isInModule(modules) {
		const { pathname } = getParamFromProps(
			this.props,
			"children",
			"props",
			"location"
		);
		return modules.includes(pathname);
	}

	/**
	 * Valida si se encuentra en el modulo de profile y setea un estado
	 */
	isProfileModule = () => {
		const isProfile = this.isInModule(this.profileViews);
		this.setState({ showChangeButtonCover: isProfile });
	};

	componentDidMount() {
		this.isProfileModule();
		this.loadDepartments();
		this.loadItems();
		setTimeout(() => {
			this.alignSidebarWithTitle();
		}, 1000);
	}

	componentWillUnmount(){
		this.showLoader(false);
	}

	/**
	 * Carga las unidades de negocios
	 */
	loadDepartments = () => {
		this.showLoader(true);
		LoadBusiness()
			.then((res) => {
				this.setState({ departments: res });
			})
			.catch((e) => {
				this.setState({ departments: [] });
			})
			.finally(() => {
				this.showLoader(false);
			});
	};

	/**
	 * Carga los elementos del carrito virtual
	 */
	loadItems = () => {
		this.showLoader(true);
		LoadElementsFromVirtualLocation()
			.then((res) => {
				this.setState({ ...res });
			})
			.catch((e) => {
				this.setState({
					myCart: [],
					myWishList: [],
					weddingExtra: [],
				});
			})
			.finally(() => {
				this.showLoader(false);
			});
	};

	/**
	 * Activa o desactiva el loader del template.
	 * @param {boolean} isLoading Estado.
	 */
	showLoader = (isLoading = false) => {
		document.body.style.overflow = isLoading ? "hidden" : "auto";

		this.setState({ isLoading });
	};

	handleOnUploadCover(err, res) {
		if (!err) {
			const data = res.data || {};
			// Widgets.Toast({ html: 'Image uploaded successfully :)' });
			sessionStorage.setItem("cover", data.path);
		} else {
			console.warn("error =>>>>>", res);
			//    Widgets.Toast({ html: 'Unable to upload image :(' });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.children !== this.props.children) {
			this.isProfileModule();
		}
	}

	/**
	 * Envía las propiedades personalizadas al elemento renderizado
	 */
	getNewProps = () => {
		let omitProps = ["app"];
		let newProps = {};
		Object.keys(this.props).forEach((value) => {
			if (omitProps.indexOf(value) === -1) {
				newProps[value] = this.props[value];
			}
			return newProps;
		});
	};

	render() {
		const { pagetitle, isLoading, showCounter } = this.props.app;
		const { isLoading: showLoader } = this.state;
		const info = Auth.userData();
		const cover = typeof info.cover == "string" ? info.cover.trim() : "";

		return (
			<CatalogProvider
				value={{ ...this.state, reloadItems: this.loadItems }}>
				<Template stylesheet="wedding-theme" {...this.getNewProps()}>
					<Navbar />
					{!!isLoading || showLoader ? <Loader /> : null}
					<CoverUploader
						cover={cover || images.banner}
						url={Api.uploadCover()}
						accept="image/jpeg"
						extraParams={[{ key: "id", value: sessionStorage.id }]}
						onFun={this.handleOnUploadCover}
						isShow={this.state.showChangeButtonCover}>
						{/* Sidebar */}
						<Grid className="full">
							<Grid type="x">
								<Cell className="hide-for-large show-for-small">
									<WeddingTitle
										className="header-movil back-name medium-auto"
										ref={this.weddingTitleSmall}>
										{" "}
										{pagetitle}{" "}
									</WeddingTitle>
								</Cell>
								{/* Título Pantallas Small */}
								<Sidebar />
								<div
									className="with-aside-container"
									ref={this.mainContainer}>
									<Card className="back-name hide-for-small-only show-for-large">
										<Grid type="x">
											<Cell medium="12" large={showCounter ?"8" : "12"}>
												{/* Título en modo desktop */}
												<WeddingTitle
													ref={this.weddingTitleDesktop}>
													{" "}
													{pagetitle}{" "}
												</WeddingTitle>
											</Cell>
											{showCounter ?
												<Cell medium="12" large="4">
													<SectionGroup className="countdown general-panel-large">
														<p className="title-2">
															<DateWidget value={info.wedding_date} />
														</p>
														<CountdownTimer
															message="Congratulations!!!"
															date={info.wedding_date}
														/>
													</SectionGroup>
												</Cell>
												:null
											}
										</Grid>
									</Card>
									<ResetScroll>{this.props.children}</ResetScroll>
								</div>
							</Grid>
							<Grid type="x">
								<WeddingsSlider />
							</Grid>
						</Grid>
					</CoverUploader>
					<Footer />

					{/*<Footermobile /> */}
					<NavbarBottom />
				</Template>
			</CatalogProvider>
		);
	}
}

export default WithContext(WeddingTemplate);

/**
 * Remplaza la coma por nada en un texto
 * @param {string} name Nombre
 */
const getNames = (name) =>
	name && typeof name.replace === "function" ? name.replace(/,/i, "") : "---";

/**
 * Agrega un titulo a la vista en el template
 * @param {Object} param0 Parametros
 */
const WeddingTitle = React.forwardRef((props, ref) => {
	let { bride, groom } = Auth.userData();
	return (
		<h3 ref={ref} className={"header text-center " + (props.className || "")}>
			{getNames(bride)} &amp; {getNames(groom)}
			<br />
			{props.children}
		</h3>
	);
});

export { WeddingTitle };
