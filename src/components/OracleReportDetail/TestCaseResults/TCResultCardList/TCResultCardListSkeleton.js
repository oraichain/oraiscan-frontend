import React, {memo} from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import styles from "./TCResultCardList.module.scss";

const cx = classNames.bind(styles);

const TCResultCardListSkeleton = memo(({rows}) => {
	let dataSourceCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		dataSourceCardListItems.push(
			<div className={cx("test-case-card-list-item")} key={"test-case-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Contract</div>
							</td>
							<td>
								<div className={cx("item-link")}>
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
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='test-case-card-list'>{dataSourceCardListItems}</div>;
});

TCResultCardListSkeleton.propTypes = {
	rows: PropTypes.number,
};
TCResultCardListSkeleton.defaultProps = {
	rows: 5,
};

export default TCResultCardListSkeleton;
