import React, { useState } from "react";
import cn from "classnames/bind";
import styles from "./Tab.scss";

import blocksSVG from "src/assets/header/blocks.svg";
import dashboardSVG from "src/assets/header/dashboard.svg";
import validatorsSVG from "src/assets/header/validators.svg";
import transactionsSVG from "src/assets/header/transactions.svg";
import proposalsSVG from "src/assets/header/proposals.svg";
import data_sourcesSVG from "src/assets/header/data_sources.svg";
import oracle_scriptsSVG from "src/assets/header/oracle_scripts.svg";
import requestsSVG from "src/assets/header/requests.svg";
import testcase from "src/assets/header/test_case.svg";
import { Link } from "react-router-dom";

const cx = cn.bind(styles);

export default function (props) {
	const [dashboardActive, setDBActive] = useState(false);
	const [validatorActive, setValidatorActive] = useState(false);
	const [blockActive, setBlockActive] = useState(false);
	const [transactionActive, setTransactionActive] = useState(false);
	const [proposalActive, setProposalActive] = useState(false);
	const [dataActive, setDataActive] = useState(false);
	const [oracleActive, setOracleActive] = useState(false);
	const [requestActive, setRequestActive] = useState(false);
	const [testCaseActive, setTestCaseActive] = useState(false);

	return (
		<div className={cx("Tabs")}>
			<div
				className={cx("Tab", dashboardActive ? "active" : "")}
				onClick={() => {
					setDBActive(true);
					setValidatorActive(false);
					setBlockActive(false);
					setTransactionActive(false);
					setProposalActive(false);
					setDataActive(false);
					setOracleActive(false);
					setRequestActive(false);
					setTestCaseActive(false);
				}}
			>
				<img src={dashboardSVG} alt='DB' />
				<Link to='/'><span className={cx("title")}>Dashboard</span></Link>
			</div>
			<div
				className={cx("Tab", validatorActive ? "active" : "")}
				onClick={() => {
					setDBActive(false);
					setValidatorActive(true);
					setBlockActive(false);
					setTransactionActive(false);
					setProposalActive(false);
					setDataActive(false);
					setOracleActive(false);
					setRequestActive(false);
					setTestCaseActive(false);
				}}
			>
				<img src={validatorsSVG} alt='VL' />
				<Link to="/validators"><span className={cx("title")}>Validators</span></Link>
			</div>
			<div
				className={cx("Tab", blockActive ? "active" : "")}
				onClick={() => {
					setDBActive(false);
					setValidatorActive(false);
					setBlockActive(true);
					setTransactionActive(false);
					setProposalActive(false);
					setDataActive(false);
					setOracleActive(false);
					setRequestActive(false);
					setTestCaseActive(false);
				}}
			>
				<img src={blocksSVG} alt='BL' />
				<Link to='/blocks' ><span className={cx("title")}>Blocks</span></Link>
			</div>
			<div
				className={cx("Tab", transactionActive ? "active" : "")}
				onClick={() => {
					setDBActive(false);
					setValidatorActive(false);
					setBlockActive(false);
					setTransactionActive(true);
					setProposalActive(false);
					setDataActive(false);
					setOracleActive(false);
					setRequestActive(false);
					setTestCaseActive(false);
				}}
			>
				<img src={transactionsSVG} alt='TX' />
				<Link to='/txs' ><span className={cx("title")}>Transactions</span></Link>
			</div>
			<div
				className={cx("Tab", proposalActive ? "active" : "")}
				onClick={() => {
					setDBActive(false);
					setValidatorActive(false);
					setBlockActive(false);
					setTransactionActive(false);
					setProposalActive(true);
					setDataActive(false);
					setOracleActive(false);
					setRequestActive(false);
					setTestCaseActive(false);
				}}
			>
				<img src={proposalsSVG} alt='PR' />
				<span className={cx("title")}>Proposals</span>
			</div>
			<div
				className={cx("Tab", dataActive ? "active" : "")}
				onClick={() => {
					setDBActive(false);
					setValidatorActive(false);
					setBlockActive(false);
					setTransactionActive(false);
					setProposalActive(false);
					setDataActive(true);
					setOracleActive(false);
					setRequestActive(false);
					setTestCaseActive(false);
				}}
			>
				<img src={data_sourcesSVG} alt='DS' />

				<span className={cx("title")}>Data Sources</span>
			</div>
			<div
				className={cx("Tab", oracleActive ? "active" : "")}
				onClick={() => {
					setDBActive(false);
					setValidatorActive(false);
					setBlockActive(false);
					setTransactionActive(false);
					setProposalActive(false);
					setDataActive(false);
					setOracleActive(true);
					setRequestActive(false);
					setTestCaseActive(false);
				}}
			>
				<img src={oracle_scriptsSVG} alt='OS' />

				<span className={cx("title")}>Oracle Scripts</span>
			</div>
			<div
				className={cx("Tab", requestActive ? "active" : "")}
				onClick={() => {
					setDBActive(false);
					setValidatorActive(false);
					setBlockActive(false);
					setTransactionActive(false);
					setProposalActive(false);
					setDataActive(false);
					setOracleActive(false);
					setRequestActive(true);
					setTestCaseActive(false);
				}}
			>
				<img src={requestsSVG} alt='RQ' />
				<span className={cx("title")}>Requests</span>
			</div>
			<div
				className={cx("Tab", testCaseActive ? "active" : "")}
				onClick={() => {
					setDBActive(false);
					setValidatorActive(false);
					setBlockActive(false);
					setTransactionActive(false);
					setProposalActive(false);
					setDataActive(false);
					setOracleActive(false);
					setRequestActive(false);
					setTestCaseActive(true);
				}}
			>
				<img src={testcase} alt='RQ'/>
				<span className={cx("title")}>Test case</span>
			</div>
		</div>
	);
}
