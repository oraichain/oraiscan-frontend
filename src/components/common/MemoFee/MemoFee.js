import React, {memo} from "react";
import cn from "classnames/bind";
import {Fee, Gas} from "src/components/common/Fee";
// @ts-ignore
import styles from "./MemoFee.scss";
import {InputNumberOrai, TextArea} from "src/components/common/form-controls";
import Grid from "@material-ui/core/Grid";
const cx = cn.bind(styles);

const MemoFee = memo(props => {
	const { minFee, setFee, gas, onChangeGas, fee , typePrice} = props;
	return (
		<>
			<Grid item xs={12} className={cx("form-input")}>
				<div className={cx("label")}>
					{" "}
					Memo <span className={cx("optional")}> (Optional) </span>{" "}
				</div>
				<TextArea
					type='number'
					name='memo'
					placeholder='Fill in the Memo which is associated with your Kucoin wallet when depositing to Kucoin. DO NOT FILL the MNEMONIC KEY of your Oraichain wallet.'
					rows={4}
				/>
			</Grid>
			<div>
				<Fee className={"refactor-padding"} handleChooseFee={setFee} minFee={minFee} />
			</div>
			<div style={{marginTop: "15px"}}>
				{" "}
				Minimin Tx Fee:
				<span className={cx("fee")}> {fee || 0} {typePrice ? typePrice : "ORAI"} </span>
			</div>
			<div>
				<Gas className={"refactor-padding"} gas={gas} onChangeGas={onChangeGas} />
			</div>
		</>
	);
});

export default MemoFee;
