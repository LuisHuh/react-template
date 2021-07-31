import React, { Component } from 'react';
import { Grid, Cell, Collapsible} from '@components';
import Api from '@app/Api';
import Auth from '@app/Auth';
import { Redirect } from 'react-router-dom';
import { formatter } from "../../app/Helpers";
import WithContext from '@app/ServiceContext';

class TerminosView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{},
            accept:false
        };
        //default id HPR
        this.idsap =sessionStorage.iddef_sap_sociedad == undefined ? this.props.match.params.inSystem:sessionStorage.iddef_sap_sociedad
        //this.idsap = this.props.match.params.inSystem ==0  ? sessionStorage.iddef_sap_sociedad : ;

    }

    componentDidMount() {
        this.getTerms();
        //validamos que si esta en sesion y ya acepto los terminos no pueda acceder a la pagina
        if(sessionStorage.need_acept_termino != undefined){
            const need_acept_termino = formatter.parseBoolean(sessionStorage.need_acept_termino);
            if(!need_acept_termino && this.props.match.params.inSystem =="0"){
                this.setState({accept:true})
            }
        }

    }
    /**
     * se va abuscar los terminos segun el id sapsociedad
     *
     * @memberof TerminosView
     */
    getTerms(){

		Api.getTermsAndPoliticsBySociety(this.idsap)
		.then((res) => {
            if(!res.error)
				this.setState({data:res.data})
		})
		.catch((e) => {
            console.error("Data not foud")
		})
    }

    /**
     * recuperamos el html de los terminos y condiciones a mostrar
     *
     *
     * @returns
     * @memberof TerminosView
     */
    getTermsHtml(){
        let lanId = (this.props.app.languageId) ? this.props.app.languageId : 1 ;
        let hiden = this.props.match.params.inSystem !=0  ? 'none' :'';

        let Terms="", aviso="";
        Object.keys(this.state.data).map(i=> {

            if(i=="terminos_condiciones"){
                Terms = this.state.data[i][lanId];
            }
            if(i=="aviso_privacidad"){
                aviso=this.state.data[i][lanId];
            }
        });

        return <Grid type="x" className='grid-margin-x'>
            <Cell  medium='2' large='2'> </Cell>
            <Cell  medium='8' large='8'>
            {
               <div  widget="terminos"> <Collapsible header={"TERMS AND CONDITIONS"} openAtStart={true} className="termino">
                   <span dangerouslySetInnerHTML={{__html:Terms|| ""}} ></span>
                 </Collapsible></div>

            }
            <br/>
            {
                <div  widget="terminos"><Collapsible header={"PRIVACY NOTICE"}>
               <span dangerouslySetInnerHTML={{__html:aviso|| ""}} ></span>
                </Collapsible></div>
            }
            </Cell>
            <Cell  medium='2' large='2'></Cell>
            <Cell  medium='2' large='5'></Cell>
            <Cell  medium='8' large='4' widget="terminos">
            <div style={{ float: 'right',display:hiden }} >
                <button
                    style={{ float: 'none' }}
                    id='send'
                    onClick={(e) => {
                        this.setState({accept:true})
                        Auth.signout();
                    }}>
                   Cancel
                </button>&nbsp;
                <button
                    style={{ float: 'none' }}
                    id='send'
                    onClick={(e) => {
                        this.acceptterms()
                    }}>
                   Acept
                </button></div>

            </Cell>
            <Cell  medium='1' large='3'></Cell>
        </Grid>;
    }

    /**
     *mandamos a guardar cuando acepte los terminos
     *
     * @memberof TerminosView
     */
    acceptterms(){
        let data = {
            idevent_grupo:sessionStorage.id,
            iddef_sap_sociedad:sessionStorage.iddef_sap_sociedad,
            acepta_termino:'1',
        }
        const session = window.sessionStorage;
        Api.postAcceptTerms(data)
		.then((res) => {
            if(!res.error){
                session.setItem("need_acept_termino", false);
                this.setState({accept:true})
            }

		})
		.catch((e) => {
            console.error("error en termios y condiciones")
		})
    }

    render() {

        const { from } =  {from: { pathname: '/' } };
        if(this.state.accept){
            return <Redirect to={from} />
        }

        return (
            <Grid >
                {this.getTermsHtml()}
            </Grid>
        );
    }
}

export default WithContext(TerminosView);