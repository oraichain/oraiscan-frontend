import React, { memo, useEffect, useState } from "react";
import { useGet } from "restful-react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import NFTTable from "./NFTTable";
import NFTTableSkeleton from "./NFTTable/NFTTableSkeleton";
import NFTCardSkeleton from "./NFTCard/NFTCardSkeleton";
import { getListNFTToken, getListOWContract } from "src/lib/api";
import NFTCard from "./NFTCard";
import styles from "./NFTToken.module.scss";
import { NavLink } from "react-router-dom";
import consts from "src/constants/consts";
import { typeExport } from "src/containers/Account/Account";

const cx = classNames.bind(styles);

const NFTToken = memo(({ account = "", address = "", isOw20 = false }) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [dataCw, setDataCw] = useState({
		data: [],
		page: {
			limit: 10,
			page_id: 1,
		},
	});
	const { data, page } = dataCw;
	const [path, setPath] = useState(() => {
		if (!isOw20) {
			return getListNFTToken(address, page);
		}
		return getListOWContract(address, page);
	});

	const { data: dataRes } = useGet({
		path,
	});

	useEffect(() => {
		if (dataRes) {
			setDataCw({
				...dataCw,
				data: dataRes?.data,
				page: {
					...dataCw.page,
					...dataRes?.page,
				},
			});
		}
	}, [dataRes]);

	const totalPages = page?.total_page ?? 0;
	const currentPage = page?.page_id ?? 1;

	const onPageChange = newPage => {
		const pageObj = {
			...page,
			page_id: newPage,
		};
		if (!isOw20) {
			return setPath(getListNFTToken(address, pageObj));
		}
		return setPath(getListOWContract(address, pageObj));
	};

	const tableSekeleton = () => {
		return isLargeScreen ? <NFTTableSkeleton /> : <NFTCardSkeleton />;
	};

	return (
		<div className={cx("cw20")}>
			{!dataRes ? (
				tableSekeleton()
			) : Array.isArray(data) && data.length > 0 ? (
				<>
					{isLargeScreen ? <NFTTable data={data} account={account} address={address} /> : <NFTCard data={data} account={account} address={address} />}
					{totalPages > 0 && <Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(page)} />}
				</>
			) : (
				<NoResult />
			)}
		</div>
	);
});

export default NFTToken;
