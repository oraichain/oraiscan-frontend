// @ts-nocheck
import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import cn from "classnames/bind";
import styles from "./Fee.scss";

const cx = cn.bind(styles);

export default function Fee({minFee: {estimate_fee}, handleChooseFee, className , typePrice}) {
	const [feeChooseType, setFeeChooseType] = useState("Slow");
	const orai2usd = useSelector(state => state.blockchain.status?.price);
	const [fees, setFees] = useState([]);

	useEffect(() => {
		setFees([
			{type: "Slow", amount: 0, amountUSD: 0},
			{type: "Average", amount: estimate_fee.toFixed(6), amountUSD: (estimate_fee * orai2usd).toFixed(2)},
			{type: "Fast", amount: estimate_fee.toFixed(6), amountUSD: (estimate_fee * orai2usd).toFixed(2)},
		]);
	}, [estimate_fee, orai2usd]);

	const handleClickFeeType = type => {
		setFeeChooseType(type);
		const fee = fees.find(f => f.type === type);
		handleChooseFee(fee.amount);
	};

	return (
		<div className={cx("choose-fee", className)}>
			{fees.map(({type, amount, amountUSD}, index) => {
				return (
					<div className={cx(type === feeChooseType ? "active" : "", "fee-item")} key={index} onClick={() => handleClickFeeType(type)}>
						<div className={cx("title")}> {type} </div>
						<div className={cx("amount")}>
							{" "}
							<span className={cx("amount-number")}> {amount} </span> {typePrice ? "AIRI" : "ORAI"}{" "}
						</div>
						<div className={cx("amount")}> $ {typePrice ? "" : amountUSD} </div>
					</div>
				);
			})}
		</div>
	);
}
