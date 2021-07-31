import React from "react";
import UseText from "@app/UseText";
import DEFAULT_COLUMNS, {
	GetServiceColumn,
	EXTRA_COLUMNS_FOR_SERVICE_GRID,
} from "@app/ColumnsForServiceGrid";
import { Checkbox } from "@components";
import { addClass } from "@app/Helpers";

let MY_COLUMNS = DEFAULT_COLUMNS.slice();

const CHECKBOX_COL = {
	name: <UseText i18n="PAY" />,
	full: true,
	hideLabel: true,
	triggerDisable: true,
	className: "service-checkbox",
	value: (
		{ cantidad_pendiente: balance, isChecked },
		i,
		col,
		actions,
		handler
	) => {
		isChecked = balance == 0 ? true : isChecked;
		const className = addClass("filled-in", balance <= 0 ? "active" : null);
		return (
			<Checkbox
				onChange={actions}
				checked={isChecked}
				/* disabled={balance <= 0} */
				className={className}
			/>
		);
	},
};

MY_COLUMNS = MY_COLUMNS.concat(EXTRA_COLUMNS_FOR_SERVICE_GRID);

MY_COLUMNS.unshift(GetServiceColumn(MY_COLUMNS.slice(), true));

MY_COLUMNS.unshift(CHECKBOX_COL);

export default MY_COLUMNS;
