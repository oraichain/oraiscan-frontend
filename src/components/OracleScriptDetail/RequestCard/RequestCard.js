/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useState, useRef} from "react";
import {useGet} from "restful-react";
import PropTypes from "prop-types";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import EmptyTable from "src/components/common/EmptyTable";
import RequestTable from "src/components/OracleScriptDetail/RequestTable";
import RequestTableSkeleton from "src/components/OracleScriptDetail/RequestTable/RequestTableSkeleton";
import RequestCardList from "src/components/OracleScriptDetail/RequestCardList";
import RequestCardListSkeleton from "src/components/OracleScriptDetail/RequestCardList/RequestCardListSkeleton";
import Pagination from "src/components/common/Pagination";
import RightArrowIcon from "src/icons/RightArrowIcon";
import styles from "./RequestCard.module.scss";

const cx = classNames.bind(styles);
const columns = [
	{title: "Requests", align: "left"},
	{title: "Fees", align: "left"},
	{title: "Block Height", align: "left"},
	{title: "Creator", align: "left"},
];

const RequestCard = memo(({oracleScriptId, showCodeCard}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const basePath = `${consts.API.ORACLE_SCRIPTS_REQUEST}/${oracleScriptId}?limit=${consts.REQUEST.LIMIT}`;
	const path = `${basePath}&page_id=${pageId}`;
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
				tableSection = isLargeScreen ? <RequestTable data={data?.data} /> : <RequestCardList data={data?.data} />;
			} else {
				tableSection = <EmptyTable columns={columns} />;
			}
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<div className={cx("request-card")}>
			<div className={cx("request-card-header")}>
				<div className={cx("request")}>
					<span className={cx("request-name")}>Request</span>
					<span className={cx("request-value")}>(185,194)</span>
				</div>
				<div className={cx("button")} onClick={showCodeCard}>
					<span className={cx("button-text")}>Get Code</span>
					<RightArrowIcon className={cx("button-icon")} />
				</div>
			</div>

			<div className={cx("request-card-body")}>{tableSection}</div>
			<div className={cx("request-card-footer")}>{paginationSection}</div>
		</div>
	);
});

RequestCard.propTypes = {
	oracleScriptId: PropTypes.any,
	showCodeCard: PropTypes.func,
};
RequestCard.defaultProps = {};

export default RequestCard;
