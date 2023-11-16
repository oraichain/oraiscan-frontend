import React, { memo, useEffect, useState } from "react";
import { useGet } from "restful-react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import TopHoldersTable from "./TopHoldersTable";
import TopHoldersTableSkeleton from "./TopHoldersTable/TopHoldersTableSkeleton";
import TopHoldersCardSkeleton from "./TopHoldersCard/TopHoldersCardSkeleton";
import { getListTopHoldersToken } from "src/lib/api";
import TopHoldersCard from "./TopHoldersCard";
import styles from "./TopHoldersToken.module.scss";

const itemPerPage = 10;

const cx = classNames.bind(styles);

const TopHoldersToken = memo(({ address = "" }) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [currentPage, setPage] = useState(1);
	const [dataTopHolders, setDataTopHolders] = useState({
		data: [],
		tokenInfo: {},
		total_page: 10,
	});
	const { data, page, tokenInfo } = dataTopHolders;
	const [path] = useState(() => {
		return getListTopHoldersToken(address, page);
	});

	const { data: dataRes } = useGet({
		path,
	});

	useEffect(() => {
		if (dataRes) {
			const topHodlers = dataRes?.topHolders?.holders ?? [];
			const offset = itemPerPage * currentPage - itemPerPage;

			console.log("offset", offset, itemPerPage * currentPage);

			const slicedArray = topHodlers.slice(offset, itemPerPage * currentPage);

			setDataTopHolders({
				...dataTopHolders,
				data: slicedArray,
				tokenInfo: dataRes?.info,
			});
		}
	}, [dataRes, currentPage]);

	const totalPages = page?.total_page ?? 10;

	const onPageChange = newPage => {
		setPage(newPage);
	};

	const tableSekeleton = () => {
		return isLargeScreen ? <TopHoldersTableSkeleton /> : <TopHoldersCardSkeleton />;
	};

	return (
		<div className={cx("TopHolders20")}>
			{!dataRes ? (
				tableSekeleton()
			) : Array.isArray(data) && data.length > 0 ? (
				<>
					{isLargeScreen ? (
						<TopHoldersTable tokenInfo={tokenInfo} data={data} address={address} />
					) : (
						<TopHoldersCard tokenInfo={tokenInfo} data={data} address={address} />
					)}
					<Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(page)} />
				</>
			) : (
				<NoResult />
			)}
		</div>
	);
});

export default TopHoldersToken;
