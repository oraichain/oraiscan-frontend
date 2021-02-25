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
import ComingSoon from "src/components/common/ComingSoon";
import OracleScriptTable from "src/components/OracleScripts/OracleScriptTable";
import TopOracleScripts from "src/components/OracleScripts/TopOracleScripts";
import OracleScriptTableSkeleton from "src/components/OracleScripts/OracleScriptTable/OracleScriptTableSkeleton";
import OracleScriptCardList from "src/components/OracleScripts/OracleScriptCardList";
import OracleScriptCardListSkeleton from "src/components/OracleScripts/OracleScriptCardList/OracleScriptCardListSkeleton";
import styles from "./OracleScripts.scss";

const cx = cn.bind(styles);

const OracleScripts = props => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	// const history = useHistory();
	const [keyword, setKeyword] = useState("");

	// const getPaginationPath = (pathname, page) => {
	// 	return pathname + "?page=" + page;
	// };
	// const redirectToFirstPage = pathname => {
	// 	history.push(getPaginationPath(pathname, 1));
	// };

	// const [total, setTotal] = useState(-1);
	// const searchParams = new URLSearchParams(props.location.search);
	// let page = parseFloat(searchParams.get("page"));
	// let isPageValid = true;
	// if (!Number.isInteger(page) || page < 1 || (total !== -1 && page > Math.ceil(total / consts.REQUEST.LIMIT))) {
	// 	page = 1;
	// 	isPageValid = false;
	// }

	// const [showLoading, setShowLoading] = useState(true);
	// const [loadCompleted, setLoadCompleted] = useState(false);
	// let timerID = useRef(null);

	// const basePath = `${consts.LCD_API_BASE}${consts.LCD_API.ORACLE_SCRIPTS}`;
	// let path = basePath;
	// if (total !== -1 && isPageValid) {
	// 	path = basePath + "&page=" + page;
	// }

	// path = replaceQueryString(path, "name", keyword);

	// const cleanUp = () => {
	// 	if (timerID) {
	// 		clearTimeout(timerID);
	// 		setLoadCompleted(false);
	// 	}
	// };

	// const {data, loading, refetch} = useGet({
	// 	path: path,
	// 	resolve: data => {
	// 		if (showLoading) {
	// 			setShowLoading(false);
	// 		}
	// 		setLoadCompleted(true);
	// 		return data;
	// 	},
	// });

	// useEffect(() => {
	// 	if (loadCompleted) {
	// 		timerID = setTimeout(() => {
	// 			refetch();
	// 			setLoadCompleted(false);
	// 		}, consts.REQUEST.TIMEOUT);
	// 		return () => {
	// 			cleanUp();
	// 		};
	// 	}
	// }, [loadCompleted]);

	// useEffect(() => {
	// 	if (!isPageValid) {
	// 		redirectToFirstPage(props.location.pathname);
	// 	}
	// }, [total]);

	let titleSection;
	let topSection;
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

	// topSection = <TopOracleScripts />;

	// if (!data || (loading && showLoading)) {
	// filterSection = (
	// 	<div className={cx("filter-section")}>
	// 		<SearchInput value={keyword} rootClassName={cx("search-oracle-scripts")} placeholder='Search oracle scripts' onChange={() => {}} />
	// 		<div className={cx("filter-section-overlay")}></div>
	// 	</div>
	// );
	// tableSection = isLargeScreen ? <OracleScriptTable /> : <OracleScriptCardList />;
	// tableSection = isLargeScreen ? <OracleScriptTableSkeleton /> : <OracleScriptCardListSkeleton />;
	// } else {
	// 	filterSection = (
	// 		<div className={cx("filter-section")}>
	// 			<SearchInput
	// 				value={keyword}
	// 				placeholder='Search test cases'
	// 				rootClassName={cx("search-oracle-scripts")}
	// 				onChange={e => {
	// 					cleanUp();
	// 					setKeyword(e.target.value);
	// 				}}
	// 			/>
	// 		</div>
	// 	);
	// 	tableSection = isLargeScreen ? (
	// 		<OracleScriptTable data={data?.result?.test_cases != null ? data.result.test_cases : []} />
	// 	) : (
	// 		<OracleScriptCardList data={data?.result?.test_cases != null ? data.result.test_cases : []} />
	// 	);
	// }

	// const onPageChange = page => {
	// 	cleanUp();
	// 	setShowLoading(true);
	// 	history.push(getPaginationPath(props.location.pathname, page));
	// };
	// const totalItems = _.isNil(data?.result?.count) ? 0 : Math.ceil(parseInt(data.result.count));
	// const totalPages = Math.ceil(totalItems / consts.REQUEST.LIMIT);
	// if (total !== totalItems) {
	// 	setTotal(totalItems);
	// }
	// paginationSection = totalPages > 0 && <Pagination pages={totalPages} page={page} onChange={(e, page) => onPageChange(page)} />;
	// paginationSection = <Pagination pages={1} page={1} onChange={(e, page) => {}} />;

	return (
		<Container fixed className={cx("oracle-scripts")}>
			{titleSection}
			<ComingSoon />
			{/* {topSection} */}
			{/* {filterSection} */}
			{/* {tableSection} */}
			{/* {paginationSection} */}
		</Container>
	);
};

export default OracleScripts;
