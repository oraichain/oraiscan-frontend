import React, { memo, useState, useRef } from "react";
import { useGet } from "restful-react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import NFTTable from "./NFTTable";
import NFTTableSkeleton from "./NFTTable/NFTTableSkeleton";
import NFTCardSkeleton from "./NFTCard/NFTCardSkeleton";
import { getListNFTToken } from "src/lib/api";
import NFTCard from "./NFTCard";
import styles from "./NFTToken.module.scss";
import consts from "src/constants/consts";

const cx = classNames.bind(styles);

const NFTToken = memo(({ address = "" }) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const limit = 10;
	const path = `${consts.API_BASE}${consts.API.NFT_TXS}/${address}?limit=${limit}&page_id=${pageId} `;
	const { data, loading, error } = useGet({
		path,
	});

	let tableSection;
	let paginationSection;

	if (loading) {
		tableSection = isLargeScreen ? <NFTTableSkeleton /> : <NFTCardSkeleton />;
	} else {
		if (error) {
			totalPagesRef.current = null;
			tableSection = <NoResult />;
		} else {
			if (!isNaN(data?.page?.total_page)) {
				totalPagesRef.current = data.page.total_page;
			} else {
				totalPagesRef.current = null;
			}

			if (Array.isArray(data?.data) && data.data.length > 0) {
				tableSection = isLargeScreen ? <NFTTable data={data.data} /> : <NFTCard data={data.data} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<div className={cx("nft")}>
			{tableSection}
			{paginationSection}
		</div>
	);
});

export default NFTToken;
