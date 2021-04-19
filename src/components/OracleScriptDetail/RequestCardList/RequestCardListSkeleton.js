import React, {memo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./RequestCardList.module.scss";

const RequestCardListSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);

	let requestCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		requestCardListItems.push(
			<div className={cx("request-card-list-item")} key={"request-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Request</div>
							</td>
							<td>
								<div className={cx("item-link")}>
									<Skeleton />
								</div>
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Oracle Script</div>
								<div className={cx("title")}>
									<Skeleton />
								</div>
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Report Status</div>
								<div className={cx("report-status")}>
									<div className={cx("info")}>
										<span className={cx("width-full")}>
											<Skeleton />
										</span>
									</div>
									<div className={cx("graph")}>
										<Skeleton />
									</div>
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Status</div>
								<div>
									<Skeleton />
								</div>
							</td>
							<td>
								<div className={cx("item-title")}>Owner</div>
								<div>
									<Skeleton />
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='request-card-list'>{requestCardListItems}</div>;
});

export default RequestCardListSkeleton;
