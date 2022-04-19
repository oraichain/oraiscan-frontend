// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import {useGet} from "restful-react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import cn from "classnames/bind";
import {Grid} from "@material-ui/core";
import copy from "copy-to-clipboard";
import Skeleton from "@material-ui/lab/Skeleton";
import {showAlert} from "src/store/modules/global";
import {formatOrai} from "src/helpers/helper";
import {_} from "src/lib/scripts";
import {myKeystation} from "src/lib/Keystation";
import {initWallet} from "src/store/modules/wallet";
import consts from "src/constants/consts";
import BigNumber from "bignumber.js";
import Dialog from "../Dialog";
import DownAngleIcon from "src/icons/DownAngleIcon";
import AccountIcon from "src/icons/AccountIcon";
import WalletIcon from "src/icons/WalletIcon";
import CopyIcon from "src/icons/CopyIcon";
import styles from "./Wallet.module.scss";
import {updateToken} from "src/firebase-cloud-message";
import config from "src/config";

const cx = cn.bind(styles);

const connectWallet = () => {
	const prefix = "orai";
	const popup = myKeystation.openWindow("signin", prefix);
	let popupTick = setInterval(function() {
		if (popup.closed) {
			clearInterval(popupTick);
		}
	}, 500);
};

const Wallet = props => {
	const {path, title, handleClick, init} = props.data;
	if (init || !title) {
		return (
			<a href={path} key={title} target='_blank' onClick={handleClick || connectWallet} className={cx("nav-link")}>
				Connect Wallet
			</a>
		);
	}

	return <WalletWithAdress {...props} />;
};

const WalletWithAdress = ({data: props, collapse}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const {path, title} = props;
	const {account} = useSelector(state => state.wallet);
	const price = useSelector(state => state?.blockchain?.status?.price);
	const dispatch = useDispatch();
	const history = useHistory();
	const [isTransactionModalVisible, setIsTransactionModalVisible] = useState(false);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [mobileOpenWallet, setMobileOpenWallet] = useState(false);
	const buff = Buffer.from(JSON.stringify({balance: {address: title}}));
	const buffBalance = buff.toString("base64");
	const {data, loading, error, refetch} = useGet({
		path: `${consts.LCD_API_BASE}${consts.LCD_API.BALANCES}/${title}`,
	});
	const {data: balanceAiri, loading: loadingAiri} = useGet({
		path: `${config.LCD_API}${consts.LCD_API.WASM}/${config.AIRI_ADDRESS}/smart/${buffBalance}`,
	});

	const balance = data?.balances?.find(balance => balance.denom === "orai");
	const amount = balance?.amount;
	const denom = balance?.denom;

	const showDropdown = e => {
		if (isTransactionModalVisible) {
			return;
		}
		setIsDropdownVisible(true);
		setMobileOpenWallet(true);
		refetch();
	};

	const hideDropdown = () => {
		setIsDropdownVisible(false);
		setMobileOpenWallet(false);
	};

	const showTransactionModal = () => {
		setIsTransactionModalVisible(true);
		setIsDropdownVisible(false);
	};

	const hideTransactionModal = useCallback(() => {
		setIsTransactionModalVisible(false);
		setIsDropdownVisible(false);
	}, []);

	const closeWallet = () => {
		updateToken(title, false);
		dispatch(initWallet({}));
		history.push("/");
	};

	let amountElement;
	let denomElement;
	let priceElement;

	if (loading) {
		amountElement = (
			<span className={cx("amount")}>
				<Skeleton variant='text' width={60} height={24} />
			</span>
		);
		denomElement = (
			<span className={cx("denom")}>
				<Skeleton variant='text' width={20} height={24} />
			</span>
		);
		priceElement = (
			<span className={cx("price")}>
				<Skeleton variant='text' width={50} height={24} />
			</span>
		);
	} else {
		if (error) {
			amountElement = <span className={cx("amount")}>-</span>;
			denomElement = <span className={cx("denom")}>-</span>;
			priceElement = <span className={cx("price")}>-</span>;
		} else {
			amountElement = <span className={cx("amount")}>{isNaN(amount) ? "-" : formatOrai(amount || 0, 1000000, 6) + " "}</span>;
			denomElement = <span className={cx("denom")}>{_.isNil(denom) ? "-" : denom}</span>;
			priceElement = (
				<span className={cx("price")}>
					{isNaN(price) || isNaN(amount)
						? `($-)`
						: `($${new BigNumber(amount)
								.dividedBy(1000000)
								.multipliedBy(price)
								.toFormat(2)})`}
				</span>
			);
		}
	}

	const classNameDropdown = isDropdownVisible ? "show" : "hide";

	return (
		<div className={cx("dropdown")} onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
			{!_.isNil(account) && !_.isNil(amount) && (
				<Dialog
					show={isTransactionModalVisible}
					handleClose={hideTransactionModal}
					address={title}
					account={account}
					amount={amount}
					amountAiri={balanceAiri?.data?.balance}
				/>
			)}
			<a
				className={cx("dropdown-toggle")}
				href={path}
				key={title}
				target='_blank'
				onClick={e => {
					e.preventDefault();
					showDropdown();
				}}
				rel='noopener noreferrer'>
				<AccountIcon className={cx("dropdown-toggle-text")} />
				<DownAngleIcon className={cx("dropdown-toggle-icon")} />
			</a>
			<div className={cx("dropdown-content", mobileOpenWallet && "dropdown-content-active", isLargeScreen && classNameDropdown)}>
				<Grid container spacing={0} className={cx("wallet")}>
					<Grid item lg={9} xs={12}>
						<div className={cx("wallet-name")}> {account} </div>
						<div className={cx("wallet-address")}>
							<div className={cx("wallet-address-title")}>
								<span className={cx("wallet-address-title-text")}>Address</span>
								<span
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
									<CopyIcon className={cx("wallet-address-title-icon")} />
								</span>
							</div>
							<div className={cx("wallet-address-value")}>{title}</div>
						</div>
						<div className={cx("wallet-balance")}>
							<div className={cx("wallet-balance-title")}>Balance</div>
							<div className={cx("wallet-balance-value")}>
								{amountElement}
								{denomElement}
								{priceElement}
							</div>
						</div>
					</Grid>
					<Grid item lg={3} xs={12}>
						<NavLink
							className={cx("wallet-button")}
							to='/wallet/'
							onClick={() => {
								hideDropdown();
								if (!isLargeScreen) {
									collapse();
								}
							}}>
							<WalletIcon className={cx("wallet-button-icon")} />
							<span className={cx("wallet-button-text")}>MY WALLET</span>
						</NavLink>
					</Grid>
				</Grid>

				<Grid container className={cx("button-group")} spacing={2}>
					<Grid item lg={6} xs={12}>
						<div className={cx("button", "button-outline")} onClick={closeWallet}>
							Close Wallet
						</div>
					</Grid>
					<Grid item lg={6} xs={12}>
						<div
							className={cx("button", "button-fill")}
							onClick={() => {
								hideDropdown();
								if (!isLargeScreen) {
									collapse();
								}
								showTransactionModal();
							}}>
							Send
						</div>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

Wallet.propTypes = {};
Wallet.defaultProps = {};

export default Wallet;
