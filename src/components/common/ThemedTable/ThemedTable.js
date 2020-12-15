import React, {memo} from "react";
import classNames from "classnames/bind";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {tableThemes} from "src/constants/tableThemes";
import styles from "./ThemedTable.scss";

const cx = classNames.bind(styles);

function createData(name, calories, fat, carbs, protein) {
	return {name, calories, fat, carbs, protein};
}

const dataRows = [
	createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
	createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
	createData("Eclair", 262, 16.0, 24, 6.0),
	createData("Cupcake", 305, 3.7, 67, 4.3),
	createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const ThemedTable = memo(({theme = tableThemes.LIGHT, headerCells, dataRows}) => {
	return (
		<TableContainer className={cx("table-container")}>
			<Table className={cx(theme)}>
				<TableHead>
					<TableRow key='header-row' className={cx("header-row")}>
						{headerCells.map((headerCell, cellIndex) => (
							<TableCell key={"header-cell-" + cellIndex} className={cx("header-cell")}>
								{headerCell}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{dataRows.map((dataRow, rowIndex) => (
						<TableRow key={"data-row-" + rowIndex} className={cx("data-row")}>
							{dataRow.map((dataCell, cellIndex) => (
								<TableCell key={"data-cell-" + rowIndex + "-" + cellIndex} className={cx("data-cell")}>
									{dataCell}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
});

export default ThemedTable;
