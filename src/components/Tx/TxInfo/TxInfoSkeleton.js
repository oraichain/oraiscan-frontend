import * as React from "react";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import InfoRow from "src/components/common/InfoRow";
import styles from "./TxInfo.module.scss";

const cx = cn.bind(styles);

const TxInfoSkeleton = ({txData}) => {
	return (
		<div className={cx("card")}>
			<h2 className={cx("card-header")}>Information</h2>
			<div className={cx("card-body")}>
				<InfoRow label='TxHash'>
					<div className={cx("address")}>
						<span className={cx("address-value")}>
							<Skeleton variant='text' width={300} height={24} />
						</span>
						<span className={cx("address-copy")}>
							<Skeleton variant='text' width={24} height={24} />
						</span>
					</div>
				</InfoRow>
				<InfoRow label='Status'>
					<div className={cx("status")}>
						<span className={cx("status-icon")}>
							<Skeleton variant='text' width={10} height={6} />
						</span>
						<span className={cx("status-text")}>
							<Skeleton variant='text' width={50} height={24} />
						</span>
					</div>
				</InfoRow>
				<InfoRow label='Height'>
					<div className={cx("height")}>
						<Skeleton variant='text' width={80} height={24} />
					</div>
				</InfoRow>
				<InfoRow label='Time'>
					<div className={cx("time")}>
						<Skeleton variant='text' width={80} height={24} />
					</div>
				</InfoRow>
			</div>
		</div>
	);
};

TxInfoSkeleton.propTypes = {
	txData: PropTypes.any,
};

TxInfoSkeleton.defaultProps = {};

export default TxInfoSkeleton;
