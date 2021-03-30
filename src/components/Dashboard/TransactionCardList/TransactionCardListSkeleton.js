import React, {memo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./TransactionCardList.scss";

const TransactionCardListSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);

	let transactionCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		transactionCardListItems.push(
			<div className={cx("transaction-card-list-item")} key={"transaction-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>TxHash</div>
							</td>
							<td>
								<Skeleton className={cx("skeleton-inline-block")} variant='text' width={50} height={24} />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Type</div>
							</td>
							<td>
								<Skeleton className={cx("skeleton-inline-block")} variant='text' width={50} height={24} />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Height</div>
								<Skeleton className={cx("skeleton-inline-block")} variant='text' width={50} height={24} />
							</td>
							<td>
								<div className={cx("item-title")}>Time</div>
								<Skeleton className={cx("skeleton-inline-block")} variant='text' width={50} height={24} />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='transaction-card-list'>{transactionCardListItems}</div>;
});

export default TransactionCardListSkeleton;
