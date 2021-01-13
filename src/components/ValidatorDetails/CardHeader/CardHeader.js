import React, {memo} from "react";
import classNames from "classnames/bind";

import {ReactComponent as BlockIcon} from "src/assets/validatorDetails/blocks.svg";
import styles from "./CardHeader.scss";

const cx = classNames.bind(styles);

const ProposedBlocks = ({title, info}) => {
	return (
		<div className={cx("container-mobile")}>
			<div className={cx("container-block")}>
				<div className={cx("title")}>{title}</div>
				<div className={cx("show-more")}> Show more </div>
			</div>
			{info !== "" && (
				<div className={cx("info")}>
					<BlockIcon /> {info}
				</div>
			)}
		</div>
	);
};

const MissedBlocks = ({title}) => {
	return (
		<div className={cx("container-mobile")}>
			<div className={cx("container-block")}>
				<div className={cx("title")}>{title}</div>
				<div className={cx("show-more", "info", "missed-block")}>
					{" "}
					<BlockIcon /> Last 100 blocks{" "}
				</div>
			</div>
		</div>
	);
};

const DelegatorBlocks = ({title}) => {
	return (
		<div className={cx("container-mobile")}>
			<div className={cx("container-block")}>
				<div className={cx("title")}>{title}</div>
				<div className={cx("show-more")}> Show more </div>
			</div>
		</div>
	);
};

const CardHeader = memo(props => {
	const {title = "", info = "", icon, isDesktop, type = "proposed"} = props;
	const renderType = () => {
		if (type === "proposed") {
			return <ProposedBlocks {...props} />;
		}
		if (type === "missed") {
			return <MissedBlocks {...props} />;
		}
		if (type === "delegators") {
			return <DelegatorBlocks {...props} />;
		}
	};
	return isDesktop ? (
		<div className={cx("container")}>
			<div className={cx("title")}>{title}</div>
			{info !== "" && (
				<div className={cx("info")}>
					<img src={icon} alt='#' />
					<div className={cx("txt-info")}>{info}</div>
				</div>
			)}
		</div>
	) : (
		renderType()
	);
});

export default CardHeader;
