import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class Privacylinks extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { match: { params } } = this.props;
         
        return (
            <article className="container-fluid" style={{background: "var(--melon-footer-commonlinks)"}}>
            <div className="container final-footer">
                <div className="row"  style={{paddingTop:"23px"}}>
                        <ul className="list-footer mt-3">
                           <a rel="noopener" className="link-footer" href =  { params.lang === "en" ? "https://www.palaceresorts.com/en/privacy-users" : "https://www.palaceresorts.com/es/usuarios" }>
                               { params.lang === "en" ? "PRIVACY POLICY" : "POLITICA DE PRIVACIDAD" }
                            </a> 
                           <a rel="noopener" className="link-footer" href = { params.lang === "en" ? "https://www.palaceresorts.com/en/other-privacy-notice" : "https://www.palaceresorts.com/es/noticia-de-privacidad" }>
                               { params.lang === "en" ? "OTHER PRIVACY NOTICE" : "OTROS AVISOS"}
                            </a> 
                            <a rel="noopener" className="link-footer" href = { params.lang === "en" ? "https://www.palaceresorts.com/en/vehicle-lessees" : "https://www.palaceresorts.com/es/renta-de-vehiculos" }>
                               { params.lang === "en" ? "VEHICLE LESSEES" : "ARRENDATARIO DE VEHICULOS" }
                            </a>
                           <a rel="noopener" className="link-footer" href = { params.lang === "en" ? "https://www.palaceresorts.com/en/privacy-vigilancy" : "https://www.palaceresorts.com/es/video-vigilancia" }>
                               { params.lang === "en" ? "VIDEO SURVEILLANCE" : "VIDEO VIGILANCIA" }
                            </a>
                           <a rel="noopener" href = { params.lang === "en" ? "https://www.palaceresorts.com/en/privacy-notice-clients-gdpr" : "https://www.palaceresorts.com/es/aviso-privacidad-clientes-rgpd" } className="link-footer">
                               { params.lang === "en" ? "PRIVACY NOTICE FOR CLIENTS (GDPR)" : "AVISO DE PRIVACIDAD" }
                            </a> 
                           <Link rel="noopener" to={params.lang === "en" ? "/en/sitemap" : "/es/sitemap"} className="link-footer">
                               { params.lang === "en" ? "SITE MAP" : "MAPA DEL SITIO" }
                            </Link> 
                        </ul>
                 
                </div>
            </div>
        </article>
        );
    }
}

export default withRouter(Privacylinks);