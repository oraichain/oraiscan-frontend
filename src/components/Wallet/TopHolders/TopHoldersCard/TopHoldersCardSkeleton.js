import React, { memo } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./TopHoldersCard.module.scss";

const TopHoldersCardSkeleton = memo(({ rows = 10 }) => {
	const cx = classNames.bind(styles);

	let TopHoldersCardSkeletonItems = [];
	for (let i = 1; i <= rows; i++) {
		TopHoldersCardSkeletonItems.push(
			<div className={cx("TopHoldersToken-card-list-item")} key={"TopHoldersToken-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>TxHash</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>From</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>To</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Status</div>
								<Skeleton />
							</td>
							<td>
								<div className={cx("item-title")}>Time</div>
								<Skeleton />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Amount</div>
								<Skeleton />
							</td>
							<td>
								<div className={cx("item-title")}>Token</div>
								<Skeleton />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='TopHoldersToken-card-list'>{TopHoldersCardSkeletonItems}</div>;
});

export default TopHoldersCardSkeleton;
