import React, {memo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./DataSourceCardList.scss";

const DataSourceCardListSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);

	let DataSourceCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		DataSourceCardListItems.push(
			<div className={cx("data-source-card-list-item")} key={"data-source-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Test Case</div>
							</td>
							<td>
								<div className={cx("item-link")}>
									<Skeleton />
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Fee</div>
							</td>
							<td>
								<div className={cx("item-text")}>
									<Skeleton />
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Requests</div>
								<div className={cx("item-text")}>
									<Skeleton />
								</div>
							</td>
							<td>
								<div className={cx("item-title")}>Owner</div>
								<div className={cx("item-link")}>
									<Skeleton />
								</div>
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Description</div>
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

	return <div className='data-source-card-list'>{DataSourceCardListItems}</div>;
});

export default DataSourceCardListSkeleton;
