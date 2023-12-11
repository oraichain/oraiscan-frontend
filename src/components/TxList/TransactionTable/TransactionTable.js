// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ThemedTable from "src/components/common/ThemedTable";
import consts from "src/constants/consts";
import { tableThemes } from "src/constants/tableThemes";
import { checkTokenCW20, formatFloat, formatOrai } from "src/helpers/helper";
import { getAmountDenomInfo, getNewRoyalty, getRoyaltyAmount, getTokenId, getTxTypeNew } from "src/helpers/transaction";
import CheckIcon from "src/icons/CheckIcon";
import RedoIcon from "src/icons/RedoIcon";
import TimesIcon from "src/icons/TimesIcon";
import { _, reduceString, reduceStringAssets, setAgoTime } from "src/lib/scripts";
import styles from "./TransactionTable.module.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = (royalty = false) => {
	const txHashHeaderCell = <div className={cx("header-cell", "align-left")}>TxHash</div>;
	const typeHeaderCell = <div className={cx("header-cell", "align-left")}>Type</div>;
	const resultHeaderCell = <div className={cx("header-cell", "align-center")}>Result</div>;
	let amountHeaderCell = <div className={cx("header-cell", "align-right")}>{royalty ? "Royalty Amount" : "Amount"}</div>;
	const feeHeaderCell = <div className={cx("header-cell", "align-right")}>{royalty ? "Token Id" : "Fee"}</div>;
	const heightHeaderCell = <div className={cx("header-cell", "align-right")}>Height</div>;
	const timeHeaderCell = <div className={cx("header-cell", "align-right")}>Time</div>;
	let headerCells = [txHashHeaderCell, typeHeaderCell, resultHeaderCell, amountHeaderCell, feeHeaderCell, heightHeaderCell, timeHeaderCell];
	let headerCellStyles = [
		{ width: "15%" }, // TxHash
		{ width: "23%" }, // Type
		{ width: "10%" }, // Result
		{ width: "22%" }, // Amount
		{ width: "10%" }, // Fee
		{ width: "10%" }, // Height
		{ width: "10%" }, // Time
	];
	if (royalty) {
		const newRoyaltyHeaderCell = <div className={cx("header-cell", "align-right")}>New Royalty</div>;
		headerCells.push(newRoyaltyHeaderCell);
		headerCellStyles = [
			{ width: "12%" }, // TxHash
			{ width: "18%" }, // Type
			{ width: "10%" }, // Result
			{ width: "16%" }, // Amount
			{ width: "12%" }, // Fee
			{ width: "12%" }, // Height
			{ width: "10%" }, // Time
			{ width: "10%" }, // New Royalty
		];
	}

	return {
		headerCells,
		headerCellStyles,
	};
};

export const checkAmountOrai = (denom, amount, newDenom, noDenomName, priceTokens, status, className) => {
	const denomCheck = checkTokenCW20(denom);
	let priceToken = status?.price ? " ($" + formatFloat(status.price * (amount / 1000000), 4) + ")" : "";
	if (denom?.toLowerCase()?.includes("ibc")) {
		if (newDenom?.toLowerCase()?.includes(consts.GRAVITY)) {
			denom = newDenom ? reduceStringAssets(newDenom.toLowerCase()) : noDenomName;
			return (
				<div className={cx("amount", { "custom-amount": className })}>
					<span className={cx("amount-value")}>{formatOrai(amount, denomCheck && Math.pow(10, denomCheck.decimal))}</span>
					<span className={cx("amount-denom")}>{denom}</span>
					<div className={cx("amount-usd")}>{priceToken}</div>
				</div>
			);
		}
	} else {
		if (denom?.toLowerCase()?.includes(consts.GRAVITY)) {
			denom = newDenom ? reduceStringAssets(newDenom.toLowerCase()) : noDenomName;
			return (
				<div className={cx("amount", { "custom-amount": className })}>
					<span className={cx("amount-value")}>{formatOrai(amount)}</span>
					<span className={cx("amount-denom")}>{denom}</span>
					<div className={cx("amount-usd")}>{priceToken}</div>
				</div>
			);
		}
	}
	const priceOraiCheck = denom?.toLowerCase() === consts.DENOM_ORAI;
	const priceTokenCheck = denom?.toLowerCase() === denomCheck?.address?.toLowerCase();
	const tokenPrice = priceTokens[denomCheck.coingeckoId] || 0;
	const fmtAmount = !denomCheck.status ? formatOrai(amount) : formatOrai(+amount, Math.pow(10, denomCheck?.decimal), 6);

	return (
		<div className={cx({ amount: !className }, { "custom-amount": className })}>
			<span className={cx("amount-value")}>{fmtAmount}</span>
			<span className={cx("amount-denom")}>{denomCheck.status ? reduceStringAssets(denomCheck.denom) : reduceStringAssets(denom)}</span>
			{priceOraiCheck ? (
				<div className={cx("amount-usd")}>{priceToken}</div>
			) : priceTokenCheck ? (
				<div className={cx("amount-usd")}>{"($" + formatOrai(+amount * tokenPrice, Math.pow(10, denomCheck.decimal), 6) + ")"}</div>
			) : (
				<></>
			)}
		</div>
	);
};

const TransactionTable = memo(({ data, rowMotions, account, royalty = false, txHashClick = false }) => {
	const status = useSelector(state => state.blockchain.status);
	const priceTokens = useSelector(state => state.blockchain.priceTokens);

	const getDataRows = (data, txHashStatus) => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const txHashDataCell = _.isNil(item?.tx_hash) ? (
				<div className={cx("align-left")}>-</div>
			) : txHashStatus ? (
				<div className={cx("tx-hash-data-cell", "align-left")}>{reduceString(item.tx_hash, 6, 6)}</div>
			) : (
				<NavLink className={cx("tx-hash-data-cell", "align-left")} to={`${consts.PATH.TXLIST}/${item.tx_hash}`}>
					{reduceString(item.tx_hash, 6, 6)}
				</NavLink>
			);

			const typeDataCell = _.isNil(item?.messages?.[item?.messages?.length - 1]?.["@type"]) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("type-data-cell")}>
					<div className={cx("first-message-type")}>{getTxTypeNew(item.messages[item?.messages?.length - 1]["@type"], item?.raw_log, item?.result)}</div>
					{item.messages.length > 1 && <div className={cx("number-of-message")}>+{item.messages.length - 1}</div>}
				</div>
			);

			let resultDataCellContent;
			if (item?.result?.toLowerCase?.() === consts.RESULT_STATUS.SUCCESS) {
				resultDataCellContent = (
					<div className={cx("result")}>
						<CheckIcon className={cx("result-icon", "result-icon-success")} />
						<span className={cx("result-text")}>Success</span>
					</div>
				);
			} else if (item?.result?.toLowerCase?.() === consts.RESULT_STATUS.FAILURE) {
				resultDataCellContent = (
					<div className={cx("result")}>
						<TimesIcon className={cx("result-icon", "result-icon-failed")} />
						<span className={cx("result-text")}>Failure</span>
					</div>
				);
			} else if (item?.result?.toLowerCase?.() === consts.RESULT_STATUS.PENDING) {
				resultDataCellContent = (
					<div className={cx("result")}>
						<RedoIcon className={cx("result-icon", "result-icon-pending")} />
						<span className={cx("result-text")}>Pending</span>
					</div>
				);
			}

			const resultDataCell = _.isNil(item?.result) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("result-data-cell")}>{resultDataCellContent}</div>
			);

			let transferStatus = null;
			if (account && getTxTypeNew(item?.messages?.[0]["@type"]) === "MsgSend" && item?.messages?.[0]?.from_address) {
				if (account === item.messages[0].from_address) {
					transferStatus = <div className={cx("transfer-status", "transfer-status-out")}>OUT</div>;
				} else {
					transferStatus = <div className={cx("transfer-status", "transfer-status-in")}>IN</div>;
				}
			} else if (account && getTxTypeNew(item?.messages?.[0]["@type"]) === "MsgMultiSend" && item?.messages[0]?.inputs[0]?.address) {
				if (account === item.messages[0].inputs[0].address) {
					transferStatus = <div className={cx("transfer-status", "transfer-status-out")}>OUT</div>;
				} else {
					transferStatus = <div className={cx("transfer-status", "transfer-status-in")}>IN</div>;
				}
			} else if (account && item?.messages?.find(msg => getTxTypeNew(msg["@type"]) === "MsgRecvPacket")) {
				let message = item?.messages?.find(msg => getTxTypeNew(msg["@type"]) === "MsgRecvPacket");
				if (message?.packet?.data) {
					const data = JSON.parse(atob(message?.packet?.data));
					if (account === data.receiver) {
						transferStatus = <div className={cx("transfer-status", "transfer-status-in")}>IN</div>;
					}
				}
			} else if (account && item?.messages?.find(msg => getTxTypeNew(msg["@type"]) === "MsgTransfer")) {
				let message = item?.messages?.find(msg => getTxTypeNew(msg["@type"]) === "MsgTransfer");
				if (account === message.sender) {
					transferStatus = <div className={cx("transfer-status", "transfer-status-out")}>OUT</div>;
				}
			} else if (account && item?.messages?.find(msg => getTxTypeNew(msg["@type"]) === "MsgExecuteContract")) {
				if (item?.messages?.[0] && item?.messages?.[0]?.sent_funds?.length) {
					transferStatus = <div className={cx("transfer-status", "transfer-status-out")}>OUT</div>;
				}
			}

			let amountDataCell;
			const objRoyaltyAmount = getRoyaltyAmount(account, item?.raw_log, item?.result);
			if (royalty && objRoyaltyAmount.royalty) {
				amountDataCell = (
					<div className={cx("amount-data-cell", { "amount-data-cell-with-transfer-status": transferStatus }, "align-right")}>
						{transferStatus && transferStatus}
						<div className={cx("amount")}>
							<span className={cx("amount-value")}>{objRoyaltyAmount.amount === "0" ? objRoyaltyAmount.amount : formatOrai(objRoyaltyAmount.amount)}</span>
							<span className={cx("amount-denom")}>ORAI</span>
							<div className={cx("amount-usd")}>
								{objRoyaltyAmount.amount === "0"
									? " ($0)"
									: status?.price
									? " ($" + formatFloat(status.price * (objRoyaltyAmount.amount / 1000000), 4) + ")"
									: ""}
							</div>
						</div>
					</div>
				);
			} else {
				const { denom, amount, newDenom, noDenomName } = getAmountDenomInfo(item, account);
				let denomMore;
				if (denom === consts.MORE) {
					denomMore = (
						<div className={cx("amount")}>
							<NavLink to={`${consts.PATH.TXLIST}/${item.tx_hash}`} style={{ cursor: "pointer" }}>
								<span className={cx("amount-denom")}>{denom}</span>
							</NavLink>
						</div>
					);
				} else {
					denomMore = checkAmountOrai(denom, amount, newDenom, noDenomName, priceTokens, status);
				}
				amountDataCell =
					_.isNil(amount) || _.isNil(denom) ? (
						<div className={cx("amount-data-cell", { "amount-data-cell-with-transfer-status": transferStatus }, "align-right")}>
							{transferStatus && transferStatus}
							{amount ? (
								<>{checkAmountOrai(item?.amount?.[0]?.denom, amount, item?.amount?.[0]?.denom_name, noDenomName, priceTokens, status)}</>
							) : (
								<div className={cx("amount")}>
									<span className={cx("amount-value")}>0</span>
									<span className={cx("amount-denom")}>ORAI</span>
									<div className={cx("amount-usd")}>($0)</div>
								</div>
							)}
						</div>
					) : (
						<div className={cx("amount-data-cell", { "amount-data-cell-with-transfer-status": transferStatus }, "align-right")}>
							{transferStatus && transferStatus}
							{denomMore}
						</div>
					);
			}

			let feeDataCell;
			if (royalty) {
				const tokenId = getTokenId(item?.raw_log, item?.result);
				feeDataCell = <div className={cx("align-right")}>{tokenId}</div>;
			} else {
				feeDataCell = _.isNil(item?.fee?.amount) ? (
					<div className={cx("align-right")}>-</div>
				) : (
					<div className={cx("fee-data-cell", "align-right")}>
						<div className={cx("fee")}>
							<span className={cx("fee-value")}>{formatOrai(item.fee?.amount?.[0]?.amount || 0)}</span>
							<span className={cx("fee-denom")}>{item.fee?.amount?.[0]?.denom || item.fee?.amount?.[0]?.denom_name || "ORAI"}</span>
						</div>
					</div>
				);
			}

			const heightDataCell = _.isNil(item?.height) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<NavLink className={cx("height-data-cell", "align-right")} to={`${consts.PATH.BLOCKLIST}/${item.height}`}>
					{item.height}
				</NavLink>
			);

			const timeDataCell = _.isNil(item?.timestamp) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("time-data-cell", "align-right")}>{setAgoTime(item.timestamp)}</div>
			);

			const newRoyaltyDataCell = <div className={cx("time-data-cell", "align-right")}>{getNewRoyalty(account, item?.raw_log, item?.result)}</div>;

			if (royalty) {
				return [txHashDataCell, typeDataCell, resultDataCell, amountDataCell, feeDataCell, heightDataCell, timeDataCell, newRoyaltyDataCell];
			}

			return [txHashDataCell, typeDataCell, resultDataCell, amountDataCell, feeDataCell, heightDataCell, timeDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(royalty), []);
	const dataRows = useMemo(() => getDataRows(data, txHashClick), [data, getDataRows]);

	return (
		<ThemedTable
			theme={tableThemes.LIGHT}
			headerCellStyles={headerRow.headerCellStyles}
			headerCells={headerRow.headerCells}
			dataRows={dataRows}
			rowMotions={rowMotions}
		/>
	);
});

TransactionTable.propTypes = {
	data: PropTypes.array,
	rowMotions: PropTypes.array,
	account: PropTypes.string,
	pending: PropTypes.bool,
};

TransactionTable.defaultProps = {
	data: [],
	rowMotions: [],
	pending: false,
};

export default TransactionTable;
