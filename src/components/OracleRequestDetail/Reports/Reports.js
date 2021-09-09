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
import ReportTable from "src/components/OracleRequestDetail/ReportTable";
import ReportTableSkeleton from "src/components/OracleRequestDetail/ReportTable/ReportTableSkeleton";
import ReportCardList from "src/components/OracleRequestDetail/ReportCardList";
import ReportCardListSkeleton from "src/components/OracleRequestDetail/ReportCardList/ReportCardListSkeleton";
import styles from "./Reports.module.scss";
import Pending from "src/components/common/Pending";

const cx = cn.bind(styles);

const Reports = ({contract, id}) => {
	const theme = useTheme();
	const [pageId, setPageId] = useState(1);
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const limit = 5;
	const path = `${consts.API.REQUESTS_REPORTS}/${id}?contract=${contract}&limit=${limit}&page_id=${pageId}`;
	const {data, loading, error} = useGet({
		path: path,
	});

	let totalItems;
	let tableSection;
	let paginationSection;

	if (loading) {
		totalItems = <Skeleton className={cx("skeleton")} variant='text' width={50} height={30} />;
		tableSection = isLargeScreen ? <ReportTableSkeleton /> : <ReportCardListSkeleton />;
	} else {
		if (error) {
			totalItems = "-";
			totalPagesRef.current = null;
			tableSection = <Pending />;
		} else {
			if (!isNaN(data?.page?.total_page) && !isNaN(data?.page?.total_item)) {
				totalItems = data.page.total_item;
				totalPagesRef.current = data.page.total_page;
			} else {
				totalItems = "-";
				totalPagesRef.current = null;
			}

			if (Array.isArray(data?.data) && data.data.length > 0) {
				tableSection = isLargeScreen ? <ReportTable data={data.data} /> : <ReportCardList data={data.data} />;
			} else {
				tableSection = <Pending />;
			}

			// if (Array.isArray(currentPageData) && currentPageData.length > 0) {
			// 	tableSection = isLargeScreen ? <ReportTable data={currentPageData} /> : <ReportCardList data={currentPageData} />;
			// } else {
			// 	tableSection = <Pending />;
			// }
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

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
	contract: PropTypes.any,
};
Reports.defaultProps = {};

export default Reports;
