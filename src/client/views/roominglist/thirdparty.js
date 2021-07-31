import Api from '@app/Api';
import Auth from '@app/Auth';
import { changeData } from '@app/Helpers';
import UseText from '@app/UseText';
import { Cell, DateWidget, Fieldset, Grid, InputText, ListCollapsible, Panel, Table, Toast,Input ,CancelForm,SendForm,Form} from '@components';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import Paginator from '../../components/paginator';

export default class ThirdPartyBooking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // form states
            firstName: '',
            lastName: '',
            arrivalDate: '',
            departureDate: '',
            reservChannel: '',
            datarequired:'',
            list: [{ content: '', heading: '' }],
            dataTableThird: [],
            _columns: [
                {
                    name: <></>,
                    i18n: 'PENDING',
                    key: 'aprobado',
                    bodyTransform: false,
                    value: (rowData, rowIndex, col) => {
                        /* console.log(rowData, rowIndex, col); */
                        if (rowData[col] == '0')
                            return <section className='status'>
                                <i className='fa-2x fas fa-exclamation-circle' />
                                <UseText i18n='PENDING' />
                            </section>
                        // return (
                        //     <Grid
                        //         type='x'
                        //         className='grid-margin-x'
                        //         smallup={'2'}
                        //         mediumup={'1'}
                        //         style={{ textAlign: 'center', color: '#b49400' }}>
                        //         <Cell>
                        //             <i className='fa-2x fas fa-exclamation-circle' />
                        //         </Cell>
                        //         <Cell>
                        //             <UseText i18n='PENDING' />
                        //         </Cell>
                        //     </Grid>
                        // );
                    },
                },
                /* { name: 'idevent_reserva_grupo_agencia', key: 'idevent_reserva_grupo_agencia', bodyTransform: false }, */
                // { name: 'id_group', key: 'id_group', bodyTransform: false },
                {
                    i18n: 'RESORT', name:  <UseText i18n='RESORT' />, key: 'idclv_propiedad', bodyTransform: false, value: data => {
                        return (Object.keys(this.props.properties).length > 0) ? (this.props.properties.hasOwnProperty(data.idclv_propiedad)) ? this.props.properties[data.idclv_propiedad] : data.idclv_propiedad : data.idclv_propiedad;
                    }
                },
                /* { name: 'id_agencia', key: 'id_agencia', bodyTransform: false }, */
                { i18n: 'CONFIRMATION_NO', name: <UseText i18n='CONFIRMATION_NO' />, key: 'folio_confirmacion', bodyTransform: false },
                {
                    i18n: 'NAME',
                    name: <UseText i18n='NAME' />,
                    key: 'nombre_titular_reserva',
                    bodyTransform: false,
                    className: "text-left",
                    value: ({ apellido_titular_reserva, nombre_titular_reserva }) =>
                        `${apellido_titular_reserva}, ${nombre_titular_reserva}`,
                },
                /* { name: 'Arrival', key: 'fecha_llegada', bodyTransform: false }, */
                {
                    i18n: 'ARRIVAL_DATE',
                    name: <UseText i18n='ARRIVAL_DATE' />,
                    key: 'arrival_date',
                    bodyTransform: false,
                    value: (data) => <DateWidget value={data.arrival_date} istableDate={true} />,
                },
                {
                    i18n: 'DEPARTURE_DATE',
                    name:<UseText i18n='DEPARTURE_DATE' />,
                    key: 'departure_date',
                    bodyTransform: false,
                    value: (data) => <DateWidget value={data.departure_date} istableDate={true} />,
                },
                /* { name: 'status', key: 'status', bodyTransform: false }, */
                /* { name: 'apellido_titular_reserva', key: 'apellido_titular_reserva', bodyTransform: false }, */
                { i18n: 'ADULTS', name: <UseText i18n='ADULTS' />, key: 'cant_adults', bodyTransform: false },
                { i18n: 'CHILDREN', name:  <UseText i18n='ROOM_TYPE' />, key: 'cant_childs', bodyTransform: false },
                { i18n: 'NIGHTS', name:  <UseText i18n='NO_NIGHTS' />, key: 'cant_nights', bodyTransform: false },
                { i18n: 'ROOMS', name: <UseText i18n='ROOMS' />, key: 'cant_rooms', bodyTransform: false },
                { i18n: 'ORIGIN', name:  <UseText i18n='ORIGIN' />, key: 'nombre_agencia_reserva', bodyTransform: false },
                // { name: 'usuario_aprobacion', key: 'usuario_aprobacion', bodyTransform: false },
            ],
        };
        this.rCollapsible = React.createRef();
    }

    static propTypes = {};
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) { }

    /**
     * Restart state data
     */
    init() {
        const firstName = '',
            lastName = '',
            arrivalDate = '',
            departureDate = '',
            reservChannel = '';
        this.setState({ firstName, lastName, arrivalDate, departureDate, reservChannel });
    }

    /**
     * Calcula fechas de acuerdo a la reserva
     * @param beforeArvl 3 dias antes de la llegada (Arrival)
     * @param afterDptr 3 dias despues de salida (Departure)
     */
    calcDate() {
        const { date_start, date_end } = sessionStorage;
        const aux1 = new Date(date_start);
        const aux2 = new Date(date_end);
        const dStart = changeData(aux1.setDate(aux1.getDate() - 3));
        const dEnd = changeData(aux2.setDate(aux2.getDate() + 3));

        return { dStart, dEnd };
    }

    sendForm(data,resetForm) {
        const { id, id_resort } = sessionStorage;
        let formData = {
            idevent_grupo: id,
            id_agencia: ' ',
            idclv_propiedad: ' ',
            folio_confirmacion: ' ',
            aprobado: '0',
            usuario_aprobacion: ' ',
            cant_adults: '0',
            cant_childs: '0',
            cant_nights: '0',
            cant_rooms: '0',
            // usuario_creacion: "",
            // fecha_creacion: "",
            // estado: "",
        };

        let dataSend = Object.assign(formData,data);
        Api.postReservas(Auth.getAuthorizationHeader(), dataSend)
            .then((res) => {
                if (!res.error) {
                    // const { dataTable } = this.state;
                    // dataTable.unshift(formData);
                    // mandamos a ejecutar la api que traera los registros insertados.
                    this.props.myfuncReset();
                    // this.setState({ dataTable });
                    resetForm();
                    Toast({ html:"Successfully added!", id: 'my-toast',duration:4000})

                }
            }
        ).catch((err) => {
            Toast({ html:err, id: 'my-toast',duration:4000})
        });
    }

    collapsibleSection() {
        const { dStart, dEnd } = this.calcDate();
        const { date_start, date_end } = sessionStorage;
        const evDateStart = changeData(date_start);
        const evDateEnds = changeData(date_end);
        const { firstName, lastName, arrivalDate, departureDate, reservChannel } = this.state;
        return [
            {
                content: (lastFunct, index) => {
                    return (
                        <Panel>
                            <Form id={"thirdParty"+index} autovalidate="true" onSubmit={(data, resetForm) =>{ lastFunct(index, this.rCollapsible); this.sendForm(data, resetForm); }} onCancel={()=>{ lastFunct(index, this.rCollapsible);}} onChange= {(e)=>{
                                const { id, value } = e.target;
                                const change = { [id]: value };
                                if(id=="arrivalDate"){
                                    this.setState({ ...change })
                                }
                                }}>
                                <Fieldset className='grid-margin-x'>
                                    <Cell small={'12'} className='playfair text-info'>
                                        Please fill out the following information<br /><br />
                                    </Cell>
                                    <Cell small={'12'} medium={'6'} large={'6'}>
                                        <Input
                                            type='text'
                                            label={<UseText i18n='CLIENT_NAME'/>}
                                            name='nombre_titular_reserva'
                                            placeholder='Grace'
                                            id='firstName'
                                            required={true}
                                        />
                                    </Cell>
                                    <Cell small={'12'} medium={'6'} large={'6'}>
                                        <Input
                                            type='text'
                                            label={<UseText i18n='CLIENT_LAST_NAME'/>}
                                            name='apellido_titular_reserva'
                                            placeholder='Fasaye'
                                            id='lastName'
                                            required={true}
                                        />
                                    </Cell>
                                    <Cell small={'12'} medium={'6'} large={'6'}>
                                        {/* <InputText
                                        inputLabel="Arrival Date"
                                        inputPlaceholder="30/Jan/2020"
                                        inputValue={arrivalDate}
                                        inputId="arrivalDate"
                                        onChange={(htmlElement, inputValue, inputId, inputRef) => {
                                            this.setState({ [inputId]: inputValue });
                                        }}
                                    /> */}
                                        <Input
                                            label={<UseText i18n='ARRIVAL_DATE'/>}
                                            type='date'
                                            id='arrivalDate'
                                            name='arrival_date'
                                            min={dStart}
                                            max={evDateEnds}
                                            required={true}
                                            value={arrivalDate}
                                        />
                                    </Cell>
                                    <Cell small={'12'} medium={'6'} large={'6'}>
                                        {/* <InputText
                                        inputLabel="Departure Date"
                                        inputPlaceholder="03/Feb/2020"
                                        inputValue={departureDate}
                                        inputId="departureDate"
                                        onChange={(htmlElement, inputValue, inputId, inputRef) => {
                                            this.setState({ [inputId]: inputValue });
                                        }}
                                    /> */}
                                        <Input
                                            label={<UseText i18n='DEPARTURE_DATE'/>}
                                            type='date'
                                            id='departureDate'
                                            name='departure_date'
                                            min={arrivalDate == '' ? evDateStart : arrivalDate}
                                            max={dEnd}
                                            value={departureDate}
                                            required={true}
                                        />
                                    </Cell>
                                    <Cell small={'12'} medium={'6'} large={'6'}>
                                        <Input
                                            type='text'
                                            label={<UseText i18n='RESV_CHANNEL' />}
                                            id='reservChannel'
                                            name='nombre_agencia_reserva'
                                            required={true}
                                        />
                                    </Cell>

                                    {/* Buttons sections */}
                                    <Cell small={'12'} medium={'12'} large={'12'}>
                                        <Grid type='x' className='grid-margin-x'>
                                            <Cell small={'1'} medium={'1'} large={'7'}></Cell>
                                            <Cell small={'10'} medium={'10'} large={'5'} >
                                                <div className="group-button">
                                                    <CancelForm
                                                        className='hollow'
                                                        style={{ float: 'none' }}>
                                                        <UseText i18n='CANCEL' />
                                                        </CancelForm>&nbsp;&nbsp;
                                                    <SendForm> <UseText i18n="SEND" /></SendForm>
                                                </div>
                                            </Cell>
                                        </Grid>
                                    </Cell>
                                </Fieldset>
                            </Form>
                        </Panel>
                    );
                },
                heading: (lastFunct, index) => {
                    return (
                        <Grid type='x' className='grid-margin-x' small={'1'} medium={'1'} large={'2'}>
                            <Cell>
                                <h4 className="sm-f18x md-f18x sm-f30x">
                                    <UseText i18n='THIRD_BOOKING' />
                                </h4>
                            </Cell>
                            <Cell className={''}>
                                <button
                                    className='add-bk'
                                    onClick={(e) => {
                                        lastFunct(index, this.rCollapsible);
                                        this.setState({datarequired:""});
                                        e.currentTarget.classList.toggle("hollow");
                                    }}>
                                    <UseText i18n='ADD_BOOKING' />
                                </button>
                            </Cell>
                        </Grid>
                    );
                },
            },
        ];
    }

    changePage(items) {
        this.setState({
            dataTableThird: items
        })

    }
    render() {
        const { _columns } = this.state;
        const dataTable = this.props.data;
        return (
            <section component='third-party' >
                <Grid type='x' className='grid-margin-x'>
                    <Cell>
                        <ListCollapsible
                            items={this.collapsibleSection()}
                            id='myCollaps_add_bk'
                            onRef={this.rCollapsible}
                            onHeadingClick={() => { }}
                        />
                    </Cell>
                    <Cell>
                       {(this.state.dataTableThird.length >= 1) ? <Table columns={_columns} data={this.state.dataTableThird} showToolbar={false} onRef={this.rCancellations} />:<Cell><Grid id='current-book' type='x' className='grid-margin-x padding-curr-book'>
                <Cell  small={'12'} medium={'12'} large={'12'} ><h6 className="title-2 sm-f18x lg-f24x" > <UseText i18n="YOU_DONT_HAVE_RESERVATIONS" /></h6></Cell>
            </Grid></Cell>}
                    </Cell>
                    <Cell >
                        <center>
                            <Paginator onChangePage={(items) => this.changePage(items)} items={dataTable} limit={5} initialPage={1}></Paginator>
                        </center>
                    </Cell>
                </Grid>
            </section>
        );
    }
}

ThirdPartyBooking.propTypes = {
    myfuncReset: PropTypes.func,
    properties: PropTypes.object,
    data: PropTypes.array

};

ThirdPartyBooking.defaultProps = {
    myfuncReset: (context) => { },
    properties: {},
    data: []
}