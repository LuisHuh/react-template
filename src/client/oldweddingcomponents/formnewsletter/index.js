import React, { Component } from 'react';
import { Input } from '../index';
import api from './../../app/Api';
import ReactDOMServer from 'react-dom/server';
import { withRouter } from 'react-router-dom';

// JSON Data
import jsonData from './../../locales/footer-newsletter';

class FormNewsletter extends Component {

    constructor(props) {
        super(props);
        this.email = React.createRef();
        this.thanks = React.createRef();
        this.sendHubspot = this.sendHubspot.bind(this)
        this.handleShow = this.handleShow.bind(this);
        this.checkForm = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.refForm = React.createRef();
        this.sendMail = this.sendMail.bind(this);
        this.state = {
            content: {},
            formOver:false
        };
    }

    componentDidMount() {

        this.email.current.addEventListener('click', this.handleShow.bind());
        const { match: { params } } = this.props;
        switch (params.lang) {
            case "es":
                this.setState({
                    content: {
                        title: jsonData.newsletter[1].title,
                        span: jsonData.newsletter[1].span,
                        placeholder: jsonData.newsletter[1].placeholder,
                        terms: jsonData.newsletter[1].terms,
                        offers: jsonData.newsletter[1].offers,
                        submit: jsonData.newsletter[1].submit
                    }
                });
                break;
            case "pt":
                this.setState({
                    content: {
                        title: jsonData.newsletter[2].title,
                        span: jsonData.newsletter[2].span,
                        placeholder: jsonData.newsletter[2].placeholder,
                        terms: jsonData.newsletter[2].terms,
                        offers: jsonData.newsletter[2].offers,
                        submit: jsonData.newsletter[2].submit
                    }
                });
                break;
            default:
                this.setState({
                    content: {
                        title: jsonData.newsletter[0].title,
                        span: jsonData.newsletter[0].span,
                        placeholder: jsonData.newsletter[0].placeholder,
                        terms: jsonData.newsletter[0].terms,
                        offers: jsonData.newsletter[0].offers,
                        submit: jsonData.newsletter[0].submit
                    }
                });
                break;
        }
    }

    handleShow() {
        if (innerWidth > 1024) {
            if (this.checkForm.current.classList[1] == null) {
                //this.checkForm.current.style = "height:170px"
                this.checkForm.current.classList.add("open-form")
            } 
        } else {
            if (this.checkForm.current.classList[1] == null) {
                this.checkForm.current.classList.add("open-form")
            }
        }
    }

    async sendHubspot(formData) {
        var querystring = require('querystring');
        /*enviar los campos tal cual como estan definidos en hubpot*/
        var postData = querystring.stringify({
            'email': formData.emailnewslettewr ,
            'hs_context': JSON.stringify({
                "pageUrl": "https://weddings.palaceresorts.com",
                "pageName": "Weddings Palace Resorts"
            })
        });
        api.sendHubspot(postData,"2fd8fbfb-7a08-4684-9e2a-cad5c4d0936d");
    }

    async handleSubmit(e) {
        e.preventDefault();
        api.loginEmail().then(
            res => {
                this.sendMail(res.data)
            }
        ).catch(e => console.error(e));
    }

    sendMail(res) {
        const email = "jmas@palaceresorts.com"
        var object = {}
        let formData = new FormData(this.refForm.current);
        formData.forEach((value, key) => { object[key] = value });
        let htmlbody = ReactDOMServer.renderToStaticMarkup(this.htmlDisplay(object))

        let emailData = {
            TO_ADDRESSES: email,
            CC_ADDRESSES: "",
            TEXTBODY: "Subscribe To Our Newsletter",
            HASH: "Subscribe To Our Newsletter",
            SUBJECT: "Subscribe To Our Newsletter",
            HTMLBODY: htmlbody,
            token: res.token
        }

        api.sendEmail(emailData).then(
            res => {
                
                this.setState({ formOver: true })
                this.sendHubspot(object);
            }
        ).catch(e => console.error(e));
    }

    htmlDisplay(object) {
        var fecha = new Date
        return (
            <div>
                <h1 style={
                    {
                        color: "#000000",
                        fontSize: "48px",
                        fontFamily: "Tangerine",
                        fontWeight: "normal",
                        textAlign: "center",
                        "marginBottom": "4px"
                    }
                }>Subscribe</h1>
                <h2 style={
                    {
                        color: "#f86290",
                        fontSize: "60px",
                        fontFamily: "Miso",
                        fontWeight: "300",
                        fontStretch: "normal",
                        fontStyle: "normal",
                        lineHeight: "1",
                        letterSpacing: "normal",
                        textAlign: "center",
                        textTransform: "uppercase",
                        margin: "0px",
                        marginBottom: "20px"
                    }
                }>Newsletter</h2>
                <p><h2>Submited on:</h2> {fecha.getDate()}/{(fecha.getMonth() + 1) >= 10 ? (fecha.getMonth() + 1) : "0" + (fecha.getMonth() + 1)}/{fecha.getFullYear()}</p>
                <p><h2>Email:</h2>  {object.emailnewslettewr} </p>
                <p><h2>I have read & I agree to the Terms & Conditions and Privacy Notice</h2> YES</p>
                <p><h2>I love getting deals! I wish to receive offers & other communications</h2> YES</p>

            </div>
        )
    }


    render() {

        let { content } = this.state;
        const { match: { params } } = this.props;

        return (
            <section component="FormNewsletter" className="FormNewsletter">
                <article className="container" id="subscribeContainer">

                {this.state.formOver?<p className="description" ref={this.thanks}>{params.lang=="en"?"Thank you, your submission has been received":"Gracias, su envío ha sido recibido"}</p>:
                    <form ref={this.refForm} onSubmit={this.handleSubmit}>
                        <div className="input-field-newsletter">
                            <span className="text-paris">{content.title}  </span> <span className="text-rosy"> {content.span}</span>
                            <Input required type={"email"} placeholder={content.placeholder} refInput={this.email} id={"emailnewsletter"} name={"emailnewslettewr"} />
                        </div>
                        <div className="content-check" ref={this.checkForm}>
                            <div className="checks">
                                <Input required type={"checkbox"} styleForm={"square"} name={"termsconditions"} id={"termsconditions" + this.props.type} title={content.terms} />
                            </div>
                            <div className="checks">
                                <Input required type={"checkbox"} styleForm={"square"} name={"receiveoffers"} id={"receiveoffers" + this.props.type} title={content.offers} />
                            </div>
                            <center className="content-submit">
                                <Input type={"submit"} color={"pink"} value={content.submit} />
                            </center>
                        </div>
                    </form>}
                </article>
            </section>
        )
    }
}
export default withRouter(FormNewsletter);