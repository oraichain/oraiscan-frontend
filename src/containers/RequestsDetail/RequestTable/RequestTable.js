import React, {memo, useState, useRef} from "react";
import {useGet} from "restful-react";
import classNames from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import consts from "src/constants/consts";
import DelegationTable from "src/components/Account/DelegationTable";
import DelegationCardList from "src/components/Account/DelegationCardList/DelegationCardList";
import DelegationCardListSkeleton from "src/components/Account/DelegationCardList/DelegationCardListSkeleton";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import Skeleton from "./Skeleton";
import MobileSkeleton from "./MobileSkeleton";
import styles from "./RequestTable.module.scss";

const cx = classNames.bind(styles);

const DelegationCard = memo(({account = ""}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const path = `${consts.API.DELEGATIONS}/${account}`;
	const {data, loading, error} = useGet({
		path: path,
	});

	let tableSection;
	let paginationSection;

	if (loading) {
		tableSection = isLargeScreen ? <Skeleton /> : <MobileSkeleton />;
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
				tableSection = isLargeScreen ? <DelegationTable data={data.data} /> : <DelegationCardList data={data.data} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<div className={cx("delegation-card")}>
			<div className={cx("delegation-card-header")}>Request </div>
			<div className={cx("delegation-card-body")}>
				{tableSection}
				{paginationSection}
			</div>
		</div>
	);
});

export default DelegationCard;
