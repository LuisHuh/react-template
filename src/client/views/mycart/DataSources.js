import React from "react";
import DEFAULT_COLUMNS, {
	EXTRA_COLUMNS_FOR_SERVICE_GRID,
	GetServiceColumn
} from "@app/ColumnsForServiceGrid";
import { Checkbox } from "@components";
import UseText from "@app/UseText";

let MY_COLUMNS = DEFAULT_COLUMNS.slice();

MY_COLUMNS = MY_COLUMNS.concat(EXTRA_COLUMNS_FOR_SERVICE_GRID);

MY_COLUMNS.unshift(GetServiceColumn(MY_COLUMNS.slice(), true, true));

const MAKE_A_PAYMENT = {
	name: <UseText i18n="MAKE_PAYMENT" />,
	full: true,
	hideLabel: true,
	triggerDisable: true,
	className: "service-checkbox",
	value: ({ cantidad_pendiente: balance }, i, col, actions, handler) => {
		return (
			<Checkbox
				onChange={actions}
				checked={balance == 0 ? true : null}
				disabled={balance <= 0}
				className="filled-in"
			/>
		);
	},
};

MY_COLUMNS.push(MAKE_A_PAYMENT);

export default MY_COLUMNS;
