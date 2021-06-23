import React, {useState, useRef} from "react";
import PropTypes from "prop-types";
import {useGet} from "restful-react";
import cn from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Skeleton from "@material-ui/lab/Skeleton";
import consts from "src/constants/consts";
import {formatInteger} from "src/helpers/helper";
import TabBar from "src/components/RequestDetails/TabBar";
import NoResult from "src/components/common/NoResult";
import Pagination from "src/components/common/Pagination";
import ReportTable from "src/components/RequestDetails/ReportTable";
import ReportTableSkeleton from "src/components/RequestDetails/ReportTable/ReportTableSkeleton";
import ReportCardList from "src/components/RequestDetails/ReportCardList";
import ReportCardListSkeleton from "src/components/RequestDetails/ReportCardList/ReportCardListSkeleton";
import styles from "./Reports.module.scss";

const cx = cn.bind(styles);

const Reports = ({data, loading, error, id, activeTab, setActiveTab}) => {
	const theme = useTheme();
	const [pageId, setPageId] = useState(1);
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const calculateTotalPage = data?.length / consts.REQUEST.LIMIT;
	const totalPages = calculateTotalPage !== parseInt(calculateTotalPage.toString()) ? parseInt(calculateTotalPage.toString()) + 1 : calculateTotalPage;
	const currentPageData = data?.filter((item, index) => index >= (pageId - 1) * consts.REQUEST.LIMIT);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	// const path = `${consts.API.REQUESTS_REPORTS}/${id}?limit=${consts.REQUEST.LIMIT}&page_id=${pageId}`;
	// const {data, loading, error} = useGet({
	// 	path: path,
	// });

	let totalItems;
	let tableSection;
	let paginationSection;

	if (loading) {
		totalItems = <Skeleton className={cx("skeleton")} variant='text' width={50} height={30} />;
		tableSection = isLargeScreen ? <ReportTableSkeleton /> : <ReportCardListSkeleton />;
	} else {
		if (error) {
			totalItems = "-";
			tableSection = <NoResult />;
		} else {
			if (isNaN(data?.length)) {
				totalItems = "-";
			} else {
				totalItems = formatInteger(data.length);
			}

			if (Array.isArray(currentPageData) && currentPageData.length > 0) {
				tableSection = isLargeScreen ? <ReportTable data={currentPageData} /> : <ReportCardList data={currentPageData} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}

	paginationSection = totalPages ? <Pagination pages={totalPages} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<div className={cx("card")}>
			<div className={cx("card-header")}>
				<div className={cx("total-item")}>
					<span className={cx("total-item-title")}>Reports </span>
					<span className={cx("total-item-value")}>({totalItems})</span>
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
	activeTab: PropTypes.any,
	setActiveTab: PropTypes.func,
};
Reports.defaultProps = {};

export default Reports;
