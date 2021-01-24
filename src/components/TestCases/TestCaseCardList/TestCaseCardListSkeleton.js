import React, {memo} from "react";
import Skeleton from "react-loading-skeleton";
import classNames from "classnames/bind";
import styles from "./TestCaseCardList.scss";

const TestCaseCardListSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);

	let testCaseCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		testCaseCardListItems.push(
			<div className={cx("test-case-card-list-item")} key={"test-case-card-list-item-" + i}>
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

	return <div className='test-case-card-list'>{testCaseCardListItems}</div>;
});

export default TestCaseCardListSkeleton;
