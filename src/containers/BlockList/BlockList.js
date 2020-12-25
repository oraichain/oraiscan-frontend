import React from "react";
import cn from "classnames/bind";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import Table from "src/components/BlockList/Table";
import styles from "./BlockList.scss";

const cx = cn.bind(styles);

export default function(props) {
	return (
		<div className={cx("BlockList")}>
			<TitleWrapper>
				<PageTitle title={"Blocks"} />
				<StatusBox />
			</TitleWrapper>
			<div className={cx("Card")}>
				<Table />
			</div>
		</div>
	);
}
