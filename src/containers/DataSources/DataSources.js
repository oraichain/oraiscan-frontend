import React, {useState, useRef, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import {useGet} from "restful-react";
import consts from "src/constants/consts";
import {replaceQueryString} from "src/helpers/helper";
import {_} from "src/lib/scripts";
import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import Pagination from "src/components/common/Pagination";
import SearchInput from "src/components/common/SearchInput";
import DataSourceTable from "src/components/DataSources/DataSourceTable";
import DataSourceTableSkeleton from "src/components/DataSources/DataSourceTable/DataSourceTableSkeleton";
import DataSourceCardList from "src/components/DataSources/DataSourceCardList";
import DataSourceCardListSkeleton from "src/components/DataSources/DataSourceCardList/DataSourceCardListSkeleton";
import ComingSoon from "src/components/common/ComingSoon";
import styles from "./DataSources.scss";

const cx = cn.bind(styles);

const DataSources = props => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const history = useHistory();
	const [keyword, setKeyword] = useState("");

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

	const basePath = `${consts.LCD_API_BASE}${consts.LCD_API.DATA_SOURCES}?limit=${consts.TABLE.PAGE_SIZE}`;
	let path = basePath;
	if (total !== -1 && isPageValid) {
		path = basePath + "&page=" + page;
	}

	path = replaceQueryString(path, "name", keyword);

	const cleanUp = () => {
		if (timerID) {
			clearTimeout(timerID);
			setLoadCompleted(false);
		}
	};

	const {data, loading, refetch} = useGet({
		path: path,
		resolve: data => {
			if (showLoading) {
				setShowLoading(false);
			}
			setLoadCompleted(true);
			return data;
		},
	});

	useEffect(() => {
		if (loadCompleted) {
			timerID = setTimeout(() => {
				refetch();
				setLoadCompleted(false);
			}, consts.REQUEST.TIMEOUT);
			return () => {
				cleanUp();
			};
		}
	}, [loadCompleted]);

	useEffect(() => {
		if (!isPageValid) {
			redirectToFirstPage(props.location.pathname);
		}
	}, [total]);

	let titleSection;
	let filterSection;
	let tableSection;
	let paginationSection;

	titleSection = isLargeScreen ? (
		<Container fixed>
			<TitleWrapper>
				<PageTitle title={"Data Sources"} />
				<StatusBox />
			</TitleWrapper>
		</Container>
	) : (
		<TogglePageBar type='data-sources' />
	);

	if (!data || (loading && showLoading)) {
		filterSection = (
			<div className={cx("filter-section")}>
				<SearchInput value={keyword} rootClassName={cx("search-data-sources")} placeholder='Search data sources' onChange={e => {}} />
				<div className={cx("filter-section-overlay")}></div>
			</div>
		);
		tableSection = isLargeScreen ? <DataSourceTableSkeleton /> : <DataSourceCardListSkeleton />;
	} else {
		filterSection = (
			<div className={cx("filter-section")}>
				<SearchInput
					value={keyword}
					placeholder='Search data sources'
					rootClassName={cx("search-data-sources")}
					onChange={e => {
						cleanUp();
						setKeyword(e.target.value);
					}}
				/>
			</div>
		);
		tableSection = isLargeScreen ? (
			<DataSourceTable data={data?.result?.data_sources != null ? data.result.data_sources : []} />
		) : (
			<DataSourceCardList data={data?.result?.data_sources != null ? data.result.data_sources : []} />
		);
	}

	const onPageChange = page => {
		cleanUp();
		setShowLoading(true);
		history.push(getPaginationPath(props.location.pathname, page));
	};
	const totalItems = _.isNil(data?.result?.count) ? 0 : Math.ceil(parseInt(data.result.count));
	const totalPages = Math.ceil(totalItems / consts.REQUEST.LIMIT);
	if (total !== totalItems) {
		setTotal(totalItems);
	}
	paginationSection = totalPages > 0 && <Pagination pages={totalPages} page={page} onChange={(e, page) => onPageChange(page)} />;

	return (
		<>
			{titleSection}
			<Container fixed className={cx("data-sources")}>
				<ComingSoon />
				{/* {filterSection}
			{tableSection}
			{paginationSection} */}
			</Container>
		</>
	);
};

export default DataSources;
