// @ts-nocheck
import React, {useState, useMemo} from "react";
import Dialog from "@material-ui/core/Dialog";
import cn from "classnames/bind";
import CloseSVG from "src/assets/icons/close.svg";
import styles from "./Dialog.scss";
import {useDispatch} from "react-redux";
import {showAlert} from "src/store/modules/global";
import {addContact} from "src/store/modules/contact";

const cx = cn.bind(styles);

export default function AddAddressDialog(props) {
	const {onClose, open, recipientAddress, isEdit, storageData} = props;
	const dispatch = useDispatch();

	const handleAddAddressToStorage = (name, address) => {
		dispatch(
			showAlert({
				show: true,
				message: "Success",
				autoHideDuration: 1500,
			})
		);
		dispatch(addContact({[address]: {address, name}}));
	};

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
