import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Iconwedd from '../iconwedd';

export default class Titlesection extends Component {

    componentDidMount() {
    }
    render() {
        let content = this.props
        return (
            this.props.header != null ?
                <header component="titlesection" className="palace-header">
                    {this.props.btnOffers != null ? content.urlBtnBack == null ? "" : content.urlBtnBack == "" ? "" :
                        <div className="container 1">
                            <a onClick={()=>{window.history.back();}} style={{cursor:"pointer"}} className="arrow">
                                <div className="">{content.urlBtnBack[1]}</div>
                                <Iconwedd icon={"chevron-left"} color={"light-melon"} />
                            </a>
                        </div> : ""
                    }
                    {content.icon == null || content.icon == "" ? "" : <div style={{ margin: "auto", width: "fit-content" }}><Iconwedd style={{ margin: "center" }} icon={content.icon} color={content.color} /></div>}
                    {content.title == null ? "" : content.title == "" ? "" : <h1 className="title">{ (content.title+" ")}</h1>}
                    {content.subtitle == null ? "" : content.subtitle == "" ? "" : <h2 className="subtitle container">{ (content.subtitle)}</h2>}                    {content.description == null ? "" : content.description == "" ? "" : <p className="description">{ (content.description)}</p>}
                    {content.children == null ? "" : content.children == "" ? "" : this.props.children}
                    {this.props.btnOffers == null ? content.urlBtnBack == null ? "" : content.urlBtnBack == "" ? "" :
                        <div className="container 4">
                            <a onClick={()=>{window.history.back();}} style={{cursor:"pointer"}} className="arrow">
                                 <div className="">{content.urlBtnBack[1]}</div>
                                <Iconwedd icon={"chevron-left"} color={"light-melon"} />
                            </a>
                        </div> : ""
                    }
                </header>
                :
                <article component="titlesection" className="titlesection">
                    {this.props.btnOffers != null ? content.urlBtnBack == null ? "" : content.urlBtnBack == "" ? "" :
                        <div className="container 2">
                            <a onClick={()=>{window.history.back();}} style={{cursor:"pointer"}} className="arrow">
                                <div className="">{content.urlBtnBack[1]}</div>
                                <Iconwedd icon={"chevron-left"} color={"light-melon"} />
                            </a>
                        </div> : ""
                    }
                    {content.icon == null || content.icon == "" ? "" : <div style={{ margin: "auto", width: "fit-content" }}>
                        <Iconwedd style={{ margin: "center" }} icon={content.icon} color={content.color} /></div>}
                    {content.title == null ? "" : content.title == "" ? "" : <h1 className="title">{ (content.title)}</h1>}
                    {content.subtitle == null ? "" : content.subtitle == "" ? "" : <h2 className={content.classAdd ? "subtitle "+content.classAdd : "subtitle"}>{ (content.subtitle)}</h2>}
                    {content.description == null ? "" : content.description == "" ? "" : <p className="description">{ (content.description)}</p>}
                    {content.children == null ? "" : content.children == "" ? "" : this.props.children}
                    {this.props.btnOffers == null ? content.urlBtnBack == null ? "" : content.urlBtnBack == "" ? "" :
                        <div className="container 3">
                            <a onClick={()=>{window.history.back();}} style={{cursor:"pointer"}} className="arrow">
                                <div className="">{content.urlBtnBack[1]}</div>
                                <Iconwedd icon={"chevron-left"} color={"light-melon"} />
                            </a>
                        </div> : ""
                    }
                </article>
        )
    }
}
