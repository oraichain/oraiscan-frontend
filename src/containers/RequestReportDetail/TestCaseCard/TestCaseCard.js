import React, {memo, useState, useRef} from "react";
import {useGet} from "restful-react";
import PropTypes from "prop-types";
import {isNil} from "lodash";
import classNames from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import consts from "src/constants/consts";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import TestCaseTable from "src/containers/RequestReportDetail/TestCaseCard/TestCaseTable";
import TestCaseTableSkeleton from "src/containers/RequestReportDetail/TestCaseCard/TestCaseTable/TestCaseTableSkeleton";
import TestCaseCardList from "src/containers/RequestReportDetail/TestCaseCard/TestCaseCardList";
import TestCaseCardListSkeleton from "src/containers/RequestReportDetail/TestCaseCard/TestCaseCardList/TestCaseCardListSkeleton";

import styles from "./TestCaseCard.module.scss";

const cx = classNames.bind(styles);

const TestCaseCard = memo(({data, loading, error, id, address}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const calculateTotalPage = data?.length / consts.REQUEST.LIMIT;
	const totalPages = calculateTotalPage !== parseInt(calculateTotalPage.toString()) ? parseInt(calculateTotalPage.toString()) + 1 : calculateTotalPage;
	const currentPageData = !isNil(data?.DataSourceResults) && data?.DataSourceResults?.filter?.((item, index) => index >= (pageId - 1) * consts.REQUEST.LIMIT);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	// const path = `${consts.API.REQUESTS_REPORTS_TEST_CASE_RESULTS}/${id}?validator_address=${address}&limit=${consts.REQUEST.LIMIT}&page_id=${pageId}`;
	// const {data, loading, error} = useGet({
	// 	path: path,
	// });

	let tableSection;
	let paginationSection;

	if (loading) {
		tableSection = isLargeScreen ? <TestCaseTableSkeleton /> : <TestCaseCardListSkeleton />;
	} else {
		if (error) {
			tableSection = <NoResult />;
		} else {
			if (Array.isArray(currentPageData) && currentPageData?.length > 0) {
				tableSection = isLargeScreen ? <TestCaseTable data={currentPageData} /> : <TestCaseCardList data={currentPageData} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}

	paginationSection = totalPages ? <Pagination pages={totalPages} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<div className={cx("test-case-card")}>
			<div className={cx("test-case-card-header")}> Test Case Results </div>
			<div className={cx("test-case-card-body")}>
				{tableSection}
				{paginationSection}
			</div>
		</div>
	);
});

TestCaseCard.propTypes = {
	id: PropTypes.string,
	address: PropTypes.string,
};
TestCaseCard.defaultProps = {};

export default TestCaseCard;
