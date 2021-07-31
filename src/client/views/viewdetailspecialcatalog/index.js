import React, { Component } from 'react';
import { Titlesection,Iconwedd,Input } from "../../oldweddingcomponents/wirefragment";
import { Sliders } from '../../oldweddingcomponents';
import WithContext from '@app/ServiceContext';
import { withRouter } from "react-router-dom";
// import { WithCatalog } from '@templates/CatalogTemplate';
import InputRange from '../../oldweddingcomponents/inputrange';

class ViewDetailSpecialCatalog extends Component {
    constructor(props) {
        super(props);
        this.refSlide = React.createRef();
    };

    componentDidUpdate() {
        setTimeout(() => {
            if (this.props.id_item_select != null) {
                this.load_range_data()
            }
        }, 200)
    }
   

    handleChange(e) {
        this.setState({ renge_value: e })

        this.lodDataChange(e)
        localStorage.removeItem("clearstate")
    }
    lodDataChange(e) {
        let level = 0
        let range
        try {
            range = [...new Set(this.dataPropsFilter(this.props.location.state.dataFilter).map(({ num_pax }) => parseInt(num_pax)))];
        } catch (ex) {
            range = [this.props.location.state.dataFilter[0].num_pax]
            console.error(ex)
        }
        range.push(0)
        range.sort(function (a, b) { return a - b; })
        let ndRepeat = [...new Set(range)];
        this.setState({ guest_range: e })
        setTimeout(() => {
            ndRepeat.forEach((element, index) => {
                if ((e > parseInt(ndRepeat[index - 1]) || parseInt(element.guest_range) < element)) {
                    this.load_range_data(index - 1)
                }
            });
        })
    }

    load = 0
    load_range_data(index) {

        // try {
        let regex = /(\d+)/g;
        let desc = ""
        try {
            desc = this.dataPropsFilter(this.props.location.state.dataFilter)[index].descripcion.split("-")[1]
        } catch (ex) {

        }

        let dataFilter = this.dataPropsFilter(this.props.location.state.dataFilter)[index]
        let img_slider = []
        try {
            img_slider.push(dataFilter.detallecoleccion[0].services[0].images[0].thumb)
        } catch (ex) {
            //console.group(ex)
        }
        try {
            img_slider.push(dataFilter.detallecoleccion[0].services[1].images[0].thumb)
        } catch (ex) {
            //console.group(ex)
        }


        let descripcionIni
        this.setState({
            g: desc,
            tag: dataFilter.tag,
            descripcion: this.titleValidacion(dataFilter),
            descripcionComlet: this.titleValidacion(dataFilter, "-"),
            num_pax: dataFilter.num_pax,
            listService: this.listService(dataFilter, 0, true),
            thumb: dataFilter.images[0].thumb,
            listImage: this.listService(dataFilter, 1, true),
            terms_text: dataFilter.termcondiciones.length == 0 ? "" :this.props.location.state.lang_site == "en" ? dataFilter.termcondiciones[0].texto : dataFilter.termcondiciones[1] ? dataFilter.termcondiciones[1].texto : "",
        })
        //} catch (ex) { console.log(ex) }
    }
    html_list(tiposervicio, services) {
        if (services.length) {
            return (
                <section style={{ width: "50%" }} key={"index" + (tiposervicio == null ? services.tiposervicio : (tiposervicio + ""))}>
                    <p className="description ttl_dsc">
                        <b>{tiposervicio == null ? services.tiposervicio : (tiposervicio + "")}</b></p>
                    <section className="list_package">{
                        <ul style={{ padding: "0px" }}>
                            {tiposervicio == null ?
                                services.services.map((element, index) => {
                                    
                                    let txt_desc = localStorage.langInt == 1 ? (element.descripcion != null ? element.descripcion : "") : (element.descripcionespanol != "" ? element.descripcionespanol : element.description)
                                    return (<li style={{ listStyle: "none" }} key={index}> <p className="description">{(element.cantidad_coleccion != null ? element.cantidad_coleccion : "") + " " +  element.descripcion}</p></li>)
                                })
                                :
                                services.map((element, index) => {
                                    let txt_desc = localStorage.langInt == 1 ? (element.descripcion != null ? element.descripcion : "") : (element.descripcionespanol != "" ? element.descripcionespanol : element.description)
                                    return (<li style={{ listStyle: "none" }} key={index}> <p className="description">{(element.cantidad_coleccion != null ? element.cantidad_coleccion : "") + " " + element.descripcion}</p></li>)
                                })
                            }
                        </ul>
                    }
                    </section>
                </section>
            )
        }
    }
    listService(data, tipo) {

        let listImage = []
        let service_list = []

        data.detallecoleccion.map((element, index) => {
            
            service_list.push(this.html_list("Audio", element.services.filter((elmn) => { return elmn.tag == "Audio" })))
            service_list.push(this.html_list(localStorage.langInt == 1 ? "Lighting" : "Iluminación", element.services.filter((elmn) => { return elmn.tag == "Lighting" })))
            service_list.push(this.html_list("Video", element.services.filter((elmn) => { return elmn.tag == "Video" })))
            service_list.push(this.html_list("", element.services.filter((elmn) => { return elmn.tag != "Video" && elmn.tag != "Audio" && elmn.tag != "Lighting" })))
            
            element.services.map((element, index) => {
                let txt_desc = localStorage.langInt == 1 ? (element.descripcion != null ? element.descripcion : "") : (element.descripcionespanol != "" ? element.descripcionespanol : element.description)
                //if (element.images) {
                    listImage.push(
                        <section key={index}>
                        <img src={element.images[0].thumb} alt={txt_desc} />
                        <p className="description" style={{ margin: "auto" }}>{txt_desc}</p>
                    </section>
                )
                //}
            });
        });

        if (tipo == 0) {
            return service_list
        }
        if (tipo == 1) {
            return (<Sliders nameSlide={"quant_"} refSlide={this.refSlide}>{listImage}</Sliders>)
        }
    }
    dataPropsFilter(data) {
        let data_aux = []
        let isHour = false
        data.map((element) => {
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
    terminos = 0
    titleValidacion(data, complete) {
        let descripcionC = localStorage.langInt == 1 ?
            data.descripcion :
            data.descripcionespanol != "" ?
                data.descripcionespanol : data.descripcion
        return complete == null ? descripcionC.split("-")[0] : descripcionC
    }
    openCloseTerms(e) {
        e.preventDefault();
        this.terms.style = "transform: rotate(" + (this.terminos == 0 ? "180" : "0") + "deg);position: absolute;transition: .5s;";
        this.terminos = this.terminos == 0 ? 1 : 0
        this.terms_text.style = "text-align: justify; padding: 0px 10px;font-family: Avenir;transition: .5s;font-size: .8rem;overflow: hidden;height:" + (this.terminos == 1 ? this.terms_text.children[0].offsetHeight + "px" : "0px")
    }
    /*hideArrowSlide() {
        setTimeout(() => {
            let currentSlider = this.refSlide.current.querySelector("#quant_")
            if (currentSlider.clientWidth >= currentSlider.scrollWidth) {
                this.refSlide.current.querySelector(".controlArrow").style.display = "none"
            } else {
               this.refSlide.current.querySelector(".controlArrow").style.display = ""
            }
            //console.log(this.refSlide.current,currentSlider.offsetWidth,currentSlider.scrollWidth)
        }, 1000)
    }*/
    render() {
        let terms_negocios = ["4", "6"]
       // setTimeout(() => { this.didUpdt() }, 100)
/*        console.log('this.props.dataFilter',this.state.listImage)
 */        let data = this.props.location.state.dataFilter

        let terms_ini = data[0].termcondiciones.length == 0 ? "" : this.props.location.state.lang_site == "en" ? data[0].termcondiciones[0].texto : data[0].termcondiciones[1] ? data[0].termcondiciones[1].texto : ""

        //dataFilter.termcondiciones == null ? "" : this.props.lang_site == "en" ? dataFilter.termcondiciones[0].texto : dataFilter.termcondiciones[1] ? dataFilter.termcondiciones[1].texto : ""
        /*try{
            if(this.props.data.idservice_servicio_tipo==21){
                data[0].detallecoleccion[0].services.push({ tag: "include", descripcion: data[0].include[0].texto,descripcionespanol:data[0].include[1].texto })
            }
        }catch(ex){
            console.log(ex)
        }*/

        let hoursDescrip = []
        data.map((element, index) => {
            if (element.cantidad_unidades != 0) {
                hoursDescrip.push({ hour: (element.cantidad_unidades) })
            }
        })

        let hour_result = [...new Set(hoursDescrip.map(({ hour }) => hour))];

        let data_aux = data

        let ini = data_aux[0]
        let regex = /(\d+)/g;
        ini.descripcion
        let desc = ini.descripcion
        try {
            desc = desc.match(regex)[0] + "G"
        } catch (ex) {
            //console.log(ex)
        }

        let range = [...new Set(data_aux.map(({ num_pax }) => num_pax))];
        let max_range = Math.max.apply(null, range)

        if (max_range < 3) {
            data.forEach((element, index) => {
                if (element.num_pax <= 0) {
                    this[`min_range`] = 1
                    element.num_pax = index + 1
                    max_range = index + 1
                }
            })
        }
        //"min_range>"+(this.min_range==null?2:this.min_range),"max_range>"+max_range
        if (localStorage.clearstate) {
            this.state = null
        }
        //let thum,b
        let descripcionIni = this.titleValidacion(ini)
        descripcionIni = descripcionIni.toLowerCase()
        descripcionIni = descripcionIni.replace("dj", "DJ").replace("mc", "MC")


        return (
            <div component="cakeDetail" style={{ height: "unset" }}>
                <div component="grid-x" >
                    <div component="cell" small="2" medium="2" large="2" style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "solid 1px #FEDFD9", borderRight: "none" }}>
                        <a onClick={this.props.onBack} onClickCapture={(e) => {
                            localStorage.isBackTabs = true;
                            localStorage.clearbarprogress = true;
                            localStorage.clearstate = true;
                            this.min_range = null
                            data = null
                            this.terminos = 1
                            this.openCloseTerms(e)
                        }} style={{ cursor: "pointer" }}>
                            <Iconwedd icon={"chevron-carousel-left"} color={"pink"} />
                        </a>
                    </div>

                    <div component="cell" small="10" medium="10" large="10" className={"grid-flex-20-20-f2f2f2"}  >
                        <Input key="WISHING_LIST" type={"button"} value={localStorage.langInt == 1 ? `${this.props.location.state.onSelected ? "  REMOVE" : "  ADD"} TO WISH LIST` : `${this.props.onSelected ? "  QUITAR DE" : "  AGREGAR A"} LA LISTA DE DESEOS`} widthIcon={"heart-full"} handleClick={this.props.onAdd} />
                    </div>
                </div>
                <div component="grid-x" className={"border-20-20-f2f2f2 bor-top"}>
                </div>
                {/*------------------------------------------aplica para party rime, Dance floor-----------------------------------------------------*/}
                <div component="grid-x" className={"border-20-20-f2f2f2 bor-top"} style={{ display: "block" }}>
                    <section style={{ width: "max-content", margin: "auto", maxWidth: "100%" }} className="title_detail_special">

                        <h1 className="title" style={{ textTransform: "capitalize" }} >{descripcionIni}</h1>
                        {this.min_range ? "" :
                            <Titlesection subtitle={data.length < 2 ?
                                "" : "<b>" + (this.state != null ? this.state.g : desc) + "</b> " + (this.min_range == null ? "" + (": " + ((this.state != null ? this.state.guest_range : 2)) + (localStorage.langInt == 1 ? " Guests " : " Invitados ")) :
                                    "")} />
                        }
                    </section>

                    <section style={{ width: "100%", maxWidth: "100%", width: "80%", margin: "auto", display: data.length < 2 ? "none" : "block" }}>
                        <br />
                        {<InputRange
                            minValue={this.min_range == null ? 2 : this.min_range}
                            maxValue={max_range}
                            value={0}
                            linercolor={{ active: "#F26193", inactive: "#dbdbdb" }}
                            identify={false}
                            _onChange={e => {this.handleChange(e);
                            }}
                            type2
                        />}
                        <br />
                    </section>
                    <section style={{ width: "max-content", margin: "auto", maxWidth: "100%" }}>

                        <p className="description txt-light" style={{ margin: "auto" }}>{data.length < 2 && ini.num_pax < 2 ? "" : (this.state ? this.state.descripcionComlet : this.titleValidacion(ini, "-"))}</p>
                        <Titlesection description={ini.num_pax > 2 ?
                            (this.min_range == null ? "( " + (localStorage.langInt == 1 ? "Up To " : "Hasta ") + (this.state != null ? this.state.num_pax : ini.num_pax) + (localStorage.langInt == 1 ? " Guests " : " Invitados ") + ")" : "")
                            : ""
                        } />

                    </section>
                    <section style={{ display: "flex", width: "90%", margin: "auto" }}>
                        {this.state == null ? this.listService(ini, 0) : this.state.listService}
                    </section>
                    {
                        data[0].include.length > 0 ?
                            <section>
                                <p className="description" style={{ fontStyle: "italic", fontSize: "16px" }}>
                                   {(this.props.lang_site == "en" ? data[0].include[0].texto : data[0].include[1].texto)}
                                </p>
                            </section> : null
                    }
                    {
                    this.props.location.state.unidad_negocio == "4" ?
                    <section>
                        <p  className="description quantum">
                        {( this.props.location.state.lang_site == "en" ? "For further information, please contact us at <a href='mailto:palaceproductions@palaceresorts.com'>palaceproductions@palaceresorts.com</a>" : "Para mayor información, por favor contáctanos: <a href='mailto:palaceproductions@palaceresorts.com'>palaceproductions@palaceresorts.com</a>")}
                        </p>  
                    </section> : ""
                    }

                    <section>
                        {this.state == null ? this.listService(ini, 1) : this.state.listImage}
                        { /* this.hideArrowSlide() */}
                    </section>
                    {hour_result[1] != null ?
                        <>
                            <Titlesection subtitle={(this.state ? this.state.descripcionComlet : ini.descripcion)} />
                            <section style={{ display: "flex" }}>
                                <Titlesection description={(localStorage.langInt == 1 ? "Up To " : "Hasta ") + hour_result[0] + (localStorage.langInt == 1 ? " Hours" : " Horas")} /> <Titlesection description={(localStorage.langInt == 1 ? "Up To " : "Hasta ") + hour_result[1] + (localStorage.langInt == 1 ? " Hours" : " Horas")} />
                            </section>
                        </>
                        : <></>
                    }

                    {
                        terms_negocios.includes(this.props.location.state.unidad_negocio) ?

                            <section>
                                <label htmlFor="termsconditions2" className="check-box"
                                    onClick={(e) => {
                                        this.openCloseTerms(e)
                                    }}>
                                    <span style={{ display: "unset", cursor: "pointer" }} className="txt-light">
                                        {localStorage.langInt == 1 ? "Terms & Conditions" : "Términos y Condiciones"}  &nbsp;
                                <span ref={input => { this[`terms`] = input; }} style={{ position: "absolute", transition: ".5s" }}>
                                            <Iconwedd icon={"chevron-down"} color="pink" ></Iconwedd>
                                        </span>
                                    </span>
                                </label>
                                <section ref={input => { this[`terms_text`] = input; }} style={{ overflow: "hidden", height: "0px", textAlign: "justify", padding: "0px 10px", fontFamily: "Avenir", transition: ".5s", fontSize: ".8rem" }}>
                                    <section>
                                       {
                                            this.state != null ? this.state.terms_text : terms_ini
                                        }
                                    </section>
                                </section>
                                <br /><br />
                            </section>

                            : ""}

                </div>
                {/*------------------------------------------aplica para party rime, Dance floor-----------------------------------------------------*/}
            </div>
        );
    }
}

ViewDetailSpecialCatalog.defaultProps = {
    data: {},
    onBack: () => { },
    onAdd: () => { },
    onClick: () => { },
    onSelected: false
};

export default withRouter(WithContext(ViewDetailSpecialCatalog));
