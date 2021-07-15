import * as React from "react";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import InfoRow from "src/components/common/InfoRow";
import styles from "./Randomness.module.scss";

const cx = cn.bind(styles);

const RandomnessSkeleton = ({isLargeScreen}) => {
	return (
		<div className={cx("card")}>
			<h2 className={cx("card-header")}>Information</h2>
			<div className={cx("card-body")}>
				<InfoRow label='Random Seed (User Input)'>
					<div className={cx("address")}>
						<span className={cx("address-value")}>
							<Skeleton variant='text' width={isLargeScreen ? 400 : 250} height={24} />
						</span>
					</div>
				</InfoRow>
				<InfoRow label='Random Value'>
					<div className={cx("address")}>
						<span className={cx("address-value")}>
							<Skeleton variant='text' width={isLargeScreen ? 400 : 250} height={24} />
						</span>
					</div>
				</InfoRow>
				<InfoRow label='Signature'>
					<div className={cx("status")}>
						<span className={cx("status-text")}>
							<Skeleton variant='text' width={isLargeScreen ? 500 : 250} height={24} />
						</span>
					</div>
				</InfoRow>
				<InfoRow label='Public Key'>
					<div className={cx("public-key")}>
						<Skeleton variant='text' width={250} height={24} />
					</div>
				</InfoRow>
				<InfoRow label='User Input'>
					<div className={cx("public-key")}>
						<Skeleton variant='text' width={250} height={24} />
					</div>
				</InfoRow>
				<InfoRow label='Transaction Hash'>
					<div className={cx("current-fees")}>
						<Skeleton variant='text' width={100} height={24} />
					</div>
				</InfoRow>
				<InfoRow label='Current Fees'>
					<div className={cx("current-fees")}>
						<Skeleton variant='text' width={100} height={24} />
					</div>
				</InfoRow>
				<InfoRow label='Round'>
					<div className={cx("time")}>
						<Skeleton variant='text' width={80} height={24} />
					</div>
				</InfoRow>
			</div>
		</div>
	);
};

RandomnessSkeleton.propTypes = {
	txData: PropTypes.any,
};

RandomnessSkeleton.defaultProps = {};

export default RandomnessSkeleton;
