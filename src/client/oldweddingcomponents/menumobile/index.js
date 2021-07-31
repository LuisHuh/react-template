import React, {Component} from 'react';
import { FormNewsletter } from '..';
import { Link, withRouter } from "react-router-dom";
import { Iconwedd } from './../index';
import image from '@app/image.js';
import UseText from '@app/UseText';

class MenuMobile extends Component {

    constructor(props){
        super(props);
        this.menuLiMovil = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            currentLang: 'en'
        };
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ currentLang: params.lang });
    }

    handleChange = (e) => {
        const { history } = this.props;
        this.setState({ location: e.current });
        history.push(`/${e.target.value}`);
        window.location.reload();
    }


    componentDidUpdate(){
        let urlActual=window.location.pathname.split("/")
        let nav=this.menuLiMovil.current.children;

        for(let i=0;i<nav.length-1;i++){
            nav[i].children[0].children[0].className=""
            if(urlActual.length>2){
                let posUrl=nav[i].children[0].attributes[1].value.split("/");
                let selec=posUrl.length>2?posUrl[posUrl.length-1]:"noneDataCharge";
                if(urlActual[2]==selec){
                    nav[i].children[0].children[0].className="active"
                }else{
                    nav[i].children[0].children[0].className=""
                }
            }
        }
    }


        render() { 

           
        const internas = this.props.items.filter((element,index) => !element.hasOwnProperty('External'));
        const externas = this.props.items.filter((element,index) => element.hasOwnProperty('External'));

        const items = internas.map( (item,index) => {
            return (
            <li key={index} className="nav-item">
                <Link  onClick={this.props.handler.bind(this,1)} className="nav-link nav-link-weddings" to={item.Url}>
                    {item.Titulo}
                    <p className=""></p>
                </Link>
            </li>
            )
        })
       
        const items_websites = externas.map( (item,index) => {
            return (
            <li key={index} className="nav-item nav-external">
                <a className="nav-link" href={item.Url} target="_blank">
                    {item.Titulo}
                    <p className=""></p>
                </a>
            </li>
            )
        })

        let urlActual=window.location.pathname.split("/");

        const estilo = {
            textTransform: "uppercase"
        };

        const button =  (   
            <select className="select-lang" onChange={this.handleChange.bind(this)} value = { this.state.currentLang }  style = { estilo } >
                <option value="en">EN</option>
                <option value="es">ES</option>
            </select>
        );
                        
        return (
            <div component="menumobile">
                <div className="bg-top-menu-mobile" style={{paddingTop:'unset'}}>
                    {button}
                    <Iconwedd icon="chevron-down" color="white arrow-menu"></Iconwedd> 
                    <a href="https://co.pinterest.com/prweddings/" target="_blank" className="websites-external">
                        <Iconwedd icon={"pinterest-circled"} color={"pink center icon-social"}/>
                    </a>
                    <a href="https://www.instagram.com/palaceresortsweddings/?hl=es-la" target="_blank" className="websites-external">
                        <Iconwedd icon={"instagram-circled"} color={"pink center  icon-social"}/>
                    </a>
                    <a href="https://www.facebook.com/PalaceResortsWeddings/" target="_blank" className="websites-external">
                        <Iconwedd icon={"facebook-circled"} color={"pink center  icon-social"}/>
                    </a>
                    <a href="https://www.youtube.com/user/PalaceWeddings" target="_blank" className="websites-external">
                        <Iconwedd icon={"youtube-circled"} color={"pink center  icon-social"}/>
                    </a>
                    <a href="https://twitter.com/prweddings" target="_blank" className="websites-external">
                        <Iconwedd icon={"twitter-circled"} color={"pink center  icon-social"}/>
                    </a>
                </div>
                <div className="list-links">
                    <ul ref={this.menuLiMovil} className="menu-mobile-content">
                        {items}
                        {items_websites}
                        
                        <div><img className="menu-flores" src={image.menuflores}/></div>
                    </ul>
                    <FormNewsletter/>
                    <div className="contact">
                        <div style={{zIndex:99}}>
                        <span ><a style={{color:"var(--light-melon)"}} href="tel:1 (877) 725-4933">1 (877) 725-4933</a></span>
                        </div>
                        <div style={{color:"white"}}>
                        <span><UseText i18n="AVAILABLE" /> <UseText i18n="WEEKNAME_MON" /> - <UseText i18n="WEEKNAME_FRI" /> 9:00  a.m.-8:00 p.m. <UseText i18n="WEEKNAME_SAT" /> 9:00 a.m.-2:00 p.m. EST</span> <br/><span>weddings@palaceresorts.com</span>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    };
    
}

export default withRouter(MenuMobile);