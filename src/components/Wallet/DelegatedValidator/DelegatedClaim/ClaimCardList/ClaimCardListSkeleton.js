import React, {memo} from "react";
import Skeleton from "react-loading-skeleton";
import classNames from "classnames/bind";
import styles from "./ClaimCardList.scss";

const cx = classNames.bind(styles);

const ClaimCardListSkeleton = memo(({rows = 5}) => {
	let claimCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		claimCardListItems.push(
			<div className={cx("claim-card-list-item")} key={"claim-card-list-item-" + i}>
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

	return <div className='claim-card-list'>{claimCardListItems}</div>;
});

export default ClaimCardListSkeleton;
