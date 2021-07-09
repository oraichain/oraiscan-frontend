// @ts-nocheck
import React from "react";
import classNames from "classnames/bind";
import {useDispatch} from "react-redux";

import {openPageBar} from "src/store/modules/global";
import styles from "./TogglePageBar.scss";

import {ReactComponent as TogglePageIcon} from "src/assets/icons/toggle-page.svg";
import OracleScriptsTabIcon from "src/icons/Tabs/OracleScriptsTabIcon";
import BlocksTabIcon from "src/icons/Tabs/BlocksTabIcon";
import DataSourcesTabIcon from "src/icons/Tabs/DataSourcesTabIcon";
import DashBoardTabIcon from "src/icons/Tabs/DashBoardTabIcon";
import ProposalsTabIcon from "src/icons/Tabs/ProposalsTabIcon";
import TestCaseTabIcon from "src/icons/Tabs/TestCaseTabIcon";
import RequestsTabIcon from "src/icons/Tabs/RequestsTabIcon";
import TransactionsTabIcon from "src/icons/Tabs/TransactionsTabIcon";
import ValidatorsIcon from "src/icons/Validators/ValidatorsIcon";

const cx = classNames.bind(styles);

const TogglePageBar = ({type}) => {
	const dispatch = useDispatch();
	const renderIcon = () => {
		switch (type) {
			case "dashboard": {
				return (
					<div className={cx("title")}>
						{" "}
						<DashBoardTabIcon className={cx("title-icon")} /> Dashboard
					</div>
				);
			}
			case "validators": {
				return (
					<div className={cx("title")}>
						{" "}
						<ValidatorsIcon className={cx("title-icon")} /> Validators
					</div>
				);
			}
			case "blocks": {
				return (
					<div className={cx("title")}>
						{" "}
						<BlocksTabIcon className={cx("title-icon")} /> Blocks
					</div>
				);
			}
			case "transactions": {
				return (
					<div className={cx("title")}>
						{" "}
						<TransactionsTabIcon className={cx("title-icon")} /> Transactions
					</div>
				);
			}
			case "accounts": {
				return (
					<div className={cx("title")}>
						{" "}
						<ValidatorsIcon className={cx("title-icon")} /> Accounts
					</div>
				);
			}
			case "smart-contracts": {
				return (
					<div className={cx("title")}>
						{" "}
						<ValidatorsIcon className={cx("title-icon")} /> Smart contracts
					</div>
				);
			}
			case "proposals": {
				return (
					<div className={cx("title")}>
						{" "}
						<ProposalsTabIcon className={cx("title-icon")} /> Proposals
					</div>
				);
			}
			case "data-sources": {
				return (
					<div className={cx("title")}>
						{" "}
						<DataSourcesTabIcon className={cx("title-icon")} /> Data Sources
					</div>
				);
			}
			case "test-cases": {
				return (
					<div className={cx("title")}>
						{" "}
						<TestCaseTabIcon className={cx("title-icon")} /> Test Cases
					</div>
				);
			}
			case "oracle-scripts": {
				return (
					<div className={cx("title")}>
						{" "}
						<OracleScriptsTabIcon className={cx("title-icon")} /> Oracle Scripts
					</div>
				);
			}
			case "ai_requests": {
				return (
					<div className={cx("title")}>
						{" "}
						<RequestsTabIcon className={cx("title-icon")} /> All requests
					</div>
				);
			}
			case "price_feeds": {
				return <div className={cx("title")}> Price Feeds</div>;
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
