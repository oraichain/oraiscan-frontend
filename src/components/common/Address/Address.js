import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import cn from "classnames/bind";
import copy from "copy-to-clipboard";
import {showAlert} from "src/store/modules/global";
import {_} from "src/lib/scripts";
import styles from "./Address.scss";
import copyIcon from "src/assets/common/copy_ic.svg";

const cx = cn.bind(styles);

const Address = memo(({address, link, showCopyIcon = true, size = "lg"}) => {
	const dispatch = useDispatch();

	if (!_.isNil(address) && !_.isEmpty(address)) {
		return (
			<div className={cx("address")}>
				{link ? (
					<NavLink className={cx(["address-link", "address-link-" + size])} to={`/account/${address}`}>
						{address}
					</NavLink>
				) : (
					<div className={cx(["address-link", "address-link-" + size])}>{address}</div>
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
	}

	return <>-</>;
});

export default Address;
