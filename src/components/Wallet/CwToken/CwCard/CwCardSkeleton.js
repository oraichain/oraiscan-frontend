import React, {memo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./CwCard.scss";

const CwCardSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);

	let CwCardSkeletonItems = [];
	for (let i = 1; i <= rows; i++) {
		CwCardSkeletonItems.push(
			<div className={cx("cwToken-card-list-item")} key={"cwToken-card-list-item-" + i}>
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

	return <div className='cwToken-card-list'>{CwCardSkeletonItems}</div>;
});

export default CwCardSkeleton;
