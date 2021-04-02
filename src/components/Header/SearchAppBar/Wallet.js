// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from "react";
import cn from "classnames/bind";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useHistory} from "react-router-dom";
import {Toolbar, List, ListItem, ListItemText, Button, MenuItem, Drawer, Hidden} from "@material-ui/core";
import {ExpandMore, DriveEta} from "@material-ui/icons";
import Alert from "src/components/common/Alert/Alert";
import copy from "copy-to-clipboard";
import Skeleton from "react-skeleton-loader";
import {useGet} from "restful-react";

import {showAlert} from "src/store/modules/global";
import {formatOrai} from "src/helpers/helper";
import {myKeystation} from "src/lib/Keystation";
import {initWallet} from "src/store/modules/wallet";
import {useFetch} from "src/hooks";
import consts from "src/constants/consts";
import BigNumber from "bignumber.js";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {ReactComponent as ShareIcon} from "src/assets/icons/share.svg";
import {ReactComponent as WalletIcon} from "src/assets/icons/wallet.svg";
import {ReactComponent as CopyIcon} from "src/assets/common/copy_ic.svg";
import accountIcon from "src/assets/header/account.svg";

import Dialog from "./Dialog";
import styles from "./SearchAppBar.scss";

const cx = cn.bind(styles);

const handleClickConnectWallet = () => {
	const prefix = "orai";
	const popup = myKeystation.openWindow("signin", prefix);
	let popupTick = setInterval(function() {
		if (popup.closed) {
			clearInterval(popupTick);
		}
	}, 500);
};

export default function({data: props}) {
	const {path, title, handleClick, init} = props;
	const history = useHistory();
	const {account} = useSelector(state => state.wallet);
	const status = useSelector(state => state.blockchain.status);
	const dispatch = useDispatch();
	const [showTransactionModal, setShowTransactionModal] = useState(false);
	const {data, loading, error, refetch} = useGet({
		path: `${consts.LCD_API_BASE}${consts.LCD_API.BALANCES}/${title}`,
	});
	const [showDropDown, setShowDropDown] = useState(false);
	const amount = data?.balances?.[0]?.amount ?? "-";
	// const amount = "927900393543589";
	const denom = data?.balances?.[0]?.denom ?? "ORAI";

	if (title === "") {
		return (
			<a href={path} key={title} target='_blank' onClick={handleClick || handleClickConnectWallet} className={cx("dropdown", "dropdown-link")}>
				Connect Wallet
			</a>
		);
	}

	const priceInUSD = new BigNumber(amount)
		.dividedBy(1000000)
		.multipliedBy(status?.price || 0)
		.toFormat(2);

	const classNameDropdown = showDropDown ? "show" : "hide";

	const handleShowDropDown = () => {
		if (showTransactionModal) {
			return;
		}
		setShowDropDown(true);
		refetch();
	};

	const handleHideDropDown = () => {
		if (showTransactionModal) {
			return;
		}
		setShowDropDown(false);
	};

	const handleClickSendBtn = () => {
		setShowTransactionModal(true);
		setShowDropDown(false);
	};

	const handleCloseModal = () => {
		setShowTransactionModal(false);
		setTimeout(() => setShowDropDown(false), 100);
	};

	return (
		<div className={cx("dropdown")} onMouseEnter={handleShowDropDown} onMouseLeave={handleHideDropDown}>
			<Dialog show={showTransactionModal} handleClose={handleCloseModal} address={title} account={account} amount={amount} reFetchAmount={refetch} />
			<a href={path} key={title} target='_blank' onClick={e => e.preventDefault()} rel='noopener noreferrer'>
				<ListItem button>
					<img alt='/' src={accountIcon} className={cx("account-icon")} />
					<ExpandMore className={cx("icon")} />
				</ListItem>
			</a>
			<div className={cx("dropdown-content", classNameDropdown)}>
				<div className={cx("orai-profile")}>
					<div className={cx("wallet-name")}>
						{" "}
						<WalletIcon /> <span className={cx("wallet-account")}> {account} </span>{" "}
					</div>
					<div className={cx("wallet-address-title")}>
						{" "}
						Address{" "}
						<CopyIcon
							onClick={() => {
								copy(title);
								dispatch(
									showAlert({
										show: true,
										message: "Copied",
										autoHideDuration: 1500,
									})
								);
							}}
						/>{" "}
					</div>
					<NavLink className={cx("wallet-address-detail")} to='/wallet'>
						{title}
					</NavLink>

					<div className={cx("wallet-address-title")}> Balance </div>
					<div className={cx("wallet-address-detail")}>
						{loading ? <Skeleton /> : formatOrai(amount || 0, 1000000, 2) + " "}
						{loading ? <Skeleton /> : <span className={cx("denom")}>{denom}</span>}
						{loading ? <Skeleton /> : <span> {status?.price ? " ($" + priceInUSD + ")" : ""}</span>}
					</div>

					<div className={cx("btn-action-group")}>
						<div className={cx("btn-send", "btn-wallet")} onClick={() => history.push("/wallet/")}>
							My Wallet
						</div>
						<div className={cx("btn-send")} onClick={handleClickSendBtn}>
							Send
						</div>
						<div className={cx("btn-close")} onClick={() => dispatch(initWallet({}))}>
							Close Wallet
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
