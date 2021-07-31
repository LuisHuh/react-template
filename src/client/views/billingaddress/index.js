import Api from '@app/Api';
import Auth from '@app/Auth';
import { Cell, Checkbox, Grid, Page, Panel, Select, Subtitle, Input, Form, SendForm, Toast } from "@components";
import AddressCard from '@components/addressCard';
import { getCountries } from '@views/payments/APIs';
import React from 'react';
import { onlyNumbers, showValidateByName } from '@app/Helpers';

import WizardStep from '../../components/checkout/step/WizardStep';
import UseText from '@app/UseText';
import WithContext from '@app/ServiceContext';
class BillingAddressView extends WizardStep {
    constructor(props) {
        super(props);
        this.state = {
            slcListCountry: [],
            data: [],
            country_select: '',
            default_address: 0,
            defaultcard: null,
            iddefcliente_principal: 0,
            isLoading: false,
        };
        this.dataPrivaciti = {
            1: 'I expressly authorize Palace Resorts and its subsidiaries to incorporate the personal data stated in the present document to it respective data bases for the purposes identified in the ' ,
            2: 'Autorizo expresamente a Palace Resorts y a sus subsidiarias a incorporar los datos personales señalados en el presente documento a sus respectivas bases de datos para las finalidades identificadas en el ',
        };
        this.link = {
            1: 'Privacy Notice.',
            2: 'Aviso de Privacidad.',
        };
        this.updateBillAddress = this.updateBillAddress.bind(this);

    }

    componentDidMount() {
        this.getAddressByGroup();
        //  [ 'en' | 'es' ]
        getCountries('en', (r) => this.setState(r));
    }

    /**
     * Guarda los datos del formulario como una nueva dirección en Events y Profile
     * @param {e} e Object
     */
    addAddress(e) {
        if (!this.hasPendingFields()) {
            let info = Auth.userData();
            const { slcListCountry, country_select } = this.state;
            // let estado_iso = this.state.country_select
            let tmp_pais = slcListCountry.filter((j) => j.label == country_select);

            let pais_iso = '';
            if (tmp_pais.length > 0) pais_iso = tmp_pais[0].value;

            let requestbody = {
                fullName: this.state.firstname,
                apellido: this.state.lastname,
                address: this.state.address,
                country: this.state.country_select,
                city: this.state.city,
                zip: this.state.zip,
                direccion_principal: this.state.default_address,
                iddef_direccion_tipo: 1, // Temporalmente hardcodeado en 1 por indicación de atolentino
                id_contacto_main: info.id,
            };

            if (!this.hasPendingFields()) {
                this.setState({ isLoading: true }, () =>
                    Api.postBillingAddress(requestbody)
                        .then((response) => {
                            Toast({ html: "Great! Address saved successfully!" })
                            this.getAddressByGroup(true);
                            this.setState({
                                firstname: '',
                                lastname: '',
                                address: '',
                                country_select: '',
                                city: '',
                                zip: '',
                                default_address: '',
                                disabled: false,
                            });
                        })
                        .catch((err) => 
                            Toast({ html: "Wait! Something went wrong, please try again!" })
                        )
                        .finally(() => this.setState({ isLoading: false }))
                );
            }
        }
    }

    /**
     * API que regresa las direcciones por grupo
     */
    getAddressByGroup(readyToClean = false) {
        const { id } = sessionStorage;
        let data = [];
        Api.getAddressByGroup(id)
            .then((r) => {
                data = r.data || [];
            })
            .catch(error => Toast({html: "Error to return billing address"}))
            .finally(() =>
                this.setState({ data, isLoading: false },
                    () => readyToClean
                        ? this.setState({ fullname: '', city: '', zip: '', address: '' })
                        : readyToClean
                )
            );
    }

    /**
     * Funcion para actualizar direcciones
     * @param {[number|string]} id primary key
     * @param {object} obj payload
     * @param {()=>{}} then atSuccess
     * @param {[false|()=>{})]} ends at Ends
     */
    putAddress(id, obj, then = (r) => { }, ends = false) {
        obj = { ...obj, id };
        let resp = {};
        Api.putBillingAddress(obj)
            .then((r) => {
                resp = r;
            })
            .catch((err) => this.popAlert(true, 'Something went wrong'))
            .finally(ends ? ends : () => then(resp));
    }

    /**
     * Funcion para eventos de los cards (onClick)
     * @param {string} target
     * @param {number} idevent_billing_address
     */
    updateBillAddress(target, idevent_billing_address) {
        this.setState({ isLoading: true }, () => {
            if (target == 'remove') {
                this.putAddress(idevent_billing_address, { estado: 0 });
                const data = this.state.data.filter((item) => item.idevent_billing_address != idevent_billing_address);
                this.setState({ data, isLoading: false });
                return;
            } else if (target == 'default') {
                const last = this.state.data.filter((item) => item.default_address == '1');
                const reload = () => this.getAddressByGroup();
                const setDef = () =>
                    this.putAddress(idevent_billing_address, { estado: 1, default_address: 1 }, reload);
                // mayor a cero ('0')
                if (last.length)
                    this.putAddress(last[0].idevent_billing_address, { estado: 1, default_address: 0 }, setDef);
                else setDef();
            }
        });
    }

    /**
     * Funcion para guardar la direccion
     * @param {object} dataForm objecto de campos para la peticion
     * @param {function} resetForm metodo para reseatear el formulario
     */
    SaveForm(dataForm, resetForm) {
        //al momento de acceder a este metodo formulario ya ha sido validado
        //adiccional validar campos no controlados. ejemplo (select)
        if(this.state.country_select == "") {
            //se utiliza el metodo del helper showValidate (si se sabe el padre) o showValidateByName (si se busca por el nombre)
            showValidateByName("country_select",{ error:true,message:"Required" });
            return;
        }
        let info = Auth.userData();

        //se anexan campos adiccionales al json dataForm
        let requestbody =Object.assign({
            country: this.state.country_select,
            direccion_principal: this.state.default_address,
            iddef_direccion_tipo: 1, // Temporalmente hardcodeado en 1 por indicación de atolentino
            id_contacto_main: info.id,
        },dataForm);

        //se hace la peticion
        this.setState({ isLoading: true }, () =>
            Api.postBillingAddress(requestbody)
            .then((response) => {
                //se valida que exista returno el error
                if (response && response.error) return Toast({ html: 'Error: '+response.code +" "+response.message });
                //se manda un mensaje exito
                Toast({ html: 'Successful Action' });
                //se procede a limpiar el formulario
                this.getAddressByGroup(true);
                this.setState({
                    country_select: '',
                    default_address: 0,
                });
                //Se ejecuta el metodo de limpieza del formulario
                resetForm();
            })
            .catch((response) => {
                if (response && response.error) return Toast({ html: 'Error: '+response.code +" "+response.message });
                Toast({ html: 'Error: '+ response });
            })
            .finally(() => this.setState({ isLoading: false }))
        );
    }


    render() {
        let lanId = (this.props.app.languageId) ? this.props.app.languageId : 1 ;

        return (
            <section page='profile-billing-address'>
                <Page title='BILLING_ADDRESS' loading={this.state.isLoading}>
                    <Grid type='x' className='grid-margin-x grid-address-card' id='GridView1'>
                        {this.state.data.map((item, i) => {
                            //validacion si el arreglo de datos tiene algo
                            let fullName = (item.detalle_contacto) ? item.detalle_contacto.nombre +" "+ item.detalle_contacto.apellido.trim() ||
                            item.detalle_contacto.nombre_comercial:"";
                            let calle ="",cdPostal="",cd="";
                            if(item.detalle_direccion){
                                calle =item.detalle_direccion.calle;
                                cdPostal = item.detalle_direccion.codigo_postal;
                                cd = item.detalle_direccion.ciudad;
                            }
                            return (
                                <Cell small='12' medium='6' large="6" key={'card' + i}>
                                    <AddressCard
                                        fullname={fullName}
                                        calle={calle}
                                        codigo_postal={cdPostal}
                                        ciudad={cd}
                                        isDefault={item.default_address == '1'}
                                        idevent_billing_address={item.idevent_billing_address}
                                        onEdit={(key, id) => this.updateBillAddress(key, id)}
                                    />
                                </Cell>
                            )
                        } )}
                    </Grid>
                    <br></br>
                    <h4><UseText i18n="ADD_NEW_ADDRESS" /></h4>
                    {
                        <Panel className='profile-border'>
                            <Form id="addAdress" autovalidate="true" onSubmit={(data, resetForm) => this.SaveForm(data, resetForm)}>
                                <Grid type='x' className='grid-margin-x'>
                                    <Cell small="12">
                                        <Subtitle size={2}><UseText i18n="CREDIT_CARD_HOLDER" /></Subtitle>
                                        <br/>
                                    </Cell>
                                    <Cell small='12' medium='6' large='6'>
                                        <Input name='fullName' placeholder="FIRST_NAME" required={true}
                                         label={<Subtitle size={2}><UseText i18n="FIRST_NAME" /></Subtitle>} />
                                    </Cell>
                                    <Cell small='12' medium='6' large='6'>
                                        <Input name='apellido' placeholder="LAST_NAME" required={true}
                                         label={<Subtitle size={2}>{<UseText i18n="LAST_NAME" />}</Subtitle>} />
                                    </Cell>
                                    <Cell small='12' medium='12' large='12'>
                                        <Input
                                            name='address' placeholder="WRITE_AN_ADDRESS" required={true} type="textarea" rows={6}
                                            label={<Subtitle size={2}><UseText i18n="ADDRESS_VIEW" /></Subtitle>}
                                        />
                                    </Cell>
                                    <Cell small='12' medium='4' large='4'>
                                            <Select
                                                items={this.state.slcListCountry}
                                                name='country_select'
                                                value={this.state.country_select}
                                                label={<Subtitle size={2}><UseText i18n="COUNTRY" /></Subtitle>}
                                                autoComplete={false}
                                                closeOnClick={true}
                                                constrainWidth={true}
                                                required={true}
                                                onItemClick={(params) => {
                                                    this.setState({ [params.name]: params.value });
                                                    if(params.value == "") {
                                                        showValidateByName("country_select",{ error:true,message:"Required" });
                                                    }
                                                }}
                                            />
                                    </Cell>
                                    <Cell small='12' medium='4' large='4'>
                                        <Input
                                            name='city' placeholder={"CITY"} required={true}
                                            label={<Subtitle size={2}><UseText i18n="CITY" /></Subtitle>}
                                        />
                                    </Cell>
                                    <Cell small='12' medium='4' large='4'>
                                        <Input
                                            name='zip' placeholder="ZIP" minLength={5} maxLength={5} onKeyPress={(e) => { onlyNumbers(e); }} required={true}
                                            label={<Subtitle size={2}><UseText i18n="ZIP" /></Subtitle>}
                                        />
                                    </Cell>
                                    <Cell small='12' medium='12' large='12'>
                                        <br />
                                        <Checkbox className='filled-in' required={true}>
                                            <p>
                                                {this.dataPrivaciti[lanId]}
                                                <a
                                                    target='_blank'
                                                    style={{ color: 'black', textDecoration: 'underline' }}
                                                    href='/postlogin/terminos/1'>
                                                    {this.link[lanId]}
                                                </a>
                                            </p>
                                        </Checkbox>
                                    </Cell>
                                    <Grid style={{ textAlign: 'center', padding: '35px' }}>
                                        <SendForm><UseText i18n="ADD_ADDRESS" /></SendForm>
                                    </Grid>
                                </Grid>
                            </Form>
                        </Panel>
                    }
                </Page>
            </section>
        );
    }
}

export default WithContext(BillingAddressView);