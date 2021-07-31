/**
 * @name: catalog.js
 * @version: 1.1.0
 * @author: alanjimenez, Sergio Trejo
 * @description: Página de /catalog/:id
 * @update: Código traido de services-web-wed - amatos
*/
import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Cell, Select } from '@components';
import Api from '@app/Api';
import WithContext from '@app/ServiceContext';
// import { WithCatalog } from '@templates/CatalogTemplate';
import Personalizeyourcatalog from './Personalizeyourcatalog';


class Catalog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDestination: [],
            property: "",
            sliderpersonalizeyourwedd: [],
            countInCart: 0,
            unidades: [],
            tabDataContent: {
                title: "",
                title2: "",
                description: "",
            },
            gallery_data: [],
            tipo_catalogo: "",
            desc_catalog: ""
        };
        this.property_name = "";
        this.unidad_negocio = props.match.params.service || 0;
        this.selectPro = createRef();
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
        this.getProperties();
        this.changeHandler();
        const { match: { params } } = this.props;
        const idService = this.props.match.params.service;
    }


    getProperties() {
        let { setData } = 1;
        //this.state.app.currentPage;

        Api.getResorts()
        .then( res =>{ 
            /* var data = Object.keys(res.data.dropdownData).map(function (key) { 
                return [res.data.dropdownData[key], key]; 
            }); */
            const datos= res.data.dropdownData || [];
            var data = Object.keys(datos).map(function (item) { 
                return {label: datos[item], value: item }; 
            });
            this.setState({dataDestination: data });
        })
        .catch( e =>{ 
            Toast({ html: "Something was wrong", id: "my-toast" });
        });
    }

    changeHandler(value){
        if(value){
            this.property_name=value;
            this.setState({property:value})
            //this.property_name =  this.selectPro.current.select.current.querySelectorAll("input")[0].value;
            //this.setState({ property: this.selectPro.current.select.current.querySelectorAll("select")[0].value});
        }
    }


    render() {
        const { match: { params }, app } = this.props;
        const cart = this.props.catalogState || {};
        const inCartArr = cart.inCartArr || [];
        const carArray = cart.carArray || [];

        let { getData } = 1;
        //this.state.app.currentPage;
        let { setData } = 1;
        //this.state.app.currentPage;
        return (
            // <ServiceProvider value={{lang: params.lang, setData: setData, getData: getData}}>
            <div page="personalizeyourcatalog">
                <section component="personalizeyourcatalog">
                    <div className="push"></div>
                    <div component="grid-x">
                        <Cell small="12" medium="12" large="12">
                            <Grid type="x" className="selectresorts">
                                <Cell small="1" medium="4" large="4"></Cell>
                                <Cell small="10" medium="4" large="4">
                                <Select
                                    items={this.state.dataDestination} 
                                    name="select" 
                                    value="property"
                                    placeholder= {params.lang == "en" ? "Choose a property" : "Selecciona una propiedad"}
                                    autoComplete={true}
                                    closeOnClick={true}
                                    constrainWidth={true}
                                    onItemClick={({name, value }) => {
                                        this.setState({ [name]: value }, this.changeHandler( value) );
                                    }}
                                    ref={this.selectPro}
                                /> 
                                </Cell>
                                <Cell small="1" medium="4" large="4"></Cell>
                            </Grid>
                        </Cell>
                        <Cell small="12" medium="12" large="12">
                            <Personalizeyourcatalog
                                unidad_negocio={this.unidad_negocio}
                                tipo_catalogo={this.state.tipo_catalogo}
                                property={this.state.property}
                                property_name={this.state.property}
                                onCartList={(data) => { this.props.catalogState.actualizarCart(data.length) }}
                                valuesCheck={inCartArr}
                                cart={carArray}
                            />
                        </Cell>
                    </div>
                </section>
            </div>
           
            // {/* </Layout> */}
            // </ServiceProvider>
        );
    }
}

export default withRouter(WithContext(Catalog));
