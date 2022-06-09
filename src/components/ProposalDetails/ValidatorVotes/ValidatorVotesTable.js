import React, { memo, useEffect, useMemo } from "react";
import classNames from "classnames/bind";
import { tableThemes } from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./ValidatorVotes.scss";
import { NavLink } from "react-router-dom";
import consts from "src/constants/consts";
import {reduceString, setAgoTime} from "src/lib/scripts";
import {logoBrand} from "src/constants/logoBrand";
import aiIcon from "src/assets/common/ai_ic.svg";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const rankHeaderCell = <div className={cx("header-cell", "align-center")}>Rank</div>;
	const validatorHeaderCell = <div className={cx("header-cell", "align-left")}>Validator</div>;
	const txHashHeaderCell = <div className={cx("header-cell", "align-left")}>Txhash</div>;
	const answerHeaderCell = <div className={cx("header-cell", "align-left")}>Answer</div>;
	const timeHeaderCell = <div className={cx("header-cell", "align-right")}>Time</div>;
	const headerCells = [rankHeaderCell, validatorHeaderCell, txHashHeaderCell, answerHeaderCell, timeHeaderCell];
	const headerCellStyles = [
		{ width: "4%", minWidth: "100px" },
		{ width: "24%", minWidth: "240px" },
		{ width: "20%", minWidth: "140px" },
		{ width: "14%", minWidth: "100px" },
		{ width: "18%", minWidth: "100px" },
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

export const LogoValidatorCustom = ({ item }) => {
	const logoItem = logoBrand.find(it => it.operatorAddress === item?.operator_address) || {customLogo: ""};
	const logoURL = item?.image ? item.image : logoItem.customLogo ? false : logoItem.logo;

	return (
		<span className={cx("validator")}>
			<img src={logoURL ? logoURL : item?.image ? item?.image : aiIcon} alt={item?.moniker} className={cx("validator-img")} />
			<span>{item?.moniker}</span>
		</span>
	);
};

const ValidatorVotesTable = memo(({data = [], converVoteTypes}) => {
	const convertOptionType = type => {
		const labelArr = converVoteTypes(type);
		const text = labelArr[labelArr.length - 1];
		return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
	};

	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}
		return data.map((item, index) => {
			const rankDataCell = (
				<div className={cx("rank")}>
					<span className={cx("rank-content")}>{item?.rank || "-"}</span>
				</div>
			);
			const validatorDataCell = (
				<div className={cx("align-left")}>
					<NavLink className={cx("tx-hash-data-cell", "align-left")} to={`${consts.PATH.VALIDATORS}/${item?.operator_address}`}>
						<LogoValidatorCustom item={item} />
					</NavLink>
				</div>
			);
			const txHashDataCell = (
				<div className={cx("align-left")}>
					{item?.tx_hash ? (
						<NavLink className={cx("tx-hash-data-cell", "align-left")} to={`${consts.PATH.TXLIST}/${item?.tx_hash}`}>
							{reduceString(item?.tx_hash, 6, 6)}
						</NavLink>
					) : (
						"-"
					)}
				</div>
			);
			const answerDataCell = <div className={cx("align-left")}>{convertOptionType(item?.option)}</div>;
			const timeDataCell = <div className={cx("align-right")}>{item?.option !== "VOTE_OPTION_DID_NOT_VOTE" ? setAgoTime(item?.time_vote) : "-"}</div>;

			return [rankDataCell, validatorDataCell, txHashDataCell, answerDataCell, timeDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return (
		<ThemedTable
			theme={tableThemes.LIGHT}
			headerCellStyles={headerRow.headerCellStyles}
			headerCells={headerRow.headerCells}
			dataRows={dataRows}
		/>
	);
});

export default ValidatorVotesTable;
