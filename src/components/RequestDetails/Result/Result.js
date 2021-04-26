import React, {useState, useRef} from "react";
import PropTypes from "prop-types";
import {useGet} from "restful-react";
import cn from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Skeleton from "@material-ui/lab/Skeleton";
import consts from "src/constants/consts";
import {formatInteger} from "src/helpers/helper";
import EmptyTable from "src/components/common/EmptyTable";
import Pagination from "src/components/common/Pagination";
import TabBar from "src/components/RequestDetails/TabBar";
import ResultTable from "src/components/RequestDetails/ResultTable";
import ResultTableSkeleton from "src/components/RequestDetails/ResultTable/ResultTableSkeleton";
import ResultCardList from "src/components/RequestDetails/ResultCardList";
import ResultCardListSkeleton from "src/components/RequestDetails/ResultCardList/ResultCardListSkeleton";
import styles from "./Result.module.scss";

const cx = cn.bind(styles);
const columns = [
	{title: "Validator", align: "left"},
	{title: "Address", align: "left"},
	{title: "Result", align: "left"},
	{title: "Voting Power", align: "left"},
	{title: "Status", align: "center"},
];

const Result = ({id, activeTab, setActiveTab}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const path = `${consts.API.REQUESTS_RESULTS}/${id}?limit=${consts.REQUEST.LIMIT}&page_id=${pageId}`;
	const {data, loading, error} = useGet({
		path: path,
	});

	let totalItems;
	let tableSection;
	let paginationSection;

	if (loading) {
		totalItems = <Skeleton className={cx("skeleton")} variant='text' width={50} height={30} />;
		tableSection = isLargeScreen ? <ResultTableSkeleton /> : <ResultCardListSkeleton />;
	} else {
		if (error) {
			totalItems = "-";
			totalPagesRef.current = null;
			tableSection = <EmptyTable columns={columns} />;
		} else {
			if (!isNaN(data?.page?.total_page)) {
				totalPagesRef.current = data.page.total_page;
			} else {
				totalPagesRef.current = null;
			}

			if (isNaN(data?.page?.total_item)) {
				totalItems = "-";
			} else {
				totalItems = formatInteger(data.page.total_item);
			}

			if (Array.isArray(data?.data) && data.data.length > 0) {
				tableSection = isLargeScreen ? <ResultTable data={data.data} /> : <ResultCardList data={data.data} />;
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
					<span className={cx("total-item-title")}>Result </span>
					<span className={cx("total-item-value")}>({totalItems})</span>
				</div>
				<TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
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
