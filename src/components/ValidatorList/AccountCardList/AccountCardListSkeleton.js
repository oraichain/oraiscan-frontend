import React, {memo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./AccountCardList.scss";

const AccountCardListSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);

	let accountCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		accountCardListItems.push(
			<div className={cx("account-card-list-item")} key={"account-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Rank</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Address</div>
								<Skeleton />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Name Tag</div>
								<Skeleton />
							</td>
							<td>
								<div className={cx("item-title")}>Balance</div>
								<Skeleton />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Percentage</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Txn Count</div>
								<Skeleton />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='account-card-list'>{accountCardListItems}</div>;
});

export default AccountCardListSkeleton;
