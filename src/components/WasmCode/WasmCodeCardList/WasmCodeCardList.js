// @ts-nocheck
import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {reduceString, _} from "src/lib/scripts";
import SourceViewer from "src/components/common/SourceViewer";
import styles from "./WasmCodeCardList.module.scss";
import {formatDateTime} from "src/helpers/helper";

const WasmCodeCardList = memo(({data = []}) => {
	const cx = classNames.bind(styles);

	return (
		<div className='wasmcode-card-list'>
			{data.map((item, index) => {
				return (
					<div className={cx("wasmcode-card-list-item")} key={"wasmcode-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Creator</div>
									</td>
									<td>
										{_.isNil(item?.creator) ? (
											<div className={cx("item-title")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.ACCOUNT}/${item?.creator}`}>
												{item?.creator}
											</NavLink>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Code id</div>
									</td>
									<td>
										{_.isNil(item?.code_id) ? (
											<div className={cx("item-title")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.WASM_CODE}/${item?.code_id}`}>
												{item?.code_id}
											</NavLink>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>TxHash</div>
									</td>
									<td>
										{_.isNil(item?.tx_hash) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.TXLIST}/${item?.tx_hash}`}>
												{reduceString(item?.tx_hash, 6, 6)}
											</NavLink>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Created At</div>
									</td>
									<td>
										{_.isNil(item?.created_at) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("item-text")}>{formatDateTime(item.created_at)}</div>
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

export default WasmCodeCardList;
