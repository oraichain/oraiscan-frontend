import React, {memo, useState, useRef} from "react";
import {useGet} from "restful-react";
import {isNil} from "lodash-es";
import classNames from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import consts from "src/constants/consts";
import RequestTable from "./RequestTable/RequestTable";
import RequestTableSkeleton from "./RequestTable/RequestTableSkeleton";
import RequestCardList from "./RequestCardList/RequestCardList";
import RequestCardListSkeleton from "./RequestCardList/RequestCardListSkeleton";

import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import styles from "./RequestContainer.module.scss";

const cx = classNames.bind(styles);

const RequestContainer = memo(({data, loading, error, id, address}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const calculateTotalPage = data?.length / consts.REQUEST.LIMIT;
	const totalPages = calculateTotalPage !== parseInt(calculateTotalPage.toString()) ? parseInt(calculateTotalPage.toString()) + 1 : calculateTotalPage;
	const currentPageData = !isNil(data) && data?.filter?.((item, index) => index >= (pageId - 1) * consts.REQUEST.LIMIT);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	// const path = `${consts.API.REQUESTS_REPORTS}/detail/ds_results/${id}?validator_address=${address}&imit=4&page_id${pageId}`;
	// const {data, loading, error} = useGet({
	// 	path: path,
	// });

	let tableSection;
	let paginationSection;

	if (loading) {
		tableSection = isLargeScreen ? <RequestTableSkeleton /> : <RequestCardListSkeleton />;
	} else {
		if (error) {
			totalPagesRef.current = null;
			tableSection = <NoResult />;
		} else {
			if (Array.isArray(data) && data.length > 0) {
				tableSection = isLargeScreen ? <RequestTable data={currentPageData} /> : <RequestCardList data={currentPageData} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}

	paginationSection = totalPages ? <Pagination pages={totalPages} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<div className={cx("request-card")}>
			<div className={cx("request-card-header")}> AI Data Source Results </div>
			<div className={cx("request-card-body")}>
				{tableSection}
				{paginationSection}
			</div>
		</div>
	);
});

export default RequestContainer;
