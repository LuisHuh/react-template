
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Api from '@app/Api';
import Auth from '@app/Auth';
import UseText from '@app/UseText';
import { Grid, Cell, Panel,Input,Form,SendForm,Subtitle} from '@components';

export default class RecoverPassword extends Component {
   constructor(props){
      super(props);
      this.state = {
          message:"",
      };
    this.setMessage = this.setMessage.bind(this);

   }


    // /**
    //  * metodo que recupera los datos del formulario
    // */
    // getDataForm(form){
    //     let data ={};
    //     let elements = form.elements;
    //     for(var i = 0; i < elements.length; i++){
    //         let element = elements[i];
    //         if(element.nodeName == 'INPUT'){
    //             data[element.name]=element.value;
    //         }
    //     }
    //     return data;
    // }

    /**
     * metodo que actualiza la contraseña
    */
    sendData(data,resetForm){

        if(data.folio.trim()==""){
            let dat = {
                error:true,
                message: "PLEASE_ENTER_FOLIO_NUMBER"
            };
            return this.setMessage(false,dat);
        }

        Api.getelementbyfolio(data.folio.trim())
        .then((res) => {
            if (!res.error) {
                res.data.lang = sessionStorage.langWeddings;
                return this.sendEmail(res.data,resetForm);
            }

        })
        .catch((e) => {
            this.setMessage(true, "NOT_FOUND_FOLIO");
            // manejo de Excepciones al usuario
        })
    }

    /**
     *metodo que envia un correo si existen datos segun el blockcode
     *
     * @param {*} data
     * @memberof RecoverPassword
     */
    sendEmail(data,resetForm){
        Api.SendEmailtoChangePassword(Auth.getAuthorizationHeader(), data)
        .then((res) => {
            this.setMessage(false,res.data);
            resetForm();
        })
        .catch((e) => {
            this.setMessage(true, "error to send email");
        })
    }

    /**
     * metodo que devuelve un mensage de error
     *
     * @param {*} isCatch
     * @param {*} data
     * @memberof RecoverPassword
     */
    setMessage(isCatch,data){
        let message = (isCatch) ? "An error has occurred, contact your wedding specialist, " :(data.error) ? data.message :"An email has been sent to the registered email.";
        this.setState({message:message});

    }

    render() {
        return (
            <Grid page="changepass" className="raised-centered-card">
                <Cell small="12" medium="12" large="12" className="title-3">
                    <center style={{paddingTop:"1rem"}}>
                        <span> <UseText i18n="PASSWORD_RECOVERY" /> </span>
                    </center>
                </Cell>
                <Panel className="bg-curtains">
                    <center>
                        <Grid type="x" className="grid-margin-x">
                        <Cell medium="2" large="2"></Cell>
                        <Cell small="12" medium="8" large="8">
                            <Form id="createlink" autovalidate="true" onSubmit={(data, resetForm) => this.sendData(data, resetForm)}>
                                <Grid type="x" className="grid-margin-x grid-margin-y">
                                <Cell small='12' medium='12' large='12' > <UseText i18n="PASSWORD_RECOVERY_INSTRUCTIONS" /> </Cell>
                                <Cell small='12' medium="12" large="12">
                                    <Input
                                        name="folio"
                                        label={<Subtitle size={2}>{<UseText i18n="ENTER_FOLIO_NUMBER" />}</Subtitle>}
                                        required={true}
                                        placeholder="ENTER_FOLIO_NUMBER"

                                    />
                                    </Cell>
                                    <Cell  small="12" >
                                        <SendForm> <UseText i18n="SEND" /></SendForm>
                                    </Cell>
                                    <Cell small="12">
                                        <Link to="/login">
                                            <span className="pink-text-link"> &laquo; <UseText i18n="BACK_TO_LOGIN" /> </span>
                                        </Link>
                                    </Cell>
                                    </Grid>
                            </Form></Cell>
                            <Cell medium="2" large="2"></Cell>
                        </Grid>
                        <span style={{color: "#E76600 "}}><UseText i18n={this.state.message} /> </span>
                    </center>
                </Panel>
            </Grid>
         )}
    }
