import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import cn from "classnames/bind";
import copy from "copy-to-clipboard";
import consts from "src/constants/consts";
import {showAlert} from "src/store/modules/global";
import {_} from "src/lib/scripts";
import styles from "./Address.scss";
import copyIcon from "src/assets/common/copy_ic.svg";
import {Tooltip} from "@material-ui/core";
import "./Address.css";

const cx = cn.bind(styles);

const Address = memo(({address, showCopyIcon = true, size = "lg", name = null, isSmartContract = false}) => {
	const dispatch = useDispatch();
	const checkPrefix = address => {
		let prefixs = [];
		for (let prop in consts.ADDRESS_PREFIX) {
			prefixs.push(consts.ADDRESS_PREFIX[prop]);
		}

		if (prefixs.find(prefix => address.startsWith(prefix))) {
			return true;
		}

		return false;
	};

	if (_.isNil(address) || _.isEmpty(address) || !checkPrefix(address)) {
		return <>-</>;
	}

	let url = "/";

	if (isSmartContract) {
		url = `${consts.PATH.SMART_CONTRACT}/${address}`;
	} else {
		if (address.startsWith(consts.ADDRESS_PREFIX.ACCOUNT)) {
			url = `${consts.PATH.ACCOUNT}/${address}`;
		} else if (address.startsWith(consts.ADDRESS_PREFIX.VALIDATOR)) {
			url = `${consts.PATH.VALIDATORS}/${address}`;
		}
	}

	return (
		<div className={cx("address")}>
			{name ? (
				<Tooltip title={`${name} (${address})`} arrow placement='top-start'>
					<NavLink className={cx(["address-link", "address-link-" + size])} to={url}>
						{name ? name : address}
					</NavLink>
				</Tooltip>
			) : (
				<NavLink className={cx(["address-link", "address-link-" + size])} to={url}>
					{address}
				</NavLink>
			)}
			{showCopyIcon && (
				<img
					src={copyIcon}
					alt=''
					className={cx("address-copy")}
					onClick={() => {
						copy(address);
						dispatch(
							showAlert({
								show: true,
								message: "Copied",
								autoHideDuration: 1500,
							})
						);
					}}
				/>
			)}
		</div>
	);
});

export default Address;
