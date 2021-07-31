import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Iconwedd } from '../index';

class Topmenu extends Component {
    
    constructor(props) {
        super(props);
        this.toSubscribe = this.toSubscribe.bind(this);
    }

    // @description: Función para cambiar el idioma
    handleLocale(selectedLang = "es") {
        const { history } = this.props;
        this.setState({ location: selectedLang });
        history.push(`/${selectedLang}`);
        window.location.reload();
    }

    toSubscribe (){
        let targetElement = document.querySelector(".footer-resorts");
        if (targetElement) {
           // Usar scrollIntoView() para ir al contenido
           if (typeof targetElement.scrollIntoView === 'function') {
              targetElement.scrollIntoView();
           } else {
              console.error(':goTo: scrollIntoView not available for', targetElement);
           }
        } else {
           console.error(':goTo: invalid selector "', selector, '" returned: ', targetElement);
        }
    }

    render() {

        return <ul ref={this.props.menuLiTop}>{this.props.topmenu.map((menus, index) => {
            let icons = "";
            if (menus.Titulo == "Phone") {
                icons = <Iconwedd icon={"phone"} color={"light-melon"} />
                {/*<span key={index} className={menus.Titulo + " wedding-sprite-desktop bg-phone-icon "}></span>;*/ }
            } else if (menus.Titulo == "Lang") {
                icons = <Iconwedd icon={"lang-button"} color={"light-melon"} />
                {/*<span key={index} className={menus.Titulo + " wedding-sprite-desktop bg-lang-icon "}></span>;*/ }
            }
             else {
                icons = <a key={index} className={menus.Titulo}>{menus.Titulo}</a>
            }
            if (menus.Submenu == null) {
                return ( 
                <li key={index} className={menus.Key == 11 ? "border-white-left" : ""}> 
                    <span className={menus.Titulo == "xxx" ? "wedding-sprite-desktop bg-mail-icon-desk " : ""}></span> 
                        
                    { menus.Subs == 1 ?
                        <a key={index} onClick={ this.toSubscribe} className={menus.Titulo}><Iconwedd icon={"envelope"} color={"light-melon"} /> {menus.Titulo}</a>
                            : 
                        <Link to={menus.Url}>{menus.Titulo}</Link> 
                    }
                        
                </li> 
                )
            } else {
                return <li key={index} onClick={this.props.handleClick.bind(this, menus.Titulo)}>
                    {icons}
                    &nbsp;&nbsp;
                    <Iconwedd icon={this.props.variable == menus.Titulo ? "chevron-up" : "chevron-down"} color={"light-melon"} />
                    {/*<span
                        className={this.props.variable == menus.Titulo ?
                            "wedding-sprite-desktop bg-mini-chevron-up-pink" :
                            "wedding-sprite-desktop bg-mini-chevron-down-pink"
                        }>
                    </span>*/}
                    <ul className={menus.Titulo == "Phone" ? "submenu phone" : "submenu"}
                        style={{ display: this.props.variable == menus.Titulo ? "block" : "none" }}>
                        {menus.Titulo == "Phone" ?
                            menus.Submenu.map((e, index) => {
                                return <li key={index} >
                                     <span className="callus">{e.Titulo}</span>&nbsp;<a href={e.Url} target="_blank">
                                        <span style={{ color: "var(--light-melon)" }}>{e.Titulo2}</span>
                                    </a>
                                </li>
                            }
                            ) : menus.Titulo == "Our Resorts Websites" || menus.Titulo == "Nuestro Sitios Web"?
                            menus.Submenu.map((e, index) => {
                                return <li key={index} >
                                    <a href={e.Url} target="_blank"> {e.Titulo}
                                        <span style={{ color: "var(--light-melon)" }}>{e.Titulo2}</span>
                                    </a>
                                </li>
                            }
                            ):
                            menus.Submenu.map((e, index) => {
                                return <li key={index}>
                                    <button className="btnLang" type = "button" onClick = { this.handleLocale.bind(this, e.Titulo) }>
                                        {e.Titulo}
                                    </button>
                                </li>
                            })}
                    </ul>
                </li>
            }
        })}</ul>

    }
};

export default withRouter(Topmenu);