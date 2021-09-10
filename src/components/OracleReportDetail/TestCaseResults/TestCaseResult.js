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
import TCResultTable from "./TCResultTable";
import TCResultTableSkeleton from "./TCResultTable/TCResultTableSkeleton";
import TCResultCardList from "./TCResultCardList";
import TCResultCardListSkeleton from "./TCResultCardList/TCResultCardListSkeleton";

import styles from "./TestCaseResult.module.scss";

const cx = classNames.bind(styles);

const TestCaseResults = memo(({contract, id, address, tcCheck}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const limit = 5;
	const pathTC = `${consts.API.ORACLE_REPORT}/tc_results/${address}?request_id=${id}&contract=${contract}&limit=${limit}&page_id${pageId}`;
	const pathDS = `${consts.API.ORACLE_REPORT}/ds_results/${address}?request_id=${id}&contract=${contract}&limit=${limit}&page_id${pageId}`;
	let path = tcCheck ? pathTC : pathDS;
	const {data, loading, error} = useGet({
		path: path,
	});

	let tableSection;
	let paginationSection;

	if (loading) {
		tableSection = isLargeScreen ? <TCResultTableSkeleton /> : <TCResultCardListSkeleton />;
	} else {
		if (error) {
			totalPagesRef.current = null;
			tableSection = <NoResult />;
		} else {
			if (!isNaN(data?.page?.total_page) && !isNaN(data?.page?.total_item)) {
				totalPagesRef.current = data.page.total_page;
			} else {
				totalPagesRef.current = null;
			}

			if (Array.isArray(data?.data) && data.data.length > 0) {
				tableSection = isLargeScreen ? <TCResultTable data={data.data} /> : <TCResultCardList data={data.data} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<div className={cx("test-case-card")}>
			{tcCheck ? (
				<div className={cx("test-case-card-header")}> Test Case Results </div>
			) : (
				<div className={cx("test-case-card-header")}> Data Source Results </div>
			)}
			<div className={cx("test-case-card-body")}>
				{tableSection}
				{paginationSection}
			</div>
		</div>
	);
});

TestCaseResults.propTypes = {
	id: PropTypes.any,
	address: PropTypes.string,
	contract: PropTypes.string,
	tcCheck: PropTypes.bool,
};
TestCaseResults.defaultProps = {};

export default TestCaseResults;
