import React, {memo} from "react";
import classNames from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import styles from "./UnbondingCardList.scss";

const UnbondingCardListSkeleton = memo(({rows = 5}) => {
	const cx = classNames.bind(styles);

	let unbondingCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		unbondingCardListItems.push(
			<div className={cx("unbonding-card-list-item")} key={"unbonding-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Address</div>
							</td>
							<td>
								<Skeleton className={cx("skeleton-inline-block")} variant='text' width={140} height={24} />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Amount</div>
							</td>
							<td>
								<div className={cx("item-title")}>Share</div>
							</td>
						</tr>

						<tr>
							<td>
								<Skeleton className={cx("skeleton-inline-block")} variant='text' width={140} height={24} />
							</td>
							<td>
								<Skeleton className={cx("skeleton-inline-block")} variant='text' width={140} height={24} />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='unbonding-card-list'>{unbondingCardListItems}</div>;
});

export default UnbondingCardListSkeleton;
