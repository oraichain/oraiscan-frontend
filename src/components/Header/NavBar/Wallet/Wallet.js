// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import {useGet} from "restful-react";
import cn from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Grid} from "@material-ui/core";
import copy from "copy-to-clipboard";
import Skeleton from "react-skeleton-loader";
import {showAlert} from "src/store/modules/global";
import {formatOrai} from "src/helpers/helper";
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

const Wallet = ({data: props}) => {
	const {path, title, handleClick, init} = props;
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const history = useHistory();
	const {account} = useSelector(state => state.wallet);
	const status = useSelector(state => state.blockchain.status);
	const dispatch = useDispatch();
	const [isTransactionModalVisible, setIsTransactionModalVisible] = useState(false);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);

	const {data, loading, error, refetch} = useGet({
		path: `${consts.LCD_API_BASE}${consts.LCD_API.BALANCES}/${title}`,
	});
	const amount = data?.balances?.[0]?.amount ?? "-";
	const denom = data?.balances?.[0]?.denom ?? "ORAI";

	if (title === "") {
		return (
			<a href={path} key={title} target='_blank' onClick={handleClick || connectWallet} className={cx("nav-link")}>
				Connect Wallet
			</a>
		);
	}

	const showDropdown = () => {
		setIsDropdownVisible(true);
		refetch();
	};

	const hideDropdown = () => {
		setIsDropdownVisible(false);
	};

	const showTransactionModal = () => {
		setIsTransactionModalVisible(true);
	};

	const hideTransactionModal = () => {
		setIsTransactionModalVisible(false);
	};

	const priceInUSD = new BigNumber(amount)
		.dividedBy(1000000)
		.multipliedBy(status?.price || 0)
		.toFormat(2);

	const classNameDropdown = isDropdownVisible ? "show" : "hide";

	return (
		<div className={cx("dropdown")} onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
			<Dialog show={isTransactionModalVisible} handleClose={hideTransactionModal} address={title} account={account} amount={amount} reFetchAmount={refetch} />
			<a className={cx("dropdown-toggle")} href={path} key={title} target='_blank' onClick={e => e.preventDefault()} rel='noopener noreferrer'>
				<AccountIcon className={cx("dropdown-toggle-text")} />
				<DownAngleIcon className={cx("dropdown-toggle-icon")} />
			</a>
			<div className={cx("dropdown-content", classNameDropdown)}>
				<Grid container spacing={0} className={cx("wallet")}>
					<Grid item lg={8} xs={12}>
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
								{loading ? <Skeleton /> : formatOrai(amount || 0, 1000000, 2) + " "}
								{loading ? <Skeleton /> : <span className={cx("denom")}>{denom}</span>}
								{loading ? <Skeleton /> : <span> {status?.price ? " ($" + priceInUSD + ")" : ""}</span>}
							</div>
						</div>
					</Grid>
					<Grid item lg={4} xs={12}>
						<div className={cx("wallet-button")} onClick={() => history.push("/wallet/")}>
							<WalletIcon className={cx("wallet-button-icon")} />
							<span className={cx("wallet-button-text")}>MY WALLET</span>
						</div>
					</Grid>
				</Grid>
				<Grid container className={cx("button-group")} spacing={2}>
					<Grid item lg={6} xs={12}>
						<div className={cx("button", "button-fill")} onClick={showTransactionModal}>
							Send
						</div>
					</Grid>
					<Grid item lg={6} xs={12}>
						<div className={cx("button", "button-outline")} onClick={() => dispatch(initWallet({}))}>
							Close Wallet
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
