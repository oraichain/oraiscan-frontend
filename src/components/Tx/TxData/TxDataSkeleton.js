import * as React from "react";
import cn from "classnames/bind";
import PropTypes from "prop-types";
import TxMessageSkeleton from "src/components/Tx/TxData/TxMessage/TxMessageSkeleton";
import styles from "./TxData.module.scss";

const cx = cn.bind(styles);

const TxDataSkeleton = ({}) => {
	return (
		<div className={cx("card")}>
			<div className={cx("card-header")}>Msgs</div>
			<div className={cx("card-body")}>
				<TxMessageSkeleton />
			</div>
		</div>
	);
};

TxDataSkeleton.propTypes = {};

TxDataSkeleton.defaultProps = {};

export default TxDataSkeleton;
