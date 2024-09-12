import { useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import { memo } from "react";
import { tableThemes } from "src/constants/tableThemes";
import styles from "./ThemedTable.module.scss";

const cx = classNames.bind(styles);
const effect = {
	OUT: -1,
	NONE: 0,
	IN: 1,
};

const ThemedTable = memo(
	({ customClassNames, theme = tableThemes.LIGHT, headerCells, dataRows, headerCellStyles = [], rowMotions = [], dataCellStyles = "" }) => {
		const themeBreakPoints = useTheme();
		const isLargeScreen = useMediaQuery(themeBreakPoints.breakpoints.up("lg"));
		return (
			<div>
				<TableContainer className={isLargeScreen ? cx("table-container", customClassNames) : {}}>
					<Table className={isLargeScreen ? cx("table", "table-theme") : {}}>
						{isLargeScreen && (
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
						)}
						<TableBody>
							{Array.isArray(dataRows) &&
								dataRows.map((dataRow, rowIndex) => {
									const tableCells = dataRow.map((dataCell, cellIndex) =>
										isLargeScreen ? (
											<TableCell key={"data-cell-" + rowIndex + "-" + cellIndex} className={cx("data-cell", dataCellStyles)} children={dataCell} />
										) : (
											<div key={"data-cell-" + rowIndex + "-" + cellIndex} className={cx("data-cell", dataCellStyles)} children={dataCell} />
										)
									);
									let effectIn;
									switch (rowMotions?.[rowIndex]) {
										case effect.IN:
											effectIn = true;
											break;
										case effect.OUT:
											effectIn = false;
											break;
										default:
											effectIn = null;
											break;
									}
									if (typeof effectIn === "boolean") {
										const effectClassName = effectIn ? "effect-in" : "effect-out";
										const animationDelay = effectIn ? "500ms" : "0ms";
										return (
											<TableRow
												className={cx("data-row", effectClassName)}
												key={"table-row-" + rowIndex}
												style={{
													animationDelay: animationDelay,
												}}
												onAnimationEnd={e => {
													if (!effectIn) {
														e.target.style.display = "none";
													}
												}}>
												{tableCells}
											</TableRow>
										);
									}

									return (
										<TableRow className={cx("data-row")} key={"table-row-" + rowIndex}>
											{tableCells}
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		);
	}
);

export default ThemedTable;
