import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Cell, Grid } from './../../components';
import { Iconwedd } from '..';
import UseText from '@app/UseText';
class CommonLinksMobile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isHidden: true
        };
    }

    handleOpen() {
        this.setState({ isHidden: false });
    }

    handleClose(event) {
        event.stopPropagation();
        this.setState({ isHidden: true });
    }

    render() {
        const { match: { params } } = this.props;

        return (
            <section component="commonlinks" className="commonlinks">

                <article component="awardsandlinks">
                    <div className="container" style={{ background: "var(--white)" }}>
                        <div className="container footer-ourawards">
                            <Grid type="y" small-up="2">
                                <Cell className="content-ourawards">
                                    <Grid type="x" >
                                        <Cell small="4">
                                            <hr className="margin-unset hr-white" />
                                        </Cell>
                                        <Cell small="4">
                                            <span className="center awards">
                                                <UseText i18n="OUR_AWARDS" />
                                            </span>
                                        </Cell>
                                        <Cell small="4">
                                            <hr className="margin-unset hr-white" />
                                        </Cell>
                                    </Grid>
                                </Cell>
                                <Cell className="other-logo-resorts">
                                    <Grid type="x">
                                        <Cell small="2">

                                        </Cell>
                                        <Cell small="3">
                                            <Iconwedd icon={"five-diamond"} color={"dark-gray-md five-content center"} />
                                        </Cell>
                                        <Cell small="2">
                                            <Iconwedd icon={"tripadvisor-award"} color={"dark-gray-md center tripadvisor-content"} />
                                        </Cell>
                                        <Cell small="3">
                                            <Iconwedd icon={"four-diamond"} color={"dark-gray-md four-content center"} />
                                        </Cell>
                                        <Cell small="2"></Cell>
                                    </Grid>
                                </Cell>
                            </Grid>
                        </div>
                    </div>
                </article>
                <article className="container footer-resorts">
                    <Grid type="x" large-up="1">
                        <Cell>
                            <Grid>
                                <div className="list-social">
                                    <div className="row">
                                        <div className="list-item-icon">
                                        <a href="https://co.pinterest.com/prweddings/" rel="noopener" target="_blank">
                                                <Iconwedd icon={"pinterest-circled"} style={{ marginRight: "8px" }} color={"white"} />
                                            </a>                                           
                                            <a href="https://www.facebook.com/PalaceResortsWeddings/" rel="noopener" target="_blank">
                                                <Iconwedd icon={"facebook-circled"} style={{ marginRight: "8px" }} color={"white"} />
                                            </a>
                                            <a href="https://www.instagram.com/palaceresortsweddings/?hl=es-la" target="_blank" rel="noopener">
                                                <Iconwedd icon={"instagram-circled"} style={{ marginRight: "8px" }} color={"white"} />
                                            </a>
                                            <a href="https://twitter.com/prweddings" target="_blank" rel="noopener">
                                                <Iconwedd icon={"twitter-circled"} style={{ marginRight: "8px" }} color={"white"} />
                                            </a>
                                            <a href="https://www.youtube.com/user/PalaceWeddings" target="_blank" rel="noopener">
                                                <Iconwedd icon={"youtube-circled"} style={{ marginRight: "8px" }} color={"white"} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <Cell small-up="12" className="logo-resorts">
                                    <Grid type="x" small-up="3">
                                        <Cell >
                                            <Iconwedd icon={"palace-resorts"} color={"light-gray center icon-social"} />
                                        </Cell>
                                        <Cell>
                                            <Iconwedd icon={"leblanc-resorts"} color={"light-gray center icon-social"} />
                                        </Cell>
                                        <Cell className="col-md-4">
                                            <Iconwedd icon={"moon-palace-cancun"} color={"light-gray center icon-social"} />
                                        </Cell>
                                    </Grid>
                                </Cell>
                                <Cell small-up="12" className="list-hotel-resorts">
                                    <Grid type="x" small-up="2">
                                        <Cell>
                                            <ul className="resort-list-ul">
                                                <li className="resort-list">
                                                <a href="https://palaceresorts.com" target="_blank" rel="noopener" className="footer-link">
                                                    PALACE RESORTS
                                                    <div className="line-rosy-horizontal-fot" ></div>
                                                    </a>
                                                    <Iconwedd icon={"chevron-right"} color={"white footer-chev-mob"} />
                                                </li>
                                                <li className="resort-list">  <a href="https://www.moonpalacecancun.com/" target="_blank" rel="noopener" className="footer-link">
                                                    MOON PALACE RESORTS
                                                    <div className="line-rosy-horizontal-fot" ></div></a>
                                                    <Iconwedd icon={"chevron-right"} color={"white footer-chev-mob"} />
                                                </li>
                                                <li className="resort-list">
                                                <a href="https://www.leblancsparesorts.com/" target="_blank"  rel="noopener" className="footer-link">
                                                    LE BLANC SPA RESORT
                                                    <div className="line-rosy-horizontal-fot"></div></a>
                                                    <Iconwedd icon={"chevron-right"} color={"white footer-chev-mob"} />
                                                </li>
                                            </ul>
                                        </Cell>
                                        <Cell >
                                            <ul className="resort-list-ul">
                                                <li className="resort-list">
                                                <a href="https://www.palaceelite.com" rel="noopener" target="_blank" className="footer-link">
                                                        PALACE ELITE
                                                    <div className="line-rosy-horizontal-fot"></div></a>
                                                    <Iconwedd icon={"chevron-right"} color={"white footer-chev-mob"} />
                                                </li>
                                                <li className="resort-list">
                                                <a href="https://meetings.palaceresorts.com" rel="noopener" target="_blank" className="footer-link">
                                                        MEETINGS
                                                    <div className="line-rosy-horizontal-fot" ></div> </a>
                                                    <Iconwedd icon={"chevron-right"} color={"white footer-chev-mob"} />
                                                </li>
                                                <li className="resort-list">
                                                <a href="https://www.palaceproagents.com" rel="noopener" target="_blank" className="footer-link">
                                                { params.lang === "en" ? "TRAVEL AGENTS" : params.lang === "es" ? "AGENCIAS" : "TRAVEL AGENTS"}
                                                    <div className="line-rosy-horizontal-fot"></div> </a>
                                                    <Iconwedd icon={"chevron-right"} color={"white footer-chev-mob"} />
                                                </li>
                                            </ul>
                                        </Cell>
                                    </Grid>
                                </Cell>
                            </Grid>
                        </Cell>
                    </Grid>
                </article>
                <address className="container-fluid privacy-policies">
                    <section className="row" >
                        <section className="col-6 pl-1 pr-0">
                            <h1 className="call">
                                { params.lang === "en" ? "CALL OUR WEDDING SPECIALISTS" : "LLAMAR A COORDINADORES" }
                            </h1>
                            <h1 className="phoneCall">1 (877) 725-4933</h1>
                            <span style={{ display: "none" }}>
                                <Iconwedd icon="chevron-right" color="white position"></Iconwedd><span className="privacy privacypolices float-right mt-2">PRIVACY POLICIES &nbsp; &nbsp; &nbsp;</span>
                            </span>
                            <div className="pointsFooter" onClick={this.handleOpen.bind(this)}>
                                <div className="point"></div>
                                <div className="point"></div>
                                <div className="point"></div>
                                {!this.state.isHidden &&
                                    <div className="modal-link-container">
                                        <div className="modal-link">
                                            <a className="linkalt" href="https://www.palaceresorts.com/en/privacy-users">
                                                { params.lang === "en" ? "PRIVACY POLICY" : "POLITICA DE PRIVACIDAD" }
                                            </a>
                                            <a className="linkalt" href="https://www.palaceresorts.com/en/other-privacy-notice">
                                            { params.lang === "en" ? "OTHER PRIVACY NOTICE" : "OTROS AVISOS"}
                                            </a>
                                            <a className="linkalt" href="https://www.palaceresorts.com/en/vehicle-lessees">
                                            { params.lang === "en" ? "VEHICLE LESSEES" : "ARRENDATARIO DE VEHICULOS" }
                                            </a>
                                            <a className="linkalt" href="https://www.palaceresorts.com/en/privacy-vigilancy">
                                            { params.lang === "en" ? "VIDEO SURVEILLANCE" : "VIDEO VIGILANCIA" }
                                            </a>
                                            <a className="linkalt" href="https://www.palaceresorts.com/en/privacy-notice-clients-gdpr">
                                            { params.lang === "en" ? "PRIVACY NOTICE FOR CLIENTS (GDPR)" : "AVISO DE PRIVACIDAD" }
                                            </a>
                                            <Link className="linkalt" to={params.lang === "en" ? "/en/sitemap" : "/es/sitemap"}>
                                            { params.lang === "en" ? "SITE MAP" : "MAPA DEL SITIO" }
                                            </Link>
                                            <div className="close-modal" onClick = { this.handleClose.bind(this) } >X</div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </section>
                    </section>
                </address>
            </section>
        )
    }
}

export default withRouter(CommonLinksMobile);