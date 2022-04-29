import React, {memo, useState} from "react";
import {useGet} from "restful-react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import TransactionTable from "src/components/TxList/TransactionTable";
import TransactionTableSkeleton from "src/components/TxList/TransactionTable/TransactionTableSkeleton";
// import TransactionCardList from "src/components/TxList/TransactionCardList";
import TransactionCardListSkeleton from "src/components/TxList/TransactionCardList/TransactionCardListSkeleton";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import CwTable from "./CwTable";
// import CwTableSkeleton from "./CwSkeleton/CwTableSkeleton";
import styles from "./CwToken.scss";
import CwTableSkeleton from "./CwTable/CwTableSkeleton";
import CwCardSkeleton from "./CwCard/CwCardSkeleton";

const cx = classNames.bind(styles);
const data = [
	{
		tx_hash: "EFDA958CC02021CF5F5A0B6E145BC157D4C0C5877D70F5C71B39DF0279451302",
		age: "2022-04-27T08:05:14Z",
		from: "orai18hr8jggl3xnrutfujy2jwpeu0l76azprlvgrwt",
		to: "orai18hr8jggl3xnrutfujy2jwpeu0l76azprlvgrwt",
		status: true,
		amount: "200",
		token: "Orai",
	},
	{
		tx_hash: "C142623DAFF934C8E57921CA729E1D728224D735647C9177A08581696F0258B6",
		age: "2022-04-27T08:05:14Z",
		from: "orai18hr8jggl3xnrutfujy2jwpeu0l76azprlvgrwt",
		to: "orai18hr8jggl3xnrutfujy2jwpeu0l76azprlvgrwt",
		status: false,
		amount: "299",
		token: "Mina",
	},
	{
		tx_hash: "C142623DAFF934C8E57921CA729E1D728224D735647C9177A08581696F0258B6",
		age: "2022-04-27T08:05:14Z",
		from: "orai18hr8jggl3xnrutfujy2jwpeu0l76azprlvgrwt",
		to: "orai18hr8jggl3xnrutfujy2jwpeu0l76azprlvgrwt",
		status: true,
		amount: "289",
		token: "ETH",
	},
	{
		tx_hash: "C142623DAFF934C8E57921CA729E1D728224D735647C9177A08581696F0258B6",
		age: "2022-04-27T08:05:14Z",
		from: "orai18hr8jggl3xnrutfujy2jwpeu0l76azprlvgrwt",
		to: "orai18hr8jggl3xnrutfujy2jwpeu0l76azprlvgrwt",
		status: false,
		amount: "123",
		token: "Bitcoin",
	},
];

// const data = ""

const CwToken = memo(({account = "", royalty = false, minHeight = 222}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	// let basePath = `${consts.API.TXS_ACCOUNT}/${account}?limit=${consts.REQUEST.LIMIT}`;
	// if (royalty) {
	// 	basePath = `${consts.API.TXS_ROYALTY}/${account}?limit=${consts.REQUEST.LIMIT}`;
	// }

	// const [path, setPath] = useState(`${basePath}&page_id=1`);
	// const {data} = useGet({
	// 	path: path,
	// });

	if (!data || typeof data === "string") {
		return isLargeScreen ? <CwTableSkeleton /> : <CwCardSkeleton />;
	}

	// const totalPages = data?.page?.total_page ?? 0;
	// const currentPage = data?.page?.page_id ?? 1;

	// const onPageChange = page => {
	// 	setPath(`${basePath}&page_id=${page}`);
	// };

	return (
		<div className={cx("cw20")}>
			{Array.isArray(data) && data.length > 0 ? (
				<>
					{isLargeScreen ? (
						<CwTable data={data} account={account}/>
					) : (
						// <TransactionCardList data={data} account={account} royalty={royalty} />
						<CwTable data={data} account={account}/>
					)}
					{/* {totalPages > 0 && <Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(page)} />} */}
				</>
			) : (
				<NoResult />
			)}
		</div>
	);
});

export default CwToken;
