import React, { useState, useRef, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import { useGet } from "restful-react";
import consts from "src/constants/consts";
import { replaceQueryString } from "src/helpers/helper";
import { _ } from "src/lib/scripts";
import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import ChainBox from 'src/components/common/ChainBox';
import Pagination from "src/components/common/Pagination";
import SearchBox from "src/components/common/SearchBox";
import AssetsIbcTable from "src/components/Ibc/AssetsIbcTable/AssetsIbcTable";
import AssetsIbcTableSkeleton from "src/components/Ibc/AssetsIbcTable/AssetsIbcTableSkeleton";
import AssetsIbcCardList from "src/components/Ibc/AssetsIbcCardList/AssetsIbcCardList";
import AssetsIbcCardListSkeleton from "src/components/Ibc/AssetsIbcCardList/AssetsIbcCardListSkeleton";
import ComingSoon from "src/components/common/ComingSoon";
import FilterSection from "src/components/Ibc/FilterSection";
import styles from "./Ibc.scss";
const cx = cn.bind(styles);

const IbcAssets = props => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const history = useHistory();
	const [keyword, setKeyword] = useState("");
	const [chainValue, setChainValue] = useState(0);
	const [assetSearch, setAssetSearch] = useState(0);
	const [list, setList] = useState([]);
	const getPaginationPath = (pathname, page) => {
		return pathname + "?page=" + page;
	};
	const redirectToFirstPage = pathname => {
		history.push(getPaginationPath(pathname, 1));
	};

	const [total, setTotal] = useState(-1);
	const searchParams = new URLSearchParams(props.location.search);
	let page = parseFloat(searchParams.get("page"));
	let isPageValid = true;
	if (!Number.isInteger(page) || page < 1 || (total !== -1 && page > Math.ceil(total / consts.REQUEST.LIMIT))) {
		page = 1;
		isPageValid = false;
	}

	const [showLoading, setShowLoading] = useState(true);
	const [loadCompleted, setLoadCompleted] = useState(false);
	let timerID = useRef(null);

	const basePath = `${consts.API_BASE}${consts.API.IBC_TOKENS}`;
	const { data, loading, error } = useGet({
		path: basePath,
	});

	useEffect(() => {
		if (data?.length > 0) {
			let sumChainValue = data != null && data.reduce((acc, cur) => acc + cur?.prices?.TotalValue, 0);
			setChainValue(sumChainValue);
			setList(data);
		}
	}, [data])


	useEffect(() => {
		let listFilter = [];
		if (!keyword && !assetSearch) {
			listFilter = data;
		} else {
			if (keyword && !assetSearch) {
				listFilter = data && data.filter(ele => ele.symbol.indexOf(keyword) !== -1);
			} else if (!keyword && assetSearch) {
				assetSearch === 0 ? listFilter = data : listFilter = data && data.filter(ele => assetSearch === 1 ? !ele.channelId : ele.channelId);
			} else {
				listFilter = data && data.filter(ele => assetSearch === 1 ? !ele.channelId : ele.channelId && ele.symbol.indexOf(keyword) !== -1);
			}
		}
		setList(listFilter);
	}, [keyword, assetSearch])

	let titleSection;
	let filterSection;
	let tableSection;
	let paginationSection;

	titleSection = isLargeScreen ? (
		<Container fixed>
			<TitleWrapper>
				<PageTitle title={"Assets"} />
				{/* <StatusBox /> */}
				<ChainBox chainValue={chainValue} />
			</TitleWrapper>
		</Container>
	) : (
		<TogglePageBar type='data-sources' />
	);

	if (!data || !list || (loading && showLoading)) {
		filterSection = (
			<div className={cx("filter-section")}>
				<FilterSection assetSearch={assetSearch} setAssetSearch={setAssetSearch} />
				<div className={cx("filter-section-overlay")}></div>
			</div>
		);
		tableSection = isLargeScreen ? <AssetsIbcTableSkeleton /> : <AssetsIbcCardListSkeleton />;
	} else {
		filterSection = (
			<div className={cx("filter-section")}>
				<FilterSection keyword={keyword} setKeyword={setKeyword} assetSearch={assetSearch} setAssetSearch={setAssetSearch} onChange={(e) => {
					setKeyword(e.target.value);


				}} />
			</div>
		);
		tableSection = isLargeScreen ? (
			<AssetsIbcTable data={list != null ? list : []} />
		) : (
			<AssetsIbcCardList data={list != null ? list : []} />
		);
	}

	const onPageChange = page => {
		// cleanUp();
		setShowLoading(true);
		history.push(getPaginationPath(props.location.pathname, page));
	};
	const totalItems = _.isNil(data?.result?.count) ? 0 : Math.ceil(parseInt(data.result.count));
	const totalPages = Math.ceil(data?.length / consts.REQUEST.LIMIT);
	if (total !== totalItems) {
		setTotal(totalItems);
	}
	paginationSection = totalPages > 0 && <Pagination pages={totalPages} page={page} onChange={(e, page) => onPageChange(page)} />;

	return (
		<>
			{titleSection}
			<Container fixed className={cx("ibc-assets")}>
				{/* <ComingSoon /> */}
				{filterSection}
				{tableSection}
				{paginationSection}
			</Container>
		</>
	);
};

export default IbcAssets;
