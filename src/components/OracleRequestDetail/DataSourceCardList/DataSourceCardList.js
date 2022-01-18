// @ts-nocheck
import React, {memo} from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import {_} from "src/lib/scripts";
import styles from "./DataSourceCardList.module.scss";
import consts from "src/constants/consts";
import {NavLink} from "react-router-dom";
import {formatOrai} from "src/helpers/helper";

const cx = classNames.bind(styles);

const DataSourceCardList = memo(({data = []}) => {
	return (
		<div className='data-source-card-list'>
			{data.map((item, index) => {
				return (
					<div className={cx("data-source-card-list-item")} key={"data-source-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Language</div>
									</td>
									<td>{_.isNil(item?.name) ? <div className={cx("item-link")}>-</div> : <div className={cx("item-link")}>{item?.name}</div>}</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Contract</div>
										{_.isNil(item?.contract) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.SMART_CONTRACT}/${item?.contract}`}>
												{item?.contract}
											</NavLink>
										)}
									</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Source Code</div>
										{_.isNil(item?.script_url) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<a target='_blank' href={item?.script_url} className={cx("item-link")}>
												{item?.script_url}
											</a>
										)}
									</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Parameters</div>
										{_.isNil(item?.parameters) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<div className={cx("item-link")}>{item?.parameters.toString()}</div>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Fees</div>
									</td>
									<td>
										{_.isNil(item?.fees) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("item-text")}>{item?.fees.amount !== "" ? formatOrai(item?.fees.amount) : ""}</div>
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

DataSourceCardList.propTypes = {
	data: PropTypes.array,
};
DataSourceCardList.defaultProps = {
	data: [],
};

export default DataSourceCardList;
