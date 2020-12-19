import React, {memo} from "react";
import {useHistory} from "react-router-dom";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import TableWithPagination from "src/components/common/TableWithPagination";
import styles from "./OracleScripts.scss";

const cx = classNames.bind(styles);

const headerCells = [
	"Oracle Script",
	"Description",
	<div className={cx("request-th-cell")}>
		{" "}
		Request <br /> & Response time{" "}
	</div>,
	"Owner",
];
const headerCellStyles = [{}, {}, {width: "180px", textAlign: "right"}, {textAlign: "right"}, {textAlign: "right"}];
const OScriptTable = memo(({oscipts, pages, onPageChange, handleSearch}) => {
	const history = useHistory();
	const dataRows = oscipts.map(({name, code, description, owner, minimum_fees, requests}) => {
		const nameCell = (
			<div>
				<a
					href='code'
					onClick={e => {
						e.preventDefault();
						history.push(`/oracle-scripts/${name}`);
					}}
					className={cx("table-link")}>
					{" "}
					{name}
				</a>
			</div>
		);

		const requestAndResponseTimeCell = (
			<>
				<div className={cx("request")}> 181,139 </div>
				<div className={cx("response-time")}> (8,18 s) </div>
			</>
		);

		const ownerCell = (
			<>
				<a
					href='code'
					onClick={e => {
						e.preventDefault();
						history.push(`/account/${owner}`);
					}}
					className={cx("table-link")}>
					{" "}
					{owner}
				</a>
			</>
		);

		// const feeCell = minimum_fees.map(({amount, denom}) => (
		// 	<>
		// 		{" "}
		// 		<div className={cx("text-right")}> {`${amount} ${denom.toUpperCase()}`} </div> <br />{" "}
		// 	</>
		// ));

		return [nameCell, description, requestAndResponseTimeCell, ownerCell];
	});
	return (
		<TableWithPagination
			theme={tableThemes.LIGHT}
			headerCells={headerCells}
			dataRows={dataRows}
			pages={pages}
			onPageChange={onPageChange}
			textSearchPlaceholder='Search oracle scripts'
			handleSearch={handleSearch}
			headerCellStyles={headerCellStyles}
		/>
	);
});

export default OScriptTable;
