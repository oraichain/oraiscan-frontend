// @ts-nocheck
import React, {memo} from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import {_} from "src/lib/scripts";
import styles from "./DataSourceCardList.module.scss";

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
										<div className={cx("item-title")}>Name</div>
									</td>
									<td>{_.isNil(item?.name) ? <div className={cx("item-link")}>-</div> : <div className={cx("item-link")}>{item.name}</div>}</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Contract</div>
										{_.isNil(item?.contract) ? <div className={cx("item-link")}>-</div> : <div className={cx("item-link")}>{item.contract}</div>}
									</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Owner</div>
										{_.isNil(item?.owner) ? <div className={cx("item-link")}>-</div> : <div className={cx("item-link")}>{item.owner}</div>}
									</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Description</div>
										{_.isNil(item?.description) ? <div className={cx("item-link")}>-</div> : <div className={cx("item-link")}>{item.description}</div>}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Fees</div>
									</td>
									<td>{_.isNil(item?.fees) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{item.fees}</div>}</td>
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
