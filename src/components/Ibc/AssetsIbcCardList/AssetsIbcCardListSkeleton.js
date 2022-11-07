import React, {memo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./AssetsIbcCardList.module.scss";

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
								<div className={cx("item-title")}>Name</div>
							</td>
							<td>
								<div className={cx("item-link")}>
									<Skeleton variant='text' className={cx("skeleton")} width={250} height={21} />
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Price</div>
								<div className={cx("item-text")}>
									<Skeleton variant='text' className={cx("skeleton")} width={100} height={21} />
								</div>
							</td>
							<td>
								<div className={cx("item-title")}>Supply</div>
								<div className={cx("item-text")}>
									<Skeleton variant='text' className={cx("skeleton")} width={100} height={21} />
								</div>
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Total Value</div>
								<div className={cx("item-text")}>
									<Skeleton variant='text' className={cx("skeleton")} width={100} height={21} />
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
