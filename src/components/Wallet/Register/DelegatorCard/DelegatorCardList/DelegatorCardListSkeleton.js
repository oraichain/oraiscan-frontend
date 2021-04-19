import React, {memo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./DelegatorCardList.scss";

const cx = classNames.bind(styles);

const DelegatorCardListSkeleton = memo(({rows = 5}) => {
	let delegatorCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		delegatorCardListItems.push(
			<div className={cx("delegator-card-list-item")} key={"delegator-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Address</div>
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
								<div className={cx("item-title")}>Claimable Reward (ORAI)</div>
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
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='delegator-card-list'>{delegatorCardListItems}</div>;
});

export default DelegatorCardListSkeleton;
