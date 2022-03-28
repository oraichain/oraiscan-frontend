// @ts-nocheck
import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import { formatOrai } from "src/helpers/helper";
import { _, reduceString, reduceStringAssets } from "src/lib/scripts";
import styles from "./ExecutorsTableCardList.scss";

const cx = classNames.bind(styles);

const ExecutorsTableCardList = memo(({ data = [] }) => {
	return (
		<div className='executors-card-list'>
			{data.map((item, index) => {
				return (
					<div className={cx("executors-card-list-item")} key={"executors-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Executor Keys</div>
									</td>
									<td>
										{_.isNil(item?.pubkey) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<div className={cx("align-left")}>
												{reduceStringAssets(item.pubkey, 10, 5)}
											</div>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Executing Power</div>
									</td>
									<td>
										{_.isNil(item?.executing_power) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<div className={cx("align-left")}>
											 {item.executing_power}
											</div>
										)}
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Active</div>
									</td>
									<td>
										{_.isNil(item?.is_active) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<div className={cx("align-left")}>
												{item?.is_active ? 'true' : 'false'}
											</div>
										)}
									</td>
								</tr>

							</tbody>
						</table>
					</div>
				);
			})}
		</div>
	);
});

export default ExecutorsTableCardList;
