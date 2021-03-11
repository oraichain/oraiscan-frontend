import React, {memo, useState} from "react";
import {useGet} from "restful-react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import ProposedBlocksTable from "src/components/ValidatorDetails/ProposedBlocksTable/ProposedBlocksTable";
import ProposedBlocksTableSkeleton from "src/components/ValidatorDetails/ProposedBlocksTable/ProposedBlocksTableSkeleton";
import ProposedBlocksCardList from "src/components/ValidatorDetails/ProposedBlocksCardList";
import ProposedBlocksCardListSkeleton from "src/components/ValidatorDetails/ProposedBlocksCardList/ProposedBlocksCardListSkeleton";
import Pagination from "src/components/common/Pagination";
import styles from "./ProposedBlocksCard.scss";
import blockIcon from "src/assets/validatorDetails/blocks.svg";

const cx = classNames.bind(styles);

const ProposedBlocksCard = memo(({validatorAddress}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const basePath = `${consts.API_BASE}${consts.API.PROPOSED_BLOCKS}/${validatorAddress}?limit=${consts.REQUEST.PROPOSED_BLOCKS_LIMIT}`;
	const [path, setPath] = useState(`${basePath}&page_id=1`);
	const {data} = useGet({
		path: path,
	});

	const totalPages = data?.page?.total_page ?? 0;
	const currentPage = data?.page?.page_id ?? 1;
	const totalBlocks = data?.page.total_item ?? "-";

	const onPageChange = page => {
		setPath(`${basePath}&page_id=${page}`);
	};

	let tableSection;
	let paginationSection;

	if (data) {
		tableSection = isLargeScreen ? <ProposedBlocksTable data={data.data} /> : <ProposedBlocksCardList data={data.data} />;
		paginationSection =
			totalPages > 0 ? (
				<Pagination pages={totalPages} page={currentPage} itemClassName={cx("pagination-item")} onChange={(e, page) => onPageChange(page)} />
			) : (
				<></>
			);
	} else {
		tableSection = isLargeScreen ? <ProposedBlocksTableSkeleton /> : <ProposedBlocksCardListSkeleton />;
	}

	return (
		<div className={cx("proposed-blocks-card")}>
			<div className={cx("proposed-blocks-card-header")}>
				<div className={cx("title")}>Proposed Blocks</div>
				<div className={cx("total")}>
					<img className={cx("total-icon")} src={blockIcon} />
					<span className={cx("total-icon")}>Total : {totalBlocks} blocks</span>
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
