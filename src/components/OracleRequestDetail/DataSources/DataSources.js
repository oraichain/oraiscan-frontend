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
import Pending from "src/components/common/Pending";
import TabBar from "src/components/RequestDetails/TabBar";
import DataSourceTable from "src/components/OracleRequestDetail/DataSourceTable";
import DataSourceTableSkeleton from "src/components/OracleRequestDetail/DataSourceTable/DataSourceTableSkeleton";
import DataSourceCardList from "src/components/OracleRequestDetail/DataSourceCardList";
import DataSourceCardListSkeleton from "src/components/OracleRequestDetail/DataSourceCardList/DataSourceCardListSkeleton";
import styles from "./DataSources.module.scss";

const cx = cn.bind(styles);

const DataSources = ({contract, id, dsCheck}) => {
	const [pageId, setPageId] = useState(1);
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const limit = 5;
	let path = dsCheck ? `${consts.API.ORACLE_REQUESTS_DATA_SOURCES}` : `${consts.API.ORACLE_REQUESTS_TEST_CASE}`;
	path += `/${id}?contract=${contract}&limit=${limit}&page_id=${pageId}`;
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
			if (!isNaN(data?.page?.total_page) && !isNaN(data?.page?.total_item)) {
				totalItems = data.page.total_item;
				totalPagesRef.current = data.page.total_page;
			} else {
				totalItems = "-";
				totalPagesRef.current = null;
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
					{dsCheck ? <span className={cx("total-item-title")}>Data Sources </span> : <span className={cx("total-item-title")}>Test Cases </span>}
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

DataSources.propTypes = {
	id: PropTypes.any,
	contract: PropTypes.any,
	dsCheck: PropTypes.bool,
};
DataSources.defaultProps = {};

export default DataSources;
