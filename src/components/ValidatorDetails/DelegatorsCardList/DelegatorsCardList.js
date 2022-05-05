import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_, reduceString} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import styles from "./DelegatorsCardList.scss";

const cx = classNames.bind(styles);

const DelegatorsCardList = memo(({data = []}) => {
	return (
		<div className='delegators-card-list'>
			{data.map((item, index) => (
				<div className={cx("delegators-card-list-item")} key={"delegators-card-list-item-" + index}>
					<table>
						<tbody>
							<tr>
								<td>
									<div className={cx("item-title")}>Address</div>
								</td>
								<td>
									{_.isNil(item?.delegator_address) ? (
										<div className={cx("item-link")}>-</div>
									) : (
										<NavLink className={cx("item-link")} to={`${consts.PATH.ACCOUNT}/${item.delegator_address}`}>
											{reduceString(item.delegator_address, 6, 6)}
										</NavLink>
									)}
								</td>
							</tr>

							<tr>
								<td>
									<div className={cx("item-title")}>Amount</div>
									{_.isNil(item?.amount) || _.isNil(item?.denom) ? (
										<div className={cx("item-text")}>-</div>
									) : (
										<div className={cx("amount-data-cell")}>
											<div className={cx("amount")}>
												<span className={cx("amount-value")}>{formatOrai(item.amount)}</span>
												<span className={cx("amount-denom")}>{reduceString(item.denom)}</span>
											</div>
										</div>
									)}
								</td>
								<td>
									<div className={cx("item-title")}>Share</div>
									{_.isNil(item?.shares) ? (
										<div className={cx("align-right")}>-</div>
									) : (
										<div className={cx("shares-data-cell", "align-right")}>{item.shares}%</div>
									)}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			))}
		</div>
	);
});

export default DelegatorsCardList;
