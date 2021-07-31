import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import ViewDetail from './ViewDetail';
import WithContext from '@app/ServiceContext';
import Paginator from './paginator';
import Api from '../../../app/Api';
import Auth from '@app/Auth';
import { Titlesection, Input } from '../../../oldweddingcomponents/wirefragment';
import { GalleryChecks, Tabstwo} from '../../../oldweddingcomponents/index';
import { withRouter } from "react-router-dom";
import { Grid, Cell, Subtitle } from '../../../components';
import UseText from '@app/UseText';

class Personalizeyourcatalog extends Component {
    constructor(props) {
        super(props);

        this.BodyTabs = React.createRef();
        this.headFloat = React.createRef();
        this.activeTabs = this.activeTabs.bind(this);
        this.headTabsStatic = this.headTabsStatic.bind(this);
        this.property = this.props.property;
        this.getLocations = this.getLocations.bind(this);
        this.onSelectTab = null;
        this.descripcion = "";
        this.title = "";

        this.state = {
            gallery_data: [],
            values_checked: [],
            dataServices: [],
            page: [],
            detail: {},
            notGallery: false,
            notCakes: false,
            carrito: {},
            cakeSelected: 0,
            idlocacion: 0,
            idevent:0,
            redirect: false
        };
    }

    static getDerivedStateFromProps(props, state) {
        let newProps = {};
        Object.keys(props).forEach(key => {
            if (props[key] != state[key]) {
                newProps[key] = props[key];
            }
        });
        return Object.keys(newProps).length > 0 ? newProps : null;
    }

    componentDidMount() {
        window.addEventListener("scroll", this.headTabsStatic);
        this.setState({ values_checked: this.props.valuesCheck });
        this.getServiceByProperty();
        this.headFloatLimit = React.createRef()
        this.getLocations();
    }

    getLocations(){
        Api.getShoppingLocations(sessionStorage.id)
            .then((res) =>{
                this.setState({idevent : res["data"]["idevent_evento"]})
                this.setState({idlocacion : res["data"]["idevent_evento_locacion"]})
            })
            .catch((e) =>{
                this.setState({idevent : 0})
                this.setState({idlocacion : 0})
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.property != this.props.property) {
            this.property = this.props.property;
            this.setState({values_checked : this.props.valuesCheck});
            this.setState({carrito : this.props.cart});
            this.getServiceByProperty();
        }

    }

    getServiceByProperty() {

        if (this.property === "" || this.props.unidad_negocio < 1) return;
        this.descripcion = "";
        Api.getMenuService(this.property, this.props.unidad_negocio)
            .then(res => {
                this.setState({ dataServices: res.data, notCakes: res.data.length <= 0 });
                this.onSelectTab(0);
                this.activeTabs(res.data[0]);
            })
            .catch(e => { this.setState({ dataServices: [], gallery_data: [], page: [], notCakes: true, notGallery: false }); });
    }

    getServicesByCategory(tipo_servicio) {
        const carritoCompras = this.state.carrito;
        let data = [];
        let datos = []

        Api.getServicesByHotel(this.property, 1)
        .then(res => {
            console.warn(res);
            datos = res.data;
            let some = datos.filter(e => e.idSubcategory == tipo_servicio);
            data = some.map((item, index) => {
                let varCarrito = carritoCompras.filter(carrito => carrito.idservice_evento === item.idProduct);
                if(varCarrito.length > 0){
                    item["idevent_detalle_item"] = varCarrito[0].idevent_detalle_item;
                }

                return {
                    id: item.idProduct,
                    image_src: item.path,
                    value: item.idProduct,
                    label: item.description,
                    logo: item.imagen_extra,
                    src: item.path,
                    title: item.description,
                    evento_coleccion: "",
                    coleccion: item.coleccion,
                    personalizable: item.personalizable,
                    idevent_detalle_item: item.idevent_detalle_item,
                    price: item.price,
                    detail: item.texto,
                    idconcepto: item.idconcepto_ingreso
                };
                
            });
            this.setState({ gallery_data: data, page: [], notGallery: data.length <= 0 });
        })
        .catch(e => {
            this.setState({ gallery_data: [], page: [], notGallery: true });
        });
    }

    activeTabs(item) {        
        this.getServicesByCategory(item.idSubcategory)
    }

    addShoppingCart(detail) {
        //let { setData } = this.state.app;
        let services = [];
        let data = Object.assign([], this.state.values_checked);
	    const idevent = this.state.idevent;
        const idlocacion = this.state.idlocacion;

        if (data.includes(detail.value)){
            
            services.push({
                "img" : detail['image_src'],
                "description" : detail['title'],
                "amount" : detail['price'],
                "currency" : "USD",
                "quantity" : "1",
                "u_price" :  detail['price'],
                "id": detail['idevent_detalle_item'],
                "idconcepto_ingreso": detail['idconcepto'],
                "userRequest": sessionStorage.id_planner
            });
            console.warn("services =>>>>>>>>>>>>>>>", services);
            this.setState({redirect: true});
            this.setState({services: services});
            // No borrar en caso de cambiar el boton
            // let update_data = {
            //     id: detail.idevent_detalle_item,
            //     estado:0,
            // }
            // Api.putDetailitem(detail.idevent_detalle_item, update_data, Auth.getAuthorizationHeader())
            //     .then((response) => {
            //         if(!response.error){
            //             data.filter(e => e !== detail.value) 
            //             this.props.onCartList(data.filter(e => e !== detail.value));
            //             this.setState({ values_checked : data.filter(e => e !== detail.value)});
            //         }
            //     })
            //     .catch((e) =>{
            //         console.warn(e);
            //     })
            
        }else{
            let di = {
                id_evento: idevent,
                idevent_evento: idevent,
                id_locacion: idlocacion,
                idservice_evento_coleccion: detail.evento_coleccion,
                idservice_evento: detail.id,
                id_proveedor: "1",
                precio_unitario: detail.price,
                cantidad: 1,
                cantidad_pendiente: detail.price,
                coleccion: detail.coleccion,
                idservice_evento_coleccion: "0",
                list_colections: {},
                personalizado: detail.personalizable,
                comentario_recepcion: '_',
                estado_recepcion: 1,
                cantidad_pagada: 0,
                estado: 1,
                idservice_unidad_negocio: this.props.unidad_negocio
            };
            Api.postServiceDI(Auth.getAuthorizationHeader(),di)
                .then((response) => {
                    if(!response.error){
                        data.push(detail.value)
                        this.props.onCartList(data);
                        this.state.gallery_data[this.state.cakeSelected].idevent_detalle_item = response.data.id;
                        let de_notes = {
                            id: response.data.id,
                            comment: detail.detail,
                            tipo: 1, // Novia
                            tipo_extrainfo: 2, // Notas
                            path: "",
                            thumb:""
                        };
                        Api.postComment(Auth.getAuthorizationHeader(),de_notes)
                        .then((res) => {
                            console.warn("res =>", res);
                        })
                        .catch((e) => {
                            console.warn("e ", e);
                        });
                    }
                })
                .catch((e) => {
                    console.warn("error =>>>>>>>", e);
                })
        }

        this.setState({ values_checked: data },() => this.setState({values_checked: data}));

    }

    viewDetail(item, key) {
        this.setState({ detail: item });
        this.setState({ cakeSelected: key });
    }

    onCharge() {

    }

    headTabsStatic() {
        if (this.headFloat.current != null) {
            if (innerWidth > 1024) {
                if (window.pageYOffset > 901) {
                    this.headFloat.current.style =
                        "left: 0; position: fixed;top: 108px;width: 100%;transition:.5s;";
                } else {
                    this.headFloat.current.style = "position: relative;top: 0px;width: 100%;transition:.5s;";
                }
            } else {
                if ((this.BodyTabs.current.childNodes[1].offsetTop - window.pageYOffset) > 0) {
                    let posWindow = (this.headFloat.current.getBoundingClientRect().top)
                    let posWindowLimit = (this.headFloatLimit.current.getBoundingClientRect().top)

                    let size = window.getComputedStyle(document.body).fontSize.substring(-2, 2)
                    if (posWindow <= (45 / 16) * size) {
                        this.headFloat.current.style = "position: fixed;top: " + ((45 / 16) * size) + "px;width: 100%;"
                        document.getElementById("replace-size").style = "height:" + (this.headFloat.current.offsetHeight) + "px;"
                    }
                    if (posWindowLimit >= (45 / 16) * size) {
                        this.headFloat.current.style = "position: relative;top: 0px;width: 100%"
                        document.getElementById("replace-size").style = ""
                    }
                }
            }
            // if(scrollY>0){
            // localStorage.localScrolY=scrollY
            // }
        }
    }

    render() {
        const redirect = this.state.redirect;
        const { match: { params } } = this.props;

        if (redirect) {
            return <Redirect push to={{
               pathname: '/checkout',
               state: { order: this.state.services, "concepto": 1 }
            }} />
        }

        return (
            <div className="contentheadSlide">
                <div id="replace-size" ref={this.headFloatLimit}></div>
                <div ref={this.headFloat} className="head-sticki" >
                    <div className="fondo-head"></div>
                    <Tabstwo class="container tabcategoriescake" onSelectTab={(item) => { this.onSelectTab = item; }}>
                        {   this.state.dataServices.map((element, index) => {
                                return (
                                    <a onClick={this.activeTabs.bind(this, element)} key={index}>
                                        <Subtitle className="tabs-description subtitle subtitle-2">{element.description}</Subtitle>
                                    </a>
                                );
                            })    
                        }
                    </Tabstwo>
                    <div className={this.state.notCakes ? "show" : "hide"} >
                        
                        <Titlesection subtitle={"Not Found " + this.props.tipo_catalogo + " to " + this.props.property_name} />
                    </div>
                </div>
                <div className="divisor-head-slide"></div>
                <section className="content-tabs container" ref={this.BodyTabs}>
                    <Grid type="x">
                        <Cell small="12" medium="12" large="12">
                            <center className={this.state.notCakes ? "hide" : "show"}>
                                {this.props.property ?
                                    <p className="texto-description subtitle subtitle-2">
                                         <UseText i18n="MANY_CAKES" />
                                    </p>
                                    : ""}
                            </center>
                        </Cell>
                        <div className="slide-description"></div>
                        <Cell small="12" medium="12" large="12" className={this.state.detail && Object.keys(this.state.detail).length > 0 ? "hide" : "show"}>
                            <GalleryChecks
                                key={`GalleryChecks`}
                                item_list={this.state.gallery_data}
                                galleryClick={(value, id, item, key) => {
                                    this.viewDetail(item, key);
                                }}
                                card={true}
                                values_checked={this.state.values_checked}
                            />
                        </Cell>
                        <Cell className={this.state.notGallery ? "show" : "hide"} small="12" medium="12" large="12">
                            <center>
                                {params.lang == "en" ?
                                    <Titlesection subtitle={"Not Found " + this.props.tipo_catalogo + " to " + this.title} />
                                    :
                                    <Titlesection subtitle={"No se encontraron " + this.props.tipo_catalogo + " para " + this.title} />
                                }
                            </center>
                        </Cell>
                    </Grid>
                    <Paginator
                        total={10}
                        data={this.state.gallery_data}
                        onClick={(value) => { this.setState({ page: value, detail: {} }) }}
                    />
                    <span className="limit-head" />
                </section>
                {/* <Grid type="x" className={this.state.detail && Object.keys(this.state.detail).length > 0 ? "show" : "hide"}> */}
                <div className={this.state.detail && Object.keys(this.state.detail).length > 0 ? "show" : "hide"}>
                    <ViewDetail
                        data={this.state.detail}
                        onBack={() => { this.setState({ detail: {} }) }}
                        onAdd={() => { this.addShoppingCart(this.state.detail) }}
                        onSelected={this.state.values_checked.includes(this.state.detail.value)}
                    />
                </div>
                {/* </Grid> */}
            </div>
        );
    }
}

Personalizeyourcatalog.defaultProps = {
    unidad_negocio: 0,
    property: "",
    property_name: "",
    onCartList: (item) => {},
    valuesCheck: [],
    cart: []
};

export default withRouter(WithContext(Personalizeyourcatalog));