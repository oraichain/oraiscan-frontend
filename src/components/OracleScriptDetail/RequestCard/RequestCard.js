/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo} from "react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames/bind";
import styles from "./RequestCard.scss";
import RequestTable from "src/components/OracleScriptDetail/RequestTable";
import RequestTableSkeleton from "src/components/OracleScriptDetail/RequestTable/RequestTableSkeleton";
import RequestCardList from "src/components/OracleScriptDetail/RequestCardList";
import RequestCardListSkeleton from "src/components/OracleScriptDetail/RequestCardList/RequestCardListSkeleton";
import Pagination from "src/components/common/Pagination";
import arrowIcon from "src/assets/oracleScripts/arrow_ic.svg";

const cx = classNames.bind(styles);
const RequestCard = memo(() => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	let tableSection;
	let paginationSection;

	tableSection = isLargeScreen ? <RequestTable /> : <RequestCardList />;
	paginationSection = <Pagination pages={1} page={1} onChange={(e, page) => {}} />;

	return (
		<div className={cx("request-card")}>
			<div className={cx("request-card-header")}>
				<div className={cx("request")}>
					<span className={cx("request-name")}>Request</span>
					<span className={cx("request-value")}>(185,194)</span>
				</div>
				<div className={cx("get-code-button")}>
					Get Code <img src={arrowIcon} alt='' />
				</div>
			</div>

			<div className={cx("request-card-body")}>{tableSection}</div>
			<div className={cx("request-card-footer")}>{paginationSection}</div>
		</div>
	);
});

export default RequestCard;
