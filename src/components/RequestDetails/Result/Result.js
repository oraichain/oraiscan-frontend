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

const Result = ({id, tabId, tabs, onTabChange}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	// const path = `${consts.API.REQUESTS_REPORTS}/${id}?limit=${consts.REQUEST.LIMIT}`;
	// const {data, loading, error} = useGet({
	// 	path: path,
	// });

	const data = {
		page: {
			page_id: 1,
			limit: 3,
			total_page: 2,
			total_item: 4,
		},
		data: [
			{
				address: "oraivaloper14vcw5qk0tdvknpa38wz46js5g7vrvut8ku5kaa",
				result: "MTYxOC40NA",
				voting_power: {
					value: 12411351,
					percent: 6.56,
				},
				status: "success",
			},
			{
				address: "oraivaloper14vcw5qk0tdvknpa38wz46js5g7vrvut8ku5kaa",
				result: "MTYxOC40NA",
				voting_power: {
					value: 12411351,
					percent: 6.56,
				},
				status: "success",
			},
		],
	};
	const loading = false;
	const error = true;

	let tableSection;
	let paginationSection;

	if (loading) {
		tableSection = isLargeScreen ? <ResultTableSkeleton /> : <ResultCardListSkeleton />;
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
					<span className={cx("total-item-value")}>({isNaN(data?.page?.total_item) ? "-" : formatInteger(data.page.total_item)})</span>
				</div>
				<FilterSection data={tabs} value={tabId} onChange={onTabChange} />
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
	tabId: PropTypes.any,
	tabs: PropTypes.any,
	onTabChange: PropTypes.any,
};
Result.defaultProps = {};

export default Result;
