import React, {memo} from "react";
import {useGet} from "restful-react";
import classNames from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import consts from "src/constants/consts";
import DelegationTable from "src/components/Account/DelegationTable";
import DelegationTableSkeleton from "src/components/Account/DelegationTable/DelegationTableSkeleton";
import DelegationCardList from "src/components/Account/DelegationCardList/DelegationCardList";
import DelegationCardListSkeleton from "src/components/Account/DelegationCardList/DelegationCardListSkeleton";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import EmptyTable from "src/components/common/EmptyTable";
import styles from "./DelegationCard.scss";

const cx = classNames.bind(styles);

const DelegationCard = memo(({account = ""}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	const path = `${consts.API.DELEGATIONS}/${account}`;
	const {data} = useGet({
		path: path,
	});

	const totalPages = 1;
	const currentPage = 1;
	const onPageChange = page => {};

	let tableSection;
	let paginationSection = null;
	const columns = [{title: "Validator"}, {title: "Amount"}, {title: "Reward"}];

	if (!data) {
		tableSection = isLargeScreen ? <DelegationTableSkeleton /> : <DelegationCardListSkeleton />;
	} else {
		if (Array.isArray(data?.data) && data.data.length > 0) {
			tableSection = isLargeScreen ? <DelegationTable data={data.data} /> : <DelegationCardList data={data.data} />;
			paginationSection = totalPages > 0 && <Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(page)} />;
		} else {
			tableSection = <EmptyTable columns={columns} />;
		}
	}

	return (
		<div className={cx("delegation-card")}>
			<div className={cx("delegation-card-header")}>Delegations</div>
			<div className={cx("delegation-card-body")}>
				{tableSection}
				{paginationSection && paginationSection}
			</div>
		</div>
	);
});

export default DelegationCard;
