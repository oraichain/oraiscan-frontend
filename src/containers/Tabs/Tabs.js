// @ts-nocheck
import React, {memo, useState} from "react";

// libraries
import {useLocation, useHistory} from "react-router-dom";
import Container from "@material-ui/core/Container";
import {Popper, Grow, Paper, MenuItem, ClickAwayListener, MenuList, useMediaQuery} from "@material-ui/core";
import {useTheme} from "@material-ui/core/styles";
import cn from "classnames/bind";
import {useDispatch} from "react-redux";
import {ExpandMore} from "@material-ui/icons";
import {isNil} from "lodash-es";

// icons
import OracleScriptsTabIcon from "src/icons/Tabs/OracleScriptsTabIcon";
import BlocksTabIcon from "src/icons/Tabs/BlocksTabIcon";
import DataSourcesTabIcon from "src/icons/Tabs/DataSourcesTabIcon";
import DashBoardTabIcon from "src/icons/Tabs/DashBoardTabIcon";
import ProposalsTabIcon from "src/icons/Tabs/ProposalsTabIcon";
import PriceFeedsTabIcon from "src/icons/Tabs/PriceFeedsTabIcon";
import ValidatorsTabIcon from "src/icons/Tabs/ValidatorsTabIcon";
import TestCaseTabIcon from "src/icons/Tabs/TestCaseTabIcon";
import RequestsTabIcon from "src/icons/Tabs/RequestsTabIcon";
import TransactionsTabIcon from "src/icons/Tabs/TransactionsTabIcon";
import IbcTabIcon from "src/icons/Tabs/IbcTabIcon";
import backIcon from "src/assets/header/back_ic.svg";

// functions and components
import {closePageBar} from "src/store/modules/global";
import styles from "./Tabs.scss";
import config from "src/config.js";

import "./Tabs.css";
import NetworkSwitcher from "src/components/common/NetworkSwitcher";
import ModeSwitch from "src/components/common/ModeSwitch";

const cx = cn.bind(styles);
const contract = config.randomnessContractAddress;

const Tabs = memo(() => {
	const {pathname} = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	const [openValidators, setOpenValidators] = React.useState(false);
	const [openTransactions, setOpenTransactions] = React.useState(false);
	const [openProposals, setOpenProposals] = React.useState(false);
	const [openOracleScripts, setOpenOracleScripts] = React.useState(false);
	const [openRequests, setOpenRequests] = React.useState(false);
	const [openOthers, setOpenOthers] = React.useState(false);
	const [openIbc, setOpenIbc] = React.useState(false);
	const validatorsAnchorRef = React.useRef(null);
	const transactionsAnchorRef = React.useRef(null);
	const proposalsAnchorRef = React.useRef(null);
	const oracleScriptsAnchorRef = React.useRef(null);
	const requestsAnchorRef = React.useRef(null);
	const othersAnchorRef = React.useRef(null);
	const ibcAnchorRef = React.useRef(null);

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

	const handleOpenProposals = () => {
		setOpenProposals(true);
	};

	const handleCloseProposals = () => {
		setOpenProposals(false);
	};

	const handleOpenOracleScripts = () => {
		setOpenOracleScripts(true);
	};

	const handleCloseOracleScripts = () => {
		setOpenOracleScripts(false);
	};

	const handleOpenRequests = () => {
		setOpenRequests(true);
	};

	const handleCloseRequests = () => {
		setOpenRequests(false);
	};

	const handleOpenOthers = () => {
		setOpenOthers(true);
	};

	const handleCloseOthers = () => {
		setOpenOthers(false);
	};

	const handleOpenIbc = () => {
		setOpenIbc(true);
	};

	const handleCloseIbc = () => {
		setOpenIbc(false);
	};

	const renderTabDropdownComponent = ({classNameDropdown, childs, anchorRef, handleOpen, handleClose, open, name, route, img, index, dropdownClassName}) => (
		<button
			className={cx("tab", {"active-dropdown": childs?.find(item => item?.activePath === pathname)})}
			ref={anchorRef}
			onMouseEnter={isLargeScreen ? handleOpen : null}
			onMouseLeave={isLargeScreen ? handleClose : null}
			onClick={() => {
				if (isLargeScreen) {
					handleClose();
					history.push(route);
					dispatch(closePageBar());
				} else handleOpen();
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
				className={cx(classNameDropdown)}
				open={open}
				anchorEl={anchorRef?.current}
				disablePortal={isLargeScreen ? false : true}
				transition>
				{({TransitionProps, placement}) => (
					<Grow {...TransitionProps}>
						<Paper className={cx(dropdownClassName)}>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList>
									{childs?.map(item => (
										<MenuItem
											onClick={e => {
												handleClose();
												history.push(item?.pathName);
												dispatch(closePageBar());
												e.stopPropagation();
											}}>
											{item?.title}
										</MenuItem>
									))}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
			{img}
			<span className={cx("tab-title")}>{name}</span>
			<ExpandMore className={cx("tab-icon-expand")} />
		</button>
	);

	const childDropdown = {
		Validators: [
			{
				pathName: "/validators",
				title: "Validators",
				activePath: "/validators",
			},
			{
				pathName: "/accounts",
				title: "Accounts",
				activePath: "/accounts",
			},
		],
		Transactions: [
			{
				pathName: "/txs",
				title: "Transactions",
				activePath: "/txs",
			},
			{
				pathName: "/txs?type=pending",
				title: "Pending transactions",
				activePath: "/txs",
			},
		],
		Proposals: [
			{
				pathName: "/proposals?type=ParameterChangeProposal",
				title: "Change proposal",
				activePath: "/proposals",
			},
			{
				pathName: "/proposals?type=SoftwareUpgradeProposal",
				title: "Upgrade proposal",
				activePath: "/proposals",
			},
			{
				pathName: "/proposals?type=TextProposal",
				title: "Text proposal",
				activePath: "/proposals",
			},
		],
		"Smart Contracts": [
			{
				pathName: "/smart-contracts",
				title: "Smart Contracts",
				activePath: "/smart-contracts",
			},
			{
				pathName: "/oracle-scripts",
				title: "Oracle Scripts",
				activePath: "/oracle-scripts",
			},
		],
		"Subnetworks": [
			{
				pathName: "/ai-oracle",
				title: "AI Oracle",
				activePath: "/ai-oracle",
			},
			{
				pathName: `/randomness/${contract}`,
				title: "VRF",
				activePath: `/randomness/${contract}`,
			}
		],
		// Others: [
		// 	{
		// 		pathName: "/data-sources",
		// 		title: "Data Sources (Legacy)",
		// 		activePath: "/data-soruces",
		// 	},
		// 	{
		// 		pathName: "/test-cases",
		// 		title: "Test Cases (Legacy)",
		// 		activePath: "/test-cases",
		// 	},
		// ],
		IBC: [
			{
				pathName: "/ibc/assets",
				title: "Assets",
				activePath: "/ibc/assets",
			},
			{
				pathName: "/ibc/relayers",
				title: "Relayers",
				activePath: "/ibc/relayers",
			},
		],
	};

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
			render: renderTabDropdownComponent,
		},
		{
			name: "Subnetworks",
			img: <RequestsTabIcon className={cx("tab-icon")}></RequestsTabIcon>,
			route: "/ai-oracle",
			dropdownClassName: "requests-dropdown",
			render: renderTabDropdownComponent,
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
			dropdownClassName: "txs-dropdown",
			render: renderTabDropdownComponent,
		},
		{
			name: "Proposals",
			img: <ProposalsTabIcon className={cx("tab-icon")}></ProposalsTabIcon>,
			route: "/proposals",
			dropdownClassName: "proposals-dropdown",
			render: renderTabDropdownComponent,
		},
		{
			name: "IBC",
			img: <IbcTabIcon className={cx("tab-icon")}></IbcTabIcon>,
			route: "/ibc/assets",
			dropdownClassName: "ibc-dropdown",
			render: renderTabDropdownComponent,
		},
		{
			name: "Price Feeds",
			img: <PriceFeedsTabIcon className={cx("tab-icon")}></PriceFeedsTabIcon>,
			route: "/price-feeds",
		},
		// {
		// 	name: "Randomness",
		// 	img: <DataSourcesTabIcon className={cx("tab-icon")}></DataSourcesTabIcon>,
		// 	route: "/randomness/" + contract,
		// },
		{
			name: "Smart Contracts",
			img: <OracleScriptsTabIcon className={cx("tab-icon")}></OracleScriptsTabIcon>,
			route: "/smart-contracts",
			dropdownClassName: "oracle-scripts-dropdown",
			render: renderTabDropdownComponent,
		},

		// {
		// 	name: "Others",
		// 	// img: <PriceFeedsTabIcon className={cx("tab-icon")}></PriceFeedsTabIcon>,
		// 	route: "/data-sources",
		// 	dropdownClassName: "others-dropdown",
		// 	render: renderTabDropdownComponent,
		// },
	];

	return (
		<Container>
			<div className={cx("overlay")} onClick={() => dispatch(closePageBar())}></div>
			<div className={cx("tabs")}>
				<div className={cx("close")}>
					<img src={backIcon} alt='' className={cx("close-icon")} onClick={() => dispatch(closePageBar())} />
					<div className={cx("mode-switch")}>
						<ModeSwitch />
					</div>
				</div>
				<div className={cx("network-switcher")}>
					<div className={cx("network-switcher-title")}>Choose network</div>
					<div className={cx("network-switcher-select")}>
						<NetworkSwitcher />
					</div>
				</div>
				{tabs.map(({name, img, route, render, dropdownClassName}, index) => {
					let tab;
					if (!isNil(render)) {
						let classNameDropdown;
						let childs;
						let anchorRef;
						let open;
						let handleOpen;
						let handleClose;
						switch (name) {
							case "Validators":
								classNameDropdown = "dropdown-transactions dropdown-validators";
								childs = childDropdown?.[name];
								anchorRef = validatorsAnchorRef;
								open = openValidators;
								handleOpen = handleOpenValidators;
								handleClose = handleCloseValidators;
								break;
							case "Transactions":
								classNameDropdown = "dropdown-transactions dropdown-trans";
								childs = childDropdown?.[name];
								anchorRef = transactionsAnchorRef;
								open = openTransactions;
								handleOpen = handleOpenTransactions;
								handleClose = handleCloseTransactions;
								break;
							case "Proposals":
								classNameDropdown = "dropdown-transactions dropdown-proposals";
								childs = childDropdown?.[name];
								anchorRef = proposalsAnchorRef;
								open = openProposals;
								handleOpen = handleOpenProposals;
								handleClose = handleCloseProposals;
								break;
							case "Smart Contracts":
								classNameDropdown = "dropdown-transactions dropdown-smart";
								childs = childDropdown?.[name];
								anchorRef = oracleScriptsAnchorRef;
								open = openOracleScripts;
								handleOpen = handleOpenOracleScripts;
								handleClose = handleCloseOracleScripts;
								break;
							case "Subnetworks":
								classNameDropdown = "dropdown-transactions dropdown-sub";
								childs = childDropdown?.[name];
								anchorRef = requestsAnchorRef;
								open = openRequests;
								handleOpen = handleOpenRequests;
								handleClose = handleCloseRequests;
								break;
							// case "Others":
							// 	classNameDropdown = "dropdown-transactions";
							// 	childs = childDropdown?.[name];
							// 	anchorRef = othersAnchorRef;
							// 	open = openOthers;
							// 	handleOpen = handleOpenOthers;
							// 	handleClose = handleCloseOthers;
							// 	break;
							case "IBC":
								classNameDropdown = "dropdown-transactions dropdown-ibc";
								childs = childDropdown?.[name];
								anchorRef = ibcAnchorRef;
								open = openIbc;
								handleOpen = handleOpenIbc;
								handleClose = handleCloseIbc;
								break;
							default:
								break;
						}
						tab = render({
							classNameDropdown: classNameDropdown,
							childs: childs,
							anchorRef: anchorRef,
							handleOpen: handleOpen,
							handleClose: handleClose,
							open,
							name,
							route,
							img,
							index,
							dropdownClassName,
						});
					} else
						tab = (
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
						);
					return tab;
				})}
			</div>
		</Container>
	);
});

export default Tabs;
