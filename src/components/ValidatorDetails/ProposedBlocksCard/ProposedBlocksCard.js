// @ts-nocheck
import React, {memo, useState, useRef} from "react";
import {useGet} from "restful-react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import EmptyTable from "src/components/common/EmptyTable";
import ProposedBlocksTable from "src/components/ValidatorDetails/ProposedBlocksTable/ProposedBlocksTable";
import ProposedBlocksTableSkeleton from "src/components/ValidatorDetails/ProposedBlocksTable/ProposedBlocksTableSkeleton";
import ProposedBlocksCardList from "src/components/ValidatorDetails/ProposedBlocksCardList";
import ProposedBlocksCardListSkeleton from "src/components/ValidatorDetails/ProposedBlocksCardList/ProposedBlocksCardListSkeleton";
import Pagination from "src/components/common/Pagination";
import styles from "./ProposedBlocksCard.scss";

import BlockTimeIcon from "src/icons/Validators/TotalBlocksIcon";

// import {isArray} from "lodash-es";

const cx = classNames.bind(styles);

const ProposedBlocksCard = memo(({validatorAddress}) => {
	const columns = [
		{title: "Height", align: "right"},
		{title: "Blockhash", align: "left"},
		{title: "Txs", align: "right"},
		{title: "Time", align: "right"},
	];
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const basePath = `${consts.API_BASE}${consts.API.PROPOSED_BLOCKS}/${validatorAddress}?limit=${consts.REQUEST.PROPOSED_BLOCKS_LIMIT}`;
	const path = `${basePath}&page_id=${pageId}`;
	const {data, loading, error} = useGet({
		path: path,
	});

	let tableSection;
	let totalBlocks;
	let paginationSection;

	if (loading) {
		totalBlocks = <Skeleton className={cx("skeleton-inline-block")} variant='text' width={50} height={20} />;
		tableSection = isLargeScreen ? <ProposedBlocksTableSkeleton /> : <ProposedBlocksCardListSkeleton />;
	} else {
		if (error) {
			totalBlocks = "-";
			totalPagesRef.current = null;
			tableSection = <EmptyTable columns={columns} />;
		} else {
			if (!isNaN(data?.page?.total_page) && !isNaN(data?.page?.total_item)) {
				totalBlocks = data.page.total_item;
				totalPagesRef.current = data.page.total_page;
			} else {
				totalBlocks = "-";
				totalPagesRef.current = null;
			}

			if (Array.isArray(data?.data) && data.data.length > 0) {
				tableSection = isLargeScreen ? <ProposedBlocksTable data={data.data} /> : <ProposedBlocksCardList data={data.data} />;
			} else {
				tableSection = <EmptyTable columns={columns} />;
			}
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<div className={cx("proposed-blocks-card")}>
			<div className={cx("proposed-blocks-card-header")}>
				<div className={cx("title")}>Proposed Blocks</div>
				<div className={cx("total")}>
					<BlockTimeIcon className={cx("total-icon")}></BlockTimeIcon>
					<span className={cx("total-text")}>Total : {totalBlocks} blocks</span>
				</div>
			</div>
			<div className={cx("proposed-blocks-card-body")}>
				{tableSection}
				{paginationSection}
			</div>
		</div>
	);
});

export default ProposedBlocksCard;
