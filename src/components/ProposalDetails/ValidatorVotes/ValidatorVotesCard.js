// @ts-nocheck
import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import { LogoValidatorCustom } from "./ValidatorVotesTable";
import styles from "../TransactionCardList/TransactionCardList.module.scss";

const ValidatorVotesCard = memo(({data = [], converVoteTypes}) => {
	const cx = classNames.bind(styles);

	const convertOptionType = type => {
		const labelArr = converVoteTypes(type);
		const text = labelArr[labelArr.length - 1];
		return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
	};

	return (
		<div className='transaction-card-list'>
			{data.map((item, index) => {
				return (
					<div className={cx("transaction-card-list-item")} key={"transaction-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Validator</div>
									</td>
									<td>
										{!item?.moniker ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.VALIDATORS}/${item?.operator_address}`}>
													<LogoValidatorCustom item={item} />
											</NavLink>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>TxHash</div>
									</td>
									<td>
										{!item?.tx_hash ? (
											<div className={cx("item-text")}>-</div>
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
										<div className={cx("item-text")}>{convertOptionType(item?.option) || "-"}</div>
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Rank</div>
										<div className={cx("item-text", "item-rank")}>{item?.rank || "-"}</div>
									</td>
									<td>
										<div className={cx("item-title")}>Time</div>
										<div className={cx("item-text")}>{setAgoTime(item?.time_vote) || "-"}</div>
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

export default ValidatorVotesCard;
