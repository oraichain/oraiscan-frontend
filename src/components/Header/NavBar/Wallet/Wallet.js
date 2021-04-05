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
import copy from "copy-to-clipboard";
import Skeleton from "react-skeleton-loader";
import {showAlert} from "src/store/modules/global";
import {formatOrai} from "src/helpers/helper";
import {myKeystation} from "src/lib/Keystation";
import {initWallet} from "src/store/modules/wallet";
import consts from "src/constants/consts";
import BigNumber from "bignumber.js";
import {ReactComponent as WalletIcon} from "src/assets/icons/wallet.svg";
import {ReactComponent as CopyIcon} from "src/assets/common/copy_ic.svg";
import Dialog from "../Dialog";
import styles from "./Wallet.module.scss";
import whiteArrowDownIcon from "src/assets/header/white_arrow_down.svg";
import greyArrowDownIcon from "src/assets/header/grey_arrow_down.svg";
import whiteAccountIcon from "src/assets/header/white_account.svg";
import greyAccountIcon from "src/assets/header/grey_account.svg";

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
				<img className={cx("dropdown-toggle-text")} src={isLargeScreen ? whiteAccountIcon : greyAccountIcon} alt='' />
				<img className={cx("dropdown-toggle-icon")} src={isLargeScreen ? whiteArrowDownIcon : greyArrowDownIcon} alt='' />
			</a>
			<div className={cx("dropdown-content", classNameDropdown)}>
				<div className={cx("orai-profile")}>
					<div className={cx("wallet-name")}>
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
						<div className={cx("btn-send")} onClick={showTransactionModal}>
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
};

Wallet.propTypes = {};
Wallet.defaultProps = {};

export default Wallet;
