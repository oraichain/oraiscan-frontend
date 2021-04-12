import React, {useMemo} from "react";
import PropTypes from "prop-types";
import Skeleton from "@material-ui/lab/Skeleton";
import cn from "classnames/bind";
import InfoRow from "src/components/common/InfoRow";
import styles from "./TxMessage.module.scss";

const cx = cn.bind(styles);

const TxMessage = ({}) => {
	return (
		<div className={cx("card")}>
			<div className={cx("card-header")}>
				<span className={cx("icon")}>
					<Skeleton variant='rect' width={20} height={20} />
				</span>

				<span className={cx("title")}>
					<Skeleton variant='text' width={50} height={24} />
				</span>
			</div>
			<div className={cx("card-body")}>
				<InfoRow label={<Skeleton variant='text' width={100} height={24} />}>
					<Skeleton variant='text' width={200} height={24} />
				</InfoRow>

				<InfoRow label={<Skeleton variant='text' width={100} height={24} />}>
					<Skeleton variant='text' width={200} height={24} />
				</InfoRow>

				<InfoRow label={<Skeleton variant='text' width={100} height={24} />}>
					<Skeleton variant='text' width={200} height={24} />
				</InfoRow>
			</div>
		</div>
	);
};

TxMessage.propTypes = {};
TxMessage.defaultProps = {};

export default TxMessage;
