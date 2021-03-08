// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import cn from "classnames/bind";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useHistory} from "react-router-dom";
import {Toolbar, List, ListItem, ListItemText, Button, MenuItem, Drawer, Hidden} from "@material-ui/core";
import {ArrowDropDown, DriveEta} from "@material-ui/icons";
import Alert from "src/components/common/Alert/Alert";
import copy from "copy-to-clipboard";

import {showAlert} from "src/store/modules/global";
import {formatOrai} from "src/helpers/helper";
import Keystation from "src/lib/Keystation";
import {initWallet} from "src/store/modules/wallet";
import {useFetch} from "src/hooks";
import consts from "src/constants/consts";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {ReactComponent as ShareIcon} from "src/assets/icons/share.svg";
import {ReactComponent as WalletIcon} from "src/assets/icons/wallet.svg";
import {ReactComponent as CopyIcon} from "src/assets/common/copy_ic.svg";

import Dialog from "./Dialog";
import styles from "./SearchAppBar.scss";

const cx = cn.bind(styles);

const handleClickConnectWallet = () => {
	const myKeystation = new Keystation({
		client: process.env.REACT_APP_WALLET_API,
		lcd: "https://lcd.orai.io",
		path: "44/118/0/0/0",
		keystationUrl: process.env.REACT_APP_WALLET_API,
	});

	const prefix = "orai";
	const popup = myKeystation.openWindow("signin", prefix);
	let popupTick = setInterval(function() {
		if (popup.closed) {
			clearInterval(popupTick);
		}
	}, 500);
};

export default function({data}) {
	const {path, title, handleClick, init} = data;
	const history = useHistory();
	const {account} = useSelector(state => state.wallet);
	const status = useSelector(state => state.blockchain.status);
	const dispatch = useDispatch();
	const [showTransactionModal, setShowTransactionModal] = useState(false);
	const [balance, , , , setUrl] = useFetch();
	const [reFetchAmount, setReFetchAmount] = useState(0);
	const amount = balance?.data?.balances?.[0]?.amount ?? 0;
	const denom = balance?.data?.balances?.[0]?.denom ?? "ORAI";

	useEffect(() => {
		title && !init && setUrl(`${consts.LCD_API_BASE}${consts.LCD_API.BALANCES}/${title}?t=${Date.now()}`);
	}, [title, reFetchAmount]);

	if (title === "") {
		return (
			<a href={path} key={title} target='_blank' onClick={handleClick || handleClickConnectWallet} className={cx("dropdown", "dropdown-link")}>
				Connect Wallet
			</a>
		);
	}
	return (
		<div className={cx("dropdown")}>
			<Dialog
				show={showTransactionModal}
				handleClose={() => setShowTransactionModal(false)}
				address={title}
				account={account}
				amount={amount}
				reFetchAmount={() => setReFetchAmount(prev => prev + 1)}
			/>
			<a href={path} key={title} target='_blank' onClick={e => e.preventDefault()}>
				<ListItem button>
					<AccountCircleIcon />
					<ArrowDropDown />
				</ListItem>
			</a>
			<div className={cx("dropdown-content")}>
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
						{formatOrai(amount || 0) + " "}
						<span className={cx("denom")}>{denom}</span>
						<span>{status?.price ? " ($" + (status?.price * Number(formatOrai(amount))).toFixed(6) + ")" : ""}</span>
					</div>

					<div className={cx("btn-action-group")}>
						<div className={cx("btn-send", "btn-wallet")} onClick={() => history.push("/wallet/")}>
							My Wallet
						</div>
						<div className={cx("btn-send")} onClick={() => setShowTransactionModal(true)}>
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
