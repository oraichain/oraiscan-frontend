// @ts-nocheck
import React, {memo} from "react";
import classNames from "classnames/bind";
import styles from "./BlockMatrix.scss";

import SuccessBlockIcon from "src/icons/Validators/SuccessBlockIcon";
import FailedBlockIcon from "src/icons/Validators/FailedBlockIcon";

const cx = classNames.bind(styles);

const BlockMatrix = memo(({lastestHeight, signedBlocks}) => {
	const data = [];
	for (let i = 0; i < 100; i++) {
		data.push(lastestHeight - i);
	}
	data.reverse();

	let blockMatrixElements = [];
	for (let key = 0; key < 100; key++) {
		const value = data[key];
		let blockMatrixElement;
		if (signedBlocks.includes(value)) {
			blockMatrixElement = (
				<div className={cx("block-matrix-cell")}>
					<SuccessBlockIcon className={cx("block-icon-success")}></SuccessBlockIcon>
				</div>
			);
		} else {
			blockMatrixElement = (
				<div className={cx("block-matrix-cell")}>
					<FailedBlockIcon className={cx("block-icon-failed")}></FailedBlockIcon>
				</div>
			);
		}
		blockMatrixElements.push(blockMatrixElement);
	}

	return <div className={cx("block-matrix")}>{blockMatrixElements}</div>;
});

export default BlockMatrix;
