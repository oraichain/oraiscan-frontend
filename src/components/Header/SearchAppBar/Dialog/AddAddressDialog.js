import React, {useState, useEffect, useMemo} from "react";
import Dialog from "@material-ui/core/Dialog";
import _ from "lodash";
import cn from "classnames/bind";
import CloseSVG from "src/assets/icons/close.svg";
import styles from "./Dialog.scss";
import {useDispatch} from "react-redux";
import {showAlert} from "src/store/modules/global";

const cx = cn.bind(styles);

export default function AddAddressDialog(props) {
	const {onSubmit, onClose, open, recipientAddress, isEdit} = props;
	const dispatch = useDispatch();

	const getStorageData = () => {
		return JSON.parse(localStorage.getItem("address")) ?? {};
	};

	const handleAddAddressToStorage = (name, address) => {
		let storageData = JSON.parse(localStorage.getItem("address")) ?? {};
		let newData = Object.assign(storageData, {[address]: {address: address, name: name}});
		localStorage.setItem("address", JSON.stringify(newData));
		dispatch(
			showAlert({
				show: true,
				message: "Success",
				autoHideDuration: 1500,
			})
		);
		onSubmit();
	};

	const storageData = useMemo(() => getStorageData(), []);
	const existName = storageData?.[recipientAddress] ? storageData?.[recipientAddress]?.name : "";
	const [name, setName] = useState(existName);

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
						{isEdit ? "Edit" : "Add"}
					</button>
				</div>
			</div>
		</Dialog>
	);
}