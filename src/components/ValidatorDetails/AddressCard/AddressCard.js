import React, {memo} from "react";
import classNames from "classnames/bind";
import Address from "src/components/common/Address";
import {logoBrand} from "src/constants/logoBrand";
import styles from "./AddressCard.scss";
import aiIcon from "src/assets/common/ai_ic.svg";
import checkIcon from "src/assets/validatorDetails/check.svg";
import CheckIcon from "src/icons/Validators/CheckIcon";
import RejectedIcon from "src/icons/Proposals/RejectedIcon";

const cx = classNames.bind(styles);

const AddressCard = memo(({moniker, operatorAddress, address, isInactive}) => {
	const logoItem = logoBrand.find(it => operatorAddress === it.operatorAddress) || {};
	const logoURL = logoItem.customLogo ? false : logoItem.logo;
	const logoName = moniker || "";

	const renderValidatorStatus = () => {
		if (isInactive === true) {
			return (
				<>
					<div className={cx("validator-status-inactive")}>
						<RejectedIcon className={cx("validator-status-inactive-icon")}></RejectedIcon>
						<span className={cx("validator-status-inactive-text")}>Inactive</span>
					</div>
				</>
			);
		} else
			return (
				<>
					<div className={cx("validator-status-active")}>
						<CheckIcon className={cx("validator-status-active-icon")}></CheckIcon>
						<span className={cx("validator-status-active-text")}>Active</span>
					</div>
				</>
			);
	};

	return (
		<div className={cx("address-card")}>
			<div className={cx("address-card-header")}>
				<div className={cx("validator-account")}>
					{logoURL && <img alt='/' className={cx("validator-account-icon")} src={logoURL} />}
					{!logoURL && <div className={cx("logo-custom")}> {logoName.substring(0, 3).toUpperCase()} </div>}
					<span className={cx("validator-account-name")}>{moniker?.length > 22 ? moniker?.substring(0, 18) + "..." : moniker}</span>
				</div>
				{renderValidatorStatus()}
			</div>
			<div className={cx("address-card-body")}>
				<div className={cx("address")}>
					<div className={cx("address-type")}>Operator address</div>
					<div className={cx("address-value")}>
						<Address address={operatorAddress} size='md' showCopyIcon={true} />
					</div>
				</div>
				<div className={cx("address")}>
					<div className={cx("address-type")}>Address</div>
					<div className={cx("address-value")}>
						<Address address={address} size='md' showCopyIcon={true} />
					</div>
				</div>
			</div>
		</div>
	);
});

export default AddressCard;
