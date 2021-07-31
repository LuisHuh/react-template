import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import { withRouter } from "react-router-dom"
import WithContext from '@app/ServiceContext';
import { Grid, Cell } from './../../components';
import { Iconwedd } from '..';

class FloatingMenu extends Component{

    constructor(props) {
        super(props);

        this.handleChat = this.handleChat.bind(this)

        this.state = {
            section : "TAKE THE NEXT STEP",
            link : "/en/take-next-step"
        }
    
    }

    static getDerivedStateFromProps(props, state) {
        let newProps = {};
        Object.keys(props).forEach(key => {
            if (props[key] != state[key]) {
                newProps[key] = props[key];
            }
        });
        return Object.keys(newProps).length > 0 ? newProps : null;
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        const { match: { url } } = this.props;

        //console.log("url -----",url)

        

        if (url != "/es/da-el-siguiente-paso" && url != "/es/ofertas/conoce-el-paraiso/da-el-siguiente-paso" && url != "/en/take-next-step" && url != "/en/offers/preview-paradise/take-next-step"){
            localStorage.setItem('formFinish', "true");
            // const { setData } = this.props.app.currentPage;
         //   setData("formFinish",true)
        }



        switch (params.lang) {
            case "es":
                if (url != "/es/da-el-siguiente-paso"){
                    this.setState({
                        section : "DA EL SIGUIENTE PASO",
                        link : "/es/da-el-siguiente-paso"
                    })
                }
                if (url == "/es/ofertas/conoce-el-paraiso"){
                    this.setState({
                        section : "DA EL SIGUIENTE PASO",
                        link : "/es/ofertas/conoce-el-paraiso/da-el-siguiente-paso"
                    })
                }
                if (url == "/es/da-el-siguiente-paso"){
                    this.setState({
                        section : "SIGUE EXPLORANDO",
                        link : "/es/"
                    })
                }                
            break;
            case "en":
                if (url != "/en/take-next-step"){
                    this.setState({
                        section : "TAKE THE NEXT STEP",
                        link : "/en/take-next-step"
                    })
                }
                if (url == "/en/offers/preview-paradise"){
                    this.setState({
                        section : "TAKE THE NEXT STEP",
                        link : "/en/offers/preview-paradise/take-next-step"
                    })
                }
                if (url == "/en/take-next-step"){
                    this.setState({
                        section : "KEEP GOING",
                        link : "/en/"
                    })
                }                
            break;
        }
        /*if (params.lang === "es") {
            this.setState({ section: "DA EL SIGUIENTE PASO" });
        }*/
    }
    handleChat() {
        // acquireIO.max();
    }

    render(){
        const { match: { params } } = this.props;
        return(
            <section className="floatingMenu container-fluid" component="floatingMenu">
                <Grid type="x" style={{paddingTop:(7/16)+"rem"}}>
                    <Cell small="2">
                        <center>
                            <a href={params.lang=="es"?"tel:018008416641":"tel:1 (877) 725-4933"}><Iconwedd icon={"phone-circled"} color={"white"} /></a>
                        </center>
                    </Cell>
                    <Cell small="8">
                      <Link to={this.state.link} className="btn-take-the-next-step" type="submit">{this.state.section}</Link>
                    </Cell>
                    <Cell small="2">
                        <center>
                            <button onClick = { this.handleChat.bind(this) }><Iconwedd icon={"chat-circled"} color={"white"} /></button>
                        </center>
                    </Cell>
                </Grid>
            </section>
        )
    }
}

export default withRouter(WithContext(FloatingMenu));