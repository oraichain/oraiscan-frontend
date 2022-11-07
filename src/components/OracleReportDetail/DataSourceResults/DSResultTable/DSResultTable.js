import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import copy from "copy-to-clipboard";
import {_, reduceString} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import CheckIcon from "src/icons/Validators/CheckIcon";
import ClockIcon from "src/icons/ClockIcon";
import TimesIcon from "src/icons/TimesIcon";
import {useDispatch} from "src/hooks";
import CopyIcon from "src/icons/CopyIcon";
import {showAlert} from "src/store/modules/global";
import styles from "./DSResultTable.module.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const nameHeaderCell = <div className={cx("header-cell", "align-left")}>Contract</div>;
	const resutHeaderCell = <div className={cx("header-cell", "align-left")}>Result</div>;
	const statusHeaderCell = <div className={cx("header-cell", "align-right")}>Status</div>;
	const headerCells = [nameHeaderCell, resutHeaderCell, statusHeaderCell];
	const headerCellStyles = [
		{minWidth: "100px"}, // Contract
		{maxWidth: "100px"}, // Result
		{minWidth: "100px"}, // Status
	];

	return {
		headerCells,
		headerCellStyles,
	};
};

const DSResultTable = memo(({data = []}) => {
	const dispatch = useDispatch();
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data?.map(item => {
			let statusElement;
			if (_.isNil(item?.status)) {
				statusElement = <div className={cx("status")}>-</div>;
			} else {
				switch (item?.status) {
					case true:
						statusElement = (
							<div className={cx("status")}>
								<CheckIcon className={cx("status-icon", "status-icon-success")} />
								<span className={cx("status-text")}>Success</span>
							</div>
						);
						break;
					case false:
						statusElement = (
							<div className={cx("status")}>
								<TimesIcon className={cx("status-icon", "status-icon-fail")} />
								<span className={cx("status-text")}>Failed</span>
							</div>
						);
						break;
					default:
						break;
				}
			}

			const nameDataCell = _.isNil(item?.contract) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("name-data-cell", "align-left")}>
					<div className={cx("name")}>
						<span className={cx("name-value")}>{item?.contract}</span>
					</div>
				</div>
			);

			const resultDataCell = _.isNil(item?.result) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("result-data-cell", "align-left")}>
					<div className={cx("result")}>
						<div
							className={cx("result-value")}
							// onClick={() => {
							// 	copy(item?.result);
							// 	dispatch(
							// 		showAlert({
							// 			show: true,
							// 			message: "Copied",
							// 			autoHideDuration: 1500,
							// 		})
							// 	);
							// }}
						>
							{/* <CopyIcon className={cx("copy-icon")}></CopyIcon>  */}
							{item?.result}
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

export default DSResultTable;
