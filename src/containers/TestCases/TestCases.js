import React, {useState, useRef} from "react";
import {useTheme} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
import cn from "classnames/bind";
import {useGet} from "restful-react";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import Pagination from "src/components/common/Pagination";
import SearchInput from "src/components/common/SearchInput";
import NoResult from "src/components/common/NoResult";
import TestCaseTable from "src/components/TestCases/TestCaseTable";
import TestCaseTableSkeleton from "src/components/TestCases/TestCaseTable/TestCaseTableSkeleton";
import TestCaseCardList from "src/components/TestCases/TestCaseCardList";
import TestCaseCardListSkeleton from "src/components/TestCases/TestCaseCardList/TestCaseCardListSkeleton";
import styles from "./TestCases.module.scss";

const cx = cn.bind(styles);

const TestCases = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [keyword, setKeyword] = useState(null);
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const basePath = `${consts.API.TEST_CASES}?limit=${consts.REQUEST.LIMIT}`;
	let path;
	if (keyword) {
		path = `${basePath}&page_id=${pageId}&tc_name=${keyword}`;
	} else {
		path = `${basePath}&page_id=${pageId}`;
	}

	const {data, loading, error} = useGet({
		path: path,
	});

	let titleSection;
	let filterSection;
	let tableSection;
	let paginationSection;

	if (isLargeScreen) {
		titleSection = (
			<Container fixed>
				<TitleWrapper>
					<PageTitle title={"Test Cases"} />
					<StatusBox />
				</TitleWrapper>
			</Container>
		);
	} else {
		titleSection = <TogglePageBar type='test-cases' />;
	}

	if (loading) {
		tableSection = isLargeScreen ? <TestCaseTableSkeleton /> : <TestCaseCardListSkeleton />;
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
				tableSection = isLargeScreen ? <TestCaseTable data={data?.data} /> : <TestCaseCardList data={data?.data} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}

	filterSection = (
		<div className={cx("filter-section")}>
			<SearchInput
				className={cx("search-input")}
				placeholder='Search test cases'
				value={keyword}
				onChange={e => {
					setKeyword(e.target.value);
				}}
			/>
		</div>
	);

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<>
			{titleSection}
			<Container fixed className={cx("test-cases")}>
				{filterSection}
				{tableSection}
				{paginationSection}
			</Container>
		</>
	);
};

TestCases.propTypes = {};
TestCases.defaultProps = {};

export default TestCases;
