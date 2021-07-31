import React, { useState, useEffect } from "react";
import { usePrevious } from "@app/CustomHooks";
import Api from '@app/Api';
import Auth from '@app/Auth';
import {
	Grid,
	Cell,
	Subtitle,
	Date,
	CollapsibleTable as Table,
	Input,
	CancelForm,
	SendForm,
} from "@components";
import { columns as cols } from "./DataSources";
import CollapsedContent from "./CollapsedContent";
import { Redirect } from "react-router-dom";

/**
 * Regresa el tamaño ( length ) de un objeto
 * @param {{}} items Elementos a contar
 */
function count(items = {}) {
	return Object.keys(items).length;
}

/**
 * Componente para establecer el valor del input extra
 * @param {Object} param0 Props
 * @param {()=>{}} param0.onChange Funcion evento para el input
 * @param {*} param0.defaultValue Valor por defecto del input
 */
function AmountInput({ onChange, defaultValue, ...rest }) {
	const [value, setValue] = useState(defaultValue);
	const onChange2 = (e) => {
		const input = e.target;
		const val = input.value;
		setValue(val);
		onChange(e);
	};
	return <Input name="payment" value={value} onChange={onChange2} {...rest} />;
}

/**
 * Locacion
 * @param {Object} param0 Props
 * @param {Array} param0.data Datos
 */
function Location({ title, date, data: detail }) {
	/**
	 * Variables locales
	 */
	const [isItemSelected, setItemSelected] = useState(false);
	const [columns, setColumns] = useState(cols);
	const [items, addItem] = useState({});
	const [data, setData] = useState(detail);
	const [dataDeleted, setMessage] = useState("");
	/**
	 * Almacena el estado anterior del indicador de algun valor seleccionado
	 * @type {Boolean}
	 */
	const prevSelected = usePrevious(isItemSelected);

	/**
	 * Funcion que escucha los eventos de la fila
	 * @param {Event} e Evento que realiza la accion
	 * @param {{}} data Datos de la fila
	 * @param {Number} rowIndex Numero de la fila
	 * @param {Boolean} isOpen Indica si el collapsible esta abierto o no
	 */
	const handleOnTable = (e, dataColumn, rowIndex, isOpen) => {
		/* e.preventDefault(); */
		const element = e.target;

		if (element.matches('input[type="checkbox"]')) {
			if (element.checked) {
				if (!isItemSelected) {
					setItemSelected(true);
				}
				const item = { ...dataColumn };
				item.payment = item.cantidad_pendiente;
				addItem({ ...items, [rowIndex]: item });
			} else {
				const list = { ...items };
				delete list[rowIndex];
				addItem(list);
				if (count(list) <= 0 && isItemSelected) {
					setItemSelected(false);
				}
			}
		} else if(element.matches('button')){
			let message = `The ${dataColumn.events_service.descripcion} was deleted to shopping cart`;
      		let update_data = {
        		id: dataColumn.idevent_detalle_item,
        		estado: 0,
			  }
			Api.putDetailitem(dataColumn.idevent_detalle_item, update_data, Auth.getAuthorizationHeader())
          		.then((response) => {
             		if (!response.error) {
					let datos = data.slice();
					datos.splice(rowIndex, 1)
					setData(datos);
					setMessage(message);
          			}
          		})
          		.catch((e) => {
					Toast({ html: "Something was wrong, try again", id: "my-toast" });
				  })
		 	setTimeout(() => {
		 		setMessage("");
		 	}, 3000);
		}
	};

	/**
	 * Resetea los datos del formulario
	 */
	const resetForm = () => {
		addItem({});
		setItemSelected(false);
	};

	/**
	 * Funciona como un ComponentDidMount, ComponentDidUpdate y ComponentWillUnmount.
	 */
	useEffect(() => {
		if (detail != data) {
			setData(detail);
		}
	}, [detail]);

	useEffect(() => {
		if (prevSelected !== undefined) {
		}
	}, [isItemSelected]);

	return (
		<Cell className="container">
			<Grid type="x">
				<Cell>
					<h3>{title}</h3>
				</Cell>
				<div>
					<span>{dataDeleted}</span>
				</div>
				<Cell>
					<Table
						columns={columns}
						data={data}
						className="table-services"
						onFun={handleOnTable}>
						{(index, open, item) => (
							<CollapsedContent data={item} isOpen={open} />
						)}
					</Table>
				</Cell>
				<Cell className="controls">
					<CancelForm disabled={!isItemSelected} onClick={resetForm} className={"clear"}>Remove Items</CancelForm>
					<SendForm
						disabled={!isItemSelected}
						onClick={(e) => sendToCheckout(true)}>
						ADD TO CART
					</SendForm>
				</Cell>
			</Grid>
		</Cell>
	);
}

export default Location;
