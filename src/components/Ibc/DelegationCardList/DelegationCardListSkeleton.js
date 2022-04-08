import React, {memo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./DelegationCardList.scss";

const DelegationCardListSkeleton = memo(({rows = 5}) => {
	const cx = classNames.bind(styles);

	let delegationCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		delegationCardListItems.push(
			<div className={cx("delegation-card-list-item")} key={"delegation-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Tx Hash</div>
							</td>
							<td>
								<div className={cx("item-link")}>
									<Skeleton />
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Type</div>
								<Skeleton />
							</td>
							<td>
								<div className={cx("item-title")}>Result</div>
								<Skeleton />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Amount</div>
								<Skeleton />
							</td>
							<td>
								<div className={cx("item-title")}>Fee</div>
								<Skeleton />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Height</div>
								<Skeleton />
							</td>
							<td>
								<div className={cx("item-title")}>Time</div>
								<Skeleton />
							</td>
						</tr>

					</tbody>
				</table>
			</div>
		);
	}

	return <div className='delegation-card-list'>{delegationCardListItems}</div>;
});

export default DelegationCardListSkeleton;
