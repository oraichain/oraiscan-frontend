import React, {useState, useEffect, useMemo, useRef} from "react";
import {Switch, Input, InputNumber} from "antd";
import InputRange from "react-input-range";
import cn from "classnames/bind";

import "./Gas.css";
import styles from "./Gas.scss";

const cx = cn.bind(styles);

export default function({onChangeGas, gas, className}) {
	return (
		<div className={cx("select-gas", "select-gas-custom", className)}>
			<span className={cx("gas-span")}> Gas </span>
			<InputNumber
				value={gas}
				className={cx("input-text")}
				formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
				parser={value => value.replace(/\s?|(,*)/g, "")}
				onChange={onChangeGas}
				min={100000}
				max={1000000}
			/>
			<InputRange maxValue={1000000} minValue={100000} value={gas} onChange={onChangeGas} />
		</div>
	);
}
