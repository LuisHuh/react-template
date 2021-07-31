import React, {Component} from 'react';
import {Grid, Cell } from './../../components';
import {Link,withRouter} from 'react-router-dom'
import WithContext from '@app/ServiceContext';
import UseText from '@app/UseText';


class MenuResorts extends Component {

    constructor(){
        super();
        this.changeMenuHandler = this.changeMenuHandler.bind(this);
    }

    changeMenuHandler(menuRecive,e){
       e.preventDefault()
        if(menuRecive==1){
            this.aElement.classList.remove("button-switcher-inactive");
            this.a2Element2.classList.add("button-switcher-inactive");
            this.elElement.classList.remove("d-none");
            this.divElement.classList.add("d-none");
            
        }else{
            this.aElement.classList.add("button-switcher-inactive");
            this.a2Element2.classList.remove("button-switcher-inactive");
            this.elElement.classList.add("d-none");
            this.divElement.classList.remove("d-none");
            
        }
    }

    render(){
        const { match: { params } } = this.props;
        let acumulador = [];
        const items = this.props.items.map( (item,index) => {
            if (acumulador.length==2){
                acumulador = []
            }
         
            acumulador.push(<Cell  key={index} className="col image">
                        <div onClick={this.props.handler.bind(this,2)}  className="clip">
                        <Link  to={item.url}>
                            
                                <span className={item.Titulo.length>13?"floating-text top-pading-spl":"floating-text"}>{item.Titulo}</span>
                            
                              <img className="img-by-dest" src={item.Img}/>
                        </Link>
                            </div>
            </Cell>)

            if (acumulador.length == 2) {
                return  <div   key={index}  type="x" small-up="2" className="row "> {acumulador} </div>
            }
        });


        const items2 = this.props.items.map((item)=>{
            let islandscape = window.matchMedia("(orientation: landscape)").matches
            if(item["menu"]!=null){
               return item["menu"].map((element,index)=>{
                return <li  onClick={this.props.handler.bind(this,2)}   key={index} className="nav-item">
                    <Link to={element['Url']}>
                <img className="img-our-resorts" src={element['Img']}/>{/*63px*/}
                    <span className="nav-link nav-link-weddings" >{element['Titulo']}</span>
                    </Link>
                </li>
               })
            }else{
                return (<span></span>)
            }
        });
        return (
                
            <div component="menuresorts">
                <div className="bg-top-menu">
                    <a onClick={this.changeMenuHandler.bind(this,1)} ref={a =>this.aElement = a } className={'button-switcher '} href="#">{params.lang=="es"?"RESORTS":"OUR RESORTS"}</a>
                    <a onClick={this.changeMenuHandler.bind(this,2)} ref={a2 =>this.a2Element2 = a2 } className={'button-switcher button-switcher-inactive'} href="#">{params.lang=="es"?"POR DESTINO":"BY DESTINATION"}</a>
                </div>
                <div ref={div => this.divElement = div } className="list-links items-Destinations d-none">
                    <div className="landscape">
                    {items}
                    </div>
                    <br/>
                    <div className="contact">
                        <div>
                        <span ><a style={{color:"var(--light-melon)"}} href="tel:1 (877) 725-4933">1 (877) 725-4933</a></span>
                        </div>
                        <div>
                        <span><UseText i18n="AVAILABLE" /> <UseText i18n="WEEKNAME_MON" /> - <UseText i18n="WEEKNAME_FRI" /> 9:00  a.m.-8:00 p.m. <UseText i18n="WEEKNAME_SAT" /> 9:00 a.m.-2:00 p.m. EST</span> <br/><span>weddings@palaceresorts.com</span>
                        </div>
                    </div>
                </div>
                <ul  ref={ul => this.elElement = ul}className="list-links items-Resorts">
                    {items2}
                    <br/>
                    <div className="contact">
                        <div>
                            <span ><a style={{color:"var(--light-melon)"}} href="tel:1 (877) 725-4933">1 (877) 725-4933</a></span>
                        </div>
                        <div>
                        <span><UseText i18n="AVAILABLE" /> <UseText i18n="WEEKNAME_MON" /> - <UseText i18n="WEEKNAME_FRI" /> 9:00  a.m.-8:00 p.m. <UseText i18n="WEEKNAME_SAT" /> 9:00 a.m.-2:00 p.m. EST</span> <br/><span>weddings@palaceresorts.com</span>
                        </div>
                    </div>
                </ul>
               
            </div>
        )
    }
}


export default withRouter(WithContext(MenuResorts));
