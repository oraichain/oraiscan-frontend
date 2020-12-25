import React, {memo, useState} from "react";
import {useHistory} from "react-router-dom";
import classNames from "classnames/bind";
import Highlight from "react-highlight";
import {tableThemes} from "src/constants/tableThemes";
import TableWithPagination from "src/components/common/TableWithPagination";
import styles from "./ProposalsListDetalTable.scss";

const cx = classNames.bind(styles);
const headerCells = ["TxHash", "Type", "Result", "Amount", "Fee", "Height", "Time"];
const headerCellStyles = [
	{width: "242px"},
	{width: "227px"},
	{width: "142px", textAlign: "right"},
	{width: "142px", textAlign: "right"},
	{width: "142px", textAlign: "right"},
	{width: "100px", textAlign: "right"},
	{width: "140px", textAlign: "right"},
];

const SuccessIcon = () => {
	return (
		<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M15.5917 6.00822C15.5142 5.93011 15.4221 5.86811 15.3205 5.82581C15.219 5.7835 15.11 5.76172 15 5.76172C14.89 5.76172 14.7811 5.7835 14.6796 5.82581C14.578 5.86811 14.4858 5.93011 14.4084 6.00822L8.20004 12.2249L5.59171 9.60822C5.51127 9.53052 5.41632 9.46942 5.31227 9.42842C5.20823 9.38742 5.09713 9.36731 4.98531 9.36924C4.87349 9.37118 4.76315 9.39512 4.66058 9.4397C4.55802 9.48427 4.46524 9.54862 4.38754 9.62905C4.30984 9.70949 4.24875 9.80444 4.20774 9.90848C4.16674 10.0125 4.14663 10.1236 4.14856 10.2354C4.1505 10.3473 4.17444 10.4576 4.21902 10.5602C4.2636 10.6627 4.32794 10.7555 4.40837 10.8332L7.60837 14.0332C7.68584 14.1113 7.77801 14.1733 7.87956 14.2156C7.98111 14.2579 8.09003 14.2797 8.20004 14.2797C8.31005 14.2797 8.41897 14.2579 8.52052 14.2156C8.62207 14.1733 8.71424 14.1113 8.79171 14.0332L15.5917 7.23322C15.6763 7.15518 15.7438 7.06047 15.79 6.95506C15.8361 6.84964 15.86 6.7358 15.86 6.62072C15.86 6.50563 15.8361 6.3918 15.79 6.28638C15.7438 6.18096 15.6763 6.08625 15.5917 6.00822Z'
				fill='#3FCC28'
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

const MoreIcon = () => {
	return (
		<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M4.0625 5.625C3.81386 5.625 3.5754 5.72377 3.39959 5.89959C3.22377 6.0754 3.125 6.31386 3.125 6.5625V15.9375C3.125 16.1861 3.22377 16.4246 3.39959 16.6004C3.5754 16.7762 3.81386 16.875 4.0625 16.875H13.4375C13.5606 16.875 13.6825 16.8507 13.7963 16.8036C13.91 16.7565 14.0134 16.6875 14.1004 16.6004C14.1875 16.5134 14.2565 16.41 14.3036 16.2963C14.3507 16.1825 14.375 16.0606 14.375 15.9375V8.75C14.375 8.40482 14.6548 8.125 15 8.125C15.3452 8.125 15.625 8.40482 15.625 8.75V15.9375C15.625 16.2248 15.5684 16.5092 15.4585 16.7746C15.3486 17.04 15.1874 17.2812 14.9843 17.4843C14.7812 17.6874 14.54 17.8486 14.2746 17.9585C14.0092 18.0684 13.7248 18.125 13.4375 18.125H4.0625C3.48234 18.125 2.92594 17.8945 2.5157 17.4843C2.10547 17.0741 1.875 16.5177 1.875 15.9375V6.5625C1.875 5.98234 2.10547 5.42594 2.5157 5.0157C2.92594 4.60547 3.48234 4.375 4.0625 4.375H10.6047C10.9499 4.375 11.2297 4.65482 11.2297 5C11.2297 5.34518 10.9499 5.625 10.6047 5.625H4.0625Z'
				fill='#F8A80E'
			/>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M12.5 2.5C12.5 2.15482 12.7798 1.875 13.125 1.875H17.5C17.8452 1.875 18.125 2.15482 18.125 2.5V6.875C18.125 7.22018 17.8452 7.5 17.5 7.5C17.1548 7.5 16.875 7.22018 16.875 6.875V3.125H13.125C12.7798 3.125 12.5 2.84518 12.5 2.5Z'
				fill='#F8A80E'
			/>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M17.6294 2.37056C17.8735 2.61464 17.8735 3.01036 17.6294 3.25444L9.19194 11.6919C8.94786 11.936 8.55214 11.936 8.30806 11.6919C8.06398 11.4479 8.06398 11.0521 8.30806 10.8081L16.7456 2.37056C16.9896 2.12648 17.3854 2.12648 17.6294 2.37056Z'
				fill='#F8A80E'
			/>
		</svg>
	);
};

const ProposalsListDetalTable = memo(({dataSources, pages, onPageChange}) => {
	const history = useHistory();
	const [isShowGetCode, setToggleShowGetCode] = useState(false);

	const dataRows = dataSources.map(({txHash, type, result, amount, fee, height, time}) => {
		const getTxHashShort = code => {
			if (code.toString().length > 12) {
				const part1 = code.toString().slice(0, 6);
				const part2 = code.toString().slice(code.toString().length - 6, code.toString().length);
				return `${part1}...${part2}`;
			} else {
				return code;
			}
		};

		const txHashCell = <div className={cx("txHashCell")}>{getTxHashShort(txHash)}</div>;
		const typeCell1 = (
			<div className={cx("typeCell")}>
				<button>Send</button>
				<span>+1</span>
			</div>
		);
		const typeCell2 = (
			<div className={cx("typeCell")}>
				<button>Get Reward</button>
				<span>+1</span>
			</div>
		);

		const resultCellSuccess = (
			<div className={cx("resultCell")}>
				<SuccessIcon />
				<span>Success</span>
			</div>
		);

		const resultCellPending = (
			<div className={cx("resultCell")}>
				<SuccessIcon />
				<span>Success</span>
			</div>
		);

		const amountCell1 = <div className={cx("amountCell1")}>{amount}</div>;
		const amountCell2 = (
			<div className={cx("amountCell2")}>
				<span>More</span>
				<MoreIcon />
			</div>
		);

		const feeCell = <div className={cx("feeCell")}>xxxxxxxx</div>;

		const heightCell = <div className={cx("heightCell")}>xxxxxxxx</div>;

		const timeCell = <div className={cx("timeCell")}>xxxxxxxx</div>;

		return [txHashCell, false ? typeCell1 : typeCell2, resultCellSuccess, false ? amountCell1 : amountCell2, feeCell, heightCell, timeCell];
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

ProposalsListDetalTable.defaultProps = {
	dataSources: [
		{
			txHash: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
			type: "xxxx",
			result: "xxxx",
			amount: "xxxxx",
			fee: "xxx",
			height: "xxx",
			time: "xxxx",
		},
		{
			txHash: "xxxx",
			type: "xxxx",
			result: "xxxx",
			amount: "xxxxx",
			fee: "xxx",
			height: "xxx",
			time: "xxxx",
		},
		{
			txHash: "xxxx",
			type: "xxxx",
			result: "xxxx",
			amount: "xxxxx",
			fee: "xxx",
			height: "xxx",
			time: "xxxx",
		},
		{
			txHash: "xxxx",
			type: "xxxx",
			result: "xxxx",
			amount: "xxxxx",
			fee: "xxx",
			height: "xxx",
			time: "xxxx",
		},
		{
			txHash: "xxxx",
			type: "xxxx",
			result: "xxxx",
			amount: "xxxxx",
			fee: "xxx",
			height: "xxx",
			time: "xxxx",
		},
		{
			txHash: "xxxx",
			type: "xxxx",
			result: "xxxx",
			amount: "xxxxx",
			fee: "xxx",
			height: "xxx",
			time: "xxxx",
		},
		{
			txHash: "xxxx",
			type: "xxxx",
			result: "xxxx",
			amount: "xxxxx",
			fee: "xxx",
			height: "xxx",
			time: "xxxx",
		},
		{
			txHash: "xxxx",
			type: "xxxx",
			result: "xxxx",
			amount: "xxxxx",
			fee: "xxx",
			height: "xxx",
			time: "xxxx",
		},
		{
			txHash: "xxxx",
			type: "xxxx",
			result: "xxxx",
			amount: "xxxxx",
			fee: "xxx",
			height: "xxx",
			time: "xxxx",
		},
		{
			txHash: "xxxx",
			type: "xxxx",
			result: "xxxx",
			amount: "xxxxx",
			fee: "xxx",
			height: "xxx",
			time: "xxxx",
		},
		{
			txHash: "xxxx",
			type: "xxxx",
			result: "xxxx",
			amount: "xxxxx",
			fee: "xxx",
			height: "xxx",
			time: "xxxx",
		},
	],
};

export default ProposalsListDetalTable;
