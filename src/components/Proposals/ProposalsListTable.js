import React, {memo, useState} from "react";
import {useHistory} from "react-router-dom";
import classNames from "classnames/bind";
import Highlight from "react-highlight";
import {tableThemes} from "src/constants/tableThemes";
import TableWithPagination from "src/components/common/TableWithPagination";
import styles from "./ProposalsListTable.scss";

const cx = classNames.bind(styles);
const headerCells = ["#ID", "Title", "Status", "Voting Start", "Submit Time", "Total Deposit"];
const headerCellStyles = [
	{width: "70px"},
	{width: "428px"},
	{width: "119px"},
	{width: "214px", textAlign: "right"},
	{width: "197px", textAlign: "right"},
	{width: "150px"},
];

const SuccessIcon = () => {
	return (
		<svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M5.73959 9.96338C5.66298 9.96346 5.5871 9.94841 5.51632 9.91908C5.44555 9.88974 5.38127 9.84671 5.32717 9.79246L3.08727 7.55257C3.0326 7.49852 2.98915 7.4342 2.95943 7.36331C2.9297 7.29241 2.91429 7.21633 2.91406 7.13946C2.91384 7.06258 2.92882 6.98642 2.95814 6.91536C2.98745 6.84429 3.03053 6.77972 3.08489 6.72536C3.13925 6.671 3.20381 6.62792 3.27488 6.5986C3.34594 6.56928 3.4221 6.5543 3.49898 6.55451C3.57586 6.55473 3.65193 6.57014 3.72283 6.59986C3.79373 6.62959 3.85805 6.67303 3.9121 6.7277L5.73959 8.55516L10.0873 4.20752C10.1967 4.09851 10.345 4.03738 10.4995 4.03754C10.6539 4.03771 10.8021 4.09915 10.9113 4.2084C11.0205 4.31764 11.082 4.46575 11.0821 4.62024C11.0823 4.77472 11.0211 4.92296 10.9121 5.03241L6.15201 9.79251C6.09791 9.84675 6.03363 9.88977 5.96285 9.9191C5.89208 9.94842 5.8162 9.96347 5.73959 9.96338Z'
				fill='#12C90E'
			/>
		</svg>
	);
};

const RejectIcon = () => {
	return (
		<svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M7.99793 7L10.7912 4.20674C10.9238 4.0744 10.9983 3.89483 10.9985 3.70751C10.9987 3.5202 10.9244 3.34049 10.7921 3.20793C10.6597 3.07536 10.4802 3.00079 10.2929 3.00062C10.1055 3.00046 9.92583 3.07471 9.79326 3.20704L7 6.00031L4.20674 3.20704C4.07417 3.07448 3.89437 3 3.70689 3C3.51941 3 3.33961 3.07448 3.20704 3.20704C3.07448 3.33961 3 3.51941 3 3.70689C3 3.89437 3.07448 4.07417 3.20704 4.20674L6.00031 7L3.20704 9.79326C3.07448 9.92583 3 10.1056 3 10.2931C3 10.4806 3.07448 10.6604 3.20704 10.793C3.33961 10.9255 3.51941 11 3.70689 11C3.89437 11 4.07417 10.9255 4.20674 10.793L7 7.99969L9.79326 10.793C9.92583 10.9255 10.1056 11 10.2931 11C10.4806 11 10.6604 10.9255 10.793 10.793C10.9255 10.6604 11 10.4806 11 10.2931C11 10.1056 10.9255 9.92583 10.793 9.79326L7.99793 7Z'
				fill='#F3574F'
			/>
		</svg>
	);
};

const ProposalsListTable = memo(({dataSources, pages, onPageChange}) => {
	const history = useHistory();
	const [isShowGetCode, setToggleShowGetCode] = useState(false);

	const dataRows = dataSources.map(({id, title, status, vote, submit, total}) => {
		const [isFull, setFull] = useState(false);
		const [percent, setPercent] = useState(70);
		const [isSuccess, setSuccess] = useState(false);

		const idCell = <div className={cx("id-cell")}>{id}</div>;
		const titleCell = <div className={cx("title-cell")}>{title}</div>;
		const statusCell = (
			<div className={cx("status-cell")}>
				{false ? (
					<button className={cx("status-cell--success")}>
						<SuccessIcon />
						<span>Passed</span>
					</button>
				) : (
					<button className={cx("status-cell--reject")}>
						<RejectIcon />
						<span>Rejected</span>
					</button>
				)}
			</div>
		);
		const voteCell = <div className={cx("vote-cell")}>{vote}</div>;
		const submitCell = <div className={cx("submit-cell")}>{submit}</div>;
		const totalCell = (
			<div className={cx("total-cell")}>
				<span className={cx("total-cell--id")}>514.00 </span>
				<span className={cx("total-cell--content")}>ORAI</span>
			</div>
		);

		return [idCell, titleCell, statusCell, voteCell, submitCell, totalCell];
	});

	return (
		<div className={cx("container")}>
			<TableWithPagination
				theme={tableThemes.LIGHT}
				headerCells={headerCells}
				dataRows={dataRows}
				pages={pages}
				onPageChange={onPageChange}
				isActiveSearch={false}
				headerCellStyles={headerCellStyles}
			/>
		</div>
	);
});

ProposalsListTable.defaultProps = {
	dataSources: [
		{
			id: "xxx",
			title: "xxx",
			status: "xxx",
			vote: "xxx",
			submit: "xxx",
			total: "xxx",
		},
		{
			id: "xxx",
			title: "xxx",
			status: "xxx",
			vote: "xxx",
			submit: "xxx",
			total: "xxx",
		},
		{
			id: "xxx",
			title: "xxx",
			status: "xxx",
			vote: "xxx",
			submit: "xxx",
			total: "xxx",
		},
		{
			id: "xxx",
			title: "xxx",
			status: "xxx",
			vote: "xxx",
			submit: "xxx",
			total: "xxx",
		},
		{
			id: "xxx",
			title: "xxx",
			status: "xxx",
			vote: "xxx",
			submit: "xxx",
			total: "xxx",
		},
		{
			id: "xxx",
			title: "xxx",
			status: "xxx",
			vote: "xxx",
			submit: "xxx",
			total: "xxx",
		},
		{
			id: "xxx",
			title: "xxx",
			status: "xxx",
			vote: "xxx",
			submit: "xxx",
			total: "xxx",
		},
		{
			id: "xxx",
			title: "xxx",
			status: "xxx",
			vote: "xxx",
			submit: "xxx",
			total: "xxx",
		},
		{
			id: "xxx",
			title: "xxx",
			status: "xxx",
			vote: "xxx",
			submit: "xxx",
			total: "xxx",
		},
		{
			id: "xxx",
			title: "xxx",
			status: "xxx",
			vote: "xxx",
			submit: "xxx",
			total: "xxx",
		},
	],
};

export default ProposalsListTable;
