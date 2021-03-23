import React, {memo, useState} from "react";
import {useGet} from "restful-react";
import classNames from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import UnbondingTable from "src/components/Account/UnbondingTable";
import UnbondingTableSkeleton from "src/components/Account/UnbondingTable/UnbondingTableSkeleton";
import UnbondingCardList from "src/components/Account/UnbondingCardList";
import UnbondingCardListSkeleton from "src/components/Account/UnbondingCardList/UnbondingCardListSkeleton";
import Pagination from "src/components/common/Pagination";
import EmptyTable from "src/components/common/EmptyTable";
import styles from "./UnbondingCard.scss";

const cx = classNames.bind(styles);

const UnbondingCard = memo(({account = ""}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const path = `${consts.API.UNBONDINGS}/${account}`;
	const {data} = useGet({
		path: path,
	});

	const onPageChange = page => {
		setPageId(page);
	};

	let tableSection;
	let paginationSection;

	if (!data) {
		tableSection = isLargeScreen ? <UnbondingTableSkeleton /> : <UnbondingCardListSkeleton />;
	} else {
		if (!isNaN(data?.page?.total_page) && data.page.total_page != totalPages) {
			setTotalPages(data.page.total_page);
		}

		if (Array.isArray(data?.data) && data.data.length > 0) {
			tableSection = isLargeScreen ? <UnbondingTable data={data.data} /> : <UnbondingCardList data={data.data} />;
		} else {
			const columns = [
				{title: "Validator", align: "left"},
				{title: "Height", align: "right"},
				{title: "Amount", align: "right"},
				{title: "Completion Time", align: "right"},
			];
			tableSection = <EmptyTable columns={columns} />;
		}
	}

	paginationSection = totalPages > 1 ? <Pagination pages={totalPages} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<div className={cx("unbonding-card")}>
			<div className={cx("unbonding-card-header")}>Unbondings</div>
			<div className={cx("unbonding-card-body")}>
				{tableSection}
				{paginationSection}
			</div>
		</div>
	);
});

export default UnbondingCard;
