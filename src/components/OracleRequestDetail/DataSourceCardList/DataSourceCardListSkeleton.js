import React, {memo} from "react";
import PropTypes from "prop-types";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./DataSourceCardList.module.scss";

const cx = classNames.bind(styles);

const DataSourceCardListSkeleton = memo(({rows}) => {
	let dataSourceCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		dataSourceCardListItems.push(
			<div className={cx("data-source-card-list-item")} key={"data-source-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Language</div>
							</td>
							<td>
								<div className={cx("item-link")}>
									<Skeleton className={cx("skeleton")} variant='text' width={80} height={21} />
								</div>
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Contract</div>
								<div className={cx("item-link")}>
									<Skeleton className={cx("skeleton")} variant='text' width={150} height={21} />
								</div>
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Source Code</div>
								<div className={cx("item-link")}>
									<Skeleton className={cx("skeleton")} variant='text' width={150} height={21} />
								</div>
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Parameters</div>
								<div className={cx("item-link")}>
									<Skeleton className={cx("skeleton")} variant='text' width={150} height={21} />
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Fees</div>
							</td>
							<td>
								<div className={cx("item-text")}>
									<Skeleton className={cx("skeleton")} variant='text' width={50} height={21} />
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='data-source-card-list'>{dataSourceCardListItems}</div>;
});

DataSourceCardListSkeleton.propTypes = {
	rows: PropTypes.number,
};
DataSourceCardListSkeleton.defaultProps = {
	rows: 5,
};

export default DataSourceCardListSkeleton;
