import React, {useState, useRef} from "react";
import PropTypes from "prop-types";
import {useGet} from "restful-react";
import cn from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Skeleton from "@material-ui/lab/Skeleton";
import consts from "src/constants/consts";
import {formatInteger} from "src/helpers/helper";
import NoResult from "src/components/common/NoResult";
import Pagination from "src/components/common/Pagination";
import ResultTable from "src/components/RequestDetails/ResultTable";
import ResultTableSkeleton from "src/components/RequestDetails/ResultTable/ResultTableSkeleton";
import ResultCardList from "src/components/RequestDetails/ResultCardList";
import ResultCardListSkeleton from "src/components/RequestDetails/ResultCardList/ResultCardListSkeleton";
import styles from "./Result.module.scss";
import {isNil} from "lodash-es";

const cx = cn.bind(styles);

const Result = ({data, loading, error, id, activeTab, setActiveTab}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const calculateTotalPage = data?.results?.length / consts.REQUEST.LIMIT;
	const totalPages = calculateTotalPage !== parseInt(calculateTotalPage.toString()) ? parseInt(calculateTotalPage.toString()) + 1 : calculateTotalPage;
	const currentPageData = data?.results?.filter((item, index) => index >= (pageId - 1) * consts.REQUEST.LIMIT);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	// const path = `${consts.API.REQUESTS_RESULTS}/${id}?limit=${consts.REQUEST.LIMIT}&page_id=${pageId}`;
	// const {data, loading, error} = useGet({
	// 	path: path,
	// });

	let totalItems;
	let tableSection;
	let paginationSection;

	if (loading) {
		totalItems = <Skeleton className={cx("skeleton")} variant='text' width={50} height={30} />;
		tableSection = isLargeScreen ? <ResultTableSkeleton /> : <ResultCardListSkeleton />;
	} else {
		if (error) {
			totalItems = "-";
			tableSection = <NoResult />;
		} else {
			if (isNaN(data?.results?.length)) {
				totalItems = "-";
			} else {
				totalItems = formatInteger(data?.results?.length);
			}

			if (Array.isArray(currentPageData) && currentPageData.length > 0) {
				tableSection = isLargeScreen ? <ResultTable data={currentPageData} /> : <ResultCardList data={currentPageData} />;
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
					<span className={cx("total-item-title")}>Result </span>
					<span className={cx("total-item-value")}>({totalItems}) -</span>
					{!isNil(data?.status) && data?.status === "pending" ? (
						<span className={cx("total-item-status-pending")}>Pending</span>
					) : (
						<span className={cx("total-item-status-finished")}>Finished</span>
					)}
				</div>
			</div>
			<div className={cx("card-body")}>
				{tableSection}
				{paginationSection}
			</div>
		</div>
	);
};

Result.propTypes = {
	id: PropTypes.any,
	activeTab: PropTypes.any,
	setActiveTab: PropTypes.func,
};
Result.defaultProps = {};

export default Result;
