// @ts-nocheck
import React, {memo} from "react";
import classNames from "classnames/bind";
import styles from "./BlockMatrix.scss";
import signedBlockIcon from "src/assets/validatorDetails/good_block.svg";
import missedBlockIcon from "src/assets/validatorDetails/bad_block.svg";

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
					<img alt='/' className={cx("block-icon")} src={signedBlockIcon} />
				</div>
			);
		} else {
			blockMatrixElement = (
				<div className={cx("block-matrix-cell")}>
					<img alt='/' className={cx("block-icon")} src={missedBlockIcon} />
				</div>
			);
		}
		blockMatrixElements.push(blockMatrixElement);
	}

	return <div className={cx("block-matrix")}>{blockMatrixElements}</div>;
});

export default BlockMatrix;
