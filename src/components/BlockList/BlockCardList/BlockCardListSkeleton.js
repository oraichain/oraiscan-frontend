import React, {memo, useMemo} from "react";
import Skeleton from "react-loading-skeleton";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import styles from "./BlockCardList.scss";

const BlockCardListSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);

	let blockCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		blockCardListItems.push(
			<div className={cx("block-card-list-item")} key={"block-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Height</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Parent Hash</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Proposer</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>TXS</div>
								<Skeleton />
							</td>
							<td>
								<div className={cx("item-title")}>Time</div>
								<Skeleton />
							</td>
						</tr>
						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Node</div>
								<Skeleton />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='block-card-list'>{blockCardListItems}</div>;
});

export default BlockCardListSkeleton;
