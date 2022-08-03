import React, {memo, useState, useRef} from "react";
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
import NoResult from "src/components/common/NoResult";
import styles from "./UnbondingCard.module.scss";

const cx = classNames.bind(styles);

const UnbondingCard = memo(({account = ""}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const path = `${consts.API.UNBONDINGS}/${account}`;
	const {data, loading, error} = useGet({
		path: path,
	});

	let tableSection;
	let paginationSection;

	if (loading) {
		tableSection = isLargeScreen ? <UnbondingTableSkeleton /> : <UnbondingCardListSkeleton />;
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

			if (Array.isArray(data?.unbonding_responses) && data.unbonding_responses.length > 0) {
				tableSection = isLargeScreen ? <UnbondingTable data={data.unbonding_responses} /> : <UnbondingCardList data={data.unbonding_responses} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

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
