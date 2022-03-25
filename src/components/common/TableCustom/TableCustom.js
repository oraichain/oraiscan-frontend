import React, { memo, useState } from "react";
import classNames from "classnames/bind";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {reduceStringAssets} from "src/lib/scripts";
import { tableThemes } from "src/constants/tableThemes";
import styles from "./TableCustom.scss";

const cx = classNames.bind(styles);
const TableCustom = memo(
	({ customClassNames, theme = tableThemes.LIGHT, headerCellsChil, headerCellStylesChil, headerCells, dataRows, headerCellStyles = [], rowMotions = [], dataCellStyles = "", data }) => {
		function Row(children, rowIndex, data) {
			const [open, setOpen] = useState(false);
			return (
				<React.Fragment>
					<TableRow style={{ cursor: 'pointer' }} className={cx("data-row")} key={"table-row-" + rowIndex} onClick={() => setOpen(!open)}>
						{children}
					</TableRow>
					<TableRow>
						<TableCell  className={cx("data-cell-custom")} colSpan={6}>
							{open && (
								<Table className={cx("table", "table-theme")}>
									<TableHead>
										<TableRow className={cx("header-row")}>
											{headerCellsChil.map((headerCell, cellHeaderIndex) => (
												<TableCell
													key={"header-cell-" + cellHeaderIndex}
													className={cx("header-cell")}
													children={headerCell}
													style={headerCellStylesChil?.[cellHeaderIndex] ?? {}}
												/>
											))}
										</TableRow>
									</TableHead>
									<TableBody>
										{Array.isArray(data?.[rowIndex]?.contracts) && data?.[rowIndex]?.contracts?.map((dataCell, cellIndex) => (
											<TableRow className={cx("data-row")} key={"table-row-" + rowIndex}>
												<TableCell key={"data-cell-" + rowIndex + "-" + cellIndex} className={cx("data-cell")} children={reduceStringAssets(dataCell?.label,12,2)} />
												<TableCell key={"data-cell-" + rowIndex + "-" + cellIndex} className={cx("data-cell")} children={dataCell?.address} />
												<TableCell key={"data-cell-" + rowIndex + "-" + cellIndex} className={cx("data-cell")} children={dataCell?.admin} />
												<TableCell key={"data-cell-" + rowIndex + "-" + cellIndex} className={cx("data-cell")} children={dataCell?.creator} />
											</TableRow>
										))}
									</TableBody>
								</Table>
							)}
						</TableCell>
					</TableRow>
				</React.Fragment>
			);
		}

		return (
			<TableContainer className={cx("table-container", customClassNames)}>
				<Table className={cx("table", "table-theme")}>
					<TableHead>
						<TableRow className={cx("header-row")}>
							{Array.isArray(headerCells) && (
								<>
									{headerCells.map((headerCell, cellIndex) => (
										<TableCell
											key={"header-cell-" + cellIndex}
											className={cx("header-cell")}
											children={headerCell}
											style={headerCellStyles?.[cellIndex] ?? {}}
										/>
									))}
								</>
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						{Array.isArray(dataRows) &&
							dataRows.map((dataRow, rowIndex) => {
								const tableCells = dataRow.map((dataCell, cellIndex) => (
									<TableCell key={"data-cell-" + rowIndex + "-" + cellIndex} className={cx("data-cell", dataCellStyles)} children={dataCell} />
								));
								return (
									Row(tableCells, rowIndex, data)
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
		);
	}
);

export default TableCustom;
