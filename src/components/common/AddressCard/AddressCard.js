import React, {memo, useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import classNames from "classnames/bind";
import styles from "./AddressCard.scss";
import closeIcon from "src/assets/common/close_ic.svg";

const AddressCard = memo(({headerIcon, headerTitle, headerAddress = "", addresses, minHeight = "220px"}) => {
	const cx = classNames.bind(styles);
	const [open, setOpen] = useState(false);

	return (
		<div className={cx("address-card")} style={{minHeight: minHeight}}>
			<div className={cx("address-card-header")}>
				<img
					src={headerIcon}
					alt=''
					className={cx("header-icon")}
					onClick={() => {
						setOpen(true);
					}}
				/>
				<span className={cx("header-title")}>{headerTitle}</span>
			</div>

			{addresses.map((address, index) => (
				<div className={cx("address-card-body")}>
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
					<div className={cx("address-value")}>{address.value}</div>
				</div>
			))}

			<Dialog
				onClose={() => {
					setOpen(false);
				}}
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
						<div className={cx("dialog-title")}>{headerAddress ?? "-"}</div>
					</div>
					<div className={cx("dialog-body")}>
						<img src={headerIcon} className={cx("dialog-image")} />
					</div>
				</div>
			</Dialog>
		</div>
	);
});

export default AddressCard;
