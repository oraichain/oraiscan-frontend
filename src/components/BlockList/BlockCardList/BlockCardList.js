import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import styles from "./BlockCardList.scss";

const BlockCardList = memo(({data = []}) => {
	const cx = classNames.bind(styles);

	return (
		<div className='block-card-list'>
			{data.map((item, index) => (
				<div className={cx("block-card-list-item")} key={"block-card-list-item-" + index}>
					<table>
						<tbody>
							<tr>
								<td>
									<div className={cx("item-title")}>Height</div>
								</td>
								<td>
									{_.isNil(item?.height) ? (
										<div className={cx("item-link")}>-</div>
									) : (
										<NavLink className={cx("item-link")} to={`${consts.API.BLOCKLIST}/${item.height}`}>
											{item.height}
										</NavLink>
									)}
								</td>
							</tr>

							<tr>
								<td>
									<div className={cx("item-title")}>Block Hash</div>
								</td>
								<td>
									{_.isNil(item?.block_hash) ? (
										<div className={cx("item-link")}>-</div>
									) : (
										<NavLink className={cx("item-link")} to={`${consts.API.BLOCKLIST}/${item.block_hash}`}>
											{reduceString(item.block_hash, 8, 8)}
										</NavLink>
									)}
								</td>
							</tr>

							<tr>
								<td>
									<div className={cx("item-title")}>TXS</div>
									{_.isNil(item?.num_txs) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{item.num_txs}</div>}
								</td>
								<td>
									<div className={cx("item-title")}>Time</div>
									{_.isNil(item?.timestamp) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{setAgoTime(item.timestamp)}</div>}
								</td>
							</tr>
							<tr>
								<td colSpan={2}>
									<div className={cx("item-title")}>Proposer</div>
									{_.isNil(item?.moniker) ? (
										<div className={cx("item-link")}>-</div>
									) : (
										<NavLink className={cx("item-link")} to={`${consts.API.VALIDATORS}/${item.moniker}`}>
											{item.moniker}
										</NavLink>
									)}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			))}
		</div>
	);
});

export default BlockCardList;
