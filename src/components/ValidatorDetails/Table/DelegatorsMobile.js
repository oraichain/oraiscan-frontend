import * as React from "react";
import cn from "classnames/bind";
import styles from "./DelegatorsMobile.scss";

const cx = cn.bind(styles);

export default function({data, onClick}) {
	const check = data ? true : false;
	return (
		check &&
		data.map((blockData, index) => {
			console.log(blockData[0]);
			return (
				<div className={cx("block-row-wrapper")}>
					<div className={cx("block-row")}>
						<div className={cx("left")}> Address </div>
						<div className={cx("right", "link")} onClick={onClick && onClick[index]}>
							{blockData[0]}
						</div>
					</div>
					<div className={cx("block-row")}>
						<div className={cx("left-two-line")}>
							<div className={cx("title")}> Amount </div>
							<div className={cx("value")}> {blockData[1]} </div>
						</div>
						<div className={cx("right-two-line")}>
							<div className={cx("title")}> Share </div>
							{blockData[2]}
						</div>
					</div>
				</div>
			);
		})
	);
}
