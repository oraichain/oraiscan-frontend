// @ts-nocheck
import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import { _, reduceString, setAgoTime } from "src/lib/scripts";
import styles from "./TransactionCardList.scss";
import { useSelector } from "react-redux";

const getTxTypeNew = (type, rawLog = "[]", result = "") => {
	const typeArr = type.split(".");
	let typeMsg = typeArr[typeArr.length - 1];
	if (typeMsg === "MsgExecuteContract" && result === "Success") {
		let rawLogArr = JSON.parse(rawLog);
		for (let event of rawLogArr[0].events) {
			if (event["type"] === "wasm") {
				for (let att of event["attributes"]) {
					if (att["key"] === "action") {
						let attValue = att["value"]
							.split("_")
							.map(word => word.charAt(0).toUpperCase() + word.slice(1))
							.join("");
						typeMsg += "/" + attValue;
						break;
					}
				}

				break;
			}
		}
	}

	return typeMsg;
};

const TransactionCardList = memo(({ data = [], account }) => {
	const cx = classNames.bind(styles);
	const status = useSelector(state => state.blockchain.status);

	return (
		<div className='transaction-card-list'>
			{data.map((item, index) => {
				return (
					<div className={cx("transaction-card-list-item")} key={"transaction-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>TxHash</div>
									</td>
									<td>
										{_.isNil(item?.tx_hash) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.TXLIST}/${item.tx_hash}`}>
												{reduceString(item.tx_hash, 6, 6)}
											</NavLink>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Type</div>
									</td>
									<td>
										{_.isNil(item?.messages?.[0]?.["@type"]) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("type-data-cell")}>
												<div className={cx("first-message-type")}>{getTxTypeNew(item.messages[0]["@type"], item?.raw_log, item?.result)}</div>
												{item.messages.length > 1 && <div className={cx("number-of-message")}>+{item.messages.length - 1}</div>}
											</div>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Height</div>
										{_.isNil(item?.height) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.BLOCKLIST}/${item.height}`}>
												{item.height}
											</NavLink>
										)}
									</td>
									<td>
										<div className={cx("item-title")}>Time</div>
										{_.isNil(item?.timestamp) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{setAgoTime(item.timestamp)}</div>}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				);
			})}
		</div>
	);
});

export default TransactionCardList;
