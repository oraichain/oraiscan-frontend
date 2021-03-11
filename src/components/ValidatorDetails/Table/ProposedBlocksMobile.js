import * as React from "react";
import cn from "classnames/bind";
import styles from "./ProposedBlocksMobile.scss";

const cx = cn.bind(styles);

export default function({data, onClick}) {
	return data.map((blockData, index) => {
		return (
			<div className={cx("block-row-wrapper")}>
				<div className={cx("block-row")}>
					<div className={cx("left")}> Height </div>
					<div className={cx("right", "link")} onClick={onClick && onClick[index]}>
						{blockData[0]}
					</div>
				</div>
				<div className={cx("block-row")}>
					<div className={cx("left")}> Blockhash </div>
					<div className={cx("right", "link")} onClick={onClick && onClick[index]}>
						{blockData[1]}
					</div>
				</div>
				<div className={cx("block-row")}>
					<div className={cx("left-two-line")}>
						<div className={cx("title")}> TXS </div>
						<div className={cx("value")}> {blockData[2]} </div>
					</div>
					<div className={cx("right-two-line")}>
						<div className={cx("title")}> Time </div>
						{blockData[3]}
					</div>
				</div>
			</div>
		);
	});
}
