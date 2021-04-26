import React, {useState, useRef} from "react";
import PropTypes from "prop-types";
import {useGet} from "restful-react";
import cn from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import consts from "src/constants/consts";
import {formatInteger} from "src/helpers/helper";
import FilterSection from "src/components/common/FilterSection";
import EmptyTable from "src/components/common/EmptyTable";
import Pagination from "src/components/common/Pagination";
import ReportTable from "src/components/RequestDetails/ReportTable";
import ReportTableSkeleton from "src/components/RequestDetails/ReportTable/ReportTableSkeleton";
import ReportCardList from "src/components/RequestDetails/ReportCardList";
import ReportCardListSkeleton from "src/components/RequestDetails/ReportCardList/ReportCardListSkeleton";
import styles from "./Reports.module.scss";

const cx = cn.bind(styles);
const columns = [
	{title: "Name", align: "left"},
	{title: "Test Case Results", align: "left"},
	{title: "Height", align: "left"},
	{title: "Result", align: "left"},
	{title: "Status", align: "right"},
	{title: "", align: "right"},
];

const Reports = ({id}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const path = `${consts.API.REQUESTS_REPORTS}/${id}?limit=${consts.REQUEST.LIMIT}&page_id=${pageId}`;
	const {data, loading, error} = useGet({
		path: path,
	});

	let tableSection;
	let paginationSection;

	if (loading) {
		tableSection = isLargeScreen ? <ReportTableSkeleton /> : <ReportCardListSkeleton />;
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
				tableSection = isLargeScreen ? <ReportTable data={data.data} /> : <ReportCardList data={data.data} />;
			} else {
				tableSection = <EmptyTable columns={columns} />;
			}
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<div className={cx("card")}>
			<div className={cx("card-header")}>
				<div className={cx("total-item")}>
					<span className={cx("total-item-title")}>Reports </span>
					<span className={cx("total-item-value")}>({isNaN(data?.page?.total_item) ? "-" : formatInteger(data.page.total_item)})</span>
				</div>
			</div>
			<div className={cx("card-body")}>
				{tableSection}
				{paginationSection}
			</div>
		</div>
	);
};

Reports.propTypes = {
	id: PropTypes.any,
	// tabId: PropTypes.any,
	// tabs: PropTypes.any,
	// onTabChange: PropTypes.any,
};
Reports.defaultProps = {};

export default Reports;
