import DEFAULT_COLUMNS, { GetServiceColumn } from "@app/ColumnsForServiceGrid";

let MY_COLUMNS = DEFAULT_COLUMNS.slice();

MY_COLUMNS.unshift(GetServiceColumn(MY_COLUMNS.slice(), true));

export default MY_COLUMNS;
