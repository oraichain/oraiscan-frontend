import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import getTxType from "src/constants/getTxType";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import styles from "./TransactionCardList.scss";
import successIcon from "src/assets/transactions/success_ic.svg";
import failureIcon from "src/assets/transactions/fail_ic.svg";
import moreIcon from "src/assets/transactions/tx_more_btn.svg";

const TransactionCardList = memo(({data = []}) => {
	const cx = classNames.bind(styles);

	return (
		<div className='transaction-card-list'>
			{data.map((item, index) => (
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
										<NavLink className={cx("item-link")} to={`${consts.API.TXLIST}/${item.tx_hash}`}>
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
									{_.isNil(item?.messages?.[0]?.type) ? (
										<div className={cx("item-text")}>-</div>
									) : (
										<div className={cx("type-data-cell")}>
											<div className={cx("first-message-type")}>{getTxType(item.messages[0].type)}</div>
											{item.messages.length > 1 && <div className={cx("number-of-message")}>+{item.messages.length - 1}</div>}
										</div>
									)}
								</td>
							</tr>

							<tr>
								<td>
									<div className={cx("item-title")}>Result</div>
									{_.isNil(item?.result) ? (
										<div className={cx("item-text")}>-</div>
									) : (
										<div className={cx("result-data-cell")}>
											{item?.result ? (
												<>
													<img src={successIcon} alt='success' />
													<p>Success</p>
												</>
											) : (
												<>
													<img src={failureIcon} alt='failure' />
													<p>Failure</p>
												</>
											)}
										</div>
									)}
								</td>
								<td>
									<div className={cx("item-title")}>Amount</div>
									{_.isNil(item?.messages?.[0]?.value?.amount?.[0]?.denom) || _.isNil(item?.messages?.[0]?.value?.amount?.[0]?.amount) ? (
										<NavLink to={`${consts.API.TXLIST}/${item.tx_hash}`} className={cx("amount-data-cell")}>
											<p>More</p>
											<img src={moreIcon} alt='more' />
										</NavLink>
									) : (
										<div className={cx("amount-data-cell", "item-text")}>
											<span>{formatOrai(item.messages[0].value.amount[0].amount)} </span>
											<span>{item.messages[0].value.amount[0].denom}</span>
										</div>
									)}
								</td>
							</tr>

							<tr>
								<td>
									<div className={cx("item-title")}>Fee</div>
								</td>
								<td>
									{_.isNil(item?.fee?.amount?.[0]?.amount) || _.isNil(item?.fee?.amount?.[0]?.denom) ? (
										<div className={cx("item-text")}>-</div>
									) : (
										<div className={cx("fee-data-cell", "item-text")}>
											<span>{formatOrai(item.fee.amount[0].amount)}</span>
											<span>{item.fee.amount[0].denom}</span>
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
										<NavLink className={cx("item-link")} to={`${consts.API.BLOCKLIST}/${item.height}`}>
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
			))}
		</div>
	);
});

export default TransactionCardList;