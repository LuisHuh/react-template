import Api from '@app/Api';
import Auth from '@app/Auth';
import UseText from '@app/UseText';
import { Cell, Fieldset, Grid, Legend, Page, Panel, Subtitle,Input, Card} from '@components';
import React, { Component } from 'react';
import WeddingPlannerInfo from './WeddingPlannerInfo';

export default class GeneralInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            bride: '',
            groom: '',
            lastbride: '',
            lastgroom: '',
            country: '',
            zip: '',
            area: '',
            phone: '',
            principal: '',
            aditional: '',
            ciudad: '',
            codigo_postal: '',
            country: '',
            phone_pais: '',
            phone_area: '',
            phone_number: '',
            principal_email: '',
            aditional_email: '',
            id: '',
            pais: [],
            bearer: {},
            adress: {},
            lead: {},
            profile: {},
            telephone: {},
        };
        this.validation = this.validation.bind(this);
        this.getEventsGroup = this.getEventsGroup.bind(this);
    }

    componentDidMount() {
        this.apiPais('es');
        const info = Auth.userData();
        const token = Auth.getAuthorizationHeader();
        const bearer = { authorization: `${token}` };
        const bride_name = info.bride;
        const bride = bride_name.split(', ');
        const groom_name = info.groom;
        const groom = groom_name.split(', ');
        this.setState({
            bearer: bearer,
            id: info.id,
            bride: bride[1] || bride,
            groom: groom[1] || groom,
            lastbride: bride[0],
            lastgroom: groom[0],
        });
        this.apiGeneralInformation(info.blockcode);
    }

    /**
     * API que regresa información de profile
     * @param : blockcode
     * @type : Get
     */
    apiGeneralInformation(blockcode) {
        Api.getGeneral(blockcode)
            .then(response => (response && typeof response === 'object') ? response : Promise.reject(response))
            .then(response => response.error ? Promise.reject(response) : (response.data || {}))
            .then(data => {
                // Objetos dentro de data
                data = data || {};
                const profile = data.profile || {};
                const telephone = data.telephone || {};
                const adress = data.adress || {};

                // Valores a mostrar en la vista
                this.setState({
                    ciudad: adress.ciudad || '',
                    codigo_postal: adress.codigo_postal || '',
                    country: adress.descripcion_Pais || '',
                    phone_pais: telephone.telefono || '',
                    phone_area: (telephone.phone_area || '').substr(1, 3),
                    phone_number: (telephone.telefono || '').substr(3, 7),
                    principal_email: profile.email || '',
                    aditional_email: profile.email_alterno || '',
                });
            })
            .catch((err) => {
                console.error('Err datos del usuario', err);
            });
    }

    /**
     * API que regresa los paises.
     * @param : idioma  en/es
     * @type : Get
     */
    apiPais(idioma) {
        Api.getPais(idioma)
            .then((response) => {
                const datos = response.data || [];
                var data = Object.keys(datos).map(function (item) {
                    return { label: datos[item], value: item };
                });
                this.setState({ pais: data });
            })
            .catch((err) => {
                console.error('Err datos del usuario', err);
            });
    }

    /**
     * API que guarda la información del domicilio.
     * @param : idioma  en/es
     * @type : Get
     */
    getEventsGroup() {
        // Validaciones
        if (this.state.error == true || this.state.error_vacio == true) {
            alert('Los datos ingresados son incorrectos');
        }

        let objeto2 = {
            id: this.state.id,
            nombre_novia: this.state.lastbride + ', ' + this.state.bride,
            nombre_novio: this.state.lastgroom + ', ' + this.state.groom,
        };

        Api.putEventsGroup(objeto2, this.state.bearer)
            .then((response) => {
                this.setState({});
            })
            .catch((err) => {
                console.error('Err datos del usuario', err);
            });
    }

    /**
     * Función para las validaciones.
     * @param : value, inputId
     */

    validation(value, inputId) {
        if (value === '' || value === null) {
            this.setState({
                error_vacio: true,
            });
        } else {
            this.setState({
                error_vacio: false,
            });
        }

        if (inputId == 'country' || inputId == 'area' || inputId == 'phone') {
            var key = /^\d*$/.test(value);
            if (key == false) {
                this.setState({
                    error: true,
                });
            } else {
                this.setState({
                    error: false,
                });
            }
        } else if (inputId == 'principal' || inputId == 'aditional') {
            var key = /[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(value);
            if (key == false) {
                this.setState({
                    error: true,
                });
            } else {
                this.setState({
                    error: false,
                });
            }
        }
    }

    render() {
        return (
            <section page='profile-general-info'>
                <Page title='GENERAL_INFORMATION'>
                    <br/>
                    <Card>
                        <WeddingPlannerInfo />
                    </Card>
                    <Panel className='profile-border'>
                        <Cell>
                            <Fieldset className='grid-margin-x'>
                                <Legend>
                                    <h6> <UseText i18n="BRIDE_FULLNAME" /> </h6>
                                </Legend>
                                <Cell small='12' medium='6' large='6'>
                                    <Input
                                        label={<Subtitle size={2}> <UseText i18n="FIRST_NAME" /> </Subtitle>}
                                        value={this.state.bride}
                                        readOnly={true}
                                        id='bride'
                                        placeholder={"FIRST_NAME"}
                                        onChange={(e) => {
                                            const { id, value } = e.currentTarget;
                                            this.setState({ [id]: value });
                                            this.validation(value, id);
                                        }}
                                    />
                                </Cell>
                                <Cell small='12' medium='6' large='6'>
                                    <Input
                                        label={<Subtitle size={2}> <UseText i18n="LAST_NAME" /> </Subtitle>}
                                        value={this.state.lastbride}
                                        id='lastbride'
                                        readOnly={true}
                                        placeholder={"LAST_NAME"}
                                        onChange={(e) => {
                                            const { id, value } = e.currentTarget;
                                            this.setState({ [id]: value });
                                            this.validation(value, id);
                                        }}
                                    />
                                </Cell>
                            </Fieldset>

                            <Fieldset className='grid-margin-x'>
                                <Legend>
                                    {' '}
                                    <h6> <UseText i18n="GROOM_FULL_NAME" /> </h6>
                                </Legend>
                                <Cell small='12' medium='6' large='6'>
                                    <Input
                                        label={<Subtitle size={2}> <UseText i18n="GROOM_FIRST_NAME" /> </Subtitle>}
                                        value={this.state.groom}
                                        id='groom'
                                        readOnly={true}
                                        placeholder={"GROOM_FIRST_NAME"}
                                        onChange={(e) => {
                                            const { id, value } = e.currentTarget;
                                            this.setState({ [id]: value });
                                            this.validation(value, id);
                                        }}
                                    />
                                </Cell>
                                <Cell small='12' medium='6' large='6'>
                                    <Input
                                        label={<Subtitle size={2}> <UseText i18n="GROOM_LAST_NAME" /> </Subtitle>}
                                        value={this.state.lastgroom}
                                        id='lastgroom'
                                        readOnly={true}
                                        placeholder={"GROOM_LAST_NAME"}
                                        onChange={(e) => {
                                            const { id, value } = e.currentTarget;
                                            this.setState({ [id]: value });
                                            this.validation(value, id);
                                        }}
                                    />
                                </Cell>
                                <Cell small='12' medium='4' large='4'>
                                    <Input
                                        readOnly={true}
                                        label={<Subtitle size={2}> <UseText i18n="COUNTRY" /> </Subtitle>}
                                        value={this.state.country}
                                        id='country'
                                        placeholder={"COUNTRY"}
                                        onChange={(e) => {
                                            const { id, value } = e.currentTarget;
                                            this.setState({ [id]: value });
                                        }}
                                    />
                                </Cell>
                                <Cell small='12' medium='4' large='4'>
                                    <Input
                                        readOnly={true}
                                        label={<Subtitle size={2}> <UseText i18n="CITY" /> </Subtitle>}
                                        value={this.state.ciudad}
                                        id='ciudad'
                                        placeholder={"CITY"}
                                        onChange={(e) => {
                                            const { id, value } = e.currentTarget;
                                            this.setState({ [id]: value });
                                        }}
                                    />
                                </Cell>
                                <Cell small='12' medium='4' large='4'>
                                    <Input
                                        readOnly={true}
                                        label={<Subtitle size={2}> <UseText i18n="ZIP" /> </Subtitle>}
                                        value={this.state.codigo_postal}
                                        id='codigo_postal'
                                        placeholder={"ZIP"}
                                        onChange={(e) => {
                                            const { id, value } = e.currentTarget;
                                            this.setState({ [id]: value });
                                        }}
                                    />
                                </Cell>
                            </Fieldset>

                            <Grid type='x' className='grid-margin-x phone-profile'>
                                <Cell small='12' medium='12' large='6' className='no-r-margin'>
                                    <Fieldset className='grid-margin-x'>
                                        <Legend>
                                            <h6> <UseText i18n="NUMBER_PHONE" /> </h6>
                                        </Legend>
                                        <Cell small='12' medium='3' large='3'>
                                            <Input
                                                readOnly={true}
                                                label={<Subtitle size={2}><UseText i18n="COUNTRY" /></Subtitle>}
                                                value={this.state.phone_pais}
                                                id='phone_pais'
                                                placeholder={"COUNTRY"}
                                                onChange={(e) => {
                                                    const { id, value } = e.currentTarget;
                                                    this.setState({ [id]: value });
                                                }}
                                            />
                                        </Cell>
                                        <Cell small='12' medium='3' large='3'>
                                            <Input
                                                readOnly={true}
                                                label={<Subtitle size={2}>Area</Subtitle>}
                                                value={this.state.phone_area}
                                                id='phone_area'
                                                placeholder={"AREA_CODE"}
                                                onChange={(e) => {
                                                    const { id, value } = e.currentTarget;
                                                    this.setState({ [id]: value });
                                                }}
                                            />
                                        </Cell>
                                        <Cell small='12' medium='6' large='6'>
                                            <Input
                                                readOnly={true}
                                                label={<Subtitle size={2}><UseText i18n="NUMBER_PHONE" /></Subtitle>}
                                                value={this.state.phone_number}
                                                id='phone_number'
                                                placeholder={"NUMBER_PHONE"}
                                                onChange={(e) => {
                                                    const { id, value } = e.currentTarget;
                                                    this.setState({ [id]: value });
                                                }}
                                            />
                                        </Cell>{' '}
                                    </Fieldset>
                                </Cell>
                            </Grid>

                            <Fieldset className='grid-margin-x'>
                                <Legend>
                                    {' '}
                                    <h6> Email </h6>
                                </Legend>
                                <Cell small='12' medium='12' large='6'>
                                    <Input
                                        readOnly={true}
                                        label={<Subtitle size={2}> <UseText i18n="PRINCIPAL" /> </Subtitle>}
                                        value={this.state.principal_email}
                                        id='principal_email'
                                        placeholder={"PRINCIPAL"}
                                        onChange={(e) => {
                                            const { id, value } = e.currentTarget;
                                            this.setState({ [id]: value });
                                        }}
                                    />
                                </Cell>
                                <Cell small='12' medium='12' large='6'>
                                    <Input
                                        readOnly={true}
                                        label={<Subtitle size={2}> <UseText i18n="ADDITIONAL" /> </Subtitle>}
                                        value={this.state.aditional_email}
                                        id='aditional_email'
                                        placeholder={"ADDITIONAL"}
                                        onChange={(e) => {
                                            const { id, value } = e.currentTarget;
                                            this.setState({ [id]: value });
                                        }}
                                    />
                                </Cell>
                            </Fieldset>
                        </Cell>
                    </Panel>
                </Page>
            </section>
        );
    }
}

