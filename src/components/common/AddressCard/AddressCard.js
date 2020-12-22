import React, {memo} from "react";
import classNames from "classnames/bind";
import styles from "./AddressCard.scss";

const AddressCard = memo(({headerIcon, headerTitle, addresses, minHeight = "220px"}) => {
	const cx = classNames.bind(styles);

	return (
		<div className={cx("address-card")} style={{minHeight: minHeight}}>
			<div className={cx("address-card-header")}>
				<img src={headerIcon} alt='' className={cx("header-icon")} />
				<span className={cx("header-title")}>{headerTitle}</span>
			</div>

			{addresses.map((address, index) => (
				<div className={cx("address-card-body")}>
					<div className={cx("address-title")}>
						<span className={cx("address-title-text")}>{address.title}</span>
						{address?.icon && <img src={address.icon} alt='' className={cx("address-title-icon")} />}
					</div>
					<div className={cx("address-value")}>{address.value}</div>
				</div>
			))}
		</div>
	);
});

export default AddressCard;
