// @ts-nocheck
import React, {memo, useState} from "react";
import {useLocation, useHistory} from "react-router-dom";
import Container from "@material-ui/core/Container";
import {Popper, Grow, Paper, MenuItem, ClickAwayListener, MenuList, useMediaQuery} from "@material-ui/core";
import {useTheme} from "@material-ui/core/styles";
import cn from "classnames/bind";
import {closePageBar} from "src/store/modules/global";
import {useDispatch} from "react-redux";
import {ExpandMore} from "@material-ui/icons";

import styles from "./Tabs.scss";
import backIcon from "src/assets/header/back_ic.svg";

import OracleScriptsTabIcon from "src/icons/Tabs/OracleScriptsTabIcon";
import BlocksTabIcon from "src/icons/Tabs/BlocksTabIcon";
import DataSourcesTabIcon from "src/icons/Tabs/DataSourcesTabIcon";
import DashBoardTabIcon from "src/icons/Tabs/DashBoardTabIcon";
import ProposalsTabIcon from "src/icons/Tabs/ProposalsTabIcon";
import ValidatorsTabIcon from "src/icons/Tabs/ValidatorsTabIcon";
import TestCaseTabIcon from "src/icons/Tabs/TestCaseTabIcon";
import RequestsTabIcon from "src/icons/Tabs/RequestsTabIcon";
import TransactionsTabIcon from "src/icons/Tabs/TransactionsTabIcon";

import "./Tabs.css";

const cx = cn.bind(styles);

const Tabs = memo(() => {
	const {pathname} = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	const [openValidators, setOpenValidators] = React.useState(false);
	const [openTransactions, setOpenTransactions] = React.useState(false);
	const validatorsAnchorRef = React.useRef(null);
	const transactionsAnchorRef = React.useRef(null);

	const handleOpenValidators = () => {
		setOpenValidators(true);
	};

	const handleCloseValidators = () => {
		setOpenValidators(false);
	};

	const handleOpenTransactions = () => {
		setOpenTransactions(true);
	};

	const handleCloseTransactions = () => {
		setOpenTransactions(false);
	};

	const renderValidatorComponent = ({name, img, route, index}) => (
		<button
			className={cx("tab", {"active-dropdown": pathname === "/accounts" || pathname === "/validators"})}
			ref={validatorsAnchorRef}
			onMouseEnter={isLargeScreen ? handleOpenValidators : ""}
			onMouseLeave={isLargeScreen ? handleCloseValidators : ""}
			onClick={() => {
				if (isLargeScreen) {
					handleCloseValidators();
					history.push(route);
					dispatch(closePageBar());
				} else handleOpenValidators();
			}}
			key={index}>
			<Popper
				popperOptions={{
					modifiers: {
						offset: {
							offset: "0,6",
						},
					},
				}}
				className={cx("dropdown-validators")}
				open={openValidators}
				anchorEl={validatorsAnchorRef.current}
				disablePortal={isLargeScreen ? false : true}
				transition>
				{({TransitionProps, placement}) => (
					<Grow {...TransitionProps}>
						<Paper>
							<ClickAwayListener onClickAway={handleCloseValidators}>
								<MenuList>
									<MenuItem
										onClick={e => {
											handleCloseValidators();
											history.push("/validators");
											dispatch(closePageBar());
											e.stopPropagation();
										}}>
										Validators
									</MenuItem>
									<MenuItem
										onClick={e => {
											handleCloseValidators();
											history.push("/accounts");
											dispatch(closePageBar());
											e.stopPropagation();
										}}>
										Accounts
									</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
			<ValidatorsTabIcon className={cx("tab-icon")}></ValidatorsTabIcon>
			<span className={cx("tab-title")}>{name}</span>
			<ExpandMore className={cx("tab-icon-expand")} />
		</button>
	);

	const renderTransactionComponent = ({name, img, route, index}) => (
		<button
			className={cx("tab", {"active-dropdown": pathname === "/txs"})}
			ref={transactionsAnchorRef}
			onMouseEnter={isLargeScreen ? handleOpenTransactions : ""}
			onMouseLeave={isLargeScreen ? handleCloseTransactions : ""}
			onClick={() => {
				if (isLargeScreen) {
					handleCloseTransactions();
					history.push(route);
					dispatch(closePageBar());
				} else handleOpenTransactions();
			}}
			key={index}>
			<Popper
				popperOptions={{
					modifiers: {
						offset: {
							offset: "0,6",
						},
					},
				}}
				className={cx("dropdown-transactions")}
				open={openTransactions}
				anchorEl={transactionsAnchorRef.current}
				disablePortal={isLargeScreen ? false : true}
				transition>
				{({TransitionProps}) => (
					<Grow {...TransitionProps}>
						<Paper>
							<ClickAwayListener onClickAway={handleCloseTransactions}>
								<MenuList>
									<MenuItem
										onClick={e => {
											handleCloseTransactions();
											history.push(route);
											dispatch(closePageBar());
											e.stopPropagation();
										}}>
										Transactions
									</MenuItem>
									<MenuItem
										onClick={e => {
											handleCloseTransactions();
											history.push(`${route}?type=pending`);
											dispatch(closePageBar());
											e.stopPropagation();
										}}>
										Pending transactions
									</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
			<TransactionsTabIcon className={cx("tab-icon")}></TransactionsTabIcon>
			<span className={cx("tab-title")}>{name}</span>
			<ExpandMore className={cx("tab-icon-expand")} />
		</button>
	);

	const tabs = [
		{
			name: "Dashboard",
			img: <DashBoardTabIcon className={cx("tab-icon")}></DashBoardTabIcon>,
			route: "/",
		},
		{
			name: "Validators",
			img: <ValidatorsTabIcon className={cx("tab-icon")}></ValidatorsTabIcon>,
			route: "/validators",
			render: renderValidatorComponent,
		},
		{
			name: "Blocks",
			img: <BlocksTabIcon className={cx("tab-icon")}></BlocksTabIcon>,
			route: "/blocks",
		},
		{
			name: "Transactions",
			img: <TransactionsTabIcon className={cx("tab-icon")}></TransactionsTabIcon>,
			route: "/txs",
			render: renderTransactionComponent,
		},
		{
			name: "Proposals",
			img: <ProposalsTabIcon className={cx("tab-icon")}></ProposalsTabIcon>,
			route: "/proposals",
		},
		{
			name: "Data Sources",
			img: <DataSourcesTabIcon className={cx("tab-icon")}></DataSourcesTabIcon>,
			route: "/data-sources",
		},
		{
			name: "Test Cases",
			img: <TestCaseTabIcon className={cx("tab-icon")}></TestCaseTabIcon>,
			route: "/test-cases",
		},
		{
			name: "Oracle Scripts",
			img: <OracleScriptsTabIcon className={cx("tab-icon")}></OracleScriptsTabIcon>,
			route: "/oracle-scripts",
		},
		{
			name: "Requests",
			img: <RequestsTabIcon className={cx("tab-icon")}></RequestsTabIcon>,
			route: "/requests",
		},
	];

	return (
		<Container>
			<div className={cx("overlay")} onClick={() => dispatch(closePageBar())}></div>
			<div className={cx("tabs")}>
				<div className={cx("close")}>
					<img src={backIcon} alt='' className={cx("close-icon")} onClick={() => dispatch(closePageBar())} />
				</div>
				{tabs.map(({name, img, route, render}, index) => {
					let tab;
					render
						? (tab = render({name, img, route, index}))
						: (tab = (
								<div
									className={cx("tab", {active: route === "/" ? pathname === "/" : pathname.indexOf(route) > -1})}
									onClick={() => {
										history.push(route);
										dispatch(closePageBar());
									}}
									key={index}>
									{img}

									<span className={cx("tab-title")}>{name}</span>
								</div>
						  ));
					return tab;
				})}
			</div>
		</Container>
	);
});

export default Tabs;
