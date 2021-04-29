import React, {memo, useState, useRef} from "react";
import {useGet} from "restful-react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import DelegatorsTable from "src/components/ValidatorDetails/DelegatorsTable/DelegatorsTable";
import DelegatorsTableSkeleton from "src/components/ValidatorDetails/DelegatorsTable/DelegatorsTableSkeleton";
import DelegatorsCardList from "src/components/ValidatorDetails/DelegatorsCardList";
import DelegatorsCardListSkeleton from "src/components/ValidatorDetails/DelegatorsCardList/DelegatorsCardListSkeleton";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import styles from "./DelegatorsCard.scss";

const cx = classNames.bind(styles);

const DelegatorsCard = memo(({validatorAddress}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const basePath = `${consts.API_BASE}${consts.API.DELEGATOR}/${validatorAddress}?limit=${consts.REQUEST.LIMIT}`;
	const path = `${basePath}&page_id=${pageId}`;
	const {data, loading, error} = useGet({
		path: path,
	});

	const onPageChange = page => {
		setPageId(page);
	};

	let tableSection;
	let paginationSection;

	if (loading) {
		tableSection = isLargeScreen ? <DelegatorsTableSkeleton /> : <DelegatorsCardListSkeleton />;
	} else {
		if (error) {
			totalPagesRef.current = null;
			tableSection = <NoResult />;
		} else {
			if (!isNaN(data?.page?.total_page)) {
				totalPagesRef.current = data.page.total_page;
			} else {
				totalPagesRef.current = null;
			}

			if (Array.isArray(data?.data) && data.data.length > 0) {
				tableSection = isLargeScreen ? <DelegatorsTable data={data.data} /> : <DelegatorsCardList data={data.data} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<div className={cx("delegators-card")}>
			<div className={cx("delegators-card-header")}>Delegators</div>
			<div className={cx("delegators-card-body")}>
				{tableSection}
				{paginationSection}
			</div>
		</div>
	);
});

export default DelegatorsCard;
