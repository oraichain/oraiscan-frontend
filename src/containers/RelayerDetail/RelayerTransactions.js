import React, {memo, useState, useRef} from "react";
import {useGet} from "restful-react";
import classNames from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import consts from "src/constants/consts";
import DelegationTable from "src/components/Ibc/DelegationTable";
import DelegationTableSkeleton from "src/components/Ibc/DelegationTable/DelegationTableSkeleton";
import DelegationCardList from "src/components/Ibc/DelegationCardList/DelegationCardList";
import DelegationCardListSkeleton from "src/components/Ibc/DelegationCardList/DelegationCardListSkeleton";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import styles from "./RelayerTransactions.module.scss";

const cx = classNames.bind(styles);

const RelayerTransactions = memo(({channelId}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const {data, loading, error} = useGet({
		path: `/ibc/channel/${channelId}/txs?page_id=${pageId}`,
	});

	let tableSection;
	let paginationSection;

	if (loading) {
		tableSection = isLargeScreen ? <DelegationTableSkeleton /> : <DelegationCardListSkeleton />;
	} else {
		if (error) {
			totalPagesRef.current = null;
			tableSection = <NoResult />;
		} else {
			if (!isNaN(data?.total)) {
				totalPagesRef.current = data.total;
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

	paginationSection = totalPagesRef.current ? (
		<Pagination pages={Math.ceil(totalPagesRef.current / 5)} page={pageId} onChange={(e, page) => onPageChange(page)} />
	) : (
		<></>
	);

	return (
		<div className={cx("delegation-card")}>
			<div className={cx("delegation-card-header")}>Transactions</div>
			<div className={cx("delegation-card-body")}>
				{tableSection}
				{paginationSection}
			</div>
		</div>
	);
});

export default RelayerTransactions;
