// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {useSelector, useDispatch} from "react-redux";
import {_} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import {tableThemes} from "src/constants/tableThemes";
import {logoBrand} from "src/constants/logoBrand";
import ThemedTable from "src/components/common/ThemedTable";
import WithdrawBtn from "./WithdrawBtn";
import styles from "./WithdrawTable.scss";
import arrowIcon from "src/assets/wallet/arrow_down.svg";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const validatorHeaderCell = <div className={cx("header-cell", "align-left")}>Validator</div>;
	const stakedHeaderCell = <div className={cx("header-cell", "align-left")}>Staked (ORAI)</div>;
	const rewardsHeaderCell = <div className={cx("header-cell", "align-left")}>Rewards (ORAI)</div>;
	const ubondedHeaderCell = <div className={cx("header-cell", "align-left")}>Unbonded (ORAI)</div>;
	const withdrawableHeaderCell = <div className={cx("header-cell", "align-left")}>Withdrawable (ORAI)</div>;
	const withdrawHeaderCell = <div className={cx("header-cell", "align-center")}>Withdraw</div>;
	const headerCells = [validatorHeaderCell, stakedHeaderCell, rewardsHeaderCell, ubondedHeaderCell, withdrawableHeaderCell, withdrawHeaderCell];
	const headerCellStyles = [{width: "auto"}, {width: "auto"}, {width: "auto"}, {width: "auto"}, {width: "auto"}, {width: "140px"}];
	return {
		headerCells,
		headerCellStyles,
	};
};

const BtnComponent = ({handleClick}) => {
	return (
		<div className={cx("withdraw-data-cell", "align-center")}>
			<button className={cx("button")} onClick={handleClick}>
				Withdraw
				<img alt='/' className={cx("button-icon")} src={arrowIcon} />
			</button>
		</div>
	);
};

const WithdrawTable = memo(({data}) => {
	// const {address, account} = useSelector(state => state.wallet);
	// const dispatch = useDispatch();

	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map((item, index) => {
			// const validatorIcon = logoBrand.find(logoBrandItem => item?.validator === logoBrandItem.operatorAddress)?.logo ?? aiIcon;
			const logoItem = logoBrand.find(it => it.operatorAddress === item?.validator_address) || {};
			const logoURL = logoItem.customLogo ? false : logoItem.logo;
			const logoName = item.validator || "";

			const validatorDataCell = item?.validator ? (
				<NavLink className={cx("validator-data-cell", "align-left")} to={`${consts.PATH.VALIDATORS}/${item.validator}`}>
					<div className={cx("validator")}>
						{logoURL && <img alt='/' className={cx("validator-icon")} src={logoURL} />}
						{!logoURL && <div className={cx("logo-custom")}> {logoName.substring(0, 3).toUpperCase()} </div>}
						<span className={cx("validator-name")}>{item.validator}</span>
					</div>
				</NavLink>
			) : (
				<div className={cx("align-left")}>-</div>
			);

			const stakedDataCell = _.isNil(item?.staked) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("staked-data-cell")}>{formatOrai(item?.staked)}</div>
			);

			const rewardsDataCell = _.isNil(item?.rewards) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("rewards-data-cell")}>{formatOrai(item?.rewards)}</div>
			);

			const unbondedDataCell = _.isNil(item?.unbonded) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("unbonded-data-cell", "align-left")}>{formatOrai(item.unbonded)}</div>
			);

			const withdrawableDataCell = _.isNil(item?.withdrawable) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("withdrawable-data-cell", "align-left")}>{formatOrai(item.withdrawable)}</div>
			);

			const withdrawDataCell = (
				<WithdrawBtn validatorAddress={item?.validator_address} withdrawable={item?.withdrawable} BtnComponent={BtnComponent} validatorName={item.validator} />
			);

			// const withdrawDataCell = (
			// 	<div className={cx("withdraw-data-cell", "align-center")}>
			// 		<button className={cx("button")} onClick={() => handleClickClaim(item?.validator_address, item?.withdrawable)}>
			// 			Withdraw
			// 			<img alt='/' className={cx("button-icon")} src={arrowIcon} />
			// 		</button>
			// 	</div>
			// );

			return [validatorDataCell, stakedDataCell, rewardsDataCell, unbondedDataCell, withdrawableDataCell, withdrawDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default WithdrawTable;
