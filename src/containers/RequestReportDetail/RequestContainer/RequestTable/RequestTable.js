import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import copy from "copy-to-clipboard";
import consts from "src/constants/consts";
import {formatOrai} from "src/helpers/helper";
import {_, reduceString} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./RequestTable.scss";
import CheckIcon from "src/icons/Validators/CheckIcon";
import ClockIcon from "src/icons/ClockIcon";
import FailedIcon from "src/icons/Transactions/FailedIcon";
import {useDispatch} from "src/hooks";
import CopyIcon from "src/icons/CopyIcon";
import {showAlert} from "src/store/modules/global";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const nameHeaderCell = <div className={cx("header-cell", "align-left")}>Name</div>;
	const resutHeaderCell = <div className={cx("header-cell", "align-right")}>Result</div>;
	const statusHeaderCell = <div className={cx("header-cell", "align-right")}>Status</div>;
	const headerCells = [nameHeaderCell, resutHeaderCell, statusHeaderCell];
	const headerCellStyles = [
		{minWidth: "100px"}, // Name
		{maxWidth: "100px"}, // Result
		{minWidth: "100px"}, // Status
	];

	return {
		headerCells,
		headerCellStyles,
	};
};

const RequestTable = memo(({data = []}) => {
	const dispatch = useDispatch();
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			let statusElement;
			if (_.isNil(item?.status)) {
				statusElement = <div className={cx("status")}>-</div>;
			} else {
				switch (item?.status) {
					case "success":
						statusElement = (
							<div className={cx("status")}>
								<CheckIcon className={cx("status-icon", "status-icon-success")} />
								<span className={cx("status-text")}>Success</span>
							</div>
						);
						break;
					case "pending":
						statusElement = (
							<div className={cx("status")}>
								<ClockIcon className={cx("status-icon", "status-icon-pending")} />
								<span className={cx("status-text")}>Pending</span>
							</div>
						);
						break;
					case "fail":
						statusElement = (
							<div className={cx("status")}>
								<FailedIcon className={cx("status-icon", "status-icon-fail")} />
								<span className={cx("status-text")}>Failed</span>
							</div>
						);
						break;
					default:
						break;
				}
			}

			const nameDataCell = _.isNil(item?.name) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("amount-data-cell", "align-right")}>
					<div className={cx("amount")}>
						<span className={cx("amount-value")}>{item.name}</span>
					</div>
				</div>
			);

			const resultDataCell = _.isNil(item?.result) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("amount-data-cell", "align-right")}>
					<div className={cx("amount")}>
						<div
							className={cx("amount-value")}
							onClick={() => {
								copy(item?.result);
								dispatch(
									showAlert({
										show: true,
										message: "Copied",
										autoHideDuration: 1500,
									})
								);
							}}>
							<CopyIcon className={cx("copy-icon")}></CopyIcon> {item?.result?.length > 30 ? item?.result?.substring(0, 30) + "...." : item?.result}
						</div>
					</div>
				</div>
			);

			const statusDataCell = <div className={cx("status-data-cell", "align-right")}>{statusElement}</div>;

			return [nameDataCell, resultDataCell, statusDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default RequestTable;
