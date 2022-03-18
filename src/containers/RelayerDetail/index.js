import React from "react";
import cn from "classnames/bind";
import Container from "@material-ui/core/Container";

// components
import RelayerInfo from "./RelayerInfo";
import RelayerAsset from "./RelayerAssset";
import RelayerTransaction from "./RelayerTransactions";

// styles
import styles from "./RelayerDetail.module.scss";

const cx = cn.bind(styles);

const RelayerDetail = () => {
	return (
		<Container fixed className={cx("relayers")}>
			<div className={cx("page-title")}>IBC Relayer Detail</div>
			<RelayerInfo />
			<RelayerAsset />
			<RelayerTransaction />
		</Container>
	);
};

export default RelayerDetail;
