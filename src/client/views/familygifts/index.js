import React, { Component, Fragment } from 'react';
import Auth from '@app/Auth';
import Api from '@app/Api';
import { Button, Card, Cell, Grid, Page, Subtitle, Toast, ListOption, ListView, Currency, Paginator, Table, Checkbox } from '@components';
import { Link } from 'react-router-dom';
// import { ServiceContext } from '@app/ServiceContext';
import WithContext from "@app/ServiceContext";
import UseText from '@app/UseText';
import { changeData } from "@app/Helpers";

/**
 * Remplaza la coma por nada en un texto
 * @param {string} name Nombre
 */
const getNames = (name) => (name && typeof name.replace === 'function' ? name.replace(/,/i, '') : '---');

 class FamilyGiftView extends Component {
    constructor() {
        super();
        this.state = {
            getText: () => { },
            values: [
                {
                    name: '',
                    email: '',
                    valid: false,
                },
                {
                    name: '',
                    email: '',
                    valid: false,
                },
            ],
            disabled: true,
            isLoading: false,
            gifts: [], // toda la lista de regalos
            display_gift: [], // bloque selecto desde el paginador
            dataRegularB: [],
			dataSelect:[],
            disabledBtn:true,
            isloading:false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
		this.columnsRegularBooking = this.columnsRegularBooking.bind(this);
        this.addClick = this.addClick.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleValidateEmail = this.handleValidateEmail.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        this.messageResponce = this.messageResponce.bind(this);
		this._isMounted = false;
    }

    /**
    * Funcion que se ejecuta al momento de desmontar el componente.
    */
	componentWillUnmount()
	{
		this._isMounted = false;
	}

	/**
	* Funcion que ejecuta las peticiones para obtener las opciones de los select
	*/
	componentDidMount()
	{
		this._isMounted= true;
        this.setState({ getText: (directive) => this.props.app.getText(directive) })
        this.apiGetGiftsByGroup((gifts) => {
            const { error, data } = gifts;
            if (!error) {
			    if(!this._isMounted) return;
                gifts = gifts.data || [];
                if(gifts.length > 0) {
                    gifts = gifts.sort(function (a, b) {
                                if (a.created_date < b.created_date) {
                                return 1;
                                }
                                if (a.created_date > b.created_date) {
                                return -1;
                                }
                                // a must be equal to b
                                return 0;
                            });
                }
                this.setState({ gifts });
            }
        });
		this.getDataRegularBooking();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props != prevProps) {
        }
    }
    /**
     * Metodo que crea los cards, con el state value definimos la estructura de los datos
     */
    createUI() {
        let { getText } = this.state;
        return this.state.values.map((el, i) => (
            <Cell small='12' medium='6' large='6' key={i}>
                <Card className='panel-color'>
                    <Cell>
                        <label htmlFor='fullName' className='active'>
                            <UseText i18n="FULL_NAME" />
                        </label>
                        <input
                            placeholder={getText("FULL_NAME")}
                            id={`fullname` + i}
                            name={`fullname` + i}
                            type='text'
                            className='validate'
                            value={el.name || ''}
                            onChange={(e) => this.handleChange(e, i)}
                        />
                        <label htmlFor='Email Address' className='active'>
                            <UseText i18n="EMAIL_ADDRESS" />
                        </label>
                        <input
                            placeholder='user@mail.com'
                            id={`email` + i}
                            name={`email` + i}
                            type='text'
                            className='validate'
                            value={el.email || ''}
                            onChange={(e) => this.handleChangeEmail(e, i)}
                        />
                        {/* <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/> */}
                    </Cell>
                </Card>
                <br></br>
            </Cell>
        ));
    }

    /**
     * Funcion que permite setear los valores de los campos de imagenes
     * accedemos a la propiedad "name" por medio de su posicion
     * @param {*} i
     * @param {*} event
     */
    handleChange(event, i) {
        const input = event.target;
        let value = [...this.state.values];
        value[i]['name'] = input.value;
        this.setState({ [input.name]: input.value });
    }

    handleChangeEmail(event, i) {
        const input = event.target;
        let value = [...this.state.values];
        value[i]['email'] = input.value;
        this.handleValidate(event, i);
        this.setState({ [input.name]: input.value},()=> this.handleDisabledButton());
    }

    handleValidateEmail(email) {
        const regex = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
        regex.test(email);
        return regex.test(email);
    }

    handleValidate(event, i) {
        const input = event.target;
        let value = input.value;
        let values = [...this.state.values];
        const emailValidate = this.handleValidateEmail(value);
        values[i]['valid'] = emailValidate;
        return emailValidate;
    }

    handleDisabledButton(){
        const {values, dataSelect} = this.state;
        let value = [...this.state.values];
        //validaciones
        let trueCam = [];
        for (var k in values) {
            if (values[k]['valid']) {
                trueCam.push(values[k]);
            }
        }
        for (var k in dataSelect) {
            if (dataSelect[k]['valid']) {
                trueCam.push(dataSelect[k]);
            }
        }
        let disbtn = true;
        let disab = true;

        //si ya se ocupo los inputs existentes permitimos crear mas
        if(trueCam.length == (value.length + dataSelect.length)){
            disab= false;
        }
        // si hay alguno valido permitimos enviar
        if(trueCam.length >0){
            disbtn= false;
        }else{
            disbtn= true;
        }
        this.setState({disabled:disab,disabledBtn:disbtn});
    }

    addClick() {
        this.setState((prevState) => ({ values: [...prevState.values, { name: '', email: '', valid: false }] }));
    }

    removeClick(i) {
        let values = [...this.state.values];
        values.splice(i, 1);
        this.setState({ values });
    }

    /**
     * API para obtener los registros de regalos enviados del grupo
     * @param {number} id
     * @param {({error:boolean, data})=>{}} atSuccess
     * @param {(error)=>{}} e
     */
    apiGetGiftsByGroup(atSuccess = (r) => { }, e = null) {
        const c = (error) => console.error('!', error);
        Api.getGiftsByGroup(sessionStorage.id)
            .then(atSuccess)
            .catch(c)
            .finally(atSuccess({ error: true }));
    }

    /**
	 *columnas de regular booking
	 *
	 * @returns
	 * @memberof RoomingList
	 */
    columnsRegularBooking() {
		return [
            {
                key: "ITEM_CHECKED", className:"full service-th", value: (data,index) => {
                    return <>
                            <br className="show-for-small-only"/>
                            <Checkbox
                                onChange={(e)=>this.handleCheck(e,index )}
                                disabled={(data.EMAIL == "" || data.SGUEST_NAME == "")}
                                className="filled-in"
                            />
                        </>;
                }
            },
			{ i18n: 'NAME',key: "SGUEST_NAME", className:"full service-th", name: <UseText i18n='NAME' />},
			{ i18n: 'EMAIL',key: "EMAIL", className:"full service-th", name: <UseText i18n='EMAIL' />},
		];
	}

    /** recupera las recervas regulares
	 *
	 */
	getDataRegularBooking(){
		const { id_resort,blockcode } = sessionStorage;
		let data ={
			Resort:id_resort,
		 	Folio:0,
		    Status : "NONE",
		    Departure: "0001-01-01",
		    Arrival: "0001-01-01",
		    Code:blockcode,
		    SoloCheckinDia: false,
		    Tag: "BLOCKCODE"
		}

        Api.getReservationsExcludedPM(Auth.getAuthorizationHeader(),data)
            .then((res) => {
                if (!res.error) {
					if(!this._isMounted) return;
					const dataTable = [];
					Object.keys(res.data.postDataResp).map((el,index)=>{
                        const ele =res.data.postDataResp[el];
                        const result= dataTable.find( element => element.EMAIL === ele.EMAIL && element.SGUEST_NAME === ele.SGUEST_NAME);
                        if(result == undefined) {
                            dataTable.push(ele);
                        }
					});
					this.setState({ dataRegularB:dataTable });
                }else{
				}
            })
            .catch((err) => {
            });
    }

    handleCheck(e, index) {
		let { checked } = { ...e.target };
        const element = this.state.dataRegularB[index];
        const itemSelect = {"name":element.SGUEST_NAME,"email":element.EMAIL, valid:true};
        let listSelect = this.state.dataSelect;
        if(checked){
            listSelect.push(itemSelect);
        }
        else {
            let index = listSelect.find(function(item, i){
                if(item === itemSelect){
                    index = i;
                    return i;
                }
            });
            if ( index !== -1 ) {
                listSelect.splice( index, 1 );
            }
        }
        this.setState({dataSelect:listSelect},()=> this.handleDisabledButton());

	}


    handleSubmit(event) {
        const send_values = Object.assign({},this.state.values,this.state.dataSelect);
        const planer = sessionStorage.id_planner;
        const idgroup = sessionStorage.id;
        const bride = sessionStorage.bride;
        const groom = sessionStorage.groom;
        const languageid = sessionStorage.getItem('langWeddings');
        this.setState({isloading:true});
        let values = [];
        for (var k in send_values) {
            if (send_values[k]['valid'] === false) {
                continue;
            }
            values.push({
                idevent_grupo: idgroup,
                userRequest: planer,
                user: send_values[k]['email'],
                family_name: send_values[k]['name'],
                bride: getNames(bride),
                groom: getNames(groom),
                idsap_society: sessionStorage.iddef_sap_sociedad,
                languageid
            });
        }
        // se hace el envio
        Api.sendFamilyGift(Auth.getAuthorizationHeader(), values)
            .then((response) => {
                this.setState({isloading:false});
                this.messageResponce(response.data.postDataResp);
            })
            .catch((e) => {
                this.setState({isloading:false});
                Toast({ html: 'No email send', id: 'my-toast' });
            });
        event.preventDefault();
    }

    messageResponce(data){
        if(data.datasucces.length > 0){
            let message = this.state.getText('EMAIL_SENT_TO');
            for(var r in data.datasucces){
                let succ = data.datasucces[r]['user']+`  `;
                let mess = message+" "+succ;
                Toast({ html:mess, id: 'my-toast' ,duration:3000 });
            }
            const dataRegularB = this.state.dataRegularB;
            if(dataRegularB.length > 0) {
                this.setState({dataRegularB: [],dataSelect: []},
                ()=>{
                    this.setState({dataRegularB: dataRegularB});
                    this.handleDisabledButton();
                });
            }
        }

        if(data.dataErrors.length > 0){
            let nomsg =this.state.getText('NO_MAIL_SEND');
            for(var r in data.dataErrors){
                let err = data.dataErrors[r]['user']+` `;
                let msg =nomsg+" "+err;
                Toast({ html:msg, id: 'my-toast' ,duration:5000 });
            }
        }
    }

    /**
     * Lista de regalos obtenidos
     */
    listGiftSection() {
        const { gifts, display_gift } = this.state;
        return (
            <Fragment>
                <Cell>
                    <ListView className=''>
                        {display_gift.map((item, i) => {
                            const { comentario_familiar, correo_familiar, fecha_regalo } = item;
                            const { idevent_reserva_grupo_agencia_gift, monto_regalo, nombre_familiar } = item;
                            const _key = `${i}${idevent_reserva_grupo_agencia_gift}t${fecha_regalo}m${correo_familiar}`;
                            return (
                                <ListOption key={_key}>
                                    <Grid type='container' className='grid-margin-x'>
                                        <Cell className='gift'>
                                            <Subtitle size={3} className='sm-f14x md-f20x from'>
                                                <UseText i18n="DATE" />:<span>{` ${changeData(fecha_regalo)}`}</span>{"\u00A0"}
                                                <br className="hide-for-large"/>
                                                <UseText i18n="FROM" />:<span>{` ${nombre_familiar}`}</span>
                                            </Subtitle>
                                            <Subtitle size={3} className='sm-f14x md-f20x amount'>
                                                <Currency value={monto_regalo || 0} isDefault={true} />
                                            </Subtitle>
                                        </Cell>
                                        <Cell className='sm-f14x md-f20x'>
                                            { comentario_familiar != " " ? <br className="hide-for-large"/> : null }
                                            {comentario_familiar}
                                            <br className="hide-for-large"/>
                                        </Cell>
                                    </Grid>
                                </ListOption>
                            );
                        })}
                    </ListView>
                </Cell>
                <Cell>
                    <p className='right sm-f14x md-f20x'>
                        * <UseText i18n="AMOUNTS_ADDED_TO_YOUR" />
                        <Link to='/positive-balance' className='link'> <UseText i18n="UNASSIGNED_PREPAYMENTS_BALANCE" /> </Link>
                    </p>
                </Cell>
                <Cell>
                    <center>
                        <Paginator
                            onChangePage={(display_gift) => this.setState({ display_gift })}
                            items={gifts}
                            limit={5}
                            initialPage={1}
                        />
                    </center>
                </Cell>
            </Fragment>
        );
    }

    render() {
        const disabled = this.state.disabled;
        const disabledBtn = this.state.disabledBtn;
        const myGifts = this.listGiftSection();
        const { gifts, dataRegularB } = this.state;
        return (
            <Page title='REGISTER' loading={this.state.isloading}>
                <br/>
                <div page='family_gift'>
                    {gifts.length > 0 ? (
                        <Grid type='x' className='grid-padding-x my-gifts' smallup={'1'}>
                                {myGifts}

                        </Grid>
                    ) : (
                            <Fragment />
                        )}
                    <Grid type='x' className='grid-padding-x'>
                        <Cell>
                            {
                                (dataRegularB.length > 0 ) ?
                                <Table
                                    className="table-services"
                                    columns={this.columnsRegularBooking()}
                                    options={{ sorting: false }}
                                    data={dataRegularB}
                                    showToolbar={false}
                                /> : null
                            }
                            <br/>
                        </Cell>
                    </Grid>
                    <Grid type='x' className='grid-padding-x'>

                        {this.createUI()}

                    </Grid>
                    <Grid type='x' className='grid-padding-x'>
                        <Cell className='controls'>
                            <Button className='hollow' href='#' disabled={disabled} onClick={this.addClick}>
                                <UseText i18n="ADD_EMAIL_ADDRESS" />
                            </Button>
                            <Button
                                type='submit'
                                className='primary'
                                href='#'
                                disabled={disabledBtn}
                                onClick={this.handleSubmit}>
                                <UseText i18n="SEND_EMAILS" />
                            </Button>
                        </Cell>
                    </Grid>
                </div>
            </Page>
        );
    }
}

export default WithContext(FamilyGiftView)