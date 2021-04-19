import React, {memo} from "react";
import Skeleton from "react-loading-skeleton";
import classNames from "classnames/bind";
import styles from "./OracleScriptCardList.module.scss";

const OracleScriptCardListSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);

	let testCaseCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		testCaseCardListItems.push(
			<div className={cx("oracle-script-card-list-item")} key={"oracle-script-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Oracle Script</div>
								<div className={cx("oracle-script")}>
									<Skeleton />
								</div>
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Requets & Response Time</div>
								<div className={cx("request-and-response-time")}>
									<Skeleton />
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Owner</div>
							</td>
							<td>
								<div className={cx("owner")}>
									<Skeleton />
								</div>
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Description</div>
								<Skeleton />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='oracle-script-card-list'>{testCaseCardListItems}</div>;
});

export default OracleScriptCardListSkeleton;
