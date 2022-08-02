import React, {memo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./WithdrawCardList.module.scss";

const cx = classNames.bind(styles);

const WithdrawCardListSkeleton = memo(({rows = 5}) => {
	let withdrawCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		withdrawCardListItems.push(
			<div className={cx("withdraw-card-list-item")} key={"withdraw-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Validator</div>
							</td>
							<td>
								<div className={cx("item-text")}>
									<Skeleton />
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Staked (ORAI)</div>
							</td>
							<td>
								<div className={cx("item-title")}>Withdrawable (ORAI)</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-text")}>
									<Skeleton />
								</div>
							</td>
							<td>
								<div className={cx("item-text")}>
									<Skeleton />
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Unbonding (ORAi)</div>
							</td>
							<td>
								<div className={cx("item-title")}>Reward</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-text")}>
									<Skeleton />
								</div>
							</td>
							<td>
								<div className={cx("item-text")}>
									<Skeleton />
								</div>
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<div className={cx("item-text")}>
									<Skeleton />
								</div>
							</td>
						</tr>
						<tr>
							<td colSpan={2}>
								<div className={cx("item-text")}>
									<Skeleton />
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='withdraw-card-list'>{withdrawCardListItems}</div>;
});

export default WithdrawCardListSkeleton;
