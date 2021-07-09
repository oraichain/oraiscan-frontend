// @ts-nocheck
import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import SourceViewer from "src/components/common/SourceViewer";
import styles from "./SmartContractCardList.module.scss";

const SmartContractCardList = memo(({data = []}) => {
	const cx = classNames.bind(styles);

	return (
		<div className='smart-contract-card-list'>
			{data.map((item, index) => {
				return (
					<div className={cx("smart-contract-card-list-item")} key={"smart-contract-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Address</div>
									</td>
									<td>
										{_.isNil(item?.address) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.SMART_CONTRACT}/${item.address}`}>
												{item.address}
											</NavLink>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Code id</div>
									</td>
									<td>{_.isNil(item?.code_id) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{item.code_id}</div>}</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Creator</div>
									</td>
									<td>
										{_.isNil(item?.creator) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.ACCOUNT}/${item.creator}`}>
												{item.creator}
											</NavLink>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Admin</div>
									</td>
									<td>{_.isNil(item?.admin) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{item.admin}</div>}</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Label</div>
									</td>
									<td>{_.isNil(item?.label) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{item.label}</div>}</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Source</div>
									</td>
									<td>
										{_.isNil(item?.source) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<SourceViewer title={<div className={cx("item-link")}>View</div>} data={item} key={`source-viewer-` + index} />
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

export default SmartContractCardList;
