import Container from "@material-ui/core/Container";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import cn from "classnames/bind";
import { useRef, useState } from "react";
import { useGet } from "restful-react";
import NoResult from "src/components/common/NoResult";
import PageTitle from "src/components/common/PageTitle";
import Pagination from "src/components/common/Pagination";
import SearchInput from "src/components/common/SearchInput";
import StatusBox from "src/components/common/StatusBox";
import TitleWrapper from "src/components/common/TitleWrapper";
import TogglePageBar from "src/components/common/TogglePageBar";
import OracleScriptCardList from "src/components/OracleScripts/OracleScriptCardList";
import OracleScriptCardListSkeleton from "src/components/OracleScripts/OracleScriptCardList/OracleScriptCardListSkeleton";
import OracleScriptTable from "src/components/OracleScripts/OracleScriptTable";
import OracleScriptTableSkeleton from "src/components/OracleScripts/OracleScriptTable/OracleScriptTableSkeleton";
import TopOracleScriptCardList from "src/components/OracleScripts/TopOracleScriptCardList";
import TopOracleScriptCardListSkeleton from "src/components/OracleScripts/TopOracleScriptCardList/TopOracleScriptCardListSkeleton";
import consts from "src/constants/consts";
import styles from "./OracleScripts.module.scss";

const cx = cn.bind(styles);

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
		path = `${basePath}&page_id=${pageId}&os_name=${keyword}`;
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
			<Container fixed>
				<TitleWrapper>
					<PageTitle title={"Oracle Scripts"} />
					<StatusBox />
				</TitleWrapper>
			</Container>
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

	if (loading) {
		tableSection = isLargeScreen ? <OracleScriptTableSkeleton /> : <OracleScriptCardListSkeleton />;
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
				tableSection = isLargeScreen ? <OracleScriptTable data={data?.data} /> : <OracleScriptCardList data={data?.data} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<>
			{titleSection}
			<Container fixed className={cx("oracle-scripts")}>
				{topOracleScriptCardList}
				{filterSection}
				{tableSection}
				{paginationSection}
			</Container>
		</>
	);
};

OracleScripts.propTypes = {};
OracleScripts.defaultProps = {};

export default OracleScripts;
