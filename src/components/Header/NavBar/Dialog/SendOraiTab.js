import React, { useState, useEffect, useMemo, useRef } from "react";
import * as yup from "yup";
import cn from "classnames/bind";
import _, { add, constant } from "lodash";
import BigNumber from "bignumber.js";
import { Switch, Input, InputNumber } from "antd";
import InputRange from "react-input-range";
import Grid from "@material-ui/core/Grid";
import { EditOutlined } from "@material-ui/icons";
import "react-input-range/lib/css/index.css";

import consts from "src/constants/consts";
import { reduceString } from "src/lib/scripts";
import { formatOrai } from "src/helpers/helper";
import { InputNumberOrai, TextArea, InputTextWithIcon } from "src/components/common/form-controls";
import { ReactComponent as ExchangeIcon } from "src/assets/icons/switch-blue.svg";
import { Fee, Gas } from "src/components/common/Fee";
import AddAddressDialog from "./AddAddressDialog";
import ShowExample from "./ShowExample";
import SelectFile from "./SelectFile";
import "./SendOraiTab.css";
import styles from "./Dialog.scss";
import { useSelector } from "src/hooks";

const cx = cn.bind(styles);
const { TextArea: TextAreaAnt } = Input;

export default function FormDialog({ address, amount, status, methods, handleInputMulti, minFee, handleChangeGas, handleChangeFee }) {
	const [inputAmountValue, setInputAmountValue] = useState("");
	const [isMulti, setIsMulti] = useState(false);
	const [isChooseFile, setIsChooseFile] = useState(true);
	const [listAddress, setListAddress] = useState(null);
	const [open, setOpen] = useState(false);
	const [gas, setGas] = useState(200000);
	const { errors, setValue, getValues, watch, register } = methods;
	const inputAddress = watch("recipientAddress");
	const [existName, setExistName] = useState(null);
	const storageData = useSelector(state => state.contact);

	// let values = watch() || "";

	useEffect(() => {
		setExistName(storageData?.[inputAddress] ? storageData?.[inputAddress]?.name : null);
	}, [inputAddress, storageData]);

	const setAmountValue = rate => {
		amount &&
			setValue(
				"sendAmount",
				new BigNumber(amount)
					.multipliedBy(rate)
					.dividedBy(1000000)
					.toFixed(6)
			);
	};

	const priceInUSD = new BigNumber(amount)
		.dividedBy(1000000)
		.multipliedBy(status?.price || 0)
		.toFormat(2);

	const switchMultiSend = checked => {
		setIsMulti(checked);
		if (!checked) {
			handleInputMulti(null);
		}
	};

	const handleSelectFile = lines => {
		const result = [];
		for (let i = 0; i < lines.length; i++) {
			const lineArr = lines[i].split(",");
			const address = lineArr[0];
			const amount = lineArr[1];
			if (address && amount) {
				result.push({
					address,
					amount,
				});
			}
		}
		handleInputMulti(result);
		setListAddress(result);
	};

	const toogleChooseFile = () => {
		setIsChooseFile(prev => !prev);
		setListAddress(null);
	};

	const renderSwitchBtn = () => {
		return (
			<div className={cx("row-balance", "switch-control", "vertical-center")}>
				<div className={cx("left")}>
					<div className={cx("title", "switch-blue")} onClick={toogleChooseFile}>
						{isChooseFile ? "Insert manually" : "Using file"} <ExchangeIcon />
					</div>
				</div>
				<div className={cx("right")}>
					<div className={cx("title", "title-right", "switch-blue")}>
						<ShowExample />
					</div>
				</div>
			</div>
		);
	};

	const handleInputTextManually = e => {
		const lines = e.target.value.split("\n");
		const result = [];
		for (let i = 0; i < lines.length; i++) {
			const lineArr = lines[i].split(",");
			const address = lineArr[0];
			const amount = lineArr[1];
			if (address && amount) {
				result.push({
					address,
					amount,
				});
			}
		}
		handleInputMulti(result);
	};

	const renderSelectMulti = () => {
		if (listAddress) {
			return (
				<>
					<div className={cx("summary")}>
						{listAddress.map(({ address, amount }, index) => {
							return (
								<div className={cx("row")}>
									<span> {index + 1}. </span>
									<span> {address} - </span>
									<span> {amount} (ORAI) </span>
									{amount?.split(".")?.[1]?.length > 6 && <div className={cx("amount-error-message")}>Number digits after dot must be smaller than 6</div>}
								</div>
							);
						})}
						<Grid item xs={12} className={cx("form-input")}>
							<div className={cx("label")}>
								{" "}
								Memo <span className={cx("optional")}> (Optional) </span>{" "}
							</div>
							<TextArea name='memo' placeholder='Fill in the Memo which is associated with your Kucoin wallet when depositing to Kucoin. DO NOT FILL the MNEMONIC KEY of your Oraichain wallet.' rows={4} />
						</Grid >
					</div >
					{renderSwitchBtn()}
				</>
			);
		}
		return (
			<>
				{isChooseFile && (
					<div>
						<SelectFile handleSelectFile={handleSelectFile} />
					</div>
				)}
				{!isChooseFile && (
					<div className={cx("input-multi-send")}>
						<TextAreaAnt className={cx("textarea")} autoSize={true} bordered={false} onChange={handleInputTextManually} />
					</div>
				)}
				{renderSwitchBtn()}
			</>
		);
	};

	const handleClickEndAdornment = () => {
		const form = getValues();
		if (form.recipientAddress) {
			const url = `${consts.DOMAIN}account/${form.recipientAddress}`;
			let newWindow = window.open(url);
			if (newWindow) {
				newWindow.opener = null;
				newWindow = null;
			}
		}
	};

	const handleClickOpen = e => {
		e.preventDefault();
		setOpen(true);
	};

	const handleClose = value => {
		setOpen(false);
	};

	const handleChooseFee = fee => {
		handleChangeFee(fee);
	};

	const onChangeGas = value => {
		handleChangeGas(value);
		setGas(value);
	};

	return (
		<form className={cx("form-dialog")}>
			<div className={cx("switch-multisend")}>
				Multisend <Switch onChange={switchMultiSend} />
			</div>
			{!isMulti && (
				<Grid container spacing={2} className={cx("transaction-content")}>
					<div className={cx("row-balance")}>
						<div className={cx("left")}>
							<div className={cx("title")}> My Address </div>
							<div className={cx("value")}> {reduceString(address, 8, 8)} </div>
						</div>
						<div className={cx("right")}>
							<div className={cx("title", "title-right")}> Balance </div>
							<div className={cx("value")}>
								{formatOrai(amount || 0)} ORAI <span>{status?.price ? "($" + priceInUSD + ")" : ""}</span>
							</div>
						</div>
					</div>
					<Grid item xs={12} className={cx("form-input")}>
						<div className={cx("label")}> Add Recipient </div>
						<InputTextWithIcon name='recipientAddress' errorobj={errors} onClickEndAdornment={handleClickEndAdornment} />
						{existName ? (
							<div className={cx("label-exist")}>
								<span className={cx("label-exist-name")}>{existName}</span>

								<a href='/' className={cx("label-exist-icon")} onClick={handleClickOpen}>
									<EditOutlined />
								</a>
							</div>
						) : (
							<div className={cx("new-label")}>
								New address recognized!{" "}
								<a href='/' className={cx("open-dialog")} onClick={handleClickOpen}>
									Add them to your address book
								</a>
							</div>
						)}
					</Grid>
					<Grid item xs={12} className={cx("form-input")}>
						<div className={cx("label", "label-right")}>
							<div className={cx("left")}> Amount </div>
							<div className={cx("right")}>
								<button
									type='button'
									onClick={() => {
										setAmountValue(0.5);
									}}>
									{" "}
									1 / 2{" "}
								</button>
								<button
									type='button'
									onClick={() => {
										setAmountValue(1);
									}}>
									{" "}
									Max{" "}
								</button>
							</div>
						</div>
						<InputNumberOrai inputAmountValue={inputAmountValue} name='sendAmount' errorobj={errors} />
					</Grid>
					<Grid item xs={12} className={cx("form-input")}>
						<div className={cx("label")}>
							{" "}
							Memo <span className={cx("optional")}> (Optional) </span>{" "}
						</div>
						<TextArea name='memo' placeholder='Fill in the Memo which is associated with your Kucoin wallet when depositing to Kucoin. DO NOT FILL the MNEMONIC KEY of your Oraichain wallet.' rows={4} />
					</Grid>
					<Fee handleChooseFee={handleChooseFee} minFee={minFee} />
					<Grid item xs={12} className={cx("form-input")}>
						<div className={cx("label")}>
							{" "}
							Minimin Tx Fee:
							{/* <span className={cx("fee")}> {formatOrai(minFee?.estimate_fee * 1000000 || 0)} ORAI </span>{" "} */}
							{/* <span>{status?.price ? "($" + (status?.price * Number(formatOrai(minFee?.estimate_fee * 1000000))).toFixed(6) + ")" : ""}</span> */}
							<span className={cx("fee")}> 0 ORAI </span> {/* <span>($ 0)</span> */}
						</div>
					</Grid>
					<Gas gas={gas} onChangeGas={onChangeGas} />
					{/* <div className={cx("select-gas", "select-gas-custom")}>
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
					</div> */}
				</Grid>
			)}
			{isMulti && renderSelectMulti()}
			{open ? (
				<AddAddressDialog
					onClose={handleClose}
					open={open}
					recipientAddress={getValues("recipientAddress")}
					isEdit={existName ? true : false}
					storageData={storageData}
				/>
			) : (
				""
			)}
		</form>
	);
}
