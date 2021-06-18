import React, {useState, useRef} from "react";
import PropTypes from "prop-types";
import {useGet} from "restful-react";
import cn from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Skeleton from "@material-ui/lab/Skeleton";
import consts from "src/constants/consts";
import {formatInteger} from "src/helpers/helper";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import TabBar from "src/components/RequestDetails/TabBar";
import DataSourceTable from "src/components/RequestDetails/DataSourceTable";
import DataSourceTableSkeleton from "src/components/RequestDetails/DataSourceTable/DataSourceTableSkeleton";
import DataSourceCardList from "src/components/RequestDetails/DataSourceCardList";
import DataSourceCardListSkeleton from "src/components/RequestDetails/DataSourceCardList/DataSourceCardListSkeleton";
import styles from "./AIDataSources.module.scss";

const cx = cn.bind(styles);

const AIDataSources = ({id, activeTab, setActiveTab}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const path = `${consts.API.REQUESTS_AI_DATA_SOURCES}/${id}?limit=${consts.REQUEST.LIMIT}&page_id=${pageId}`;
	const {data, loading, error} = useGet({
		path: path,
	});

	let totalItems;
	let tableSection;
	let paginationSection;

	if (loading) {
		totalItems = <Skeleton className={cx("skeleton")} variant='text' width={50} height={30} />;
		tableSection = isLargeScreen ? <DataSourceTableSkeleton /> : <DataSourceCardListSkeleton />;
	} else {
		if (error) {
			totalItems = "-";
			totalPagesRef.current = null;
			tableSection = <NoResult />;
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
				tableSection = isLargeScreen ? <DataSourceTable data={data.data} /> : <DataSourceCardList data={data.data} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<div className={cx("card")}>
			<div className={cx("card-header")}>
				<div className={cx("total-item")}>
					<span className={cx("total-item-title")}>Ai data sources </span>
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

AIDataSources.propTypes = {
	id: PropTypes.any,
	activeTab: PropTypes.any,
	setActiveTab: PropTypes.func,
};
AIDataSources.defaultProps = {};

export default AIDataSources;
