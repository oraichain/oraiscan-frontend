import React, {memo, useState} from "react";
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
import styles from "./DelegatorsCard.scss";
import blockIcon from "src/assets/validatorDetails/blocks.svg";

const cx = classNames.bind(styles);

const DelegatorsCard = memo(({validatorAddress}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const basePath = `${consts.API_BASE}${consts.API.DELEGATOR}/${validatorAddress}?limit=${consts.REQUEST.LIMIT}`;
	const [path, setPath] = useState(`${basePath}&page_id=1`);
	const {data} = useGet({
		path: path,
	});

	const totalPages = data?.page?.total_page ?? 0;
	const currentPage = data?.page?.page_id ?? 1;

	const onPageChange = page => {
		setPath(`${basePath}&page_id=${page}`);
	};

	let tableSection;
	let paginationSection;

	if (data) {
		tableSection = isLargeScreen ? <DelegatorsTable data={data.data} /> : <DelegatorsCardList data={data.data} />;
		paginationSection =
			totalPages > 0 ? (
				<Pagination pages={totalPages} page={currentPage} itemClassName={cx("pagination-item")} onChange={(e, page) => onPageChange(page)} />
			) : (
				<></>
			);
	} else {
		tableSection = isLargeScreen ? <DelegatorsTableSkeleton /> : <DelegatorsCardListSkeleton />;
	}

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
