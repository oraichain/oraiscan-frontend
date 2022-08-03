// @ts-nocheck
import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {logoBrand} from "src/constants/logoBrand";
import {formatOrai} from "src/helpers/helper";
import {_} from "src/lib/scripts";
import {Tooltip} from "@material-ui/core";
import styles from "./TestCaseCardList.module.scss";

const TestCaseCardList = memo(({data = []}) => {
	const cx = classNames.bind(styles);

	return (
		<div className='test-case-card-list'>
			{data.map((item, index) => {
				return (
					<div className={cx("test-case-card-list-item")} key={"test-case-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Test Case</div>
									</td>
									<td>{_.isNil(item?.name) ? <div className={cx("item-link")}>-</div> : <div className={cx("item-link")}>{item.name}</div>}</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Fee</div>
										{_.isNil(item?.fee) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("fee")}>
												<span className={cx("fee-value")}>{formatOrai(item.fee)}</span>
												<span className={cx("fee-denom")}>ORAI</span>
											</div>
										)}
									</td>
									<td>
										<div className={cx("item-title")}>Requests</div>
										{_.isNil(item?.requests) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{item.requests}</div>}
									</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Description</div>
										{_.isNil(item?.description) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{item.description}</div>}
									</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Owner</div>
										{_.isNil(item?.owner) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<Tooltip title={`${item.owner}`} arrow placement='top-start'>
												<NavLink className={cx("item-link")} to={`${consts.PATH.ACCOUNT}/${item.owner}`}>
													{item.owner}
												</NavLink>
											</Tooltip>
										)}
									</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Smart Contract</div>
										{_.isNil(item?.contract) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<Tooltip title={`${item.contract}`} arrow placement='top-start'>
												<NavLink className={cx("item-link")} to={`${consts.PATH.SMART_CONTRACT}/${item.contract}`}>
													{item.contract}
												</NavLink>
											</Tooltip>
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

export default TestCaseCardList;
