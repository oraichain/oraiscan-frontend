import React, { memo } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./VerifiedContractCardList.module.scss";

const VerifiedContractCardListSkeleton = memo(({ rows = 5 }) => {
	const cx = classNames.bind(styles);

	let verifiedContractCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		verifiedContractCardListItems.push(
			<div className={cx("verified-card-list-item")} key={"verified-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Contract Address</div>
							</td>
							<td>
								<div className={cx("item-link")}>
									<Skeleton />
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Status</div>
							</td>
							<td>
								<div className={cx("item-text")}>
									<Skeleton />
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Creator</div>
							</td>
							<td>
								<div className={cx("item-text")}>
									<Skeleton />
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Code id</div>
							</td>
							<td>
								<div className={cx("item-text")}>
									<Skeleton />
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Verified At</div>
							</td>
							<td>
								<div className={cx("item-text")}>
									<Skeleton />
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>TxHash</div>
							</td>
							<td>
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

	return <div className='verified-card-list'>{verifiedContractCardListItems}</div>;
});

export default VerifiedContractCardListSkeleton;
