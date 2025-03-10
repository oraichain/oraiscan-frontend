/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import {Base64} from "js-base64";
import {_} from "src/lib/scripts";
import consts from "src/constants/consts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import CheckIcon from "src/icons/Validators/CheckIcon";
import ClockIcon from "src/icons/ClockIcon";
import TimesIcon from "src/icons/TimesIcon";
import styles from "./TestCaseTable.module.scss";
import copy from "copy-to-clipboard";
import CopyIcon from "src/icons/CopyIcon";
import {useDispatch} from "src/hooks";
import {showAlert} from "src/store/modules/global";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const nameHeaderCell = <div className={cx("header-cell", "align-left")}>Name</div>;
	const resultHeaderCell = <div className={cx("header-cell", "align-left")}>Result</div>;
	const statusHeaderCell = <div className={cx("header-cell", "align-right")}>Height</div>;

	const headerCells = [nameHeaderCell, resultHeaderCell, statusHeaderCell];
	const headerCellStyles = [
		{width: "20%"}, // Name
		{width: "70%"}, // Result
		{width: "10%"}, // Status
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const TestCaseTable = memo(({data}) => {
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
								<TimesIcon className={cx("status-icon", "status-icon-fail")} />
								<span className={cx("status-text")}>Failed</span>
							</div>
						);
						break;
					default:
						break;
				}
			}

			const nameDataCell = _.isNil(item?.name) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("name-data-cell", "align-left")}>{item?.name}</div>
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
							{/* <CopyIcon className={cx("copy-icon")}></CopyIcon> */}
							{Base64.decode(item?.result)}
						</div>
					</div>
				</div>
			);

			const statusDataCell = <div className={cx("status-data-cell", "align-right")}>{statusElement}</div>;

			return [nameDataCell, resultDataCell, statusDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

TestCaseTable.propTypes = {
	data: PropTypes.array,
};
TestCaseTable.defaultProps = {
	data: [],
};

export default TestCaseTable;
