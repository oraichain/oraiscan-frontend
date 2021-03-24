import React, {memo, useState} from "react";
import {useGet} from "restful-react";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import BlockMatrix from "src/components/ValidatorDetails/BlockMatrix/BlockMatrix";
import BlockMatrixSkeleton from "src/components/ValidatorDetails/BlockMatrix/BlockMatrixSkeleton";
import styles from "./MissedBlocksCard.scss";
import blockIcon from "src/assets/validatorDetails/blocks.svg";

const cx = classNames.bind(styles);

const MissedBlocksCard = memo(({validatorAddress}) => {
	const path = `${consts.API_BASE}${consts.API.MISSED_BLOCKS}/${validatorAddress}`;
	const {data, loading, error} = useGet({
		path: path,
	});

	let blockMatrix;
	if (loading) {
		blockMatrix = <BlockMatrixSkeleton />;
	} else {
		if (error) {
			blockMatrix = <div className={cx("no-data")}>No data</div>;
		} else {
			let lastestHeight;
			let signedBlocks;

			if (!isNaN(data?.lastest_height)) {
				lastestHeight = parseInt(data.lastest_height) - 1;
			}

			if (Array.isArray(data?.signed_blocks)) {
				signedBlocks = data.signed_blocks;
			}

			if (lastestHeight && signedBlocks) {
				blockMatrix = <BlockMatrix lastestHeight={lastestHeight} signedBlocks={signedBlocks} />;
			} else {
				blockMatrix = <div className={cx("no-data")}>No data</div>;
			}
		}
	}

	return (
		<div className={cx("missed-blocks-card")}>
			<div className={cx("missed-blocks-card-header")}>
				<div className={cx("title")}>Missed Blocks</div>
				<div className={cx("total")}>
					<img className={cx("total-icon")} src={blockIcon} />
					<span className={cx("total-icon")}>Last 100 blocks</span>
				</div>
			</div>
			<div className={cx("missed-blocks-card-body")}>{blockMatrix}</div>
		</div>
	);
});

export default MissedBlocksCard;
