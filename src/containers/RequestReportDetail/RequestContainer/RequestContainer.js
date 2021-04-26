import React, {memo, useState, useRef} from "react";
import {useGet} from "restful-react";
import classNames from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import consts from "src/constants/consts";
import RequestTable from "./RequestTable/RequestTable";
import RequestTableSkeleton from "./RequestTable/RequestTableSkeleton";
import RequestCardList from "./RequestCardList/RequestCardList";
import RequestCardListSkeleton from "./RequestCardList/RequestCardListSkeleton";

import Pagination from "src/components/common/Pagination";
import EmptyTable from "src/components/common/EmptyTable";
import styles from "./RequestContainer.scss";

const cx = classNames.bind(styles);
const columns = [
	{title: "Name", align: "left"},
	{title: "Blockhash", align: "left"},
	{title: "Txs", align: "center"},
];

const RequestContainer = memo(({id, address}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const path = `${consts.API.REQUESTS_REPORTS}/detail/ds_results/${id}?validator_address=${address}&imit=4&page_id${pageId}`;
	const {data, loading, error} = useGet({
		path: path,
	});

	let tableSection;
	let paginationSection;

	if (loading) {
		tableSection = isLargeScreen ? <RequestTableSkeleton /> : <RequestCardListSkeleton />;
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

			if (Array.isArray(data?.data) && data.data.length > 0) {
				tableSection = isLargeScreen ? <RequestTable data={data.data} /> : <RequestCardList data={data.data} />;
			} else {
				tableSection = <EmptyTable columns={columns} />;
			}
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<div className={cx("request-card")}>
			<div className={cx("request-card-header")}>Request </div>
			<div className={cx("request-card-body")}>
				{tableSection}
				{paginationSection}
			</div>
		</div>
	);
});

export default RequestContainer;
