import React, {memo} from "react";
import classNames from "classnames/bind";
import {useDispatch} from "react-redux";

import {openPageBar} from "src/store/modules/global";
import styles from "./TogglePageBar.scss";
import {ReactComponent as DashBoardIcon} from "src/assets/dashboard/dashboard.svg";
import {ReactComponent as ValidatorIcon} from "src/assets/icons/validators.svg";
import {ReactComponent as BlockIcon} from "src/assets/icons/blocks.svg";
import {ReactComponent as TransactionIcon} from "src/assets/icons/transactions.svg";
import {ReactComponent as TogglePageIcon} from "src/assets/icons/toggle-page.svg";

const cx = classNames.bind(styles);

const TogglePageBar = ({type}) => {
	const dispatch = useDispatch();
	const renderIcon = () => {
		switch (type) {
			case "dashboard": {
				return (
					<div className={cx("title")}>
						{" "}
						<DashBoardIcon /> Dashboard
					</div>
				);
			}
			case "validators": {
				return (
					<div className={cx("title")}>
						{" "}
						<ValidatorIcon /> Validators
					</div>
				);
			}
			case "blocks": {
				return (
					<div className={cx("title")}>
						{" "}
						<BlockIcon /> Blocks
					</div>
				);
			}
			case "transactions": {
				return (
					<div className={cx("title")}>
						{" "}
						<TransactionIcon /> Transactions
					</div>
				);
			}
			default:
				return null;
		}
	};
	return (
		<div className={cx("header-mobile")}>
			{renderIcon()}
			<div className={cx("page-icon")} onClick={() => dispatch(openPageBar())}>
				{" "}
				<TogglePageIcon />{" "}
			</div>
		</div>
	);
};

export default TogglePageBar;