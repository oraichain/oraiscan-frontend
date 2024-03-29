import React, { useState, useEffect } from "react";
import cn from "classnames/bind";
import _ from "lodash";
import BigNumber from "bignumber.js";
import { Input, Switch } from "antd";
import Grid from "@material-ui/core/Grid";
import { EditOutlined } from "@material-ui/icons";
import "react-input-range/lib/css/index.css";
import { AIRI_CONTRACT, ORAIX_CONTRACT } from "@oraichain/oraidex-common";
import consts from "src/constants/consts";
import { reduceString } from "src/lib/scripts";
import { formatOrai } from "src/helpers/helper";
import { InputNumberOrai, InputTextWithIcon } from "src/components/common/form-controls";
import { ReactComponent as ExchangeIcon } from "src/assets/icons/switch-blue.svg";
import AddAddressDialog from "./AddAddressDialog";
import ShowExample from "./ShowExample";
import SelectFile from "./SelectFile";
import "./SendCw20.css";
import styles from "./Dialog.module.scss";
import { useSelector } from "src/hooks";
import SelectBox from "src/components/common/SelectBox";

const cx = cn.bind(styles);
const { TextArea: TextAreaAnt } = Input;

export default function FormDialog({ address, status, methods, handleInputMulti, setCw20TokenAddress }) {
	const [inputAmountValue, setInputAmountValue] = useState("");
	const [isMulti, setIsMulti] = useState(true);
	const [isChooseFile, setIsChooseFile] = useState(true);
	const [listAddress, setListAddress] = useState(null);
	const [open, setOpen] = useState(false);
	const { errors, setValue, getValues, watch, register } = methods;
	const inputAddress = watch("recipientAddress");
	const [existName, setExistName] = useState(null);
	const storageData = useSelector(state => state.contact);

	useEffect(() => {
		setExistName(storageData?.[inputAddress] ? storageData?.[inputAddress]?.name : null);
	}, [inputAddress, storageData]);

	// const setAmountValue = rate => {
	// 	amount &&
	// 		setValue(
	// 			"sendAmount",
	// 			new BigNumber(amount)
	// 				.multipliedBy(rate)
	// 				.dividedBy(1000000)
	// 				.toFixed(6)
	// 		);
	// };

	const switchMultiSend = checked => {
		// setIsMulti(checked);
		// if (!checked) {
		// 	handleInputMulti(null);
		// }
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

	const [fieldValue, setFieldValue] = useState("ORAIX");
	const fields = [
		{
			label: "ORAIX",
			value: "ORAIX",
			address: ORAIX_CONTRACT,
		},
		{
			label: "OCH",
			value: "OCH",
			// OCH_CONTRACT
			address: "orai1hn8w33cqvysun2aujk5sv33tku4pgcxhhnsxmvnkfvdxagcx0p8qa4l98q",
		},
	];

	const cw20Token = fields.find(e => e.value == fieldValue);

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
									<span>
										{" "}
										{amount} ({cw20Token?.label}){" "}
									</span>
									{amount?.split(".")?.[1]?.length > 6 && <div className={cx("amount-error-message")}>Number digits after dot must be smaller than 6</div>}
								</div>
							);
						})}
					</div>
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

	return (
		<form className={cx("form-dialog")}>
			<div className={cx("switch-multisend")}>
				Multisend <Switch onChange={switchMultiSend} />
			</div>
			<Grid item xs={12} className={cx("form-input")}>
				<div className={cx("row-balance")}>
					<div className={cx("left")}>
						<div className={cx("title")}> Token CW20</div>
						<SelectBox
							value={fieldValue}
							data={fields}
							onChange={e => {
								const token = fields.find(t => t.value == e);
								setFieldValue(token.value);
								setCw20TokenAddress(token.address);
							}}
						/>
					</div>
					<div className={cx("left")}>
						<div className={cx("title")}>contractAddress</div>
						<div className={cx("value")}>{reduceString(cw20Token?.address || "", 8, 8)} </div>
					</div>
				</div>
			</Grid>
			{/* {!isMulti && (
				<Grid container spacing={2} className={cx("transaction-content")}>
					<div className={cx("row-balance")}>
						<div className={cx("left")}>
							<div className={cx("title")}> My Address </div>
							<div className={cx("value")}> {reduceString(address, 8, 8)} </div>
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
								<br />
								If you are depositing to Kucoin, please enter the required memo (NOT secret mnemonic) on Keplr or Owallet
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
						<InputNumberOrai inputAmountValue={inputAmountValue} typePrice={"airi"} name='sendAmount' errorobj={errors} />
					</Grid>
				</Grid>
			)} */}
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
