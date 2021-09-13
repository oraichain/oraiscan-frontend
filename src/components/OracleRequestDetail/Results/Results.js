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
import ResultTable from "src/components/OracleRequestDetail/ResultTable";
import ResultTableSkeleton from "src/components/OracleRequestDetail/ResultTable/ResultTableSkeleton";
import ResultCardList from "src/components/OracleRequestDetail/ResultCardList";
import Pending from "src/components/common/Pending";
import ResultCardListSkeleton from "src/components/OracleRequestDetail/ResultCardList/ResultCardListSkeleton";
import styles from "./Results.module.scss";
import {isNil} from "lodash-es";

const cx = cn.bind(styles);

const Results = ({contract, id}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const limit = 5;
	const path = `${consts.API.REQUESTS_RESULTS}/${id}?contract=${contract}&limit=${limit}&page_id=${pageId}`;
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
				tableSection = isLargeScreen ? <ResultTable data={data.data} /> : <ResultCardList data={data.data} />;
			} else {
				tableSection = <Pending />;
			}
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<div className={cx("card")}>
			<div className={cx("card-header")}>
				<div className={cx("total-item")}>
					<span className={cx("total-item-title")}>Result </span>
					<span className={cx("total-item-value")}>({totalItems}) -</span>
					{!isNil(data?.status) && !data?.status ? (
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

Results.propTypes = {
	id: PropTypes.any,
	contract: PropTypes.any,
};
Results.defaultProps = {};

export default Results;
