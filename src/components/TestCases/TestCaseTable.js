import React, {memo} from "react";
import {useHistory} from "react-router-dom";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import Address from "src/components/common/Address";
import TableWithPagination from "src/components/common/TableWithPagination";
import styles from "./TestCases.scss";

const cx = classNames.bind(styles);

const headerCells = ["Test Case", "Description", "Fee", "Requests", "Owner"];
const headerCellStyles = [{}, {}, {width: "150px", textAlign: "right"}, {textAlign: "right"}, {textAlign: "right"}];
const TestCaseTable = memo(({testCases, pages, onPageChange, handleSearch}) => {
	const history = useHistory();
	const dataRows = testCases.map(({name, code, description, owner, fees, requests}) => {
		const nameCell = (
			<div>
				<a
					href='code'
					onClick={e => {
						e.preventDefault();
						history.push(`/test-cases/${name}`);
					}}
					className={cx("table-link")}>
					{" "}
					{name}
				</a>
			</div>
		);
		const ownerCell = (
			<div>
				{" "}
				<Address address={owner} link={`/account/${owner}`} size='md' showCopyIcon={false} />
			</div>
		);

		const feeCell = fees.map(({amount, denom}) => (
			<>
				{" "}
				<div className={cx("text-right")}> {`${amount} ${denom.toUpperCase()}`} </div> <br />{" "}
			</>
		));

		return [nameCell, description, feeCell, requests, ownerCell];
	});
	return (
		<TableWithPagination
			theme={tableThemes.LIGHT}
			headerCells={headerCells}
			dataRows={dataRows}
			pages={pages}
			onPageChange={onPageChange}
			textSearchPlaceholder='Search test cases'
			handleSearch={handleSearch}
			headerCellStyles={headerCellStyles}
		/>
	);
});

export default TestCaseTable;
