import React, {memo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./RequestCardList.module.scss";

const RequestCardListSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);

	let requestCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		requestCardListItems.push(
			<div className={cx("account-card-list-item")} key={"account-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Name</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Result</div>
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
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='account-card-list'>{requestCardListItems}</div>;
});

export default RequestCardListSkeleton;
