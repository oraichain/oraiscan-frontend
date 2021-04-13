import React from "react";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import InfoRow from "src/components/common/InfoRow";
import styles from "./HeaderCard.module.scss";

const cx = cn.bind(styles);

const HeaderCardSkeleton = ({data}) => {
	return (
		<div className={cx("card")}>
			<h2 className={cx("card-header")}>Header</h2>
			<div className={cx("card-body")}>
				<InfoRow label='Height'>
					<div className={cx("height")}>
						<Skeleton variant='text' width={63} height={24} />
					</div>
				</InfoRow>

				<InfoRow label='Block Time'>
					<div className={cx("block-time")}>
						<Skeleton variant='text' width={200} height={24} />
					</div>
				</InfoRow>

				<InfoRow label='Block Hash'>
					<div className={cx("hash")}>
						<Skeleton variant='text' width={300} height={24} />
					</div>
				</InfoRow>

				<InfoRow label='Number Of Transactions'>
					<div className={cx("tx-number")}>
						<Skeleton variant='text' width={24} height={24} />
					</div>
				</InfoRow>

				<InfoRow label='Moniker'>
					<div className={cx("moniker")}>
						<Skeleton variant='text' width={200} height={24} />
					</div>
				</InfoRow>
			</div>
		</div>
	);
};

HeaderCardSkeleton.propTypes = {
	data: PropTypes.any,
};

HeaderCardSkeleton.defaultProps = {};

export default HeaderCardSkeleton;
