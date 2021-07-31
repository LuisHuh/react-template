import React from 'react';
import { Link } from "react-router-dom";
import { Input } from '../../oldweddingcomponents/wirefragment';
import { Sliders } from '../../oldweddingcomponents';

const Sliderprincipalslider = (props) => {
    const parents = props.slide.map((element, index) => {
        return (
            <div key={index} className={"content-item"}>
                <div className="items">{/*onLoad={props.scrollCenter}*/}
                    {element.urlIframe != null ? <div> <iframe className="desktop" src={element.urlIframe} width="100%" height="550"></iframe> <div className="fade"></div></div>: element.url != null ?
                        <Link to={element.url}>
                            <img alt={"Slider Image"} src={element.imageDesk} className="item-img-dream-desktop desktop" />
                        </Link>
                        :
                        <img alt={"Slider Image"} src={element.imageDesk} className="item-img-dream-desktop desktop" />
                    }
                    {element.urlIframe != null ?<div> <iframe className="movil iframeMovil" src={element.urlIframeMov} width="100%" ></iframe> <div className="fade"> </div></div>: element.url != null ?
                        <Link to={element.url}>
                            <img src={element.imageMov} alt={element.textAlt} className="item-img-dream-movil movil" />
                            <div className="movil slider-pr-url" className="movil">
                                    <center>
                                        {element.buttonTxt != null ?
                                            <Input to={element.url} type={"button"} typBtn={4} color={"pink"} value={element.buttonTxt} /> : <div className="rellerindo"></div>
                                        }
                                    </center>
                                </div>
                        </Link>
                        :
                        <>
                        <img src={element.imageMov} alt={"Slider Image"} className="item-img-dream-movil movil" />
                        </>
                    }
                    

                    {element.title != "" ?
                        <div className="container">
                            <section className="description-pr-sl " style={{ display: element.title != null ? "view" : "none" }}>
                                <div className="content-text-slider " style={{ display:"none"}}>

                                    <h1 style={{ display: element.title != null ? "view" : "none" }}>
                                        {element.title != null ? <span className="title-one">{element.title} </span> : ""}
                                        {element.title2 != null ? <span className="title-two"> {element.title2}</span> : ""}
                                    </h1>
                                    <p className="description">{element.description}</p>
                                    {element.buttonTxt != null ? <Input to={element.url} type={"button"} typBtn={1} color={"pink desktop"} value={element.buttonTxt} id={"dream" + index} name={"dream" + index} /> : ""}
                                </div>
                                <div className="movil slider-pr-url" className="movil">
                                    <center>
                                        {element.buttonTxt != null ?
                                            <Input to={element.url} type={"button"} typBtn={4} color={"pink"} value={element.buttonTxt} /> :""
                                        }
                                    </center>
                                </div>
                            </section>
                        </div>
                        : ""
                    }
                </div>
            </div>
        )
    });

    return (
        <article className={props.typeCaptionBg}>
            <Sliders ref={props.refSlide} tra nameSlide={"slider-principal"} viewItems={2}>
                {parents}
            </Sliders>
        </article>
    );
}
export default Sliderprincipalslider;