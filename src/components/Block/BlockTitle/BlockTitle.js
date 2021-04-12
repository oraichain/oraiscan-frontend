import React from "react";
import styles from "./BlockTitle.scss";
import classNames from "classnames/bind";
import StatusBox from "src/components/common/StatusBox";

//  assets
import RightArrowSVG from "src/assets/common/arrow_ic.svg";

const cx = classNames.bind(styles);

const BlockTitle = ({height, onClick, loading}) => {
	const handleClick = isPrev => () => {
		if (loading) return;
		onClick(isPrev);
	};
	return (
		<div className={cx("block-title-wrapper")}>
			<h2 className={cx("title")}>
				Details for Block <span style={{fontSize: "22px"}}>#{height}</span>
			</h2>
			<StatusBox></StatusBox>
		</div>
	);
};

export default BlockTitle;
