import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Cell, Grid } from './../../components';
import { Iconwedd } from './../index';
import image from '@app/image.js';


const Submenu = (props) => {


    /*{onsole.log(props.Img)}*/

    if (props.menus != null) {
        if (props.title == "Our Resorts" || props.title == "Resorts") {
            let acumulador = [];
            const parents = props.menus.map((e, index) => {
                if (acumulador.length == 2) {
                    acumulador = []
                }
                if (index == 0) {
                    return (
                        <Cell key={index} large="4">
                            <li>
                                {/*<span className="wedding-sprite-desktop bg-mini-chevron-right-pink"></span>*/}
                                <Iconwedd icon={"chevron-right"} color={"light-melon"} />
                                &nbsp;
                                <Link className="parent" to={e['url']} >{e['Titulo']}</Link>
                                <ul>
                                    {e['menu'].map((a, index) => {
                                        return <li key={index} >
                                            {/*<span className="wedding-sprite-desktop bg-mini-chevron-right-pink"></span>*/}
                                            <Iconwedd icon={"chevron-right"} color={"light-melon"} />
                                            <Link key={index} className={props.active == a.Url ? "active" : ""} to={a.Url}>{a.Titulo}</Link>
                                        </li>
                                    }
                                    )}
                                </ul>
                            </li>
                        </Cell>)
                } else {
                    acumulador.push(
                        <li key={index}>
                            {/*<span className="wedding-sprite-desktop bg-mini-chevron-right-pink"></span>*/}
                            <Iconwedd icon={"chevron-right"} color={"light-melon"} />
                            &nbsp;
                        <Link className="parent" to={e['url']} >{e['Titulo']}</Link>
                            <ul>{e['menu'].
                                map((a, index) => {
                                    return (
                                        <li key={index} >
                                            <Iconwedd icon={"chevron-right"} color={"light-melon"} />
                                            {/*<span className="wedding-sprite-desktop bg-mini-chevron-right-pink"></span>*/}
                                            <Link key={index} className={props.active == a.Url ? "active" : ""} to={a.Url}>{a.Titulo}</Link></li>)
                                })}
                            </ul>
                        </li>);
                }
                if (acumulador.length == 2) {
                    return <Cell key={index} className="auto">{acumulador}</Cell>;
                } else if (index == 5) {
                    return <Cell key={index} className="auto">{acumulador}</Cell>;
                }

            })
            return <ul onMouseLeave={props.mouseout} component="submenu">
                <div className="container">
                    <div><span>By Destination</span></div>
                    <Grid type="x">{parents}<Cell><img style={{ position: "absolute", top: "0", width: "auto", left: "70%", height: "100%" }} src={image.submenuourresort}></img></Cell></Grid>
                </div></ul>
        } else {
            let acumulador = [];
            const parents = props.menus.map((e, index) => {

                switch (props.title) {
                    case "Destination Weddings":
                    case "Destinos de Bodas":
                        if (acumulador.length == 2) {
                            acumulador = []
                        }

                        acumulador.push(<li key={index}>
                            <Iconwedd icon={"chevron-right"} color={"light-melon"} />
                            <Link className={props.active == e['Url'] ? "active" : ""} to={e['Url']}>{e['Titulo']}</Link></li>);

                        if (acumulador.length == 2) {
                            return <Cell key={index}>{acumulador}</Cell>;
                        }
                        break;
                    case "Planning":
                        if (acumulador.length == 2) {
                            acumulador = []
                        }

                        acumulador.push(<li key={index}>
                            <Iconwedd icon={"chevron-right"} color={"light-melon"} />
                            <Link className={props.active == e['Url'] ? "active" : ""} to={e['Url']}>{e['Titulo']}</Link></li>);

                        if (acumulador.length == 2) {
                            return <Cell key={index}>{acumulador}</Cell>;
                        }
                        break;
                    case "Planeación":
                            if (acumulador.length == 2) {
                                acumulador = []
                            }

                        acumulador.push(<li key={index}>
                            <Iconwedd icon={"chevron-right"} color={"light-melon"} />
                            <Link className={props.active == e['Url'] ? "active" : ""} to={e['Url']}>{e['Titulo']}</Link></li>);

                        if (acumulador.length == 2) {
                            return <Cell key={index}>{acumulador}</Cell>;
                        }else if(index==2){
                            return <Cell key={index}>{acumulador}</Cell>;
                        }
                        break;
                    case "Religious & Cultural Offerings":
                    case "Ceremonias Religiosas y Culturales":
                        if (acumulador.length == 3) {
                            acumulador = []
                        }

                        acumulador.push(<li key={index}>
                            <Iconwedd icon={"chevron-right"} color={"light-melon"} />
                            <Link className={props.active == e['Url'] ? "active" : ""} to={e['Url']}>{e['Titulo']}</Link></li>);

                        if (acumulador.length == 3) {
                            return <Cell key={index}>{acumulador}</Cell>;
                        }

                        break;
                    default:
                        break;
                }

            })
            return <ul onMouseLeave={props.mouseout} component="submenu">
                <div className="container padding20">
                    <Grid type="x" small-up="4">{parents}</Grid>
                    <img src={props.Img} style={{ position: "absolute", left: "67%", width: "725px", top: "0", height: "100%" }}></img>
                </div>
            </ul>;
        }
    } else {
        return (<span></span>)
    }
};

export default Submenu;