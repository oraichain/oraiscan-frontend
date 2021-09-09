import React, {memo, useState, useRef} from "react";
import {useGet} from "restful-react";
import {isNil} from "lodash-es";
import classNames from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import consts from "src/constants/consts";
import DSResultTable from "./DSResultTable/DSResultTable";
import DSResultTableSkeleton from "./DSResultTable/DSResultTableSkeleton";
import DSResultCardList from "./DSResultCardList/RequestCardList";
import DSResultCardListSkeleton from "./DSResultCardList/RequestCardListSkeleton";

import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import styles from "./DataSourceResults.module.scss";

const cx = classNames.bind(styles);

const DataSourceResults = memo(({contract, id, address}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const limit = 5;
	const path = `${consts.API.ORACLE_REPORT}/ds_results/${address}?request_id=${id}&contract=${contract}&limit=${limit}&page_id${pageId}`;
	const {data, loading, error} = useGet({
		path: path,
	});

	let tableSection;
	let paginationSection;

	if (loading) {
		tableSection = isLargeScreen ? <DSResultTableSkeleton /> : <DSResultCardListSkeleton />;
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
				tableSection = isLargeScreen ? <DSResultTable data={data.data} /> : <DSResultCardList data={data.data} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<div className={cx("request-card")}>
			<div className={cx("request-card-header")}> Data Source Results </div>
			<div className={cx("request-card-body")}>
				{tableSection}
				{paginationSection}
			</div>
		</div>
	);
});

export default DataSourceResults;
