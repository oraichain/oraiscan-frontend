import React, {useState, useEffect} from "react";
import cn from "classnames/bind";
import styles from "./Dialog.scss";

const cx = cn.bind(styles);

export default function Fee({handleChooseFee}) {
	const [feeChooseType, setFeeChooseType] = useState("");
	const [fees, setFees] = useState([
		{type: "Slow", amount: "0.0042 ", amountUSD: "$ 0.27"},
		{type: "Average", amount: "0.0042 ", amountUSD: "$ 0.27"},
		{type: "Fast", amount: "0.0042 ", amountUSD: "$ 0.27"},
	]);

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
