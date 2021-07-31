/**
 * @view BasicDetailsView
 * @version 1.0.0
 * @author lhuh
 * @summary Vista de detalles avanzado para el servicio.
 */

import React, { useState, useContext, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import ErrorCatching from "@app/Error";
import UseText from "@app/UseText";
import CatalogContext from "@templates/catalog/Context";
import { Grid, Cell, Image, Subtitle, Title, Button, Currency, InputRange, Collapsible } from "@components";
import PanelDetail from "./PanelDetail";
import { SaveToCart, PaymentRequest } from "./DataSources";
import Api from '@app/Api';
import { Sliders, Input } from "../../../oldweddingcomponents";
import commonlinksmobile from "../../../oldweddingcomponents/commonlinksmobile";

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
	const refSlide = useRef();
	const [min, setmin] = useState(null);
	const [max, setmax] = useState(null);
	const [datos, setdatos] = useState({});
	const [paymentData, setPayment] = useState({});
	const [guest, setguest] = useState(2);
	const [descriptionCompleta, setDescripcionComplet] = useState("");
	const [service_list, setServiceList] = useState([]);
	const [terms_negocios, setTerms] = useState(["4", "6"]);
	const [ini, setIni] = useState({});
	const [hours, setHours] = useState([]);
	const [range, setRange] = useState(2);
	const [prices, setPrice] = useState([]);

	const [g, setG] = useState("");
	const [tag, setTag] = useState("");
	const [descripcion, setDescripcion] = useState("");
	const [numPax, setPax] = useState(0);
	const [thumbs, setThumb] = useState("");
	const [img_list, setListImage] = useState([]);

	const [
		{ from, thumb, src, logo, title, detail, price, id },
		setState,
	] = useState(location.state);

	const getIdConcept = () => {
		const products = itemsInCart.products || {};
		return findInObject(products, id);
	};

	const handleChange = (e) => {
		lodDataChange(e);
		// this.setState({ renge_value: e })
		// localStorage.removeItem("clearstate")
	}

	const lodDataChange = (e) => {
        let level = 0
		let range = [];
        try {
			range = [...new Set(dataPropsFilter(datos).map(({ num_pax }) => parseInt(num_pax)))];
        } catch (ex) {
            range = datos[0]["num_pax"];
        }
        range.push(0);
		range.sort(function (a, b) { return a - b; });
		let ndRepeat = [...new Set(range)];
		setguest(e);
        setTimeout(() => {
            ndRepeat.forEach((element, index) => {
        		if ((e > parseInt(ndRepeat[index - 1]) || parseInt(element.guest) < element)) {
					load_range_data(index - 1)
        		}
        	});
        })
	}
	
	const load_range_data = (index) => {
        let regex = /(\d+)/g;
		let desc = "";

        try {
			desc = dataPropsFilter(datos)[index]["description"].split("-")[1];
		} catch (ex) {

        }

        let dataFilter = dataPropsFilter(datos)[index];
		let img_slider = []
        try {
			var images = JSON.parse(dataFilter["collectionsServices"][0].images);
			const { path, thumb, imagen_extra } = Array.isArray(images) && images.length > 0 ? images[0] : {};
			img_slider.push(thumb);
        } catch (ex) {

        }
        try {
			var images = JSON.parse(dataFilter["collectionsServices"][0].images);
			const { path, thumb, imagen_extra } = Array.isArray(images) && images.length > 0 ? images[0] : {};
            img_slider.push(thumb);
        } catch (ex) {

		}

		setPrice( datos.filter(el => el.description == datos[index]["description"]));
		setG(desc);
		setTag("");
		// setDescripcion(titleValidacion(dataFilter));
		setDescripcionComplet(titleValidacion(dataFilter, "-"));
		setPax(parseInt(dataFilter.num_pax));
		setServiceList(listService(dataFilter, 0, true));
		setThumb(thumb);
		setListImage(listService(dataFilter, 1, true));
	}

	const html_list = (tiposervicio, services) => {
        if (services.length) {
            return (
                <section style={{ width: "50%" }} key={"index" + (tiposervicio == null ? services.tiposervicio : (tiposervicio + ""))}>
					<p className="description ttl_dsc">
                        <b>{tiposervicio == null ? services.idservice_servicio_tipo : (tiposervicio + "")}</b></p>
                    <section className="list_package">
						<ul style={{padding: "0px"}}>
							{tiposervicio == null ?
								services.map((element, index) => {
									let txt_desc = element.descripcion;
                                    return (<li style={{ listStyle: "none" }} key={index}> <p className="description">{(element.cantidad_coleccion != null ? element.cantidad_coleccion : "") + " " + txt_desc}</p></li>)
								})
							:
							<div>
								{services.map((element, index) => {
									let txt_desc = element.descripcion;
									return (<li style={{ listStyle: "none" }} key={index}> <p className="description">{(element.cantidad_coleccion != null ? element.cantidad_coleccion : "") + " " + txt_desc}</p></li>)
									})
								}
							</div>
							}
						</ul>
                    </section>
                </section>
            )
        }
    }
	
	const listService = (data, tipo) => {
        let listAudio = []
        let listAudioAux = []

        let listLight = []
        let listLightAux = []

        let listVideo = []
        let listVideoAux = []

        let listExtras = []
        let listExtrasAux = []

        let listImage = []
        let service_list = []
		service_list.push(html_list("Audio",data["collectionsServices"].filter((elmn) => { return elmn.tag == "Audio" })));
		service_list.push(html_list("Video",data["collectionsServices"].filter((elmn) => { return elmn.tag == "Video" })));
		service_list.push(html_list("Ligthing",data["collectionsServices"].filter((elmn) => { return elmn.tag == "Lighting" })));

		data["collectionsServices"].forEach((element, index) => {
			let txt_desc = element.descripcion;
			let images = JSON.parse(element["images"]);
			const { path, thumb, imagen_extra } = Array.isArray(images) && images.length > 0 ? images[0] : {};
			listImage.push(
			    <section key={index}>
			        <img src={thumb} alt={txt_desc} />
			        <p className="description" style={{ margin: "auto" }}>{txt_desc}</p>
			    </section>
			)
		})

        if (tipo == 0) {
            return service_list;
        }
        if (tipo == 1) {
			return (<Sliders nameSlide={"quant_"}>{listImage}</Sliders>)
        }
    }

	const dataPropsFilter = (data) => {
        let data_aux = []
		let isHour = false
        data.forEach((element) => {
            if (element.cantidad_unidades == "3") {
                data_aux.push(element)
                isHour = true
            }
		})
        if (isHour) {
            return data_aux
        } else {
            return data
        }
	}
	
	const titleValidacion = (data, complete) => {
        let descripcionC = data.description;
        return complete == null ? descripcionC.split("-")[0] : descripcionC;
	}
	
	const openCloseTerms = (e) => {
        e.preventDefault();
        // this.terms.style = "transform: rotate(" + (this.terminos == 0 ? "180" : "0") + "deg);position: absolute;transition: .5s;";
        // this.terminos = this.terminos == 0 ? 1 : 0
        // this.terms_text.style = "text-align: justify; padding: 0px 10px;font-family: Avenir;transition: .5s;font-size: 16px;overflow: hidden;height:" + (this.terminos == 1 ? this.terms_text.children[0].offsetHeight + "px" : "0px")
    }

	/**
	 * Devuelve el minimo
	 * @param {*} array 
	 * @param {*} type 
	 */
	const getMinMax = (array, type) => {
		var out = [];
		array.forEach(function(el) { return out.push(el[type]); }, []);
		return { min: Math.min.apply(null, out), max: Math.max.apply(null, out) };
	}

	const addToCart = idx => {
		// SaveToCart(business.idCategory, location.state)
		// 	.then((res) => {
		// 		/* setToCart(res.id); */
		// 		setToCart(res.id, res.idservice_evento);
		// 		setSaved(true);
		// 		/* setPayment({id}) */
		// 	})
		// 	.catch((err) => {
		// 	});
	};

	const hideArrowSlide = () => {
        setTimeout(() => {
            let currentSlider = refSlide.current.querySelector("#quant_")
            if (currentSlider.clientWidth >= currentSlider.scrollWidth) {
            	refSlide.current.querySelector(".controlArrow").style.display = "none"
            } else {
                refSlide.current.querySelector(".controlArrow").style.display = ""
            }
        }, 1000)
    }

	useEffect(() => {
		Api.getServicesByCollections(location.state.id_tipo_servicio,sessionStorage.id_resort)
			.then((res)=>{
				let minmax = {};
				setdatos(res.data);
				let data = res.data;
				minmax = getMinMax(res.data, "num_pax");
				setmax(minmax["max"]);
				setmin(minmax["min"]);
				let hoursDescrip = []
				res.data.forEach((element, index) => {
					if (element.cantidad_unidades != 0) {
						hoursDescrip.push({ hour: (element.cantidad_unidades) });
					}
				});
				let hour_result = [...new Set(hoursDescrip.map(({ hour }) => hour))];
				setHours(hour_result);
				setPrice(data.filter(el => el.description == data[0]["description"]));
				let data_aux = data;
				let ini = data_aux[0];
				let regex = /(\d+)/g;
				setIni(ini);
        		let desc = ini.description;
				try {
					desc = desc.match(regex)[0] + "G";
        		} catch (ex) {
				}
				if (minmax["max"] < 3) {
					data.forEach((element, index) => {
						if (element.num_pax <= 0) {
							setmin(1);
							element.num_pax = index + 1;
							setmax(index + 1);
						}
					})
				}
				setServiceList(listService(data, 0));
				setDescripcion(titleValidacion(ini));
				setG(desc);
			})
			.catch(()=>{
			})
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
				<h2>{descripcion}</h2>
				<center><h3>{ g + " : " + guest + " Guests" }</h3></center>
				<InputRange
					minValue={2}
					maxValue={max}
					value={0}
					linercolor={{ active: "#F26193", inactive: "#dbdbdb" }}
					identify={false}
					_onChange={x => {
						handleChange(x);
					}}
					type2
				/>		
				<br/>
				<section style={{ width: "max-content", margin: "auto", maxWidth: "100%" }}>
                    <p className="description txt-light detail" style={{ margin: "auto" }}>{datos.length < 2 && ini.num_pax < 2 ? "" : (datos ? descriptionCompleta : titleValidacion(ini, "-"))}</p>
						<h4 className="detail-title">
							{ini.num_pax > 2 ? 
								(min != null ? "(" + "Up To " + (datos != null ? numPax : ini.num_pax) + " Guests" + ")" : "")
								:
								<div></div>
							}
						</h4>
                </section>
				<section style={{ display: "flex", width: "90%", margin: "auto" }}>
					{ service_list }

                </section>
				<section className="quantum_dec">
                    <p  className="description quantum">
                    For further information, please contact us at <a className="link" href='mailto:palaceproductions@palaceresorts.com'> palaceproductions@palaceresorts.com</a>
                    </p>  
                </section>
				<section style={{ display: "flex", width: "90%", margin: "auto" }}>
					{ img_list }
				</section>
				

				{hours[1] != null ?
                    <>
					<h4>{descriptionCompleta}</h4>
						<Grid type='x' className='grid-margin-x'>
							<Cell small='6' medium='6' large='6'>
								<h3>Price</h3>
								<Subtitle size={2} className="detail-price">
									<Currency isDefault={true} value={prices.length > 0 ? prices[0]["price"] || "0.00" : "0.00"} region='usa'/>
								</Subtitle>
								<p className="description">{"Up To " + hours[0] + " Hours"}</p>
								<Button
									className="action"
									onClick={() => !isSaved ? addToCart(0) : payNow}>
									<UseText
										i18n={!isSaved ? "ADD_TO_CART" : "PAY_NOW"}
									/>
								</Button>
							</Cell>
							<Cell small='6' medium='6' large='6'>
								<h3>Price</h3>
								<Subtitle size={2} className="detail-price">
									<Currency isDefault={true} value={prices.length > 0 ? prices[1]["price"] || "0.00" : "0.00"} region='usa'/>
								</Subtitle>
								<p className="description">{" Up To " + hours[1] + " Hours"}</p>
								<Button
									className="action"
									onClick={() => !isSaved ? addToCart(1) : payNow}>
									<UseText
										i18n={!isSaved ? "ADD_TO_CART" : "PAY_NOW"}
									/>
								</Button>
							</Cell>
						</Grid>
                	</>
                	: <></>
                }

				<Collapsible header={"TERMS AND CONDITIONS"}>
					<p className="content-terms sm-f12x lg-f16x">{ini.termcondiciones}</p>
				</Collapsible>
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