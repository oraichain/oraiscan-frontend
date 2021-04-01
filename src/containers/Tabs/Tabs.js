// @ts-nocheck
import React, {memo, useState} from "react";
import {useLocation, useHistory} from "react-router-dom";
import Container from "@material-ui/core/Container";
import {Popper, Grow, Paper, MenuItem, ClickAwayListener, MenuList} from "@material-ui/core";
import cn from "classnames/bind";
import {closePageBar} from "src/store/modules/global";
import {useDispatch} from "react-redux";
import {ExpandMore} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {DownOutlined} from "@ant-design/icons";
import {Menu, Dropdown} from "antd";

import styles from "./Tabs.scss";
import backIcon from "src/assets/header/back_ic.svg";
// import toggleIcon from "src/assets/header/toggle_ic.svg";
import blocksSVG from "src/assets/header/blocks.svg";
import dashboardSVG from "src/assets/header/dashboard_black.svg";
import validatorsSVG from "src/assets/header/validators.svg";
import transactionsSVG from "src/assets/header/transactions.svg";
import proposalsSVG from "src/assets/header/proposals.svg";
import data_sourcesSVG from "src/assets/header/data_sources.svg";
import oracle_scriptsSVG from "src/assets/header/oracle_scripts.svg";
import requestsSVG from "src/assets/header/requests.svg";
import test_caseSVG from "src/assets/header/test_case.svg";
import "./Tabs.css";

const cx = cn.bind(styles);

const Tabs = memo(() => {
	const {pathname} = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();

	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const renderValidatorComponent = ({name, img, index}) => (
		<button
			className={cx("tab", {"active-dropdown": pathname === "/accounts" || pathname === "/validators"})}
			ref={anchorRef}
			onClick={() => {
				handleOpen();
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
				open={open}
				anchorEl={anchorRef.current}
				transition>
				{({TransitionProps, placement}) => (
					<Grow {...TransitionProps}>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList autoFocusItem={open}>
									<MenuItem
										onClick={e => {
											handleClose();
											history.push("/validators");
											dispatch(closePageBar());
											e.stopPropagation();
										}}>
										Validators
									</MenuItem>
									<MenuItem
										onClick={e => {
											handleClose();
											history.push("/accounts");
											dispatch(closePageBar());
											e.stopPropagation();
										}}>
										Account
									</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
			<img src={img} alt='' className={cx("tab-icon")} />
			<span className={cx("tab-title")}>{name}</span>
			<ExpandMore className={cx("tab-icon-expand")} />
		</button>
	);

	const renderTransactionComponent = ({name, img, route, index}) => {
		const menu = (
			<Menu>
				<Menu.Item
					className={cx("tab-tx-item")}
					onClick={e => {
						e.domEvent.stopPropagation();
						history.push(`${route}?type=pending`);
						dispatch(closePageBar());
					}}>
					Pending transaction
				</Menu.Item>
			</Menu>
		);

		return (
			<div
				className={cx("tab", {active: route === "/" ? pathname === "/" : pathname.indexOf(route) > -1})}
				onClick={() => {
					history.push(route);
					dispatch(closePageBar());
				}}
				key={index}>
				<img src={img} alt='' className={cx("tab-icon")} />
				<span className={cx("tab-title")}>{name}</span>
				<Dropdown overlay={menu} className={cx("dropdown-tx")} placement='bottomRight'>
					<DownOutlined />
				</Dropdown>
			</div>
		);
	};

	const tabs = [
		{
			name: "Dashboard",
			img: dashboardSVG,
			route: "/",
		},
		{
			name: "Validators",
			img: validatorsSVG,
			route: "/validators",
			render: renderValidatorComponent,
		},
		{
			name: "Blocks",
			img: blocksSVG,
			route: "/blocks",
		},
		{
			name: "Transactions",
			img: transactionsSVG,
			route: "/txs",
			render: renderTransactionComponent,
		},
		{
			name: "Proposals",
			img: proposalsSVG,
			route: "/proposals",
		},
		{
			name: "Data Sources",
			img: data_sourcesSVG,
			route: "/data-sources",
		},
		{
			name: "Test Cases",
			img: test_caseSVG,
			route: "/test-cases",
		},
		{
			name: "Oracle Scripts",
			img: oracle_scriptsSVG,
			route: "/oracle-scripts",
		},
		{
			name: "Requests",
			img: requestsSVG,
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
									<img src={img} alt='' className={cx("tab-icon")} />
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
