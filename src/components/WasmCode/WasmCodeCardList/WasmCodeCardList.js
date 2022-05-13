// @ts-nocheck
import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
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
									<td>{_.isNil(item?.creator) ? <div className={cx("item-title")}>-</div> : <div className={cx("item-title")}>{item.creator}</div>}</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Code id</div>
									</td>
									<td>
										{_.isNil(item?.id) ? (
											<div className={cx("item-title")}>-</div>
										) : (
											// to={`${consts.PATH.WASM_CODE}/${item.id}`}>
											<div className={cx("item-link")}>{item.id}</div>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>TxHash</div>
									</td>
									<td>{_.isNil(item?.tx_hash) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{item.tx_hash}</div>}</td>
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
