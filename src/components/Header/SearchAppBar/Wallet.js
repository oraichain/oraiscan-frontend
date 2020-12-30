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
import {ReactComponent as CopyIcon} from "src/assets/icons/copy.svg";
import {ReactComponent as ShareIcon} from "src/assets/icons/share.svg";

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
	const {path, title, handleClick} = data;
	const {account} = useSelector(state => state.wallet);
	const dispatch = useDispatch();
	const [showTransactionModal, setShowTransactionModal] = useState(false);
	const history = useHistory();
	const [wallet, , , , setUrl] = useFetch();
	const [reFetchAmount, setReFetchAmount] = useState(0);
	const amount = wallet?.data?.result?.value?.coins?.[0]?.amount;

	useEffect(() => {
		setUrl(`${consts.LCD_API_BASE}${consts.LCD_API.ACCOUNT_DETAIL}/${title}?t=${Date.now()}`);
	}, [title, reFetchAmount]);

	if (title === "") {
		return (
			<a href={path} key={title} target='_blank' onClick={handleClick || handleClickConnectWallet}>
				<ListItem button>
					<ListItemText primary={"Connect Wallet"} />
				</ListItem>
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
					<div className={cx("wallet-name")}>Address: {account}</div>
					<div className={cx("wallet-link")}>
						<a
							href='/'
							onClick={e => {
								e.preventDefault();
								history.push(`/account/${title}`);
							}}>
							{title}
						</a>
						<span
							className={cx("wallet-copy")}
							onClick={() => {
								copy(title);
								dispatch(
									showAlert({
										show: true,
										message: "Copied",
										autoHideDuration: 1500,
									})
								);
							}}>
							<CopyIcon />
						</span>
						<span className={cx("wallet-share")} onClick={() => history.push(`/account/${title}`)}>
							<ShareIcon />
						</span>
					</div>
					<div className={cx("wallet-link")}>
						<div className={cx("wallet-amount")}> Balance: {formatOrai(amount || 0)} ORAI </div>
					</div>
					<div className={cx("orai-btn-group")}>
						<div className={cx("btn-orai", "change-wallet")} onClick={() => setShowTransactionModal(true)}>
							Send
						</div>
						<div className={cx("btn-orai", "change-wallet")} onClick={handleClickConnectWallet}>
							{" "}
							Change Wallet{" "}
						</div>
						<div className={cx("btn-orai", "close-wallet")} onClick={() => dispatch(initWallet({}))}>
							Close Wallet
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
