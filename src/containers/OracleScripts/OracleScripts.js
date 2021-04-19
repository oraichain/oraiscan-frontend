import React, {useState, useRef} from "react";
import {useGet} from "restful-react";
import PropTypes from "prop-types";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import Skeleton from "@material-ui/lab/Skeleton";
import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import Pagination from "src/components/common/Pagination";
import SearchInput from "src/components/common/SearchInput";
import TopOracleScriptCardList from "src/components/OracleScripts/TopOracleScriptCardList";
import TopOracleScriptCardListSkeleton from "src/components/OracleScripts/TopOracleScriptCardList/TopOracleScriptCardListSkeleton";
import OracleScriptTable from "src/components/OracleScripts/OracleScriptTable";
import OracleScriptTableSkeleton from "src/components/OracleScripts/OracleScriptTable/OracleScriptTableSkeleton";
import OracleScriptCardList from "src/components/OracleScripts/OracleScriptCardList";
import OracleScriptCardListSkeleton from "src/components/OracleScripts/OracleScriptCardList/OracleScriptCardListSkeleton";
import styles from "./OracleScripts.module.scss";
import EmptyTable from "src/components/common/EmptyTable";

const cx = cn.bind(styles);
const columns = [
	{title: <div className={cx("table-header-cell")}>Oracle Script</div>, align: "left"},
	{title: <div className={cx("table-header-cell")}>Oracle Script</div>, align: "left"},
	{
		title: (
			<div className={cx("table-header-cell")}>
				Request <br /> &amp; Response time
			</div>
		),
		align: "right",
	},
	{title: "Owner", align: "right"},
];

const OracleScripts = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [keyword, setKeyword] = useState(null);
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const topPath = `${consts.API.ORACLE_SCRIPTS}?limit=4&page_id=1`;
	const {data: topData, loading: topLoading, error: topError} = useGet({
		path: topPath,
	});

	const basePath = `${consts.API.ORACLE_SCRIPTS}?limit=${consts.REQUEST.LIMIT}`;
	let path;
	if (keyword) {
		path = `${basePath}&page_id=${pageId}&keyword=${keyword}`;
	} else {
		path = `${basePath}&page_id=${pageId}`;
	}

	const {data, loading, error} = useGet({
		path: path,
	});

	const onPageChange = page => {
		setPageId(page);
	};

	let titleSection;
	let topOracleScriptCardList;
	let filterSection;
	let tableSection;
	let paginationSection;

	if (isLargeScreen) {
		titleSection = (
			<TitleWrapper>
				<PageTitle title={"Oracle Scripts"} />
				<StatusBox />
			</TitleWrapper>
		);
	} else {
		titleSection = <TogglePageBar type='oracle-scripts' />;
	}

	if (topLoading) {
		topOracleScriptCardList = <TopOracleScriptCardListSkeleton />;
	} else {
		if (topError) {
			topOracleScriptCardList = <TopOracleScriptCardList data={[]} />;
		} else {
			topOracleScriptCardList = <TopOracleScriptCardList data={topData.data} />;
		}
	}

	if (loading) {
		filterSection = (
			<div className={cx("filter-section")}>
				{isLargeScreen ? (
					<Skeleton className={cx("skeleton")} variant='rect' width={232} height={40} />
				) : (
					<Skeleton className={cx("skeleton", "skeleton-full-width")} variant='rect' height={40} />
				)}
			</div>
		);
		tableSection = isLargeScreen ? <OracleScriptTableSkeleton /> : <OracleScriptCardListSkeleton />;
	} else {
		if (error) {
			totalPagesRef.current = null;
			tableSection = <EmptyTable columns={columns} />;
		} else {
			if (!isNaN(data?.page?.total_page)) {
				totalPagesRef.current = data.page.total_page;
			} else {
				totalPagesRef.current = null;
			}

			filterSection = (
				<div className={cx("filter-section")}>
					<SearchInput
						value={keyword}
						placeholder='Search data sources'
						rootClassName={cx("search-input")}
						onChange={e => {
							setKeyword(e.target.value);
						}}
					/>
				</div>
			);

			if (Array.isArray(data?.data) && data.data.length > 0) {
				tableSection = isLargeScreen ? <OracleScriptTable data={data?.data} /> : <OracleScriptCardList data={data?.data} />;
			} else {
				tableSection = <EmptyTable columns={columns} />;
			}
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<Container fixed className={cx("oracle-scripts")}>
			{titleSection}
			{topOracleScriptCardList}
			{filterSection}
			{tableSection}
			{paginationSection}
		</Container>
	);
};

OracleScripts.propTypes = {};
OracleScripts.defaultProps = {};

export default OracleScripts;
