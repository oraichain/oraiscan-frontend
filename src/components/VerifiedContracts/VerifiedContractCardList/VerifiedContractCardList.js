// @ts-nocheck
import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import { reduceString, _ } from "src/lib/scripts";
import SourceViewer from "src/components/common/SourceViewer";
import styles from "./VerifiedContractCardList.module.scss";
import { formatDateTime } from "src/helpers/helper";
import SuccessIcon from "src/icons/SuccessIcon";

const VerifiedContractCardList = memo(({ data = [] }) => {
	const cx = classNames.bind(styles);

	return (
		<div className='verified-card-list'>
			{data.map((item, index) => {
				const status = item?.contract_verification == 'VERIFIED' ? <><SuccessIcon /> <span style={{ width: 2 }} /></> : <span style={{ width: 26 }} />
				return (
					<div className={cx("verified-card-list-item")} key={"verified-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Contract Address</div>
									</td>
									<td>
										{_.isNil(item?.contract_address) ? (
											<div className={cx("item-title")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.VERIFIED_CONTRACT}/${item.contract_address}`} >
												{reduceString(item?.contract_address, 10, 10)}
											</NavLink>
										)}
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Status</div>
									</td>
									<td>
										{_.isNil(item?.contract_verification) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("item-text")}>{item.contract_verification}</div>
										)}
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Creator</div>
									</td>
									<td>
										{_.isNil(item?.creator_address) ? (
											<div className={cx("item-title")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.ACCOUNT}/${item?.creator_address}`}>
												{reduceString(item?.creator_address, 10, 10)}
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
										<div className={cx("item-title")}>Verified At</div>
									</td>
									<td>
										{_.isNil(item?.verified_at) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("item-text")}>{formatDateTime(item.verified_at)}</div>
										)}
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Version</div>
									</td>
									<td>
										{_.isNil(item?.compiler_version) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<>{item?.compiler_version}</>
										)}
									</td>
								</tr>
								{/* <tr>
									<td>
										<div className={cx("item-title")}>TxHash</div>
									</td>
									<td>
										{_.isNil(item?.contract_hash) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.TXLIST}/${item?.contract_hash}`}>
												{reduceString(item?.contract_hash, 6, 6)}
											</NavLink>
										)}
									</td>
								</tr> */}
								{/* <tr>
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
								</tr> */}
							</tbody>
						</table>
					</div>
				);
			})}
		</div>
	);
});

export default VerifiedContractCardList;
