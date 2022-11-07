// @ts-nocheck
import React from "react";
import classNames from "classnames/bind";

import LeftArrowIcon from "src/icons/LeftArrowIcon";
import {NavLink} from "react-router-dom";
import styles from "./NavigateBackBar.module.scss";

const cx = classNames.bind(styles);

const NavigateBackBar = ({type, id = ""}) => {
	const renderIcon = () => {
		switch (type) {
			case "validators": {
				return (
					<NavLink className={cx("title")} to={"/validators"}>
						{" "}
						<LeftArrowIcon className={cx("title-icon")} /> Validator details
					</NavLink>
				);
			}
			case "blocks": {
				return (
					<NavLink className={cx("title")} to={"/blocks"}>
						{" "}
						<LeftArrowIcon className={cx("title-icon")} /> Block details
					</NavLink>
				);
			}
			case "transactions": {
				return (
					<NavLink className={cx("title")} to={"/txs"}>
						{" "}
						<LeftArrowIcon className={cx("title-icon")} /> Transaction details
					</NavLink>
				);
			}
			case "accounts": {
				return (
					<NavLink className={cx("title")} to={"/accounts"}>
						{" "}
						<LeftArrowIcon className={cx("title-icon")} /> Account details
					</NavLink>
				);
			}
			case "smart-contracts": {
				return (
					<NavLink className={cx("title")} to={"/smart-contracts"}>
						{" "}
						<LeftArrowIcon className={cx("title-icon")} /> Smart contract details
					</NavLink>
				);
			}
			case "proposals": {
				return (
					<NavLink className={cx("title")} to={"/proposals"}>
						{" "}
						<LeftArrowIcon className={cx("title-icon")} /> Proposal details
					</NavLink>
				);
			}
			case "data-sources": {
				return (
					<NavLink className={cx("title")} to={"/data-sources"}>
						{" "}
						<LeftArrowIcon className={cx("title-icon")} /> Data source details
					</NavLink>
				);
			}
			case "test-cases": {
				return (
					<NavLink className={cx("title")} to={"/test-cases"}>
						{" "}
						<LeftArrowIcon className={cx("title-icon")} /> Test case details
					</NavLink>
				);
			}
			case "oracle-scripts": {
				return (
					<NavLink className={cx("title")} to={"/oracle-scripts"}>
						{" "}
						<LeftArrowIcon className={cx("title-icon")} /> Oracle script details
					</NavLink>
				);
			}
			case "ai_requests": {
				return (
					<NavLink className={cx("title")} to={"/ai_requests"}>
						{" "}
						<LeftArrowIcon className={cx("title-icon")} /> Request details
					</NavLink>
				);
			}
			case "request_report": {
				return (
					<NavLink className={cx("title")} to={"/ai_requests/" + id}>
						{" "}
						<LeftArrowIcon className={cx("title-icon")} /> Report details
					</NavLink>
				);
			}
			default:
				return null;
		}
	};
	return <div className={cx("header-mobile")}>{renderIcon()}</div>;
};

export default NavigateBackBar;
