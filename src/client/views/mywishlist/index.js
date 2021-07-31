/**
 * @class MyWishListView
 * @version 1.1.0
 * @author Andry Matos <amatos@palaceresorts.com>
 * @author Luis Huh <luisenriquehuhpuc@hotmail.com>
 * @summary Vista de la Wish List
 */

import React, { Component } from "react";
import Api from "@app/Api";
import Auth from "@app/Auth";
import WithContext from "@app/ServiceContext";
import { WithCatalog } from "@templates/catalog/Context";
import {
	Cell,
	Grid,
	Page,
	CollapsibleTable as Table,
	Toast,
	CancelForm,
	SendForm,
} from "@components";
import CollapsedContent from "./CollapsedContent";
import columns from "./DataSources";
import UseText from "@app/UseText";

export class MyWishListView extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			enableControls: false,
			selectedItems: [],
		};
	}

	componentDidMount() {
		this.getData();
		/* this.reloadData(); */
		// this.setState({ isloading: false });
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.catalogState != this.props.catalogState) {
			this.getData();
		}
	}

	/**
	 * Recarga los datos
	 */
	reloadData() {
		let { catalogState } = this.props;
		const { reloadItems } = catalogState || {};
		if (typeof reloadItems === "function") {
			reloadItems();
		}
	}

	/**
	 * Controla los eventos de la tabla.
	 * @param {Event} e Evento click.
	 * @param {{}} dataColumn Datos de la fila.
	 * @param {number} rowIndex Indice del elemento seleccionado.
	 * @param {boolean} isOpen Establece si esta abierto o cerrado el collapsible.
	 */
	handleOnTable = (e, dataColumn, rowIndex, isOpen) => {
		const element = e.target;
		if (element.matches('input[type="checkbox"]')) {
			if (element.checked) {
				this.addItem(dataColumn.idevent_detalle_item);
			} else {
				this.addItem(dataColumn.idevent_detalle_item, true);
			}
		}
	};

	/**
	 * Agregar o remueve un elemento de la lista de seleccionados.
	 * @param {number} id Id del servicio.
	 * @param {boolean} isRemove Estable si se agregara o eliminara un servicio seleccionado.
	 */
	addItem = (id, isRemove = false) => {
		if (id > 0) {
			const { selectedItems } = this.state;
			const items = Array.isArray(selectedItems)
				? selectedItems.slice()
				: [];
			if (!isRemove) {
				this.updateData(id, true);
				items.push(id);
			} else {
				const pos = items.indexOf(id);
				if (pos > -1) {
					this.updateData(id, false);
					items.splice(pos, 1);
				}
			}

			this.setState({ selectedItems: items });
		}
	};

	/**
	 * Remueve un elemento del WishList o envia al carrito.
	 * @param {boolean} isRemove Establece si la accion a realizar es eliminar o enviar a carrito.
	 */
	addRemoveFromWishList = (isRemove = false) => {
		const promises = [];
		const { selectedItems } = this.state;
		if (selectedItems.length > 0) {
			selectedItems.forEach((item) => {
				const data = isRemove ? { estado: 0 } : { venta_en_linea: 1 };
				data.id = item;
				promises.push(Api.putDetailitem(item, data));
			});
			Promise.allSettled(promises)
				.then((response) => {
					response.forEach(({ status, value }) => {
						if (status == "rejected") {
							Toast({ html: "Unable to update item!" });
							return;
						}
					});
					this.setState({ selectedItems: [] });
				})
				.catch((e) => {
					console.error(e);
					Toast({ html: "Something was wrong!" });
				})
				.finally(() => {
					this.reloadData();
				});
		}
	};

	/**
	 * Obtiene los datos y actualiza el state.
	 */
	getData = () => {
		let { catalogState } = this.props;
		const { myWishList } = catalogState || {};
		if (Array.isArray(myWishList)) {
			const tmp = myWishList.map((val) => ({ isChecked: false, ...val }));
			this.setState({ data: tmp });
		}
	};

	/**
	 * Actualiza los datos de la tabla
	 * @param {number} id Id del detalle item
	 */
	updateData = (id, isChecked) => {
		if (id) {
			const { data } = this.state;
			const tmp = Array.isArray(data) ? data.slice() : [];
			const index = data.findIndex(
				(item) => item.idevent_detalle_item == id
			);
			if (index > -1) {
				tmp[index]["isChecked"] = isChecked;
				this.setState({ data: tmp });
			}
		}

		return {};
	};

	render() {
		const { selectedItems, data } = this.state;
		const isDisabled = selectedItems == 0;

		return (
			<Page title="MY_WISHLIST">
				<br/>
				<Grid type="x" page="my-wishlist">
					<Cell className="container">
						<Table
							columns={columns}
							data={data || []}
							className="table-services"
							onFun={this.handleOnTable}>
							{(index, open, item) => (
								<CollapsedContent data={item} isOpen={open} />
							)}
						</Table>
					</Cell>
					<Cell className="controls">
						<CancelForm
							disabled={isDisabled}
							onClick={(e) => this.addRemoveFromWishList(true)}
							className={"clear"}>
							<UseText i18n="REMOVE_ITEMS" />
						</CancelForm>
						<SendForm
							disabled={isDisabled}
							onClick={(e) => this.addRemoveFromWishList(false)}>
							<UseText i18n="ADD_TO_CART" />
						</SendForm>
					</Cell>
				</Grid>
			</Page>
		);
	}
}

export default WithContext(WithCatalog(MyWishListView));
