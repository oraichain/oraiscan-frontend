import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import styles from "./ProposedBlocksCardList.scss";

const cx = classNames.bind(styles);

const ProposedBlocksCardList = memo(({data = []}) => {
	return (
		<div className='proposed-block-card-list'>
			{data.map((item, index) => (
				<div className={cx("proposed-block-card-list-item")} key={"proposed-block-card-list-item-" + index}>
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
										<NavLink className={cx("item-link")} to={`${consts.PATH.BLOCKLIST}/${item.height}`}>
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
										<NavLink className={cx("item-link")} to={`${consts.PATH.BLOCKLIST}/${item.height}`}>
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
						</tbody>
					</table>
				</div>
			))}
		</div>
	);
});

export default ProposedBlocksCardList;
