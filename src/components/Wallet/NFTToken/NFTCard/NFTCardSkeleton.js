import React, { memo } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./NFTCard.module.scss";

const CwCardSkeleton = memo(({ rows = 10 }) => {
	const cx = classNames.bind(styles);

	let CwCardSkeletonItems = [];
	for (let i = 1; i <= rows; i++) {
		CwCardSkeletonItems.push(
			<div className={cx("NFTToken-card-list-item")} key={"NFTToken-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>TxHash</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>NFT ID</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>NFT Name</div>
								<Skeleton />
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Creator Type</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Creator</div>
							</td>

							<td>
								<Skeleton />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Contract address</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Contract</div>
							</td>

							<td>
								<Skeleton />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Time</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='NFTToken-card-list'>{CwCardSkeletonItems}</div>;
});

export default CwCardSkeleton;
