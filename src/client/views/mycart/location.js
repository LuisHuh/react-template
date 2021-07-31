/**
 * @hook Location
 * @version 1.1.0
 * @author Andry Matos <amatos@palaceresorts.com>
 * @author Luis Huh <luisenriquehuhpuc@hotmail.com>
 * @summary Locación del carrito
 */

import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { usePrevious } from "@app/CustomHooks";
import Api from "@app/Api";
import Auth from "@app/Auth";
import { onlyNumbers } from "@app/Helpers";
import CatalogContext from "@templates/catalog/Context";
import {
	Grid,
	Cell,
	CollapsibleTable as Table,
	Input,
	CancelForm,
	SendForm,
	Toast,
} from "@components";
import cols from "./DataSources";
import CollapsedContent from "./CollapsedContent";
import UseText from "@app/UseText";

/**
 * Regresa el tamaño ( length ) de un objeto
 * @param {{}} items Elementos a contar
 */
function count(items = {}) {
	return Object.keys(items).length;
}

/**
 * Columna extra para la tabla
 */
const inputCol = {
	key: "",
	name: "",
	full: true,
	hideLabel: true,
	triggerDisable: true,
	value: (data, rowIndex, col, handlerActions) => {
		const disabled = data.cantidad_pendiente <= 0;
		return (
			<div className="input-pay">
				<span>$</span>
				<AmountInput
					onChange={handlerActions}
					defaultValue={data.cantidad_pendiente}
					disabled={disabled}
				/>
			</div>
		);
	},
};

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
		let val = input.value;
		let nVal = Number(val.trim());
		let nDefault = Number(defaultValue);
		// validamos que no sea mayor el monto al que se tiene.
		setValue(nVal > nDefault ? defaultValue : val);
		onChange(e);
	};
	const onkey = (e) => {
		if (e.which !== 46) onlyNumbers(e);
	};
	return (
		<Input
			name="payment"
			value={value}
			onKeyPress={onkey}
			onChange={onChange2}
			{...rest}
		/>
	);
}

/**
 * Locacion
 * @param {Object} param0 Props
 * @param {Array} param0.data Datos
 */
function Location({ title, data: detail }) {
	/**
	 * Variables locales
	 */
	const context = useContext(CatalogContext);
	const [isItemSelected, setItemSelected] = useState(false);
	const [columns, setColumns] = useState(cols);
	const [items, addItem] = useState({});
	const [redirectToCheckout, sendToCheckout] = useState(false);
	const [data, setData] = useState(detail);
	const [dataDeleted, setMessage] = useState("");
	/**
	 * Almacena el estado anterior del indicador de algun valor seleccionado
	 * @type {Boolean}
	 */
	const prevSelected = usePrevious(isItemSelected);

	/**
	 * Recarga los elementos del template
	 */
	const reloadData = () => {
		let { reloadItems } = context || {};
		if (typeof reloadItems === "function") {
			reloadItems();
		}
	};

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
		} else if (element.matches('input[type="text"]')) {
			if (items.hasOwnProperty(rowIndex)) {
				const { name, value } = element;
				const list = { ...items };
				let val = value.trim() == "" ? "0" : value;
				list[rowIndex].payment = val;
				addItem(list);
			}
		} else if (element.matches("button")) {
			e.stopPropagation();
			let message = `The ${dataColumn.events_service.descripcion} was deleted to shopping cart`;
			let update_data = {
				id: dataColumn.idevent_detalle_item,
				estado: 0,
			};
			Api.putDetailitem(
				dataColumn.idevent_detalle_item,
				update_data,
				Auth.getAuthorizationHeader()
			)
				.then((response) => {
					if (!response.error) {
						let datos = data.slice();
						datos.splice(rowIndex, 1);
						setData(datos);
						setMessage(message);
						reloadData();
					}
				})
				.catch((e) => {
					Toast({
						html: "Something was wrong, try again",
						id: "my-toast",
					});
				});
			setTimeout(() => {
				setMessage("");
			}, 3000);
		}
	};

	/**
	 * Controla cuando se inserta la columna extra o se quita de la tabla
	 */
	const enableInput = () => {
		const tmp = columns.slice();
		if (isItemSelected) {
			tmp.push(inputCol);
		} else {
			tmp.pop();
		}
		setColumns(tmp);
	};

	/**
	 * Resetea los datos del formulario
	 */
	const resetForm = () => {
		addItem({});
		setItemSelected(false);
	};

	const prepareData = () => {
		const services = Object.values(items).map(
			({
				payment,
				cantidad,
				precio_unitario,
				idevent_detalle_item,
				idCategory,
				events_service,
			}) => ({
				amount: payment,
				currency: "USD",
				description: idCategory == 12 && events_service.codigo_produccion != 0 ? events_service.codigo_produccion : events_service.descripcion,
				img: events_service.thumb,
				quantity: cantidad,
				u_price: precio_unitario,
				id: idevent_detalle_item,
				idconcepto_ingreso: events_service.idconcepto_ingreso,
				userRequest: sessionStorage.id_planner,
			})
		);
		const update = Object.values(items).filter(item => item.cantidad_pagada == 0 && (item.costo_real != item.events_service.costo));
		return { internal:true, order: services, concepto: 1, isChangeAmount:true, update: update };
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
			enableInput();
		}
	}, [isItemSelected]);

	if (redirectToCheckout) {
		return <Redirect to={{ pathname: "/checkout", state: prepareData() }} />;
	}

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
					<CancelForm disabled={!isItemSelected} onClick={resetForm} ><UseText i18n="CANCEL" /></CancelForm>
					<SendForm
						disabled={!isItemSelected}
						onClick={(e) => sendToCheckout(true)}>
						<UseText i18n="CONTINUE" />
					</SendForm>
				</Cell>
			</Grid>
		</Cell>
	);
}

export default Location;
