import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import * as yup from "yup";
import cn from "classnames/bind";
import _, {add, constant} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import BigNumber from "bignumber.js";
import {Switch, Input} from "antd";

import {reduceString} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import {InputNumberOrai, TextArea, InputTextWithIcon} from "src/components/common/form-controls";
import {ReactComponent as ExchangeIcon} from "src/assets/icons/switch-blue.svg";
import consts from "src/constants/consts";
import ShowExample from "./ShowExample";
import SelectFile from "./SelectFile";
import "./SendOraiTab.css";
import styles from "./Dialog.scss";
import CloseSVG from "src/assets/icons/close.svg";

const cx = cn.bind(styles);
const {TextArea: TextAreaAnt} = Input;

yup.addMethod(yup.number, "lessThanNumber", function(amount) {
	return this.test({
		name: "test-name",
		exclusive: false,
		message: "Transfer amount must be greater than 0 and less than your account's amount",
		test(value) {
			if (_.isNaN(value)) {
				return true;
			}
			return value >= 0 && value <= parseFloat(amount);
		},
	});
});

const handleAddAddressToStorage = (name, address) => {
	let storageData = JSON.parse(localStorage.getItem("address")) ?? {};
	let newData = Object.assign(storageData, {[address]: {address: address, name: name}});
	localStorage.setItem("address", JSON.stringify(newData));
};

function AddAddressDialog(props) {
	const {onClose, open, recipientAddress} = props;
	const [name, setName] = useState("");
	return (
		<Dialog open={open}>
			<div className={cx("close")} onClick={onClose}>
				<img className={cx("close-icon")} src={CloseSVG} alt='Close' />
			</div>
			<div className={cx("address-dialog")}>
				<div className={cx("address-dialog-header")}>
					<div className={cx("title")}>Add address to contacts</div>
				</div>

				<div className={cx("address-dialog-label")}>
					<div className={cx("label")}>Label</div>
					<input
						className={cx("input")}
						type='text'
						placeholder='03332...'
						value={name}
						onChange={e => {
							setName(e.target.value);
						}}
					/>
				</div>
				<div className={cx("address-dialog-value")}>
					<div className={cx("address-label")}>Address</div>
					<div className={cx("address-value")}>{recipientAddress}</div>
				</div>

				<div className={cx("address-dialog-footer")}>
					<button onClick={onClose} className={cx("button-cancel")}>
						Cancel
					</button>
					<button
						onClick={() => {
							handleAddAddressToStorage(name, recipientAddress);
							onClose();
						}}
						className={cx("button-add")}>
						Add
					</button>
				</div>
			</div>
		</Dialog>
	);
}

export default function FormDialog({address, amount, status, methods, handleInputMulti}) {
	const [fee, setFee] = useState(0);
	const [isMulti, setIsMulti] = useState(false);
	const [isChooseFile, setIsChooseFile] = useState(true);
	const [listAddress, setListAddress] = useState(null);
	const [open, setOpen] = useState(false);
	const {errors, setValue, getValues} = methods;

	const setAmountValue = (e, rate) => {
		e.preventDefault();
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
			<div className={cx("row-balance", "switch-control")}>
				<div className={cx("left")}>
					<div className={cx("title", "switch-blue")} onClick={toogleChooseFile}>
						{isChooseFile ? "Insert manually" : "Using file"} <ExchangeIcon />
					</div>
				</div>
				<div className={cx("right")}>
					<div className={cx("title", "title-right", "switch-blue")}>
						{" "}
						<ShowExample />{" "}
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
						{listAddress.map(({address, amount}, index) => {
							return (
								<div className={cx("row")}>
									<span> {index + 1}. </span>
									<span> {address} - </span>
									<span> {amount} (ORAI) </span>
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
						{" "}
						<SelectFile handleSelectFile={handleSelectFile} />{" "}
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
			const newWindow = window.open(url, "_blank");
			if (newWindow) {
				newWindow.opener = null;
			}
		}
	};

	const handleClickOpen = () => {
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
						<InputTextWithIcon placeholder='03332...' name='recipientAddress' required errorobj={errors} onClickEndAdornment={handleClickEndAdornment} />
						<div className={cx("new-label")}>
							New address recognized!{" "}
							<a className={cx("open-dialog")} onClick={handleClickOpen}>
								Add them to your address book
							</a>
						</div>
					</Grid>
					<Grid item xs={12} className={cx("form-input")}>
						<div className={cx("label", "label-right")}>
							<div className={cx("left")}> Amount </div>
							<div className={cx("right")}>
								<button onClick={e => setAmountValue(e, 0.5)}> 1 / 2 </button>
								<button onClick={e => setAmountValue(e, 1)}> Max </button>
							</div>
						</div>
						<InputNumberOrai name='sendAmount' required errorobj={errors} />
					</Grid>
					<Grid item xs={12} className={cx("form-input")}>
						<div className={cx("label")}>
							{" "}
							Memo <span className={cx("optional")}> (Optional) </span>{" "}
						</div>
						<TextArea name='memo' placeholder='Insert memo here' rows={5} />
					</Grid>
					<Grid item xs={12} className={cx("form-input")}>
						<div className={cx("label")}>
							{" "}
							Tx Fee:
							<span className={cx("fee")}> {formatOrai(fee || 0)} ORAI </span>{" "}
							<span>{status?.price ? "($" + (status?.price * Number(formatOrai(fee))).toFixed(6) + ")" : ""}</span>
						</div>
					</Grid>
				</Grid>
			)}
			{isMulti && renderSelectMulti()}
			<AddAddressDialog onClose={handleClose} open={open} recipientAddress={getValues("recipientAddress")} />
		</form>
	);
}
