import React, {memo} from "react";
import classNames from "classnames/bind";
import Address from "src/components/common/Address";
import {logoBrand} from "src/constants/logoBrand";
import styles from "./AddressCard.scss";
import aiIcon from "src/assets/common/ai_ic.svg";
import checkIcon from "src/assets/validatorDetails/check.svg";

const cx = classNames.bind(styles);

const AddressCard = memo(({moniker, operatorAddress, address}) => {
	const logoIcon = logoBrand.find(item => operatorAddress === item.operatorAddress)?.logo ?? aiIcon;

	return (
		<div className={cx("address-card")}>
			<div className={cx("address-card-header")}>
				<div className={cx("validator-account")}>
					<img className={cx("validator-account-icon")} src={logoIcon} />
					<span className={cx("validator-account-name")}>{moniker}</span>
				</div>
				<div className={cx("validator-status")}>
					<img className={cx("validator-status-icon")} src={checkIcon} />
					<span className={cx("validator-status-text")}>Active</span>
				</div>
			</div>
			<div className={cx("address-card-body")}>
				<div className={cx("address")}>
					<div className={cx("address-type")}>Operator address</div>
					<div className={cx("address-value")}>
						<Address address={operatorAddress} size='sm' showCopyIcon={true} />
					</div>
				</div>
				<div className={cx("address")}>
					<div className={cx("address-type")}>Address</div>
					<div className={cx("address-value")}>
						<Address address={address} size='sm' showCopyIcon={true} />
					</div>
				</div>
			</div>
		</div>
	);
});

export default AddressCard;