import React, {memo, useState} from "react";
import QRCodeReact from "qrcode.react";
import Dialog from "@material-ui/core/Dialog";
import classNames from "classnames/bind";

import Address from "src/components/common/Address";
import QRCode from "src/components/common/QRCode";
import styles from "./AddressCard.module.scss";
import {isNil} from "lodash";

const BG_COLOR = "#FFFFFF";
const FG_COLOR = "#1B57F0";
const cx = classNames.bind(styles);

const AddressCard = memo(({headerIcon, headerTitle, qrValue, addresses, nameTagData}) => {
	const [open, setOpen] = useState(false);
	const value = qrValue ? qrValue : addresses?.[0]?.value ?? "";

	const handleCloseModal = () => {
		setOpen(false);
	};

	return (
		<div className={cx("address-card")}>
			<div className={cx("address-card-header")}>
				<div className={cx("qr-icon")} style={{backgroundColor: FG_COLOR}}>
					<QRCodeReact
						value={value}
						size={20}
						renderAs='svg'
						onClick={() => {
							setOpen(true);
						}}
						bgColor={BG_COLOR}
						fgColor={FG_COLOR}
					/>
				</div>

				<span className={cx("header-title")}>{headerTitle}</span>
			</div>

			<div className={cx("nametag")}>
				<div className={cx("nametag-title")}>
					<span className={cx("nametag-title-text")}>Name Tag</span>
				</div>
				<div className={cx("nametag-value")}>{!isNil(nameTagData?.title) ? nameTagData?.title : ""}</div>
			</div>

			{addresses.map((address, index) => (
				<div className={cx("address-card-body")} key={"address-card-body-" + index}>
					<div className={cx("address-title")}>
						<span className={cx("address-title-text")}>{address.title}</span>
						{address?.icon && (
							<img
								src={address.icon}
								alt=''
								className={cx("address-title-icon")}
								onClick={() => {
									if (address?.onClick) {
										address.onClick();
									}
								}}
							/>
						)}
					</div>
					<div className={cx("address-value")}>
						{typeof address.value === "string" ? <Address address={address.value} showCopyIcon={false} size='md' /> : address.value}
					</div>
				</div>
			))}

			<QRCode open={open} onClose={handleCloseModal} address={value} />

			{/* <Dialog
				onClose={}
				aria-labelledby='image-dialog'
				open={open}>
				<div className={cx("dialog")}>
					<div className={cx("dialog-header")}>
						<div className={cx("dialog-controls")}>
							<img
								src={closeIcon}
								className={cx("dialog-close-icon")}
								onClick={() => {
									setOpen(false);
								}}
							/>
						</div>
						<div className={cx("dialog-title")}>{value ?? "-"}</div>
					</div>
					<div className={cx("dialog-body")}>
						{headerIcon ? (
							<img src={headerIcon} className={cx("dialog-image")} />
						) : (
							<div className={cx("dialog-image")} style={{backgroundColor: fgColor}}>
								<QRCode
									value={value}
									size={250}
									renderAs='svg'
									onClick={() => {
										setOpen(true);
									}}
									bgColor={bgColor}
									fgColor={fgColor}
								/>
							</div>
						)}
					</div>
				</div>
			</Dialog> */}
		</div>
	);
});

export default AddressCard;
