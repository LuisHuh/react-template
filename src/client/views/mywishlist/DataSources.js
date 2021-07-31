import React from "react";
import DEFAULT_COLUMNS, { GetServiceColumn } from "@app/ColumnsForServiceGrid";
import { Checkbox } from "@components";

let MY_COLUMNS = DEFAULT_COLUMNS.slice();

MY_COLUMNS.unshift(GetServiceColumn(MY_COLUMNS.slice(), true, false, true));

const CHECKBOX_COL = {
	name: "",
	full: true,
	hideLabel: true,
	triggerDisable: true,
	className: "service-checkbox",
	value: ({ cantidad_pendiente: balance, isChecked }, i, col, actions, handler) => {
		isChecked = balance == 0 ? true : isChecked;
		return (
			<Checkbox
				onChange={actions}
				checked={isChecked}
				disabled={balance <= 0}
				className="filled-in"
			/>
		);
	},
};

MY_COLUMNS.unshift(CHECKBOX_COL);

export default MY_COLUMNS;