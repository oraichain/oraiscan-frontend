import React, {memo} from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import styles from "./ReportCardList.module.scss";

const cx = classNames.bind(styles);

const ReportCardListSkeleton = memo(({rows}) => {
	let dataSourceCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		dataSourceCardListItems.push(
			<div className={cx("report-card-list-item")} key={"report-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Name</div>
								<div className={cx("item-link")}>
									<Skeleton className={cx("skeleton")} variant='text' width={80} height={21} />
								</div>
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Test Case Results</div>
								<div className={cx("item-link")}>
									<Skeleton className={cx("skeleton")} variant='text' width={80} height={21} />
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Height</div>
							</td>
							<td>
								<div className={cx("item-text")}>
									<Skeleton className={cx("skeleton")} variant='text' width={80} height={21} />
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Result</div>
							</td>
							<td>
								<div className={cx("item-text")}>
									<Skeleton className={cx("skeleton")} variant='text' width={80} height={21} />
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Status</div>
							</td>
							<td>
								<div className={cx("status")}>
									<span className={cx("status-icon")}>
										<Skeleton className={cx("skeleton")} variant='text' width={16} height={16} />
									</span>
									<span className={cx("status-text")}>
										<Skeleton className={cx("skeleton")} variant='text' width={50} height={21} />
									</span>
								</div>
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<div className={cx("item-link")}>
									<Skeleton className={cx("skeleton")} variant='text' width={80} height={21} />
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='report-card-list'>{dataSourceCardListItems}</div>;
});

ReportCardListSkeleton.propTypes = {
	rows: PropTypes.number,
};
ReportCardListSkeleton.defaultProps = {
	rows: 10,
};

export default ReportCardListSkeleton;
