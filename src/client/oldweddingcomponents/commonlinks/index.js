import React, { Component } from 'react';
import { Cell, Grid } from './../../components';
import { Iconwedd } from '../index';
import { withRouter, Link } from 'react-router-dom';
import image from '@app/image.js';

class CommonLinks extends Component {
    render() {

        const { match: { params } } = this.props;

        return (
            <section component="commonlinks">
                <div className="container footer-resorts">
                    <Grid type="x" large-up="2">
                        <Cell >{/*style={{background: "#2e2e2e"}}*/}
                            <Grid>
                                <Cell small-up="12" style={{ paddingTop: "23px" }}>
                                    <Grid type="x" small-up="4">
                                        <Cell >
                                            {/*<span className="wedding-sprite-desktop bg-palace-resorts center"></span>*/}
                                            <Iconwedd icon={"palace-resorts"} color={"white center"} />
                                        </Cell>
                                        <Cell>
                                            {/*<span className="wedding-sprite-desktop bg-le-blanc-resorts center"></span>*/}
                                            <Iconwedd icon={"leblanc-resorts"} color={"white center"} />

                                        </Cell>
                                        <Cell>
                                            {/*<span className="wedding-sprite-desktop bg-moon-palace center"></span>*/}
                                            <Iconwedd icon={"moon-palace-cancun"} color={"white center"} />
                                        </Cell>
                                        <Cell>
                                        <div style={{ paddingTop: "30px" }}>
                                            <div className="row">
                                                <div style={{ margin: "auto" }}>
                                                    <a href="https://co.pinterest.com/prweddings/" target="_blank">
                                                        <Iconwedd icon={"pinterest-circled"} style={{ marginRight: "8px" }} color={"white"} />
                                                    </a>                                           
                                                    <a href="https://www.facebook.com/PalaceResortsWeddings/" target="_blank">
                                                        <Iconwedd icon={"facebook-circled"} style={{ marginRight: "8px" }} color={"white"} />
                                                    </a>
                                                    <a href="https://www.instagram.com/palaceresortsweddings/?hl=es-la" target="_blank">
                                                        <Iconwedd icon={"instagram-circled"} style={{ marginRight: "8px" }} color={"white"} />
                                                    </a>
                                                    <a href="https://twitter.com/prweddings" target="_blank">
                                                        <Iconwedd icon={"twitter-circled"} style={{ marginRight: "8px" }} color={"white"} />
                                                    </a>
                                                    <a href="https://www.youtube.com/user/PalaceWeddings" target="_blank">
                                                        <Iconwedd icon={"youtube-circled"} color={"white"} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        </Cell>
                                    </Grid>
                                </Cell>
                                <Cell small-up="12" style={{ paddingTop: "35px" }}>
                                    <Grid type="x" >
                                        <Cell large="3">
                                            <ul className="resort-list-ul">
                                                <li className="resort-list">
                                                    <a href="https://palaceresorts.com" target="_blank" className="footer-link" rel="noopener">
                                                        PALACE RESORTS
                                                        <div className="line-rosy-horizontal-fot" ></div>
                                                    </a>
                                                    <Iconwedd icon={"chevron-right"} color={"white"} />
                                                </li>
                                                <li className="resort-list">
                                                <a href="https://meetings.palaceresorts.com" target="_blank" className="footer-link" rel="noopener">
                                                    MEETINGS
                                                        <div className="line-rosy-horizontal-fot" ></div>
                                                    </a>
                                                    <Iconwedd icon={"chevron-right"} color={"white"} />
                                                </li>

                                         
                                            </ul>
                                        </Cell>
                                        <Cell large="4" style={{marginLeft:"25px"}}>
                                        <ul className="resort-list-ul">
                                        <li className="resort-list">
                                                <a href="https://www.leblancsparesorts.com/" target="_blank" className="footer-link" rel="noopener">
                                                        LE BLANC SPA RESORT
                                                     
                                                        <div className="line-rosy-horizontal-fot"></div>
                                                    </a>
                                                    <Iconwedd icon={"chevron-right"} color={"white"} />
                                                </li>
                                                <li className="resort-list">
                                                <a href="https://www.palaceelite.com" target="_blank" className="footer-link" rel="noopener">
                                                        PALACE ELITE
                                                        <div className="line-rosy-horizontal-fot"></div>
                                                    </a>
                                                    <Iconwedd icon={"chevron-right"} color={"white"} />
                                                </li>
                                                </ul>
                                        </Cell>
                                        <Cell large="4"  style={{marginLeft:"25px"}}>
                                            <ul className="resort-list-ul">
                                            <li className="resort-list">
                                                    <a href="https://www.moonpalacecancun.com/" target="_blank" className="footer-link" rel="noopener">
                                                        MOON PALACE RESORTS
                                                        <div className="line-rosy-horizontal-fot" ></div>
                                                    </a>
                                                    <Iconwedd icon={"chevron-right"} color={"white"} />
                                                </li>
                                              
                                                <li className="resort-list">
                                                    <a href="https://www.palaceproagents.com" target="_blank" className="footer-link" rel="noopener">
                                                        { params.lang === "en" ? "TRAVEL AGENTS" : params.lang === "es" ? "AGENCIAS" : "TRAVEL AGENTS"}
                                                        <div className="line-rosy-horizontal-fot"></div>
                                                    </a>
                                                    <Iconwedd icon={"chevron-right"} color={"white"} />
                                                </li>
                                            </ul>
                                        </Cell>
                                    </Grid>
                                </Cell>
                           
                            </Grid>
                        </Cell>
                        <img style={{ position: "absolute", left: "50%", width: "1084px" }} alt="zia and nawrosepreet" component="cell" src={image.nawrosepreetfooter}></img>
                    </Grid>

                </div>
            </section>
        )
    }
}

export default withRouter(CommonLinks);