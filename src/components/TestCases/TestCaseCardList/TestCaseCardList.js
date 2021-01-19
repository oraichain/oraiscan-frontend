import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {formatOrai} from "src/helpers/helper";
import {_} from "src/lib/scripts";
import Address from "src/components/common/Address";
import styles from "./TestCaseCardList.scss";

const TestCaseCardList = memo(({data = []}) => {
	const cx = classNames.bind(styles);
	console.log(data);

	return (
		<div className='test-case-card-list'>
			{data.map((item, index) => (
				<div className={cx("test-case-card-list-item")} key={"test-case-card-list-item-" + index}>
					<table>
						<tbody>
							<tr>
								<td>
									<div className={cx("item-title")}>Test Case</div>
								</td>
								<td>
									{_.isNil(item?.name) ? (
										<div className={cx("item-link")}>-</div>
									) : (
										<NavLink className={cx("item-link")} to={`${consts.PATH.TEST_CASES}/${item.name}`}>
											{item.name}
										</NavLink>
									)}
								</td>
							</tr>

							<tr>
								<td>
									<div className={cx("item-title")}>Fee</div>
								</td>
								<td>
									{_.isNil(item?.fees?.amount?.[0]?.amount) || _.isNil(item?.fees?.amount?.[0]?.denom) ? (
										<div className={cx("item-text")}>-</div>
									) : (
										<div className={cx("fee-data-cell", "item-text")}>
											<span>{formatOrai(item.fees.amount[0].amount)}</span>
											<span>{item.fees.amount[0].denom}</span>
										</div>
									)}
								</td>
							</tr>

							<tr>
								<td>
									<div className={cx("item-title")}>Requests</div>
									{_.isNil(item?.requests) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{item.requests}</div>}
								</td>
								<td>
									<div className={cx("item-title")}>Owner</div>
									{_.isNil(item?.owner) ? (
										<div className={cx("item-link")}>-</div>
									) : (
										<div className={cx("flex-row-end")}>
											<Address address={item.owner} link={`${consts.PATH.ACCOUNT}/${item.owner}`} size='md' showCopyIcon={false} />
										</div>
									)}
								</td>
							</tr>

							<tr>
								<td colSpan={2}>
									<div className={cx("item-title")}>Description</div>
									{_.isNil(item?.description) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{item.description}</div>}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			))}
		</div>
	);
});

export default TestCaseCardList;
