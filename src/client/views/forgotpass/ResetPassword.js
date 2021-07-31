import React, { Component,createRef } from 'react';
import { Redirect } from 'react-router-dom';
import Api from '@app/Api';
import Auth from '@app/Auth';
import { getToken } from '@app/Helpers';
import { Grid, Cell, Panel } from '@components';
import { updateLink } from '@views/payments/APIs';
import UseText from '@app/UseText';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isValidPass: false,
            showmessage: true,
            message: '',
            MessageUrl: '',
            isvalidUrl: false,
            dataDecode: {},
            pwsStrong:false,
            ischange:false,
            email:'',
            idtokenlink:0,
            confpass:'pr-eye-slash',
            newpass:'pr-eye-slash'
        };

        this.showText = this.showText.bind(this);
        this.validatepass = this.validatepass.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.sendData = this.sendData.bind(this);
        this.input = createRef();
    }

    componentDidMount() {
        this.validateUrl();
    }

    /**
     * metodo para mostrar el texto en los inputs type password
     * @param {*} id
     */
    showText(id) {
        let tipo = document.getElementById(id).type;
        document.getElementById(id).type = tipo == 'password' ? 'text' : 'password';
        this.setState({[id]: tipo == 'password' ?  'pr-eye':'pr-eye-slash'})
    }

    /**
     * metodo que valida que las contraseñas coincidan
     */
    validatepass() {
        let pass = this.input.current.value;
        let isvalid=false;
        let confirmpass = event.target.value;
        let notValid = /\s/;
        let msg='';
        if (notValid.test(confirmpass)) {
            msg='SPACES_NOT_ALLOWED';
            isvalid=false;
        }
        isvalid = (pass !="" && !notValid.test(confirmpass)) ? confirmpass.trim() == pass.trim() : false;
        if(this.state.pwsStrong) this.setState({ isValidPass: isvalid, showmessage: isvalid,message: msg  });
    }

    /**
     * metodo que recupera los datos del formulario
     */
    getDataForm(form) {
        let data = {};
        let elements = form.elements;
        for (var i = 0; i < elements.length; i++) {
            let element = elements[i];
            if (element.nodeName == 'INPUT') {
                data[element.name] = element.value.trim();
            }
        }
        return data;
    }

    /**
     * metodo que actualiza la contraseña
     */
    sendData() {
        event.preventDefault();
        let data = this.getDataForm(event.target);
        data.id = this.state.dataDecode.id_group;
        Api.changePassword(sessionStorage.id, data, Auth.getAuthorizationHeader())
            .then((res) => {
                updateLink(this.state.idtokenlink);
                let mess = 'Your password was changed successfully';
                this.setState({ message: res.error ? res.message : mess ,ischange:true});
            })
            .catch((e) => {
                this.setState({
                    message: e.code == 400 ? <UseText i18n="CONTACT_WEDDINGPLANNER" /> : e.message,
                });
            });
    }

    /**
     * metodo que valida que el token no este vencido.
     *
     * @returns
     * @memberof ResetPassword
     */
    validateUrl() {

        const url = this.props.location.hash;
        if (url.trim() == '')
            return this.setState({
                isvalidUrl: false,
                MessageUrl: <UseText i18n="VALID_URL" />,
            });

        Api.PaymentHashRequest({ body: getToken(this.props) })
            .then((res) => {

                Api.GetLink(res.data.idToken)
                    .then((response) => {
                        let dat = JSON.parse(response.data.data);
                        //validamos que este activo el link
                        if(response.data.status==1){
                            this.setState({ isvalidUrl: true, dataDecode:dat ,email:dat.email,idtokenlink:res.data.idToken});
                        }else{
                            this.setState({ isvalidUrl: false, MessageUrl: <UseText i18n="URL_EXPIRED" /> });
                        }
                    })
                    .catch((e) => {
                        this.setState({ isvalidUrl: false, MessageUrl: <UseText i18n="VALID_URL" /> });
                    });
            })
            .catch((e) => {
                this.setState({ isvalidUrl: false, MessageUrl: <UseText i18n="VALID_URL" /> });
            });
    }

    /**
     * metodo que evalua el nivel de una contraseña.
     *
     * @returns
     * @memberof ResetPassword
     */
    validatePassword(event) {
        event.preventDefault();
        let passconf = document.getElementById('confpass');
        let passValue = event.target.value;

        let notValid = /\s/;
        let mediumRegex = new RegExp(
            '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})'
        );
        let strongRegex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#.$%-^_&*]{8,}$/;
        let textValue = '';
        let strval=false;
        if (!notValid.test(passValue)) {
            if (strongRegex.test(passValue)) {
                textValue = 'PASSWORD_STRONG';
                strval=true
                this.setState({ pwsStrong:strval});
            } else if (mediumRegex.test(passValue)) {
                textValue = 'MEDIUM_PWS_MESSAGE';
                strval=false;
                this.setState({ pwsStrong:strval});

            } else {
                textValue = 'PASSWORD_TOO_SHORT';
                strval=false;
                this.setState({ pwsStrong:strval});
            }
        } else {
            textValue = 'SPACES_NOT_ALLOWED';
        }

        if(passValue.trim() != ""){
            if(passValue !==passconf.value ) {
                 this.setState({ isValidPass: false, showmessage: true });
            }else{
                if(strval) this.setState({ isValidPass: true, showmessage: true });
            }
        }

        if (textValue != this.state.message) return this.setState({ message: textValue });
    }

    render() {

        const { from } =  {from: { pathname: '/login' , state:{emailFromChangePsw:this.state.email}}};
        if(this.state.ischange){
            return <Redirect to={from}  />
        }

        if (!this.state.isvalidUrl) {
            return (
                <Grid type='x' className='grid-margin-x'>
                    <Cell medium='1' large='1'></Cell>
                    <Cell small='12' medium='10' large='10'>
                        <Panel style={{ marginTop: '10%' }}>
                            <Grid type='x'>
                                <Cell small='12' medium='12' large='12'>
                                    <center>
                                        <i className='prs pr-alert pr-7x' style={{ color: '#bf914d ' }}></i>
                                    </center>
                                </Cell>
                                <br></br>
                                <Cell small='12' medium='12' large='12'>
                                    <center>
                                        <span style={{ color: '#E76600 ' }}>{this.state.MessageUrl}</span>
                                    </center>
                                </Cell>
                            </Grid>
                        </Panel>
                    </Cell>
                    <Cell medium='1' large='1'></Cell>
                </Grid>
            );
        }
        return (
            <Grid page='changepass' className='grid-margin-x'>
                <Cell small='12' medium='12' large='12'>
                    <center style={{ paddingTop: '1rem' }}>
                        <span>Create New password</span>
                    </center>
                </Cell>
                <Cell medium='2' large='2'></Cell>
                <Cell small='12' medium='8' large='8'>
                    <div component='changepass'>
                        <form
                            id='resetpass'
                            action=''
                            onSubmit={() => {
                                this.sendData();
                            }}>
                            <Grid type='x' className='grid-margin-x'>
                                <Cell medium='2' large='2'></Cell>
                                <Cell className='input-group' small='12' medium='8' large='8'>
                                    <div className='input-view input-field'>
                                        <label htmlFor='newpass' className='active'>
                                        <UseText i18n="NEW_PASSWORD" />
                                        </label>
                                        <span>
                                            <i
                                                className={'prs '+this.state.newpass+' pr-lg inside'}
                                                name='currentpass'
                                                onClick={() => this.showText('newpass')}
                                            />
                                        </span>
                                        <input
                                            id='newpass'
                                            name='newpass'
                                            type='password'
                                            className='validate'
                                            ref={this.input}
                                            onChange={this.validatePassword}
                                        />
                                    </div>
                                </Cell>
                                <Cell medium='2' large='2'></Cell>
                                <Cell medium='2' large='2'></Cell>
                                <Cell className='input-group' small='12' medium='8' large='8'>
                                    <div className='input-field input-view'>
                                        <label htmlFor='confpass' className='active'>
                                        <UseText i18n="RE_ENTER_PASSWORD" />
                                        </label>
                                        <span>
                                            <i
                                                className={'prs '+this.state.confpass+' pr-lg inside'}
                                                name='currentpass'
                                                onClick={() => this.showText('confpass')}
                                            />
                                        </span>
                                        <input
                                            id='confpass'
                                            name='confpass'
                                            type='password'
                                            className='validate'
                                            onChange={this.validatepass}
                                        />
                                    </div>
                                    <span style={{ color: '#E76600 ' }}>
                                        {this.state.showmessage
                                            ? ''
                                            : <UseText i18n={'ENTERED_PASSWORD_DONT_MATCH'} />}
                                    </span>
                                    <span style={{ color: '#E76600 ' }}>{<UseText i18n={this.state.message} />}</span>
                                </Cell>
                                <Cell medium='2' large='2'></Cell>
                                <Cell small='12' medium='12' large='12'>
                                    <center>
                                        <button
                                            className='button'
                                            disabled={!this.state.isValidPass}
                                            form='resetpass'
                                            type='submit'>
                                            <UseText i18n="SAVE_SIGN_IN" />
                                        </button>
                                    </center>
                                </Cell>
                                <Cell medium='2' large='2'></Cell>
                                <Cell small='12' medium='8' large='8'>
                                    <span>
                                        <li type='circle'>
                                            {' '}
                                            <UseText i18n="RULE_CHANGE_PWS1" />
                                        </li>
                                        <li type='circle'>
                                            {' '}
                                            <UseText i18n="RULE_CHANGE_PWS2" />
                                        </li>
                                        <li type='circle'>
                                            {' '}
                                            <UseText i18n="RULE_CHANGE_PWS3" />
                                        </li>
                                    </span>
                                </Cell>
                                <Cell medium='2' large='2'></Cell>
                            </Grid>
                        </form>
                    </div>
                </Cell>
                <Cell medium='2' large='2'></Cell>
            </Grid>
        );
    }
}
