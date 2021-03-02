/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import getTxType from "src/constants/getTxType";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./DelegatedTable.scss";
import successIcon from "src/assets/transactions/success_ic.svg";
import failureIcon from "src/assets/transactions/fail_ic.svg";
import moreIcon from "src/assets/transactions/tx_more_btn.svg";
import {ReactComponent as ArrowDownIcon} from "src/assets/icons/arrow-down.svg";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const validatorHeaderCell = <div className={cx("header-cell", "align-left")}>Validator</div>;
	const stakeHeaderCell = <div className={cx("header-cell", "align-left")}>Staked (ORAI)</div>;
	const rewardHeaderCell = <div className={cx("header-cell", "align-left")}>Rewards (ORAI)</div>;
	const unbondedHeaderCell = <div className={cx("header-cell", "align-left")}>Unbonded (ORAI)</div>;
	const withdrawableHeaderCell = <div className={cx("header-cell", "align-left")}>Withdrawable (ORAI)</div>;
	const withdrawHeaderCell = <div className={cx("header-cell", "align-left")}>Withdraw</div>;
	const headerCells = [validatorHeaderCell, stakeHeaderCell, rewardHeaderCell, unbondedHeaderCell, withdrawableHeaderCell, withdrawHeaderCell];
	const headerCellStyles = [{width: "20%"}, {width: "16%"}, {width: "16%"}, {width: "16%"}, {width: "16%"}, {width: "16%"}];
	return {
		headerCells,
		headerCellStyles,
	};
};

const DelegatedTable = memo(({data = []}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const validatorHashDataCell = _.isNil(item?.validator) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink
					style={{
						display: "flex",
						alignItems: "center",
					}}
					className={cx("parent-hash-data-cell", "align-left")}
					to={`${consts.API.TXLIST}/${item.validator}`}>
					<img
						style={{height: 25, width: 25, marginRight: 8}}
						src='https://s3-alpha-sig.figma.com/img/8362/33c4/e6df421c45fcb313da44bfbf0cade2dd?Expires=1611532800&Signature=DaY~oAYZuTho7cREErUDwOxotK-pSprPfeyqPDcwE~J5VbxN3AZyEZAqkAWegSn~XvLvGcqs-4B7fmzlHXvMLGXCMu-BoHLXXfvSWSFqwjjAgmO89lIeSKxKW4YbQqUvSSPLYzGqC-ksVgl-9ts8E04Vd93-iqFbjCvFXqMFc5yaeGTQns7fIll5nBMrEov2GasOY~3vxgXHlXY1BsSAVn0~9WVBbfoysVfAtBw5nzD7~vz7R4A3lYyJnrBLklDDJCbLKxqkA52X-FV6rsahhmiK0VON51OzoXMQG6k2HNstofhvynnv2oM0vHherS6XRHSHZdFPdXCRFXmQ2c8iFA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'
					/>{" "}
					{item.validator}
				</NavLink>
			);

			const stakeDataCell = _.isNil(item?.stake) ? <div className={cx("align-left")}>-</div> : <div className={cx("node-data-cell")}>{item.stake}</div>;

			const rewardDataCell = _.isNil(item?.reward) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("txs-data-cell", "align-left")}>{item.reward}</div>
			);

			const unnbondedDataCell = _.isNil(item?.unbonded) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("txs-data-cell", "align-left")}>{item.unbonded}</div>
			);

			const withdrawableDataCell = _.isNil(item?.withdraw) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("txs-data-cell", "align-left")}>{item.withdraw}</div>
			);

			const withdrawCell = (
				<div className={cx("txs-data-cell", "align-left", "with-draw")}>
					Withdraw <ArrowDownIcon />{" "}
				</div>
			);

			return [validatorHashDataCell, stakeDataCell, rewardDataCell, unnbondedDataCell, withdrawableDataCell, withdrawCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default DelegatedTable;
