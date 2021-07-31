import { Cell, DateWidget, Dropdown, Grid, Table, ViewTitle, Page, LinkButton } from '@components';
import Paginator from '../../components/paginator';
import PropTypes from 'prop-types';
import React, { Component ,Fragment} from 'react';
import Api from '@app/Api';
import Auth from '@app/Auth';
import CurrentBook from './currentbook';
import ThirdPartyBooking from './thirdparty';
import FileDownloader from '@app/FileManager';
import WithContext from '@app/ServiceContext';
import UseText from '@app/UseText';

// view sections
class RoomingList extends Component {
	constructor(props) {
		super(props);

		this.rCancellations = React.createRef();
		this.columnsRegularBooking = this.columnsRegularBooking.bind(this);
		this.state = {
			data: [],
			dataProperties:{},
			dataTable:[],
			dataRegularB:[],
			dataTableRe:[],
		};
		this.datalinks = [];
		// this._isMounted = false;

	}

	componentDidMount() {
		// this._isMounted = true;
		this.getLinksbyGroup();
		this.getDataThirdPartyBookings();
		this.getProperties();
		this.getDataRegularBooking();
	}

	// /**
    // * Funcion que se ejecuta al momento de desmontar el componente.
    // */
   	// componentWillUnmount(){
	// 	this._isMounted = false;
	// }

	//#region    ----------------------------------------------------------- // ! 'HELPER FUNCTIONS'

	/**
     * retorna las propiedades
     *
     * @memberof ThirdPartyBooking
     */
    getProperties(){
        Api.getResorts()
		.then((res) => {
            if(!res.error){
				// if(!this._isMounted) return;
				this.setState({dataProperties:res.data.dropdownData})
			}

		})
		.catch((e) => {
			console.warn("propiedades no encontradas")
		})
	}

	/**
     * retorna los links asocidos al grupo
     *
     * @memberof ThirdPartyBooking
     */
    getLinksbyGroup(){
        Api.getLinksbyGroup(sessionStorage.id)
		.then((res) => {
            if(!res.error){
				// if(!this._isMounted) return;
			   this.createItemsLinks(res.data)
			}else{
				console.warn("links not found")
			}
		})
		.catch((e) => {
			console.warn("links not found")
		})
	}

	/**
	 *da formato a los options del Dropdown (urls a mostrar)
	 *
	 * @param {*} data
	 * @memberof RoomingList
	 */
	createItemsLinks(data){
		let dat = [];
		Object.keys(data).map((el)=>{
			let ob = {
				label:data[el].description,
				externalLink:data[el].link
			};
			dat.push(ob);
		  });
		  this.datalinks = dat;
	}

	/**
	 *recupera las recervas de tipo thirdparty
	 *
	 * @memberof RoomingList
	 */
	getDataThirdPartyBookings(){
		const { id, id_resort } = sessionStorage;
        // Api.getReservasAll(id)
        Api.getReservasAll(id, id_resort)
            .then((res) => {
                if (!res.error || Array.isArray(res.data)) {
					// if(!this._isMounted) return;
					const dataTable = res.data;
					this.setState({ dataTable });
                }else{console.warn("err, reservas thirdparty not found")}
            })
            .catch((err) => {
				console.warn("err, reservas thirdparty not found")
            });
	}

	/** recupera las recervas regulares
	 *
	 */
	getDataRegularBooking(){
		const { id, id_resort,blockcode } = sessionStorage;
		let data ={
			Resort:id_resort,
		 	Folio:0,
		    Status : "NONE",
		    Departure: "0001-01-01",
		    Arrival: "0001-01-01",
		    Code:blockcode, //'WTOMXCR',
		    SoloCheckinDia: false,
		    Tag: "BLOCKCODE"
		}

        Api.getregularBooking(Auth.getAuthorizationHeader(),data)
            .then((res) => {
                if (!res.error) {
					// if(!this._isMounted) return;
					const dataTable = [];
					Object.keys(res.data.postDataResp).map((el,index)=>{
						dataTable.push(res.data.postDataResp[el]);
					  });
					this.setState({ dataRegularB:dataTable });
                }else{
					console.warn("err, reservas regulares not found")
				}
            })
            .catch((err) => {
				console.warn("err, reservas regulares not found")
            });
    }

	/**
	 * Table cell to display date format
	 * @param {Object} rowItem
	 * @param {Number} rowIndex
	 * @param {String} columnKey
	 */
	tDates(rowItem, rowIndex, columnKey) {
		const colValue = rowItem[columnKey];
		const d = new Date(colValue);
		return <DateWidget value={d} />;
	}

	tCenter(rowItem, rowIndex, columnKey) {
		return <div className="text-center">{rowItem[columnKey]}</div>;
	}
	/**
	 * Table column Center
	 * @param {String} text
	 */
	tcCenter(text) {
		return <div className="text-center">{text}</div>;
	}

	/**
	 * Table cell to display status at first column
	 * @param {Object} rowItem
	 * @param {Number} rowIndex
	 * @param {String} columnKey
	 */
	tStatus(rowItem, rowIndex, columnKey) {
		if (columnKey == "first") {
			if (rowItem["RESV_STATUS"] != "CANCELLED") return;
			return (
				<div className="actions-table">
					<i id={`icon${rowIndex}`} className="prs pr-cancel" />
					<label htmlFor={`icon${rowIndex}`}>Cancelled</label>
				</div>
			);
		} else if (columnKey == "last") {
			if (rowItem["RESV_STATUS"] == "CANCELLED") return;
			return (
				<div className="actions-table">
					<a
						onClick={(elemnt) => {
							console.group("clic edit at table", rowIndex);
						}}>
						<i id={`icon${rowIndex}`} className="prs pr-edit" />
					</a>
					<a
						onClick={(elemnt) => {
							console.group("clic cancel at table", rowIndex);
						}}>
						<i id={`icon${rowIndex}`} className="prs pr-cancel" />
					</a>
				</div>
			);
		}
	}
	/**
	 * calculamos los cuartos noches
	 */
	getRoomsAndNigths(){
		let roomsTotal=this.state.dataRegularB.length;
		let nigthsTotal=0;
		// recorremos los registros de regular booking
		Object.keys(this.state.dataRegularB).map((elemento) => {
			nigthsTotal += Number(this.state.dataRegularB[elemento].NIGHTS);
		});
		// recoremos los registros de third party
		Object.keys(this.state.dataTable).map((elemento) => {
			nigthsTotal += Number(this.state.dataTable[elemento].cant_nights);
			if(this.state.dataTable[elemento].aprobado == 1)
			roomsTotal += Number(this.state.dataTable[elemento].cant_rooms);
		});

		let nigthsAndRooms ={
			rooms:roomsTotal,
			nigths:nigthsTotal
		}

		return nigthsAndRooms;
	}

	/**
	 *columnas de regular booking
	 *
	 * @returns
	 * @memberof RoomingList
	 */
	columnsRegularBooking(){
		const noTransform = { bodyTransform: false };
		const center = { ...noTransform };
		const dates = { ...noTransform, value: this.tDates };
		const icons = { ...noTransform, value: this.tStatus };

		return [
			{ i18n: '',key: "first", name: "", type: "status", ...icons },
			{ i18n: 'RESORT',key: "RESORT", name: <UseText i18n='RESORT' />, ...noTransform,value: data=>{
				return (Object.keys(this.state.dataProperties).length > 0) ? (this.state.dataProperties.hasOwnProperty(data.RESORT)) ? this.state.dataProperties[data.RESORT] : data.RESORT : data.RESORT ;
			} },
			{ i18n: 'ARRIVAL_DATE',key: "ARRIVAL", name: <UseText i18n='ARRIVAL_DATE' />, ...dates, value: (data) => {
				let dat = new Date(data.ARRIVAL);
				return <DateWidget value={dat} istableDate={true} />
			}},
			{ i18n: 'Conf. No.',key: "CONFIRMATION_NO", name: "Conf. No." },
			{ i18n: 'DEPARTURE_DATE',key: "DEPARTURE", name:  <UseText i18n='DEPARTURE_DATE' />, ...dates, value: (data) =>{

				let dat = new Date(data.DEPARTURE);
				return <DateWidget value={dat} istableDate={true}  />
			}  },
			{ i18n: 'NAME',key: "SGUEST_NAME", name: <UseText i18n='NAME' />},
			{ i18n: 'ADULTS',key: "ADULTOSTOTAL", name: <UseText i18n='ADULTS' />, ...center },
			{ i18n: 'ROOM_TYPE',key: "ROOM_CATEGORY", name: <UseText i18n='ROOM_TYPE' />, ...center },
			{ i18n: 'CHILDREN', name:  <UseText i18n='CHILDREN' />, key: 'CHILDRENTOTAL', bodyTransform: false },
			{ i18n: 'ROOMS', name: <UseText i18n='ROOMS' />, key: 'NO_ROOMS', bodyTransform: false },
			{ i18n: 'NIGHTS', name:  <UseText i18n='NO_NIGHTS' />, key: 'NIGHTS', bodyTransform: false },

		];
	}

	changePageRegular(items){
		this.setState({
			dataTableRe:items
		})

	}

	//#endregion ----------------------------------------------------------- // ! 'View sections'

	render() {
		const { extraClass } = this.props;
		const { id, langWeddings } = Auth.userData();
		let lanId = (this.props.app.languageId) ? this.props.app.languageId : 1 ;
		const url = Api.urlRoomingPDF(langWeddings, id);
		return <Page title="ROOMING_LIST">
			<section page="rooming-list" className={` ${extraClass.section}`}>
				<Grid type="x" className="grid-padding-x" smallup={"1"}>
					<ViewTitle>
						<h4 className="text-center"><UseText i18n="ROOMING_LIST" /></h4>
					</ViewTitle>
					<Cell>
						{this.datalinks.length > 0 ? <Dropdown
							className="right"
							alignment="right"
							items={this.datalinks}>
							<UseText i18n="BOOK_NOW" />
						</Dropdown>:'' }
						<br />
						<br />
					</Cell>
					<Cell>
						<CurrentBook language={lanId} blockCode= {sessionStorage.blockcode} data={this.getRoomsAndNigths()}/>
					</Cell>
					<Cell>
					<br />
					<br />
					<h4 className="sm-f18x md-f18x sm-f30x">
						<UseText i18n='REGULAR_BOOKING' />
                    </h4>
					</Cell>
					{(this.state.dataRegularB.length > 0 ) ? <Fragment><Cell>
						<Table
							columns={this.columnsRegularBooking()}
							options={{ sorting: false }}
							data={this.state.dataTableRe}
							showToolbar={false}
							onRef={this.rCancellations}
						/>

					</Cell>
					<Cell >
                    <center>
                   		<Paginator onChangePage={(items)=>this.changePageRegular(items)} items={this.state.dataRegularB} limit={5} initialPage={1}></Paginator>
					</center>
                	</Cell>
					</Fragment>:<Cell><Grid id='current-book' type='x' className='grid-margin-x padding-curr-book'>
							<Cell small={'12'} medium={'12'} large={'12'}>
								<h6 className="title-2 sm-f18x lg-f24x"><UseText i18n="YOU_DONT_HAVE_RESERVATIONS" /></h6>
							</Cell>
            		</Grid></Cell>}
					<Cell>
						<br />
						<br />
						<ThirdPartyBooking data={this.state.dataTable} properties={this.state.dataProperties} myfuncReset={() => this.getDataThirdPartyBookings()}/>
					</Cell>
					<Grid style={{ textAlign: "center" }}>
						<br />
						<p><UseText i18n="YOU_R_CLICK_AWAY" /></p>
						<br />
						<FileDownloader url={url} filename="Rooming List">
							<LinkButton>
								<UseText i18n="DOWNLOAD_PDF" />
							</LinkButton>
						</FileDownloader>
					</Grid>
				</Grid>
			</section>
		</Page>
	}
}

RoomingList.propTypes = {
	extraClass: PropTypes.exact({ section: PropTypes.string }),
};
RoomingList.defaultProps = {
	extraClass: { section: "" },
};

export default WithContext(RoomingList);