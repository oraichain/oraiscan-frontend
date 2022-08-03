import React, {memo} from "react";
import classNames from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import styles from "./BlockMatrix.module.scss";

const cx = classNames.bind(styles);

const BlockMatrixSkeleton = memo(() => {
	const data = [];
	for (let i = 0; i < 100; i++) {
		data.push(i);
	}

	return (
		<div className={cx("block-matrix")}>
			{data.map(i => (
				<div className={cx("block-matrix-cell")} key={"block-matrix-cell-" + i}>
					<div className={cx("block-icon")}>
						<Skeleton className={cx("skeleton")} variant='rect' />
					</div>
				</div>
			))}
		</div>
	);
});

export default BlockMatrixSkeleton;
