// @ts-nocheck
import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import cn from "classnames/bind";
import styles from "./Dialog.scss";

const cx = cn.bind(styles);

export default function Fee({fee: {estimate_fee}, handleChooseFee}) {
	const [feeChooseType, setFeeChooseType] = useState("");
	const orai2usd = useSelector(state => state.blockchain.status?.price);
	const [fees, setFees] = useState([]);

	useEffect(() => {
		setFees([
			{type: "Slow", amount: estimate_fee, amountUSD: (estimate_fee * orai2usd).toFixed(2)},
			{type: "Average", amount: estimate_fee, amountUSD: (estimate_fee * orai2usd).toFixed(2)},
			{type: "Fast", amount: estimate_fee, amountUSD: (estimate_fee * orai2usd).toFixed(2)},
		]);
	}, [estimate_fee, orai2usd]);

	const handleClickFeeType = type => {
		setFeeChooseType(type);
		const fee = fees.find(f => f.type === type);
		handleChooseFee(fee.amount);
	};

	return (
		<div className={cx("choose-fee")}>
			{fees.map(({type, amount, amountUSD}, index) => {
				return (
					<div className={cx(type === feeChooseType ? "active" : "", "fee-item")} key={index} onClick={() => handleClickFeeType(type)}>
						<div className={cx("title")}> {type} </div>
						<div className={cx("amount")}> {amount} ORAI </div>
						<div className={cx("amount")}> $ {amountUSD} </div>
					</div>
				);
			})}
		</div>
	);
}
