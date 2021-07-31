/**
 * @function AmountSelector
 * @version 1.0.0
 * @author alanjimenez
 * @summary Selector de montos
 */
import React, { useEffect, useState } from "react";
import { Grid, Cell, Input, Subtitle } from "@components";
import { onlyNumbers } from "@app/Helpers";
import UseText from "@app/UseText";

/**
 * Valida los limites de entrada para el campo.
 * @param {Event} e Evento.
 */
const maxValidator = (e) => {
	const input = e.target;
	const val = parseFloat(input.value);
	const max = parseFloat(input.max);
	const min = parseFloat(input.min);
	if (val >= max) {
		if (!isNaN(max)) {
			input.value = max;
		}
	} else if (val <= 0) {
		input.value = isNaN(min) ? 1 : min;
	}
	e.preventDefault();
};

/**
 * Valida el limite inferior de entrada para el campo.
 * @param {Event} e Evento.
 * @param {()=>{}} onChange Evento para cambiar el valor del input.
 */
const minValidator = (e, onChange) => {
	const i = e.target;
	let val = parseFloat(i.value);
	val = isNaN(val) ? 1 : val;
	onChange(val);
	e.preventDefault();
};

export default function AmountSelector(props) {
	const [selectedAmount, setSelectedAmount] = useState(0);
	const [otherAmountVisible, setOtherAmountVisible] = useState(false);
	const [amounts, setAmounts] = useState([]);

	// Asignar el valor de state1
	useEffect(() => {
		if (Array.isArray(props.amounts)) {
			setAmounts(props.amounts);
		} else if (!Array.isArray(props.amounts) && !amounts) {
			setAmounts([]);
		}
	}, [props.amounts]);

	useEffect(() => {
		if (typeof props.onChange === "function") {
			props.onChange(selectedAmount);
		}
	}, [selectedAmount]);

	return (
		<Grid type="x" c="amountselector">
			<Cell small="12" medium="12" large="12">
				<Subtitle size={2}>
						{" "}
						<UseText i18n="SELECT_AMOUNT" />{" "}
				</Subtitle>
			</Cell>
			<div className="button-container">
				{amounts.map((amount, key) => (
					<button
						key={key}
						onClick={() => {
							setSelectedAmount(amount + "");
							setOtherAmountVisible(false);
						}}
						className={
							selectedAmount == amount && !otherAmountVisible
								? "button"
								: "button hollow"
						}>
						${amount}
					</button>
				))}
				{!otherAmountVisible ? (
					<button
						onClick={() => setOtherAmountVisible(true)}
						className="button hollow">
						{" "}
						<UseText i18n="OTHER_AMOUNT" />{" "}
					</button>
				) : (
					<Input
						label=""
						placeholder="Enter amount"
						autoComplete="off"
						name="amount"
						type="number"
						min={1}
						max={props.limit || null}
						value={selectedAmount}
						onInput={props.limit > 0 ? maxValidator : null}
						onBlur={(e) => minValidator(e, setSelectedAmount)}
						onKeyPress={(e) => {
							onlyNumbers(e);
						}}
						onChange={(e) => {
							const { id, value } = e.currentTarget;
							setSelectedAmount(value + "");
						}}
					/>
				)}
			</div>
		</Grid>
	);
}
